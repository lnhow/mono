import { queryClient } from '@/data/graphql/queryClient'
import { cache } from 'react'

import {
  FeaturedPostsDocument,
  FeaturedPostsQuery,
  FeaturedPostsQueryVariables,
} from '@/data/graphql/_generated/graphql'

export const getFeaturedPosts = cache((skip = 0, limit = 3) => {
  const gqlClient = queryClient.GraphQL()
  return gqlClient.request<FeaturedPostsQuery, FeaturedPostsQueryVariables>({
    document: FeaturedPostsDocument,
    variables: { skip, limit },
  })
})

// import NwPost from '@newts/ui/types/post'
// import NwCategory from '@newts/ui/types/category'

// export const mapPostsToNwPost: NwPost = (posts: FeaturedPostsQuery) => {
//   return posts.posts?.data.map((post) => {
//     const attributes = post.attributes
//     return {
//       id: post.id,
//       attributes: {
//         ...(post.attributes),
//         category: {
//           data: {
//             id: attributes?.category?.data?.id,
//             attributes: {
//               ...(post.attributes.category?.data?.attributes),
//             },
//           },
//         },
//         cover: {
//           data: {
//             attributes: {
//               ...(post.attributes.cover?.data?.attributes),
//             },
//           },
//         },
//       },
//     }
//   }) || []
// }
