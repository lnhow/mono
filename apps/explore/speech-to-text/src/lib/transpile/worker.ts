import {
  pipeline,
  env,
  type AutomaticSpeechRecognitionPipeline,
  TextStreamer,
} from '@huggingface/transformers'
import {
  DEFAULT_MODEL,
  type ModelOption,
  type ReqTranscribe,
  type ResModelLoaded,
  type ResModelLoading,
  type ResTranscribing,
  type WorkerRequest,
} from './types'

// Set environment variables for Transformers.js
env.allowLocalModels = false

console.log('[devlog]:', 'Worker initialized')

class TranscribePipeline {
  static model: ModelOption = DEFAULT_MODEL
  static instance: AutomaticSpeechRecognitionPipeline | null = null
  static streamer: TextStreamer | null = null

  static async switchModel(modelName: ModelOption) {
    await this.instance?.dispose()
    this.model = modelName
    this.instance = null
  }

  static async loadModel(initializing = false) {
    if (TranscribePipeline.instance) {
      self.postMessage({
        type: 'model-loaded',
        modelName: this.model,
        initializing,
      } as ResModelLoaded)
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
      this.streamer = new TextStreamer(this.instance.tokenizer, {
        skip_prompt: true,
        callback_function: (text) => {
          // console.log('[devlog]: Transcription update:', text)
          self.postMessage({ type: 'transcribing', output: { text } } as ResTranscribing)
        },
      })
      self.postMessage({
        type: 'model-loaded',
        modelName: this.model,
        initializing,
      } as ResModelLoaded)
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
      await TranscribePipeline.loadModel(true)
      break
    case 'transcribe':
      await handleTranscription(event.data)
      break
    default:
      console.error('Unknown message type:', type)
  }
}

async function handleTranscription(data: ReqTranscribe) {
  console.log('[devlog]: Starting transcription', data)
  if (!TranscribePipeline.instance || !TranscribePipeline.streamer) {
    self.postMessage({ status: 'error', error: 'Model not loaded' })
    return
  }

  if (data.modelName && data.modelName !== TranscribePipeline.model) {
    console.log('[devlog]: Switching model to', data.modelName)
    await TranscribePipeline.switchModel(data.modelName)
    await TranscribePipeline.loadModel()
  }

  try {
    const audioBuffer = data.audio

    const output = await TranscribePipeline.instance(
      new Float32Array(audioBuffer),
      {
        language: data.language,

        chunk_length_s: 30, // Process in 30-second chunks
        stride_length_s: 5, // 5-second overlap for better accuracy

        top_k: 0, // Disable top-k sampling for more deterministic output
        do_sample: false, // Disable sampling for more deterministic output

        // return_timestamps: 'word', // Get word-level timestamps for better context
        force_full_sequences: true, // Ensure full sequences are processed for better context

        streamer: TranscribePipeline.streamer, // Use the TextStreamer for real-time output
      },
    )

    console.log('[devlog]: Transcription complete', output)

    self.postMessage({ type: 'complete', output })
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    console.error('Transcription error in worker:', error)
    self.postMessage({ type: 'error', error: errorMessage })
  }
}
