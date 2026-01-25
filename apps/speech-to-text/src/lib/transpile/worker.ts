import {
  pipeline,
  env,
  type AutomaticSpeechRecognitionPipeline,
} from '@huggingface/transformers'
import {
  DEFAULT_MODEL,
  MsgModelLoaded,
  type ModelOption,
  type ReqTranscribe,
  type ResModelLoading,
  type WorkerRequest,
} from './types'

// Set environment variables for Transformers.js
env.allowLocalModels = false

console.log('[devlog]:', 'Worker initialized')

class TranscribePipeline {
  static model: ModelOption = DEFAULT_MODEL
  static instance: AutomaticSpeechRecognitionPipeline | null = null

  static async switchModel(modelName: ModelOption) {
    await this.instance?.dispose()
    this.model = modelName
    this.instance = null
  }

  static async loadModel() {
    if (TranscribePipeline.instance) {
      self.postMessage(MsgModelLoaded)
      return
    }

    try {
      this.instance = await pipeline<'automatic-speech-recognition'>(
        'automatic-speech-recognition',
        DEFAULT_MODEL,
        {
          progress_callback: (data) => {
            self.postMessage({
              type: 'model-loading',
              progress: data,
            } as ResModelLoading)
          },
        },
      )
      self.postMessage(MsgModelLoaded)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      self.postMessage({ status: 'error', error: errorMessage })
    }
  }
}

self.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  const { type } = event.data

  switch (type) {
    case 'load-model':
      await TranscribePipeline.loadModel()
      break
    case 'transcribe':
      await handleTranscription(event.data)
      break
    default:
      console.error('Unknown message type:', type)
  }
}

async function handleTranscription(data: ReqTranscribe) {
  if (!TranscribePipeline.instance) {
    self.postMessage({ status: 'error', error: 'Model not loaded' })
    return
  }

  try {
    const audioBuffer = data.audio
    const output = await TranscribePipeline.instance(
      new Float32Array(audioBuffer),
      { language: data.language },
    )
    self.postMessage({ type: 'complete', output })
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    console.error('Transcription error in worker:', error)
    self.postMessage({ type: 'error', error: errorMessage })
  }
}
