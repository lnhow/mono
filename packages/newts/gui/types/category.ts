import Maybe from './common/maybe'

export default interface NwCategory {
  id: string
  attributes: {
    slugUrl?: Maybe<string>
    title?: Maybe<string>
    child_categories?: Maybe<NwCategory[]>
  }
}
