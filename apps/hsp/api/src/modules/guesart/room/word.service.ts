import { ERoomTheme } from './room.type'
import animals from 'src/../storage/words/animals.json'
import everydayObjects from 'src/../storage/words/everyday_objects.json'
import food from 'src/../storage/words/food.json'
import fruits from 'src/../storage/words/fruits.json'
import vehicle from 'src/../storage/words/vehicles.json'

export type TWord = {
  word: string
  imageUrl?: string
}

export default class WordService {
  public static words: {
    [key in ERoomTheme]: TWord[]
  } = {
    [ERoomTheme.ANIMALS]: animals,
    [ERoomTheme.EVERYDAY_OBJECTS]: everydayObjects,
    [ERoomTheme.FOOD]: food,
    [ERoomTheme.FRUITS]: fruits,
    [ERoomTheme.VEHICLES]: vehicle,
  }

  public static getRandomWord(
    theme: ERoomTheme,
    filter: string[],
  ): {
    word: string
    wordImg?: string
  } {
    const themeWords = this.words[theme]
    const word = RandomService.getRandomArray(themeWords, (word) => {
      if (!filter.length) return true
      return !filter.includes(word.word)
    })

    return {
      word: word.word,
      wordImg: word.imageUrl,
    }
  }

  public static obstructWord(word: string): string {
    return '*'.repeat(word.length)
  }

  public static unobstructWord(word: string, refString: string) {
    const wordArr = word.split('').map((char, i) => {
      return refString.at(i) === char ? char : '*'
    })

    return wordArr.join('')
  }
}

export class RandomService {
  public static getRandomArray<T>(
    arr: T[],
    filter: Parameters<Array<T>['filter']>[0],
  ): T {
    const filteredArr = arr.filter(filter)
    // If all words are filtered, return a random word from the original array
    const randomArr = filteredArr.length > 0 ? filteredArr : arr
    const randomIndex = Math.floor(Math.random() * randomArr.length)

    return randomArr[randomIndex]
  }
}
