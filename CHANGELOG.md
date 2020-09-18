---
order: 2
title: 更新日志
timeline: true
toc: false
---

### [类型描述]

| 图标 | 描述                   |
| ---- | ---------------------- |
| 🔥   | 新增模块或者页面       |
| 🌟   | 旧模块或者页面新增功能 |
| 🐞   | BUG 修复               |
| 💄   | 样式调整               |
| 🗑    | 删除代码               |
| 📖   | 文档调整               |
| ⚡️  | 重构代码               |

## TODO

> 入参和返回值都要定义类型，而且不能是 any

### 0.1.1-alpha.17

`2020-09-02`

- 🐞 修复 `Fingerprint2` error

### 0.1.1-alpha.4 - 0.1.1-alpha.16

`2020-07-07 - 2020-0708`

- 🐞 修复小程序引入报错问题（原因：小程序全局没有 window 对象，FromData 对象）
- 🔥 新增小程序上传方法 `MiniProgramUpload`, 用法见 `CHANGELOG`

### 0.1.1-alpha.4

`2020-06-23`

- 🐞 三方包不打进 dist 里面，单独引入，解决路径 error 问题

### 0.1.1-alpha.3

`2020-06-23`

- 🐞 路径问题
- 🌟 使用 terser plugin 压缩包体积

### 0.1.1-alpha.2

`2020-06-23`

- 🌟 增加 node-polyfills plugin

### 0.1.1-alpha.1

`2020-06-23`

- 🐞 路径问题
- 🌟 删除 user-agent 包, 放到本地 utils/ua.js 里

### 0.1.1-alpha.0

`2020-06-23`

- 🔥 upload 第一版