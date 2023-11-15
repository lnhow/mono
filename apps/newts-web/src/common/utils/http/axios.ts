import axios from 'axios'

const appHttp = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST}/api/newts`
})

export default appHttp