import React, { useCallback, useEffect } from 'react'
import styles from './index.less'

import { request } from '../modules/request/src/index'
import { AvoidRepeatBaseComponent, useAvoidRepeatHook } from '../modules/base_component/src/index'
import FlexWrap from './components/flex_wrap'
import NoWH from './components/no_width_height'
import Flex from './components/flex'
import HalfH from './components/half_h'

import all from './promises/all'
import allSettled from './promises/all_settled'
import any from './promises/any'
import race from './promises/race'
import reject from './promises/reject'
import resolve from './promises/resolve'

import { AvoidRepeat } from './components/base_component/index'

export default () => {
  const init = useCallback(async () => {
    // request({
    //   api: 'songxiaocai.user.acp.getOssToken',
    //   query: {
    //     aa: 'aa',
    //     file: new File(['foo'], 'foo.png'),
    //     blob: new Blob(),
    //     bb: {
    //       bb: 'bb'
    //     }
    //   }
    // })

    // request({
    //   api: 'songxiaocai.user.acp.getOssToken',
    //   query: {
    //     file: new File(['foo'], 'foo.png'),
    //     blob: new Blob(),
    //     queryDTO: {
    //       aa: 'aa',
    //       bb: {
    //         bb: 'bb'
    //       }
    //     }
    //   }
    // })

    // request({
    //   api: 'songxiaocai.user.acp.getOssToken',
    //   path: '/',
    //   query: {
    //     queryDTO: {
    //       aa: 'aa',
    //       bb: {
    //         bb: 'bb'
    //       }
    //     }
    //   }
    // })

    // request({
    //   config: {
    //     url: 'https://www.baidu.com/getOssToken'
    //   },
    //   query: {
    //     queryDTO: {
    //       aa: 'aa',
    //       bb: {
    //         bb: 'bb'
    //       }
    //     }
    //   }
    // })
    // request({
    //   config: {
    //     url: 'https://www.baidu.com/getOssToken',
    //     data: {aa: '呵呵'}
    //   }
    // })
    try {
      const res = await Promise.allSettled([
        request({
          api: 'songxiaocai.devops.AppProvider.queryClient',
          query: {
            queryDTO: {
              types: [1,2,3,4]
            }
          }
        }),
        request({ api: '/api/demo', query: { a: {a1: 11, a2: 22}, b: [1,2,3], c: 123, d: new File(['foo'], 'foo.png'), e: new Blob() } }),
        request({ api: 'songxiaocai.user.getById' }),
        request({ api: 'image', path: '/upload/' }),
        request({ api: 'songxiaocai.user.acp.getOssToken' })
      ])
      console.log('res:', res)
    } catch (err) {
      console.log('err:', err)
    }
  }, [])
  async function _upload (fileList: any) {
    try {
      // const ossConfig = await request({ api: 'songxiaocai.user.acp.getOssToken' })
      const aaaa = await Promise.all(fileList.map((file: any) => {
        console.log('file:', file)
        console.log('file type:', file instanceof File)
        return request({ api: 'image', path: '/upload/', query: { image: file, token: generateToken() } })
      }))
      console.log('aaaa:', aaaa)
    } catch (err) {
      console.log('aaaaa err:', err)
    }
  }
  function dropFn(e: any) {
    e.preventDefault()
    // const ossConfig = await request({ api: 'songxiaocai.user.acp.getOssToken' })
    const files = Array.from(e.dataTransfer.files)
    // const items = Array.from(e.dataTransfer.items)
    console.log('drop:', e)
    // console.log('ossConfig:', ossConfig)
    console.log('files:', files)
    _upload(files)
    // console.log('items:', items)
  }
  useEffect(() => {
    init()
    // any()
    // race()
    // all()
    // allSettled()
    // resolve()
    // reject()
    document.querySelector('#upload')?.addEventListener('drop', dropFn, false)
    return document.querySelector('#upload')?.removeEventListener('paste', dropFn, false)
  }, [init])
  const { post } = useAvoidRepeatHook({ justOnce: false })

  const handleRepeat = useCallback(async () => {
    try {
      console.log('哈哈:')
      await post({ api: 'sxc.supplychain.workbench.material.createMaterialOperate', query: {
        createDTO: {"type":1,"operateTime":1603266431514,"detailDTOList":[{"materialId":2,"amount":"12","price":"23"},{"materialId":4,"amount":"23","price":"123"}]}
      } })
    } catch (err) {
      console.log('防重复错误拉:', err)
    }
  }, [])
  return (
    <div>
      <input id='text' />
      <textarea id='upload' draggable />
      <AvoidRepeat />
      <h1 className={styles.title} onClick={handleRepeat}>按钮1</h1>
      <BtnTwo />
      <BtnThree />
      <HalfH />
      <hr />
      <Flex />
      <hr />
      <FlexWrap />
      <hr />
      <NoWH />
      <hr />
    </div>
  );
}

export function encode(timestamp: any, appKey: any) {
  let last = ''
  for (let i = 0; i < timestamp.length; i++) {
    let index = timestamp.charAt(i)
    if (i - 1 < appKey.length && i > 0) {
      const r = parseInt(appKey[i - 1]) % 2
      if (r > 0) {
        index = timestamp.charAt(i) ^ 0x1
      }
    }
    last += index
  }
  return last
}

export const generateToken = (appKey?: any) => {
  const _appKey = 86683443
  const timestamp = Date.now() + ''
  const reverseAppKey = (_appKey + '')
    .split('')
    .reverse()
    .join('')
  return encode(timestamp, reverseAppKey)
}

export const BtnTwo = () => {
  const { post } = useAvoidRepeatHook({ justOnce: false })
  const handleRepeat = useCallback(async () => {
    try {
      console.log('按钮2:')
      await post({ api: 'sxc.supplychain.workbench.material.createMaterialOperate', query: {
        createDTO: {"type":1,"operateTime":1603266431514,"detailDTOList":[{"materialId":2,"amount":"12","price":"23"},{"materialId":4,"amount":"23","price":"123"}]}
      } })
    } catch (err) {
      console.log('防重复按钮2错误了:', err)
    }
  }, [])
  return <h1 className={styles.title} onClick={handleRepeat}>按钮2</h1>
}

export const BtnThree = () => {
  const { post } = useAvoidRepeatHook({ justOnce: true })
  const handleRepeat = useCallback(async () => {
    try {
      console.log('按钮3:')
      await post({ api: 'sxc.supplychain.workbench.material.createMaterialOperate', query: {
        createDTO: {"type":1,"operateTime":1603266431514,"detailDTOList":[{"materialId":2,"amount":"12","price":"23"},{"materialId":4,"amount":"23","price":"123"}]}
      } })
    } catch (err) {
      console.log('防重复按钮3错误了:', err)
    }
  }, [])
  return <h1 className={styles.title} onClick={handleRepeat}>按钮3</h1>
}