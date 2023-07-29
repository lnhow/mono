import axios from 'axios'

const strapi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_API
})

export default strapi