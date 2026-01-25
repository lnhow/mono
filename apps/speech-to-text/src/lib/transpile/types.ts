import type { ProgressInfo } from "@huggingface/transformers"

// Options ===================================================================
export const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'vi', label: 'Vietnamese' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
]
export const DEFAULT_LANGUAGE = 'en'

export const MODEL_OPTIONS = {
  'Xenova/whisper-tiny': 'Xenova/whisper-tiny',
  'Xenova/whisper-base': 'Xenova/whisper-base',
  'Xenova/whisper-small': 'Xenova/whisper-small',
} as const
export const DEFAULT_MODEL = MODEL_OPTIONS['Xenova/whisper-base']

export type ModelOption = keyof typeof MODEL_OPTIONS

// Options ===================================================================

// Message Types =============================================================
export interface ReqLoadModel {
  type: 'load-model'
  modelName?: ModelOption
}
export interface ReqTranscribe {
  type: 'transcribe'
  audio: ArrayBuffer
  language: string
}

export type WorkerRequest = ReqLoadModel | ReqTranscribe

export interface ResModelLoading {
  type: 'model-loading'
  progress: ProgressInfo
}
export interface ResModelLoaded {
  type: 'model-loaded'
}
export interface ResError {
  type: 'error'
  error: string
}
export interface ResComplete {
  type: 'complete'
  output: {
    text: string
  }
}

export type WorkerResponse = ResModelLoading | ResModelLoaded | ResError | ResComplete

export const MsgModelLoaded = {
  type: 'model-loaded',
}
// Message Types =============================================================
