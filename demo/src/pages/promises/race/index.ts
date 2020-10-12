// timeout，图片加载超时，超时 abort，提示网络不佳
export default () => {
  Promise.race([new Promise((resolve) => {
    setTimeout(() => {
      resolve({success: 'race 成功'})
    }, 5000)
  }),new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({ error: 'race 失败' })
    }, 2000)
  })]).then(res => {
    console.log('race res:', res)
  }).catch(err=> {
    console.log('race err:', err)
  })
}