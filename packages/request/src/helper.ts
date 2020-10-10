import { v4 as uuidv4 } from 'uuid'

export const defaultLogin = 'https://login.songxiaocai.com'

export const defaultHeaders = {
  // 'Content-type': 'application/x-www-form-urlencoded',
  'Content-Type': 'multipart/form-data'
  // appKey: process.env.APP_KEY
}

export const defaultQuery = {
  appKey: '86683443',
  bizCode: 'devops_login',
  clientSysName: 'mac osx',
  clientSysVersion: 'v1.2.3',
  clientVersion: 'windows',
  deviceUUID: Math.random() * 10e10
}

export const getDefaultQuery = () => {
  // uuidv4()
  const query = { ...defaultQuery }
  try {
    const { APP_KEY, BIZ_CODE } = process.env
    Object.assign(query, {
      appKey: APP_KEY,
      bizCode: BIZ_CODE
    })
  } catch (err) {}
  return query
}