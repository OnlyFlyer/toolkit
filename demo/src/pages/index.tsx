import React, { useCallback, useEffect } from 'react'
import styles from './index.less'

import { request } from '../modules/request/src/index'
import FlexWrap from './components/flex_wrap'
import NoWH from './components/no_width_height'
import Flex from './components/flex'

import all from './promises/all'
import allSettled from './promises/all_settled'
import any from './promises/any'
import race from './promises/race'
import reject from './promises/reject'
import resolve from './promises/resolve'

export default () => {
  console.log('process:', process.env)
  const init = useCallback(async () => {
    try {
      const res = await request({
        api: 'songxiaocai.devops.AppProvider.queryClient',
        url: 'gw/api/',
        method: 'post',
        query: {
          queryDTO: {
            types: [1,2,3,4]
          }
        }
      })
      console.log('res:', res)
    } catch (err) {
      console.log('err:', err)
    }
  }, [])
  useEffect(() => {
    init()
    // race()
    // all()
    // allSettled()
    // any()
    // resolve()
    // reject()
  }, [init])
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
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

// const sleep = (t: number, data?: any) => new Promise((resolve) => {
//   setTimeout(() => {
//     resolve(data || {})
//   }, t)
// })

// export interface RequestProps {
//   api: string
//   query?: any
//   headers?: any
//   config?: any
// }

// const request = async (props: RequestProps) => {
//   await sleep(3000, { aa: 'bb' })
//   return props
// }