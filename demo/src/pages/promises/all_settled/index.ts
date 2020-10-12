export default () => {
  // 并联 ||，各个结果没有强相关，1.爬虫，2. 请求时某一个请求的失败不会影响的其他接口返回的影响，从而影响页面渲染，过滤失败的结果即可
  // [{ status: 'success', value: '成功' }, { status: 'error', reason: '失败' }]
  Promise.allSettled([
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({success: 'allSettled 成功'})
      }, 5000)
    }),
    new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({ error: 'allSettled 失败' })
    }, 2000)
    })
  ])
  .then(res => {
    console.log('allSettled res:', res)
  })
  .catch(err=> {
    console.log('allSettled err:', err)
  })
}