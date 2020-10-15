import { defineConfig } from 'umi'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  define: {
    "process.env.GATEWAY": "https://gateway.songxiaocai.com",
    "process.env.LOGIN": "https://login.songxiaocai.com",
    "process.env.APP_KEY": "12345678",
    "process.env.BIZ_CODE": "biz_code"
  },
  // layout: {},
  routes: [
    { path: '/', component: '@/pages/index' },
  ]
})