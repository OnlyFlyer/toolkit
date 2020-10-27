import { Component, useState, useCallback, useEffect, useRef } from 'react'

import { request, RequestProps } from '../../request/src/index'

// var request: any = () => {}

const TOEKN_URL = 'sxc.acp.repeatToken.get'

// export interface AvoidRepeatCompProps {}


export class AvoidRepeatBaseComponent extends Component {
  state = {
    avoidRepeatToken: undefined,
    pool: {}
  }

  justOnce = false

  async initToken() {
    try {
      const { token } = await request({ api: TOEKN_URL })
      this.setState({ avoidRepeatToken: token })
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

  post = ({ api, headers = {}, ...rest }: any) => new Promise((resolve, reject) => {
    const { avoidRepeatToken, pool } = this.state
    if (!api) return
    if (!pool[api]) {
      this.setState({ pool: {...pool, [api]: { loading: true } } })
    } else {
      if (pool[api].loading) return
    }
    const p = { api, ...rest }
    if (avoidRepeatToken) {
      Object.assign(p, {
        headers: {
          ...(headers || {}),
          'rp-check-tk': avoidRepeatToken
        }
      })
    }
    request(p)
      .then((e) => {
        resolve(e)
      })
      .catch((err) => {
        reject(err)
      })
      .finally(() => {
        this.setState({
          ...pool,
          [api]: { loading: false },
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
    try {
      const res = await request({ api: TOEKN_URL })
      tokenRef.current = res.token
    } catch (err) {}
  }, [])

  const destroyToken = useCallback(() => {
    tokenRef.current = undefined
  }, [])

  const retryToken = useCallback(() => {
    initToken()
  }, [initToken])

  const post = async (params: RequestProps) =>
  new Promise((resolve, reject) => {
    if (!params.api) return
    // 如果只允许发起一次请求且已经请求过一次了，直接返回
    if (!!justOnce && requestNumsRef.current >= 1) return
    if (!pool[params.api]) {
      setPool({ ...pool, [params.api]: { loading: true } })
    } else {
      if (pool[params.api].loading) return
    }
    const p = { ...params }
    if (tokenRef.current) {
      Object.assign(p, {
        headers: {
          ...(params.headers || {}),
          'rp-check-tk': tokenRef.current
        }
      })
    }
    request(p)
      .then((data: any) => resolve(data))
      .catch((err: any) => reject(err))
      .finally(() => {
        requestNumsRef.current = requestNumsRef.current + 1
        setPool({ ...pool, [params.api]: { loading: false } })
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