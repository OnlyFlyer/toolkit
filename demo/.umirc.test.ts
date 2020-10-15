import { defineConfig } from 'umi'

export default defineConfig({
  define: {
    'process.env': {
      GATEWAY: "https://gateway.songxiaocai.net",
      LOGIN: "https://login.songxiaocai.net"
    }
  }
})