import {
  pipeline,
  env,
  type AutomaticSpeechRecognitionPipeline,
} from '@xenova/transformers'

// Set environment variables for Transformers.js
env.allowLocalModels = false

let transcriber: AutomaticSpeechRecognitionPipeline | null = null

self.onmessage = async (event) => {
  const { type, audio } = event.data

  if (type === 'load') {
    if (transcriber) {
      self.postMessage({ status: 'ready' })
      return
    }

    try {
      transcriber = await pipeline(
        'automatic-speech-recognition',
        'Xenova/whisper-base',
        {
          progress_callback: (data: unknown) => {
            self.postMessage(data)
          },
        },
      )
      self.postMessage({ status: 'ready' })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      self.postMessage({ status: 'error', error: errorMessage })
    }
  } else if (type === 'transcribe') {
    if (!transcriber) {
      self.postMessage({ status: 'error', error: 'Model not loaded' })
      return
    }

    try {
      // Transcribe the audio
      // The audio is expected to be an ArrayBuffer or Float32Array
      const output = await transcriber(audio)
      self.postMessage({ status: 'complete', output })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      console.error('Transcription error in worker:', error)
      self.postMessage({ status: 'error', error: errorMessage })
    }
  }
}
