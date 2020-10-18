## formData 总结

> `FormData` 接口提供了一种表示表单数据的键值对 key/value 的构造方式，并且可以轻松的将数据通过 `XMLHttpRequest.send()` 方法发送出去，本接口和此方法都相当简单直接。如果送出时的编码类型被设为 "multipart/form-data"，它会使用和表单一样的格式。

---

## append() 值的注意的点

1. 参数支持三个，前两个参数分别对应 `key`、`value`，但是 `value` 传值是有要求的，只支持 `String`、`Blob`、`File` 三种类型的值，若不是这三种类型，会强制转换为 `String` 类型的参数，当我们日常使用的时候碰到对象的传值都会 `JSON.stringify` 一下，这里有稍微注意一下，当传递文件的时候， `JSON.stringify` 之后会变成 `{}`，原本要传递的文件就不复存在了，因此，只有在

2. 第一种


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