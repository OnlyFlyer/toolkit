import { v4 as uuidv4 } from 'uuid'

export const defaultGW = 'https://gateway.songxiaocai.com'

export const defaultLogin = 'https://login.songxiaocai.com'

export const defaultHeaders = {
  // 'Content-type': 'application/x-www-form-urlencoded',
  'Content-Type': 'multipart/form-data'
  // appKey: process.env.APP_KEY
}

export const defaultQuery = {
  appKey: '86683443',
  bizCode: 'devops_login',
  clientSysName: 'MAC OSX',
  clientSysVersion: 'v99.99.99',
  clientVersion: 'windows',
  deviceUUID: Math.ceil(Math.random() * 10e10)
}

export const getDefaultQuery = () => {
  const query = { ...defaultQuery }
  try {
    const { APP_KEY, BIZ_CODE } = process.env
    Object.assign(query, {
      appKey: APP_KEY,
      bizCode: BIZ_CODE
    })
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