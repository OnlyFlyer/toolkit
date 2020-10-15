import { defineConfig } from 'umi'

export default defineConfig({
  define: {
    "process.env.GATEWAY": "https://gateway.songxiaocai.org",
    "process.env.LOGIN": "https://login.songxiaocai.org"
  }
})