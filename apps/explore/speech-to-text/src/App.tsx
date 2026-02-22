import { useState, useCallback /* , useEffect, startTransition */ } from 'react'
import type { ChangeEvent } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { Label } from './components/ui/label'
import { Progress } from './components/ui/progress'
import { useTranscription } from './lib/transpile/use-transcription'
import {
  DEFAULT_MODEL,
  LANGUAGE_OPTIONS,
  MODEL_OPTIONS,
  MODEL_SELECT_OPTIONS,
  type ModelOption,
  type SupportedLanguage,
} from './lib/transpile/types'
import type { ProgressStatusInfo } from 'node_modules/@huggingface/transformers/types/utils/core'
import { useTranslations } from 'use-intl'
import { LangSelector } from './lib/i18n/LangSelector'

function App() {
  const t = useTranslations('app')
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(
    LANGUAGE_OPTIONS[0].value,
  )
  const [selectedModel, setSelectedModel] = useState<ModelOption>(() => {
    const defaultModelForLanguage =
      MODEL_SELECT_OPTIONS[selectedLanguage]?.default
    return defaultModelForLanguage || DEFAULT_MODEL
  })
  const modelOptions = MODEL_SELECT_OPTIONS[selectedLanguage]?.options
  const [transcriptionResult, setTranscriptionResult] = useState<string>('')

  const [isCopied, setIsCopied] = useState(false)

  const {
    transcribe,
    isLoading,
    progress,
    error: currentError,
  } = useTranscription({
    onTranscriptionUpdate: (result) => {
      if (result.append) {
        setTranscriptionResult((prev) => prev + result.text)
      } else {
        setTranscriptionResult(result.text)
      }
    },
  })

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setAudioFile(event.target.files[0])
      } else {
        setAudioFile(null)
      }
    },
    [],
  )

  const handleModelChange = useCallback((value: ModelOption) => {
    setSelectedModel(value)
  }, [])

  const handleLanguageChange = useCallback((value: SupportedLanguage) => {
    setSelectedLanguage(value)
    // Optionally reset model selection when language changes
    const defaultModelForLanguage = MODEL_SELECT_OPTIONS[value]?.default
    setSelectedModel(defaultModelForLanguage || '')
  }, [])

  const handleTranscribe = async () => {
    if (!audioFile || isLoading) {
      return
    }

    setTranscriptionResult('') // Clear previous result
    const result = await transcribe({
      audioFile,
      language: selectedLanguage,
      modelName: selectedModel,
    })
    if (result) {
      setTranscriptionResult(result.text)
    }
  }

  const handleCopyResultToClipboard = useCallback(() => {
    if (transcriptionResult) {
      setIsCopied(true)
      navigator.clipboard.writeText(transcriptionResult)
        .then(() => {
          setTimeout(() => setIsCopied(false), 2000) // Reset copy state after 2 seconds
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err)
          setIsCopied(false)
        })
    }
  }, [transcriptionResult])

  return (
    <div className="flex flex-col md:flex-row bg-muted/50">
      <title>{t('speech-to-text')}</title>
      <Card className="w-full md:w-80 md:min-h-screen md:rounded-tl-none md:rounded-bl-none">
        <CardHeader className="space-y-2 flex flex-row items-center justify-between">
          <CardTitle>{t('speech-to-text')}</CardTitle>
          <LangSelector />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="audio-file">{t('audio-file.title')}</Label>
            <Input
              id="audio-file"
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              placeholder={t('audio-file.placeholder')}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="language-select">{t('language.title')}</Label>
            <Select
              value={selectedLanguage}
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger id="language-select">
                <SelectValue placeholder={t('language.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {t(`language.${option.label}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="model-select">{t('model.title')}</Label>
            <Select value={selectedModel} onValueChange={handleModelChange}>
              <SelectTrigger id="model-select">
                <SelectValue
                  placeholder="Select a model"
                  aria-label={selectedModel}
                >
                  {MODEL_OPTIONS[selectedModel]}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {modelOptions.map((options) => (
                  <SelectItem key={options.value} value={options.value}>
                    <div>
                      {options.label}
                      <p className="text-muted-foreground text-xs">
                        {t(`model.${options.label}-desc`)}
                      </p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {Object.keys(progress).length > 0 && (
            <div className="space-y-4 w-full">
              {Object.keys(progress).map((item) => {
                if (progress[item]?.status === 'transcribing') {
                  return null
                }
                const percentage =
                  (progress[item] as ProgressStatusInfo)?.progress || 0
                return (
                  <ProgressBar
                    key={item}
                    percentage={percentage}
                    label={item}
                  />
                )
              })}
            </div>
          )}

          {currentError && (
            <p className="text-red-500 text-sm">{currentError}</p>
          )}
          <Button
            onClick={handleTranscribe}
            className="w-full"
            disabled={!audioFile || isLoading}
          >
            {isLoading ? t('loading') : t('transcribe')}
          </Button>
        </CardContent>
      </Card>
      <div className="flex-1 relative">
        <div className="h-screen w-full px-4 pb-4 md:px-8 md:pb-8 pt-16 overflow-auto text-foreground text-sm resize-none">
          {transcriptionResult ||
            (isLoading ? t('loading') : t('result-placeholder'))}
        </div>
        {transcriptionResult && (
          <Button
            onClick={handleCopyResultToClipboard}
            className="absolute top-4 right-4"
            disabled={isLoading}
          >
            {t(isCopied ? 'copied' : 'copy')}
          </Button>
        )}
      </div>
    </div>
  )
}

export default App

function ProgressBar({
  percentage,
  label,
}: {
  percentage?: number
  label: string
}) {
  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center justify-between w-full">
        <Label className="text-xs flex-1 text-ellipsis wrap-break-word overflow-hidden w-full">
          {label}
        </Label>
        <span className="text-xs">{Math.round(percentage || 0)}%</span>
      </div>
      <Progress value={percentage || 0} />
    </div>
  )
}
