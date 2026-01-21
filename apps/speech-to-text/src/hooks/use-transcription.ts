import { useState, useEffect, useRef, useCallback } from 'react'

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
    // Create the worker
    const worker = new Worker(new URL('../worker.ts', import.meta.url), {
      type: 'module',
    })

    worker.onmessage = (event) => {
      const data = event.data

      if (data.status === 'ready') {
        setIsModelLoading(false)
        setIsReady(true)
        setProgress(null)
      } else if (data.status === 'error') {
        console.error('Worker error:', data.error)
        setError(data.error || 'An error occurred during transcription.')
        setIsModelLoading(false)
        setProgress(null)
        if (resolveRef.current) {
          resolveRef.current(null)
          resolveRef.current = null
        }
      } else if (data.status === 'complete') {
        if (resolveRef.current) {
          resolveRef.current({ text: data.output.text })
          resolveRef.current = null
        }
        setProgress(null)
      } else {
        // This handles progress updates from Transformers.js
        setProgress(data)
      }
    }

    workerRef.current = worker

    // Initialize the worker and load the model
    worker.postMessage({ type: 'load' })

    return () => {
      worker.terminate()
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
