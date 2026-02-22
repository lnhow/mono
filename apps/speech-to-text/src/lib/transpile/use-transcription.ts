import { useState, useEffect, useRef, useCallback } from 'react'
import { SAMPLING_RATE, type ReqLoadModel, type ReqTranscribe, type WorkerResponse } from './types'
import TranscriptionWorker from './worker.ts?worker'
import type { ProgressInfo } from '@huggingface/transformers'

type TranscriptionResult = {
  text: string
  append?: boolean
}

type TranscribeStatusInfo = {
  status: 'transcribing'
  progress: number
  file: string
  loaded: number
  total: number
}

type TranscriptionProgressMap = {
  [index: string]: ProgressInfo | TranscribeStatusInfo | null
}

const selectAudioBufferChannel = (audioBuffer: AudioBuffer) => {
  // Taken from https://github.com/xenova/whisper-web/blob/81869ed62970ff4373509b6004a6c9a3f0c5b64d/src/hooks/useTranscriber.ts#L152
  // TODO: Try to understand this better
  if (audioBuffer.numberOfChannels !== 2) {
    // If not stereo, return the first channel
    return audioBuffer.getChannelData(0)
  } else {
    // If stereo, average the two channels
    const scaling = Math.SQRT2
    const left = audioBuffer.getChannelData(0)
    const right = audioBuffer.getChannelData(1)
    const length = audioBuffer.length
    const combined = new Float32Array(length)

    for (let i = 0; i < length; i++) {
      combined[i] = scaling * (left[i] + right[i]) / 2
    }
    return combined
  }
}

export function useTranscription({
  onTranscriptionUpdate,
}: {
  onTranscriptionUpdate: (result: TranscriptionResult) => void
}) {
  const [progress, setProgress] = useState<TranscriptionProgressMap>({})
  const [error, setError] = useState<string | null>(null)
  const [isReady, setIsReady] = useState<boolean>(false)

  const workerRef = useRef<Worker | null>(null)

  const resolveRef = useRef<((result: TranscriptionResult) => void) | null>(null)
  const onTranscriptionCallbackRef = useRef(onTranscriptionUpdate)
  useEffect(() => {
    onTranscriptionCallbackRef.current = onTranscriptionUpdate
  }, [onTranscriptionUpdate])

  useEffect(() => {
    // workerRef.current ??= new Worker(new URL('./worker.ts', import.meta.url), {
    //   type: 'module',
    // })
    const worker = new TranscriptionWorker()
    //   new Worker(new URL('./worker.ts', import.meta.url), {
    //   type: 'module',
    // })
    workerRef.current = worker

    const onMessageReceived = (event: MessageEvent) => {
      const data = event.data as WorkerResponse
      // console.log('[devlog]:', 'Message received from worker:', data)

      switch (data.type) {
        case 'model-loading':
          // setProgress(data.progress)
          switch (data.progress.status) {
            case 'initiate': {
              // Model file start load: add a new progress item to the list.
              const progress = data.progress
              setIsReady(false)
              setProgress((prev) => ({
                ...prev,
                [progress.file]: data.progress,
              }))
              break
            }
            case 'progress': {
              // Model file loading progress: update the existing progress item.
              const progress = data.progress
              setProgress((prev) => ({
                ...prev,
                [progress.file]: data.progress,
              }))
              break
            }
            case 'done': {
              // Model file load done: remove the progress item from the list.
              const progress = data.progress
              setProgress((prev) => {
                const newProgress = { ...prev }
                delete newProgress[progress.file]
                return newProgress
              })
              break
            }
            case 'ready': {
              setIsReady(true)
              break
            }
          }
          break
        case 'model-loaded':
          setIsReady(true)
          setProgress({})
          break
        case 'error':
          console.error('Worker error:', data.error)
          setError(data.error || 'An error occurred during transcription.')
          setProgress({})
          break
        case 'transcribing':
          onTranscriptionCallbackRef.current?.({ text: data.output.text, append: true })
          break
        case 'complete':
          // onTranscriptionCallbackRef.current({ text: data.output.text })
          // Resolve the pending transcription promise
          if (resolveRef.current) {
            resolveRef.current({ text: data.output.text })
            resolveRef.current = null
          }
          setProgress({})
          break
        default:
          // This handles progress updates from Transformers.js
          // setProgress(data as TranscriptionProgress)
      }
    }

    worker.addEventListener('message', onMessageReceived)

    // console.log('[devlog]:', 'Transcription worker initialized.', worker)
    // Initialize the worker and load the model
    worker.postMessage({ type: 'load-model' } as ReqLoadModel)

    return () => {
      worker.removeEventListener('message', onMessageReceived)
      worker.terminate()
      workerRef.current = null
    }
  }, [])

  const transcribe = useCallback(
    async (audioFile: File, language: string): Promise<TranscriptionResult | null> => {
      // console.log('[devlog]:', 'Starting transcription for file:', audioFile.name)
      if (!workerRef.current || !isReady) {
        setError('Transcription model not loaded.')
        return null
      }
      // https://github.com/xenova/whisper-web/blob/main/src/components/AudioManager.tsx#L572
      //
      // const urlObj = URL.createObjectURL(audioFile)
      // const mimeType = audioFile.type

      const buffer = await new Promise<AudioBuffer>((resolve) => {
        const reader = new FileReader()
        // console.log('[devlog]:', 'Reading audio file as array buffer:', audioFile.name)
        reader.addEventListener('load', async (e) => {
          const arrayBuffer = e.target?.result as ArrayBuffer // Get the ArrayBuffer
          if (!arrayBuffer) return

          const audioCTX = new AudioContext({
            sampleRate: SAMPLING_RATE,
          })

          const decoded = await audioCTX.decodeAudioData(arrayBuffer)
          // console.log('[devlog]:', 'Audio file decoded:', decoded)
          resolve(decoded)
        })
        reader.readAsArrayBuffer(audioFile)
      })

      try {
        setError(null)
        setProgress((prev) => {
          return {
            ...prev,
            [audioFile.name]: {
              status: 'transcribing',
              progress: 0,
              file: audioFile.name,
              loaded: 0,
              total: 0,
            },
          }
        })

        // Get audio as array buffer
        const audio = selectAudioBufferChannel(buffer)

        return new Promise((resolve) => {
          resolveRef.current = resolve
          workerRef.current?.postMessage({
            type: 'transcribe',
            audio,
            language,
          } as ReqTranscribe)
        })
      } catch (err) {
        console.error('Transcription failed:', err)
        setError('Transcription failed. Please try a different audio file.')
        setProgress({})
        return null
      }
    },
    [isReady],
  )

  const isLoading = Object.keys(progress).length > 0

  return { transcribe, progress, error, isReady, isLoading }
}
