import { useState, useEffect, useRef, useCallback } from 'react'
import type { ReqLoadModel, WorkerResponse } from './types'
import TranscriptionWorker from './worker.ts?worker'

type TranscriptionResult = {
  text: string
}

type TranscriptionProgress = {
  status: string
  progress: number // 0-100
  file: string
  loaded: number
  total: number
}

export function useTranscription() {
  const [isModelLoading, setIsModelLoading] = useState<boolean>(true)
  const [progress, setProgress] = useState<TranscriptionProgress | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isReady, setIsReady] = useState<boolean>(false)

  const workerRef = useRef<Worker | null>(null)
  const resolveRef = useRef<
    ((result: TranscriptionResult | null) => void) | null
  >(null)

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
      console.log('[devlog]:', 'Worker message received:', data)

      switch (data.type) {
        case 'model-loading':
          // setProgress(data.progress)
          switch (data.progress.status) {
            case 'initiate':
              // Model file start load: add a new progress item to the list.
              setIsModelLoading(true)
              break

          }
          console.log('[devlog]:', 'Model loading progress:', data.progress)
          // data.progress.file
          break
        case 'model-loaded':
          setIsModelLoading(false)
          setIsReady(true)
          setProgress(null)
          break
        case 'error':
          console.error('Worker error:', data.error)
          setError(data.error || 'An error occurred during transcription.')
          setIsModelLoading(false)
          setProgress(null)
          if (resolveRef.current) {
            resolveRef.current(null)
            resolveRef.current = null
          }
          break
        case 'complete':
          if (resolveRef.current) {
            resolveRef.current({ text: data.output.text })
            resolveRef.current = null
          }
          setProgress(null)
          break
        default:
          // This handles progress updates from Transformers.js
          setProgress(data as TranscriptionProgress)
      }
    }

    //   if (data.type === 'ready') {
    //     setIsModelLoading(false)
    //     setIsReady(true)
    //     setProgress(null)
    //   } else if (data.status === 'error') {
    //     console.error('Worker error:', data.error)
    //     setError(data.error || 'An error occurred during transcription.')
    //     setIsModelLoading(false)
    //     setProgress(null)
    //     if (resolveRef.current) {
    //       resolveRef.current(null)
    //       resolveRef.current = null
    //     }
    //   } else if (data.status === 'complete') {
    //     if (resolveRef.current) {
    //       resolveRef.current({ text: data.output.text })
    //       resolveRef.current = null
    //     }
    //     setProgress(null)
    //   } else if {
    //     // This handles progress updates from Transformers.js
    //     setProgress(data)
    //   }
    // }

    worker.addEventListener('message', onMessageReceived)

    console.log('[devlog]:', 'Transcription worker initialized.', worker)
    // Initialize the worker and load the model
    worker.postMessage({ type: 'load-model' } as ReqLoadModel)

    return () => {
      worker.removeEventListener('message', onMessageReceived)
      worker.terminate()
      workerRef.current = null
    }
  }, [])

  const transcribe = useCallback(
    async (audioFile: File): Promise<TranscriptionResult | null> => {
      if (!workerRef.current || !isReady) {
        setError('Transcription model not loaded.')
        return null
      }

      try {
        setError(null)
        setProgress({
          status: 'transcribing',
          progress: 0,
          file: audioFile.name,
          loaded: 0,
          total: 0,
        })

        // Get audio as array buffer
        const audio = await audioFile.arrayBuffer()

        return new Promise((resolve) => {
          resolveRef.current = resolve
          workerRef.current?.postMessage({
            type: 'transcribe',
            audio: audio,
          })
        })
      } catch (err) {
        console.error('Transcription failed:', err)
        setError('Transcription failed. Please try a different audio file.')
        setProgress(null)
        return null
      }
    },
    [isReady],
  )

  return { transcribe, isModelLoading, progress, error, isReady }
}
