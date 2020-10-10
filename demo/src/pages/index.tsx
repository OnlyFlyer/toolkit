import React, { useCallback, useEffect } from 'react'
import styles from './index.less'

import { request } from '../modules/request/src'

export default () => {
  // console.log('process:', process)
  // console.log('env:', process.env)
  const init = useCallback(async () => {
    try {
      const res = await request({ api: '/aa' })
      console.log('res:', res)
    } catch (err) {
      console.log('err:', err)
    }
  }, [])
  useEffect(() => {
    init()
  }, [init])
  return (
    <div>
      <h1 className={styles.title}>Page index哈哈</h1>
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