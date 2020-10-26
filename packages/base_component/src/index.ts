import { Component, useState, useCallback, useEffect } from 'react'

// import { request } from '../libs/request'

var request: any = () => {}

const TOEKN_URL = 'sxc.acp.repeatToken.get'

export default class BaseComponent extends Component {
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

  post = ({ api, headers = {}, ...rest }= {}) => new Promise((resolve, reject) => {
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
          ...(params.headers || {}),
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

export const useAvoidRepeatHook = (justOnce = false) => {
  const [token, setToken] = useState(undefined)
  const [pool, setPool] = useState({})

  const initToken = useCallback(async () => {
    const res = await request({ api: TOEKN_URL })
    setToken(res.token)
  }, [])
  const destroyToken = useCallback(() => {
    setToken(undefined)
  }, [])
  const retryToken = useCallback(() => {
    initToken()
  }, [initToken])
  const post = async (params) =>
    new Promise((resolve, reject) => {
      if (!params.api) return
      if (!pool[params.api]) {
        setPool({ ...pool, [params.api]: { loading: true } })
      } else {
        if (pool[params.api].loading) return
      }
      const p = { ...params }
      if (token) {
        Object.assign(p, {
          headers: {
            ...(params.headers || {}),
            'rp-check-tk': token
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
          setPool({ ...pool, [params.api]: { loading: false } })
          setToken(undefined)
          initToken()
        })
    })
  useEffect(() => {
    initToken()
  }, [initToken])
  return {
    token,
    post,
    destroyToken,
    retryToken,
    pool
  }
}