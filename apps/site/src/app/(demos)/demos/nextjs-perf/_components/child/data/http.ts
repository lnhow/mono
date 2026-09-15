import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  () =>
    Promise.resolve({
      data: {
        banner: {
          main: {
            desktop: [
              {
                id: 1,
                title: 'Demo Banner',
                content: 'NextJS Performance Demo',
                imageUrl:
                  'https://placehold.co/1920x270/4d895c/d1d5db?text=Demo',
                linkUrl: '#',
              },
            ],
            mobile: [
              {
                id: 1,
                title: 'Demo Banner',
                content: 'NextJS Performance Demo',
                imageUrl:
                  'https://placehold.co/640x270/4d895c/d1d5db?text=Demo',
                linkUrl: '#',
              },
            ],
          },
        },
        subBanner: {
          id: 1,
          title: 'Sub Banner',
          description: 'Sub banner description',
          isNew: false,
          rating: 5,
          thumbnailUrl: 'https://placehold.co/640x270/4d895c/d1d5db?text=Sub',
        },
        hashTags: ['Performance', 'NextJS', 'Cache', 'React'],
        timeLines: [],
        newNavis: [],
        recommends: [],
        newProducts: [],
        prProducts: [],
      },
    }),
)

export default apiClient;

export async function sleep(delay: number = 500) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}
