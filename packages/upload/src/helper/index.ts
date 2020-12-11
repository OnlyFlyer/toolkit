import { request } from '../../../request/src/web'
import { getDefaultQuery } from '../../../request/src/helper'

import { _keyStr, UTF8Encode, encode as base64encode } from './base64'
import Crypto from './crypto'

// false
// 0: sxc-item, 1:sxc-base, 2:sxc-base-oneday(可不传，默认为sxc-item)
export interface OssConfigQuery {
  bucketType?: string
}
export interface OssConfig {
  accessKeyId: string
  accessKeySecret: string
  bucketName: string
  endPoint: string
  expireTimestamp: string
  intervalTimeStamp: string
  objectName: string
  securityToken: string
  timestamp: string
//   accessKeyId: "STS.NUxJq54P78jJnSYxXJpRC8MFn"
// accessKeySecret: "5FDkA7v1hrHPCq2fiQ6LoVKsjGAZiXoP3oStsNmvV2ad"
// bucketName: "sxc-base"
// endPoint: "http://oss-cn-hangzhou.aliyuncs.com"
// expireTimestamp: "1607672914000"
// intervalTimeStamp: "900000"
// objectName: "focus"
// securityToken: "CAIS+AF1q6Ft5B2yfSjIr5bNAcuB2Y8Wj6ihbHXonFgffN1v14jtjDz2IHFLeHltB+kZs/Q1lGhX5vcelqVoRoReREvCKM1565kPH61ejQeH6aKP9rUhpMCPOwr6UmzWvqL7Z+H+U6muGJOEYEzFkSle2KbzcS7YMXWuLZyOj+wMDL1VJH7aCwBLH9BLPABvhdYHPH/KT5aXPwXtn3DbATgD2GM+qxsmufvjn5TEukaP1w2gl7dInemrfMj4NfsLFYxkTtK40NZxcqf8yyNK43BIjvwn0/AUpGme4YzNWQkJvEXXb/Cx7cduMAJ+YKwrAalAoeh9TS2aax8R/BqAAUYdUbqGrhGV4JiTB6476OSSZk11iYX2nM56xLqI7N+T6k/UnJhZDhwPXRno13kK8HyS5NJdDmsRrTsls1KJbi0B3r62caVADinlU2OrkBjn2PQBM1vC2Vry7F2c3WgiWvl67brbkEr8fQagNQxDx/isva3ohVm82z4XQge1uwIu"
// timestamp: "1607669314834"
}

// 通过 BucketType 获取 ossToken，可选择上传的文件夹，默认为 sxc-item 文件夹
export const fetchOssTokenByBucketTypeForWeb: <T = OssConfig>(props: OssConfigQuery) => Promise<T> = (props: OssConfigQuery) => request({
  api: 'songxiaocai.user.acp.getOssTokenByDTO',
  query: {
    queryDTO: { ...props }
  }
})

// 根据 时间戳和appKey 返回加密后的字符串
export const encode = (timestamp: any, appKey: string) => {
  let last = '';
  for (let i = 0; i < timestamp.length; i++) {
    let index = timestamp.charAt(i);
    if (i - 1 < appKey.length && i > 0) {
      const r = parseInt(appKey[i - 1]) % 2;
      if (r > 0) {
        index = timestamp.charAt(i) ^ 0x1;
      }
    }
    last += index;
  }
  return last;
};

// 加密appKey
export const generateToken = (appKey?: string) => {
  let _appKey = '';
  try {
    if (appKey) {
      _appKey = appKey;
    } else {
      _appKey = getDefaultQuery().appKey;
    }
  } catch (err) {
    _appKey = getDefaultQuery().appKey;
  }
  const timestamp = Date.now() + '';
  const reverseAppKey = (_appKey + '')
    .split('')
    .reverse()
    .join('');
  return encode(timestamp, reverseAppKey);
};

export function getPolicyBase64 (expireTimestamp: string) {
  const date = new Date(+expireTimestamp).toISOString()
  const policyText = {
    expiration: date, // 设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    conditions: [
      ['content-length-range', 1, 1048576000] // 设置上传文件的大小限制
    ]
  }
  const policyBase64 = base64encode(JSON.stringify(policyText))

  return policyBase64
}

export function getSignature (policyBase64: string, AccessKeySecret: string) {
  const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, AccessKeySecret, {
    asBytes: true
  })

  const signature = Crypto.util.bytesToBase64(bytes)

  return signature
}

export function getRandomFilename (dir: string, filename: string = 'aa.bb') {
  const pos = filename.lastIndexOf('.')
  let suffix = ''
  let name = ''
  if (pos !== -1) {
    suffix = filename.substring(pos)
    name = filename.substring(0, pos)
  }
  return `${dir}${name}_${Date.now()}${suffix}`
}

// // 简单判断是否为微信小程序环境(同步)
// export const hasWechatMiniProgramSync: () => boolean = () => {
//   try {
//     if (wx) return true;
//     return false;
//   } catch (err) {
//     return false;
//   }
// };

// 判断是否为微信小程序环境(异步)
export const hasWechatMiniProgramAsync: () => Promise<boolean> = () =>
  new Promise((resolve, reject) => {
    if (
      navigator &&
      navigator.userAgent &&
      navigator.userAgent.toLowerCase().indexOf('micromessenger') === -1
    ) {
      // 不在微信或小程序中
      resolve(false);
    } else {
      // @ts-ignore
      wx.miniProgram.getEnv((res: any) => {
        if (!res.miniprogram) {
          // 在微信中
          resolve(false);
        } else {
          // 在微信小程序中
          resolve(true);
        }
      });
    }
  });

// 判断是否为 web 环境
export const hasWeb = () => {};

// 判断是否为 APP 环境
export const hasAPP = () => {};