import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'

import { defaultHeaders, defaultLogin, getDefaultQuery, delEmptyString } from './helper'

export interface RequestProps {
  api: string
  path?: string
  query?: any
  headers?: any
  config?: AxiosRequestConfig
}


const customAxios = axios.create({
  timeout: 60000,
  withCredentials: true,
  headers: {
    ...defaultHeaders
  }
})

customAxios.interceptors.response.use(
  ({ data }: AxiosResponse) => {
    const { href } = window.location
    // 图片上传接口返回的是result
    const { success, response, errorResponse = {}, result } = data
    if (success) return response || result
    if (+errorResponse.code === 9100) {
      try {
        const { APP_KEY = '', LOGIN = defaultLogin } = process.env
        window.location.href = `${LOGIN}?appKey=${APP_KEY}&goto_page=${encodeURIComponent(href)}`
      } catch (err) {
      }
      return Promise.reject(errorResponse)
    }
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)


export const request: any = (props: AxiosRequestConfig & RequestProps) => {
  const {
    api: url, path = '/gw/api', method = 'post',
    headers = {}, query = {}, config = {}
  } = props
  let baseURL = path
  try {
    const { GATEWAT } = process.env
    baseURL = `${GATEWAT}${path}`
  } catch (err) {}
  const defaultQuery = getDefaultQuery()
  return customAxios({
    ...props,
    url,
    baseURL,
    method,
    headers: {
      ...defaultHeaders,
      ...headers
    },
    data: {
      ...defaultQuery,
      ...query
    },
    transformRequest: [
      _data => {
        const data = new window.FormData()
        for (const key in _data) {
          if (_data[key] === '') break
          data.append(
            key,
            _data[key] instanceof Object ? JSON.stringify(delEmptyString(_data[key])) : _data[key]
          )
        }
        return data
      }
    ],
    ...config
  })
}