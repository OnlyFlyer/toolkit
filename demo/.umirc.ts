import { defineConfig } from 'umi'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  define: {
    // 'process.env.GATEWAY': 'https://gateway.songxiaocai.com',
    "process.env": {
      // 不透传所有的 process.env，有些变量不用我们知道，而且全部透传的话很多变量，不便于寻找自己所需变量
      // ...process.env,
      NODE_ENV: process.env.NODE_ENV,
      GATEWAY: 'https://gateway.songxiaocai.com',
      LOGIN: 'https://login.songxiaocai.com'
      // APP_KEY: '12345678',
      // BIZ_CODE: 'biz_code'
    }
  },
  // layout: {},
  routes: [
    { path: '/', component: '@/pages/index' },
  ]
})