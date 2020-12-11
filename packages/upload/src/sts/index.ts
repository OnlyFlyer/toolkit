import { request } from '../../../request/src/web'
import { UploadProps } from '../gateway';

import { fetchOssTokenByBucketTypeForWeb, getPolicyBase64, getRandomFilename, getSignature } from '../helper'

// sts 前端上传的方法


// false
// 0: sxc-item, 1:sxc-base, 2:sxc-base-oneday(可不传，默认为sxc-item)
export interface OssConfigProps {
  bucketType?: string
}

// 通过 BucketType 获取 ossToken，可选择上传的文件夹，默认为 sxc-item 文件夹
export const fetchOssTokenByBucketType: <T = any>(props: OssConfigProps) => Promise<T> = (props: OssConfigProps) => new Promise((resolve, reject) => {
  return request({
    api: 'songxiaocai.user.acp.getOssTokenByDTO',
    query: {
      queryDTO: { ...props }
    }
  })
})

// web应用前端 文件上传
export const WebSTSUpload: <T = any>(props: UploadProps) => Promise<T> = (props: UploadProps) =>
  new Promise((resolve, reject) => {
    const { file } = props
    const { bucketType } = props.data as { bucketType: string }
    fetchOssTokenByBucketTypeForWeb({ bucketType })
      .then(({ securityToken, accessKeyId, accessKeySecret, objectName, expireTimestamp, bucketName, endPoint }) => {
        const dir = objectName + '/item/'
        const key = getRandomFilename(dir, 'img.png')
        const policyBase64 = getPolicyBase64(expireTimestamp)
        const signature = getSignature(policyBase64, accessKeySecret)
        const url = `https://${bucketName}.${endPoint.split('//').slice(-1)[0]}`
        request({
          api: '',
          query: {
            key,
            policy: policyBase64,
            OSSAccessKeyId: accessKeyId,
            success_action_status: '200',
            Signature: signature,
            'x-oss-security-token': securityToken,
            file
          },
          config: {
            baseURL: url
          }
        }).then(res => {
          console.log('res:', res)
          console.log('url+key:', `${url}${key}`)
        })
        .catch(err => {
          console.log('上传错误了:', err)
          reject(err)
        })

      })
      .catch(err => {
        console.log('获取 ossToken 错误:', err)
        reject(err)
      })
  });

// 小程序前端 文件上传
export const MiniSTSUpload: <T = any>(
  props: UploadProps,
) => Promise<T> = ({}) => new Promise((resolve, reject) => {});

// APP前端  文件上传
export const AppSTSUpload: <T = any>(props: UploadProps) => Promise<T> = ({}) =>
  new Promise((resolve, reject) => {});