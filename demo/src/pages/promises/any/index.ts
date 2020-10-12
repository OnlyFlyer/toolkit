// zxc -1
export default () => {
  Promise.any([
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({success: 'any 成功'})
      }, 5000)
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject({ error: 'any 失败' })
      }, 2000)
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject({ error: 'any 失败' })
      }, 3000)
    }),
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({success: 'any 成功 1'})
      }, 6000)
    })
  ])
  .then(res => {
    console.log('any res:', res)
  })
  .catch(err=> {
    console.log('any err:', err)
  })
}