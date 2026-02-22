/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useRef, startTransition } from 'react';

// Define the Web Speech API interfaces for better TypeScript support
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

// type SpeechRecognitionType = typeof window.SpeechRecognition | typeof window.webkitSpeechRecognition;

export function useWebSpeech() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [isWebSpeechSupported, setIsWebSpeechSupported] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognitionRef = useRef<any | null>(null);

  useEffect(() => {
    if (SpeechRecognition) {
      startTransition(() => {
        setIsWebSpeechSupported(true);
      })
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true; // Get interim results for live feedback

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        // let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            // finalTranscript += transcriptPart;
          } else {
            interimTranscript += transcriptPart;
          }
        }
        setTranscript((prev) => prev + interimTranscript); // Append final results
        // You might want to display interimTranscript separately for live updates
        // For simplicity, we're just appending final results to the main transcript state
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Web Speech API Error:", event.error);
        setError(`Speech recognition error: ${event.error}`);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
        console.log("Speech recognition ended.");
      };
    } else {
      startTransition(() => {
        setIsWebSpeechSupported(false);
        setError("Web Speech API is not supported in this browser.");
      })
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [SpeechRecognition]);

  const startRecording = useCallback(() => {
    if (recognitionRef.current && !isRecording) {
      setTranscript(''); // Clear previous transcript
      setError(null);
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e: any) {
        console.error("Error starting speech recognition:", e);
        setError(`Could not start recording: ${e.message}`);
        setIsRecording(false);
      }
    }
  }, [isRecording]);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  return {
    isRecording,
    transcript,
    isWebSpeechSupported,
    error,
    startRecording,
    stopRecording,
  };
}
