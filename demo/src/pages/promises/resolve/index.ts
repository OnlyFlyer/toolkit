export default () => {
  Promise.resolve({success: 'resolve success'})
  .then((val) => {
    console.log('resolve 1:', val)
    return {val}
  })
  .then((val) => {
    console.log('resolve 2:', val)
    return {val}
  })
  .finally(() => {
    console.log('finally')
  })
}