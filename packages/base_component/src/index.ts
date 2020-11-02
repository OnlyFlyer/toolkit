import { Component, useState, useCallback, useEffect, useRef } from 'react'

import { request, RequestProps } from '../../request/src/index'

const TOEKN_URL = 'get token api'

export interface AvoidRepeatCompState {
  avoidRepeatToken: string | undefined
  pool: any
  fetchTokenNums: number
}

export class AvoidRepeatBaseComponent extends Component {
  state: AvoidRepeatCompState = {
    avoidRepeatToken: undefined,
    pool: {},
    fetchTokenNums: 0
  }

  public justOnce = false

  async initToken() {
    const { fetchTokenNums } = this.state
    const { justOnce } = this
    // 如果只允许发起一次请求且已经请求过一次了，直接返回，不再获取 token
    if (!!justOnce && fetchTokenNums >= 1) return
    try {
      const { token } = await request({ api: TOEKN_URL })
      this.setState({
        avoidRepeatToken: token,
        fetchTokenNums: fetchTokenNums + 1
      })
    } catch(err) {}
  }

  retryToken() {
    this.initToken()
  }

  destroyToken() {
    this.setState({ avoidRepeatToken: undefined })
  }

  componentDidMount() {
    this.initToken()
  }

  post = ({
    api,
    headers = {},
    ...rest
  }: RequestProps) => new Promise((resolve, reject) => {
    const { avoidRepeatToken, pool } = this.state
    if (!api) return
    if (!pool[api]) {
      this.setState({
        pool: { ...pool, [api]: { loading: true } }
      })
    } else {
      if (pool[api].loading) return
    }
    const p = { api, ...rest }
    if (avoidRepeatToken) {
      Object.assign(p, {
        headers: { ...(headers || {}), 'rp-check-tk': avoidRepeatToken }
      })
    }
    request(p)
      .then((data: any) => resolve(data))
      .catch((err: any) => reject(err))
      .finally(() => {
        this.setState({
          pool: {
            ...pool,
            [api]: { loading: false },
          },
          avoidRepeatToken: undefined
        }, () => {
          this.initToken()
        })
      })
  })
}

export interface AvoidRepeatHookProps {
  justOnce?: boolean
}

export const useAvoidRepeatHook = (p: AvoidRepeatHookProps) => {
  const tokenRef = useRef<string | undefined>(undefined)
  const requestNumsRef = useRef<number>(0)
  const [pool, setPool] = useState<any>({})

  const { justOnce = false } = p

  const initToken = useCallback(async () => {
    // 如果只允许发起一次请求且已经请求过一次了，直接返回，不再获取 token
    if (!!justOnce && requestNumsRef.current >= 1) return
    try {
      const res = await request({ api: TOEKN_URL })
      tokenRef.current = res.token
      requestNumsRef.current = requestNumsRef.current + 1
    } catch (err) {}
  }, [])

  const destroyToken = useCallback(() => {
    tokenRef.current = undefined
  }, [])

  const retryToken = useCallback(() => {
    initToken()
  }, [initToken])

  const post = async ({
    api,
    headers = {},
    ...rest
  }: RequestProps) => new Promise((resolve, reject) => {
    if (!api) return
    if (!pool[api]) {
      setPool({ ...pool, [api]: { loading: true } })
    } else {
      if (pool[api].loading) return
    }
    const p = { api, ...rest }
    if (tokenRef.current) {
      Object.assign(p, {
        headers: { ...(headers || {}), 'rp-check-tk': tokenRef.current }
      })
    }
    request(p)
      .then((data: any) => resolve(data))
      .catch((err: any) => reject(err))
      .finally(() => {
        setPool({ ...pool, [api]: { loading: false } })
        tokenRef.current = undefined
        if (!!justOnce) return
        initToken()
      })
  })
  useEffect(() => {
    initToken()
  }, [initToken])
  return {
    token: tokenRef.current,
    post,
    destroyToken,
    retryToken,
    pool
  }
}