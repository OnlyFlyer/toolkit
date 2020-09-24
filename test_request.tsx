import axios, { AxiosRequestConfig } from 'axios'

// export interface RequestProps {
//   url?: string
//   path?: string
//   method?: string
//   params?: any
//   headers?: any
//   config?: any
// }

export const request: any = (props: AxiosRequestConfig) => {
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
} as Partial<AxiosRequestConfig>

// request readme README