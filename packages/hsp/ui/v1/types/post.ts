import type NwCategory from './category'
import type Maybe from './common/maybe'
import type NwImage from './image'

export default interface NwPost {
  id: string
  attributes: {
    title?: Maybe<string>
    description?: Maybe<string>
    slugUrl?: Maybe<string>
    category?: Maybe<NwCategory>
    cover?: Maybe<NwImage>
    publishedAt?: Maybe<string>
    content?: Maybe<string>
  }
}
