export default () => {
  Promise.reject({error: 'reject error'})
  .catch((err) => {
    console.log('reject 1:', err)
    return {err}
  })
  .then((val) => {
    console.log('reject resolve 1:', val)
    return {val}
  })
  // .then((val) => {
  //   console.log('reject resolve 2:', val)
  //   return {val}
  // })
  .catch(err => {
    console.log('reject 2:', err)
    return {err}
  })
  .catch(err => {
    console.log('reject 3:', err)
  })
  .finally(() => {
    console.log('reject finally')
  })
}