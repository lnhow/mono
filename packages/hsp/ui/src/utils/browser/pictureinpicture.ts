/**
 * Detects the type of Picture-in-Picture (PiP) support available in the current browser environment.
 *
 * @returns {'video' | 'document' | false}
 * - `'document'` if the Document Picture-in-Picture API is supported.
 * - `'video'` if the Video Picture-in-Picture API is supported.
 * - `false` if neither API is supported.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document_Picture-in-Picture_API/Using#feature_detection}
 */
export const detectPictureInPictureSupport = ():
  | 'video'
  | 'document'
  | 'false' => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Document_Picture-in-Picture_API/Using#feature_detection
  if ('documentPictureInPicture' in window) {
    return 'document'
  }
  // https://developer.mozilla.org/en-US/docs/Web/API/Picture-in-Picture_API#instance_properties_on_the_document_interface
  if ('pictureInPictureEnabled' in document) {
    return 'video'
  }
  return 'false'
}

export type TRequestDPIPOptions = {
  disallowReturnToOpener?: boolean
  preferInitialWindowPlacement?: boolean
  height?: number
  width?: number
}

// https://developer.mozilla.org/en-US/docs/Web/API/DocumentPictureInPicture
export interface DocumentPictureInPicture {
  window: Window
  requestWindow(options?: TRequestDPIPOptions): Promise<Window>
}


export interface DocumentPictureInPictureEvent {
  window: Window
}

export interface DocumentPictureInPictureEventMap {
  enter: DocumentPictureInPictureEvent
}

export interface WindowWithDocumentPictureInPicture extends Window {
  documentPictureInPicture?: DocumentPictureInPicture | null
}
