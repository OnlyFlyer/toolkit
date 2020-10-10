import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'

interface RequestProps {
  api: string
  params?: any
  headers?: any
  config?: AxiosRequestConfig
}


const customAxios = axios.create({
  timeout: 60000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

customAxios.interceptors.response.use(
  (val: AxiosResponse) => {
    const { data } = val
    // 图片上传接口返回的是result
    const { success, response, errorResponse = {}, result } = data
    if (success) {
      return response || result
    } else {
      if (+errorResponse.code === 9100) {
        const { APP_KEY, LOGIN } = process.env
        const { href } = window.location
        window.location.href = `${LOGIN}?appKey=${APP_KEY}&goto_page=${encodeURIComponent(href)}`
        return
      }
      return Promise.reject(errorResponse)
    }
  },
  (err: AxiosError) => Promise.reject(err)
)


export const request: any = (props: AxiosRequestConfig & RequestProps) => {
  try {
    console.log('request---1')
    return axios.create(props)
  } catch (err) {
    console.log('err:', err)
    return null
  }
}

request.defaultProps = {
  url: process.env.GATEWAY,
  path: '/gw/api/'
}
// as Partial<AxiosRequestConfig>