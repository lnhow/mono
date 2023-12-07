import NwCategory from './category'
import Maybe from './common/maybe'
import NwImage from './image'

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
