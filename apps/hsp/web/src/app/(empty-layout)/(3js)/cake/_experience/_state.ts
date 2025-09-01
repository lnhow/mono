import { atom } from 'jotai'

export interface ICake {
  message: string
  scene: ECakeScene
}

export enum ECakeScene {
  CHOCOLATE = 'chocolate',
  VANILLA = 'vanilla',
  FRUITS = 'fruits',
}

export const TEXT = {
  SIZE: 0.5,
  LINE_HEIGHT: 0.75,
}

export const SCENE_CONFIG = {
  [ECakeScene.VANILLA]: {
    label: 'Vanilla',
    model: {
      link: '/static/3js/cake/cake3d.glb',
      attributes: {
        position: [0, 4.7, 0],
      },
      credit: '"Cake 3D" (https://skfb.ly/6Rx7w) by Johana-PS is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).',
    },
    textColor: '#E5838E',
  },
  [ECakeScene.CHOCOLATE]: {
    label: 'Chocolate',
    model: {
      link: '/static/3js/cake/chocolate_berry_cake.glb',
      attributes: {
        position: [0, 2, 0],
        scale: [1.2, 1.2, 1.2],
      },
      credit: '"Chocolate Berry Cake" (https://skfb.ly/owGUT) by Anch0r is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).'
    },
    textColor: '#591B15',
  },
  [ECakeScene.FRUITS]: {
    label: 'Fruits',
    model: {
      link: '/static/3js/cake/fruit_cake_draft.glb',
      attributes: {
        position: [0, 4.6, 0],
        scale: [1.5, 1.5, 1.5],
      },
      credit: ''
    },
    textColor: '#D14B67',
  },
} as const

export const defaultCake: ICake = {
  message: 'Happy\nbirthday!',
  scene: ECakeScene.CHOCOLATE,
}

export const cakeAtom = atom<ICake>(defaultCake)

export const cakeMessageAtom = atom((get) => get(cakeAtom).message)

export const cakeTypeAtom = atom((get) => get(cakeAtom).scene)
