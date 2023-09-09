import axios from 'axios'

const appHttp = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_API
})

export default appHttp