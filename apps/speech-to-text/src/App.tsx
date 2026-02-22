import { useState, useCallback /* , useEffect, startTransition */ } from 'react'
import type { ChangeEvent } from 'react'
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
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
// import { useWebSpeech } from './hooks/use-web-speech';
// import { Mic, PauseCircle, PlayCircle } from 'lucide-react'
import {
  // DEFAULT_MODEL,
  LANGUAGE_OPTIONS,
  // MODEL_OPTIONS,
} from './lib/transpile/types'
import type { ProgressStatusInfo } from 'node_modules/@huggingface/transformers/types/utils/core'

function App() {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  // const [selectedModel, setSelectedModel] = useState<string>(DEFAULT_MODEL)
  const [selectedLanguage, setSelectedLanguage] = useState<string>(LANGUAGE_OPTIONS[0].value)
  const [transcriptionResult, setTranscriptionResult] = useState<string>('')

  const {
    transcribe,
    isLoading,
    progress,
    error: transcriptionError,
  } = useTranscription({
    onTranscriptionUpdate: (result) => {
      if (result.append) {
        setTranscriptionResult((prev) => prev + result.text)
      } else {
        setTranscriptionResult(result.text)
      }
    },
  })

  // const isWebSpeechSupported = false // Mocked for now

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

  const handleTranscribe = async () => {
    if (!audioFile) {
      alert('Please select an audio file first.')
      return
    }
    if (isLoading) {
      alert('Model is still loading. Please wait.')
      return
    }

    setTranscriptionResult('') // Clear previous result
    const result = await transcribe(audioFile, selectedLanguage)
    if (result) {
      setTranscriptionResult(result.text)
    }
  }

  /*
  // Effect to update transcriptionResult when webSpeechTranscript changes
  useEffect(() => {
    if (selectedModel === "web-speech-api" && webSpeechTranscript) {
      startTransition(() => {
        setTranscriptionResult(webSpeechTranscript);
      });
    }
  }, [webSpeechTranscript, selectedModel]);
  */

  // const progressValue = progress ? Math.round(progress.progress) : 0

  const currentError = transcriptionError // selectedModel === "web-speech-api" ? webSpeechError : transcriptionError;

  return (
    <div className="flex flex-col md:flex-row">
      <Card className="w-full md:w-80 md:min-h-screen">
        <CardHeader>
          <CardTitle>Speech to Text</CardTitle>
          {/*<CardDescription>
            Transcribe your audio files with ease.
          </CardDescription>*/}
        </CardHeader>
        <CardContent className="space-y-4">
          {/*{selectedModel !== 'web-speech-api' && (*/}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="audio-file">Audio File</Label>
            <Input
              id="audio-file"
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
            />
          </div>
          {/*)}*/}
          {/*<div className="grid gap-1.5">
            <Label htmlFor="model-select">Model</Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger id="model-select">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(MODEL_OPTIONS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
                {isWebSpeechSupported ? (
                  <SelectItem value="web-speech-api">
                    Web Speech API
                  </SelectItem>
                ) : (
                  <SelectItem value="web-speech-api" disabled>
                    Web Speech API (Not Supported)
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>*/}

          <div className="grid gap-1.5">
            <Label htmlFor="language-select">Language</Label>
            <Select
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
            >
              <SelectTrigger id="language-select">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {Object.keys(progress).length > 0 && (
            <div className="space-y-4">
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
            {isLoading ? 'Loading...' : 'Transcribe'}
          </Button>
        </CardContent>
      </Card>
      <div className="flex-1 h-screen p-4 overflow-auto bg-muted/50 text-foreground text-sm">
        {transcriptionResult ||
          'Transcript will appear here after transcription.'}
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
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs">{label}</Label>
        <span className="text-xs">{Math.round(percentage || 0)}%</span>
      </div>
      <Progress value={percentage || 0} />
    </div>
  )
}
