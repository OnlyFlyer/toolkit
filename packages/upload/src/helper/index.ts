import { getDefaultQuery } from '@/request/helper';

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

// 简单判断是否为微信小程序环境(同步)
export const hasWechatMiniProgramSync: () => boolean = () => {
  try {
    if (wx) return true;
    return false;
  } catch (err) {
    return false;
  }
};

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
