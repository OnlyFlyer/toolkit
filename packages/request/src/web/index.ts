import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { defaultHeaders, defaultLogin, getDefaultQuery, defaultGW, delEmptyString, specialFileType } from '../helper'

export interface RequestProps extends AxiosRequestConfig {
  api: string
  path?: string
  query?: any
  headers?: any
  config?: AxiosRequestConfig
}

export const request: (props: RequestProps) => {} = (props: RequestProps) => {
  const {
    api, path = '/gw/api', method = 'post',
    headers = {}, query = {}, config = {}
  } = props
  let baseURL = path
  try {
    const _url = process.env.GATEWAY || defaultGW
    baseURL = `${_url}${path}`
  } catch (err) {}
  const defaultQuery = getDefaultQuery()
  return axios({
    ...props,
    url: api,
    timeout: 60000,
    withCredentials: true,
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
          let value = _data[key]
          if (_data[key] instanceof Object) {
            if (!specialFileType.includes(_data[key].constructor.name)) {
              value = JSON.stringify(delEmptyString(_data[key]))
            }
          }
          data.append(key, value)
        }
        return data
      }
    ],
    ...config
  }).then(({ data }: AxiosResponse) => {
    const { href } = window.location
    // 图片上传接口返回的是result
    const { success, response, errorResponse = {}, result } = data
    if (success) return response || result
    if (+errorResponse.code === 9100) {
      try {
        const { appKey } = defaultQuery
        const _appKey = process.env.APP_KEY || appKey
        const _login = process.env.LOGIN || defaultLogin
        window.location.href = `${_login}?appKey=${_appKey}&goto_page=${encodeURIComponent(href)}`
        return
      } catch (err) {
        return Promise.reject(errorResponse)
      }
    }
    return Promise.reject(errorResponse)
  })
}