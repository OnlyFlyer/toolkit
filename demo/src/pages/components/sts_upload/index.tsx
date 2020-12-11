import React, { useEffect, useCallback, SyntheticEvent, BaseSyntheticEvent } from 'react'

import { WebGWUpload, UploadProps, WebSTSUpload } from '@/modules/upload/src'

export default () => {
  const handleUpload = useCallback(({ target: { files } }: any) => {
    if (files && files.length) {
      WebSTSUpload({
        file: files[0],
        data: {
          bucketType: '1'
        }
      }).then(res => {
        console.log('res:', res)
      })
      .catch(err => {
        console.log('err:', err)
      })
    }
  }, [])
  return (<div>
    <div>STS 前端上传:</div>
    <input
      type='file'
      onChange={handleUpload}
    />
    </div>)
}