import type { ProgressInfo } from "@huggingface/transformers"

// Options ===================================================================
export const LANGUAGE_OPTIONS = [
  { value: 'vi', label: 'Vietnamese' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
]
export const DEFAULT_LANGUAGE = 'en'

export const MODEL_OPTIONS = {
  'Xenova/whisper-tiny': 'Xenova/whisper-tiny',
  'Xenova/whisper-base': 'Xenova/whisper-base',
  'Xenova/whisper-small': 'Xenova/whisper-small',
  'PhoWhisper-tiny': 'huuquyet/PhoWhisper-tiny',
  'PhoWhisper-base': 'huuquyet/PhoWhisper-base',
  'PhoWhisper-small': 'huuquyet/PhoWhisper-small',
} as const
export const DEFAULT_MODEL = MODEL_OPTIONS['PhoWhisper-base']

export type ModelOption = typeof MODEL_OPTIONS[keyof typeof MODEL_OPTIONS]

export const SAMPLING_RATE = 16000

// Options ===================================================================

// Message Types =============================================================
export interface ReqLoadModel {
  type: 'load-model'
  modelName?: ModelOption
}
export interface ReqTranscribe {
  type: 'transcribe'
  audio: Float32Array<ArrayBuffer>
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
export interface ResTranscribing {
  type: 'transcribing'
  output: {
    text: string
  }
}
export interface ResComplete {
  type: 'complete'
  output: {
    text: string
  }
}

export type WorkerResponse = ResModelLoading | ResModelLoaded | ResError | ResComplete | ResTranscribing

export const MsgModelLoaded = {
  type: 'model-loaded',
}
// Message Types =============================================================
