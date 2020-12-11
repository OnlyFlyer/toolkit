import React, { useEffect, useCallback, SyntheticEvent, BaseSyntheticEvent } from 'react'

import { WebGWUpload, UploadProps } from '@/modules/upload/src'

export default () => {
  const handleUpload = useCallback(({ target: { files } }: any) => {
    if (files && files.length) {
      WebGWUpload({
        file: files[0]
      }).then(res => {
        console.log('res:', res)
      })
      .catch(err => {
        console.log('err:', err)
      })
    }
  }, [])
  return (<div>
    <div>网关上传:</div>
    <input
      type='file'
      onChange={handleUpload}
    />
    </div>)
}