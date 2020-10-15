## formData 总结

> `FormData` 接口提供了一种表示表单数据的键值对 key/value 的构造方式，并且可以轻松的将数据通过 `XMLHttpRequest.send()` 方法发送出去，本接口和此方法都相当简单直接。如果送出时的编码类型被设为 "multipart/form-data"，它会使用和表单一样的格式。

---

## append() 值的注意的点

1. 参数支持三个,

现在很多时候，表单提交都通过 `formData` 这种方式来传值，就涉及到转换

1. 第一种


```JavaScript
  data: {
    ...defaultQuery,
    ...query
  },
  transformRequest: [
    _data => {
      const data = new window.FormData()
      for (const key in _data) {
        if (_data[key] === '') break
        data.append(
          key,
          _data[key]
        )
      }
      return data
    }
  ]

```
 instanceof Object ? JSON.stringify(delEmptyString(_data[key])) : _data[key]

以上是最初是