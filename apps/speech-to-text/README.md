# Speech to Text Application

This is a React application built with Vite, utilizing Transformer.js for in-browser speech-to-text transcription and `shadcn/ui` for the user interface. It is part of a larger Turborepo monorepo, following modern React development practices.

## Features

-   **Audio File Transcription**: Upload an audio file and get a transcription using a Transformer.js model (e.g., Whisper).
-   **Web Speech API Integration**: For browsers that support it, use the Web Speech API for live microphone transcription.
-   **Model and Language Selection**: Choose from available transcription models and specify the input language.
-   **Loading Indicators**: Progress bars and status messages indicate when models are loading or transcription is in progress.

## Available Models

-   **Xenova/whisper-tiny.en**: An in-browser Whisper model powered by Transformer.js. This model is automatically downloaded the first time it's selected.
-   **Web Speech API**: (Browser-dependent) Utilizes the browser's native speech recognition capabilities for real-time transcription from the microphone.

## Getting Started

Follow these steps to set up and run the application locally within the monorepo.

### Prerequisites

-   Node.js (v18 or higher)
-   pnpm (package manager)
-   [Turborepo](https://turbo.build/repo/docs/installing) (installed globally or via `pnpm install` in the monorepo root)

### Installation

1.  **Navigate to the monorepo root directory.**
2.  **Install dependencies across the monorepo:**
    ```bash
    pnpm install
    ```

### Running the Application

To start the development server for *this specific application* (`speech-to-text`) within the monorepo:

```bash
pnpm turbo run dev --filter=speech-to-text
```

This will run the `dev` script defined in this package's `package.json` using Turborepo and typically open the application in your browser at `http://localhost:5173`.

### Building for Production

To build the application for production:

```bash
pnpm turbo run build --filter=speech-to-text
```

This will generate a `dist` folder within the `apps/speech-to-text` directory with the optimized production build.