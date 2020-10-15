import { v4 as uuidv4 } from 'uuid'

export const defaultGW: string = 'https://gateway.songxiaocai.com'

export const defaultLogin: string = 'https://login.songxiaocai.com'

export const defaultHeaders = {
  // 'Content-type': 'application/x-www-form-urlencoded',
  'Content-Type': 'multipart/form-data'
}

export const defaultQuery = {
  appKey: '86683443',
  bizCode: 'devops_login',
  clientSysName: 'MAC OSX',
  clientSysVersion: 'v99.99.99',
  clientVersion: 'MAC OSX',
  deviceUUID: Math.ceil(Math.random() * 10e10)
}

export const getDefaultQuery = () => {
  const query = { ...defaultQuery }
  try {
    // 若没有透传就不能用 `const { APP_KEY, BIZ_CODE } = process.env` 解构出来，所以粗暴点直接用
    if (process.env.APP_KEY) {
      Object.assign(query, {
        appKey: process.env.APP_KEY
      })
    }
    if (process.env.BIZ_CODE) {
      Object.assign(query, {
        bizCode: process.env.BIZ_CODE
      })
    }
  } catch (err) {}
  try {
    if (uuidv4()) {
      Object.assign(query, {
        deviceUUID: uuidv4()
      })
    }
  } catch (err) {}
  return query
}

export function delEmptyString(obj: any) {
  for (const key in obj) {
    if (obj[key] === '') delete obj[key]
  }
  return obj
}