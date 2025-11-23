import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

export async function sleep(delay: number = 500) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}
