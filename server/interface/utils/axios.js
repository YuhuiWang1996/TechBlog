import axios from 'axios'

const instance = axios.create({
  baseURL: `http://${process.env.HOST||'0.0.0.0'}:${process.env.PORT||80}`,
  timeout: 2000,
  headers: {

  }
})

export default instance
