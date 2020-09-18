## @sxc/upload-toolkit


## desc

日常开发中涉及到上传图片的场景比较多, 因此将其封装成统一的包, 主要是为了统一方法, 方便管理, 统一迭代, 目前支持两种方式, 1. [STS(Security Token Service)](https://help.aliyun.com/document_detail/32077.html?spm=a2c4g.11186623.6.1356.46ac69fbCFfRF0) 请求 , 2. 通过网关请求, 服务端上传图片, 后续还会接入 `非 STS` 的方式上传, 主要是用于 `nodejs` 中使用, [打包工具: rollup](https://www.rollupjs.com/), 有 `cjs`、`umd`、`es` 三种格式的压缩包, 源码在 `src` 目录下

**注:** 另外暴露了 `request` 和 `fetchOssConfig` 两个方法, `request` 是简单封装的请求方法, 还不成熟, 暂时不要用, `fetchOssConfig` 是网关调用, 获取 `oss` 的配置项, 如 `objectName`、`expireTimestamp`、`accessKeySecret`、`accessKeyId`、`securityToken`、`bucketName`...

## 安装

```JavaScript

$ npm i @sxc/upload-toolkit

$ npm install @sxc/upload-toolkit

$ yarn add @sxc/upload-toolkit


```


## 使用


```JavaScript

import { STSUpload, GWUpload, MiniProgramUpload } from '@sxc/upload-toolkit'
// --- Web

// STS
file => STSUpload({ file })

// 网关
file => GWUpload({ file })

// --- 微信小程序

// 微信小程序
filePath => MiniProgramUpload({ file: filePath }, { host: '', path: '', api: '' }, reqData)

// 注: 因为小程序未使用统一的框架，导致注入的(GATEWAT_HOST、GATEWAY_PATH、appKey、bizCode、clientVersion...)等变量不一致，因此可能需要手动传入，host、path、api 通过第二个参数以对象形式传入，其他额外的信息通过第三个参数通过对象的方式传入

// 另外, host 兜底为: https://gateway.songxiaocai.com，path 兜底为: /gw/api/
```

## 贡献


@willing、@Frank、@chibang