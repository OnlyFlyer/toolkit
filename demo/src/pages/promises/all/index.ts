export default () => {
    // 多请求结果合并、失败处理，多请求都满足条件， &&,串联
  Promise.all([new Promise((resolve) => {
    setTimeout(() => {
      resolve({success: 'all 成功'})
    }, 5000)
  }),new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({ error: 'all 失败' })
    }, 2000)
  })]).then(res => {
    console.log('all res:', res)
  }).catch(err=> {
    console.log('all err:', err)
  })
}