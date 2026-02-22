import type { ProgressInfo } from "@huggingface/transformers"

// Options ===================================================================

export type SupportedLanguage = 'vi' | 'en' // | 'es' | 'fr' | 'de'
export const LANGUAGE_OPTIONS = [
  { value: 'vi', label: 'vietnamese' },
  { value: 'en', label: 'english' },
  // { value: 'es', label: 'Spanish' },
  // { value: 'fr', label: 'French' },
  // { value: 'de', label: 'German' },
] as const
export const DEFAULT_LANGUAGE = 'en'

export const MODEL_OPTIONS = {
  // Multi-lingual models
  'Xenova/whisper-tiny': 'whisper-tiny',
  'Xenova/whisper-base': 'whisper-base',
  'Xenova/whisper-small': 'whisper-small',
  // Vietnamese-specific models
  'huuquyet/PhoWhisper-tiny': 'PhoWhisper-tiny',
  'huuquyet/PhoWhisper-base': 'PhoWhisper-base',
  'huuquyet/PhoWhisper-small': 'PhoWhisper-small',
  // English-specific models
  'Xenova/whisper-tiny.en': 'whisper-tiny-en',
  'Xenova/whisper-base.en': 'whisper-base-en',
  'Xenova/whisper-small.en': 'whisper-small-en',
} as const
export type ModelOption = keyof typeof MODEL_OPTIONS

export const MODEL_SELECT_OPTIONS = {
  'vi': {
    default: 'huuquyet/PhoWhisper-base',
    options: [
      { value: 'huuquyet/PhoWhisper-tiny', label: 'PhoWhisper-tiny' },
      { value: 'huuquyet/PhoWhisper-base', label: 'PhoWhisper-base' },
      { value: 'huuquyet/PhoWhisper-small', label: 'PhoWhisper-small' },
      { value: 'Xenova/whisper-tiny', label: 'whisper-tiny' },
      { value: 'Xenova/whisper-base', label: 'whisper-base' },
      { value: 'Xenova/whisper-small', label: 'whisper-small' },
    ],
  },
  'en': {
    default: 'Xenova/whisper-base.en',
    options: [
      { value: 'Xenova/whisper-tiny.en', label: 'whisper-tiny-en' },
      { value: 'Xenova/whisper-base.en', label: 'whisper-base-en' },
      { value: 'Xenova/whisper-small.en', label: 'whisper-small-en' },
      { value: 'Xenova/whisper-tiny', label: 'whisper-tiny' },
      { value: 'Xenova/whisper-base', label: 'whisper-base' },
      { value: 'Xenova/whisper-small', label: 'whisper-small' },
    ],
  },
} as const

export const DEFAULT_MODEL: ModelOption = 'huuquyet/PhoWhisper-base'

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
  modelName: ModelOption
}

export type WorkerRequest = ReqLoadModel | ReqTranscribe

export interface ResModelLoading {
  type: 'model-loading'
  progress: ProgressInfo
}
export interface ResModelLoaded {
  type: 'model-loaded'
  modelName: ModelOption
  initializing?: boolean
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

// Message Types =============================================================
