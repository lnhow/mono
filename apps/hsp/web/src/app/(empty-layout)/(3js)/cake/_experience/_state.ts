import { atom } from 'jotai'
import { ECakeScene } from './_const'

export interface ICake {
  message: string
  scene: ECakeScene
  edit: boolean
}

export const defaultCake: ICake = {
  message: 'Happy\nbirthday!',
  scene: ECakeScene.VANILLA,
  edit: false,
}

export const cakeAtom = atom<ICake>(defaultCake)

export const cakeMessageAtom = atom((get) => get(cakeAtom).message)

export const cakeSceneAtom = atom((get) => get(cakeAtom).scene)

export * from './_const'
