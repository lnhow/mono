import { defaultCake } from './_state'

export enum ECakeScene {
  VANILLA = '1',
  CHOCOLATE = '2',
  FRUITS = '3',
}

export const TEXT = {
  SIZE: 0.5,
  LINE_HEIGHT: 0.75,
  MAX_LENGTH: 30,
} as const

export const QUERY_NAME = {
  MESSAGE: 'm',
  SCENE: 'sc',
  EDIT: 'edit',
}

export const SCENE_CONFIG = {
  [ECakeScene.VANILLA]: {
    scene: ECakeScene.VANILLA,
    label: 'Vanilla',
    model: {
      link: '/static/3js/cake/cake3d.glb',
      attributes: {
        position: [0, 4.7, 0],
      },
      credit:
        '"Cake 3D" (https://skfb.ly/6Rx7w) by Johana-PS is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).',
    },
    textColor: '#E5838E',
  },
  [ECakeScene.CHOCOLATE]: {
    scene: ECakeScene.CHOCOLATE,
    label: 'Chocolate',
    model: {
      link: '/static/3js/cake/chocolate_berry_cake.glb',
      attributes: {
        position: [0, 2, 0],
        scale: [1.2, 1.2, 1.2],
      },
      credit:
        '"Chocolate Berry Cake" (https://skfb.ly/owGUT) by Anch0r is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).',
    },
    textColor: '#591B15',
  },
  [ECakeScene.FRUITS]: {
    scene: ECakeScene.FRUITS,
    label: 'Fruits',
    model: {
      link: '/static/3js/cake/fruit_cake_draft.glb',
      attributes: {
        position: [0, 4.6, 0],
        scale: [1.5, 1.5, 1.5],
      },
      credit: '',
    },
    textColor: '#D14B67',
  },
} as const

export const encodeMessage = (str: string) => {
  return btoa(encodeURIComponent(str))
}

export const decodeMessage = (str: string) => {
  return decodeURIComponent(atob(str))
}

export const encodeCakeURL = (message: string, scene: ECakeScene, edit = false) => {
  const params = new URLSearchParams()
  params.set(QUERY_NAME.MESSAGE, encodeMessage(message.trim().slice(0, TEXT.MAX_LENGTH)))
  params.set(QUERY_NAME.SCENE, scene)

  // Only include the edit parameter if it's true
  if (edit) {
    params.set(QUERY_NAME.EDIT, 'true')
  }


  return params.toString()
}

export const decodeCakeURL = (url: string) => {
  const params = new URLSearchParams(url)
  const message = params.get(QUERY_NAME.MESSAGE)
  const scene = params.get(QUERY_NAME.SCENE)
  const edit = params.get(QUERY_NAME.EDIT)

  const sceneFromParams = SCENE_CONFIG[scene as keyof typeof SCENE_CONFIG]
  let defaultMessage = defaultCake.message

  try {
    if (message) {
      defaultMessage = decodeMessage(message || '')
    }
  } catch (error) {
    console.log('Failed to decode message:', error)
  }

  return {
    message: defaultMessage,
    scene: sceneFromParams ? sceneFromParams.scene : defaultCake.scene,
    edit: edit === 'true',
  }
}
