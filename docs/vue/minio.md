## Minio 上传/下载

---

- ### 安装依赖 ：

```nodejs
npm install minio
npm install stream
```

```js
let Minio = require("minio");
let stream = require('stream')
```
1. #### [Minio 用于连接Minio对象](http://docs.minio.org.cn/docs/master/javascript-client-quickstart-guide)
2. #### stream 是上传时需要将文件类型转换成可读的流


- ### 创建连接：

```js
var minioClient = new Minio.Client({
    endPoint: endpoint,
    useSSL: false,
    port: parseInt(port),
    accessKey:accessKeyId,
    secretKey: accessKeySecret,
});
```

| 参数   | 描述 |
| ------ | ----- |
| `endPoint` | 对象存储服务的URL  |
| `port`  | TCP/IP端口号。可选值，如果是使用HTTP的话，默认值是80；如果使用HTTPS的话，默认值是443。  |
| `accessKey`   | Access key是唯一标识你的账户的用户ID。 |
| `secretKey`   | Secret key是你账户的密码。 |
| `useSSL`   | true代表使用HTTPS |

#### 注意事项:

1. endPoint 参数在后台返回中可能把HTTP协议和端口都一起完整的给出所以我们要处理只取中间的URL
2. port 是不支持字符串类型的，即便端口正确也会连接失败

`举例：`

```
http://127.0.12138:9527

useSSL: http 即 false
port : int 9527
endPoint : '127.0.12138'
```

- ### 上传部分：

> 上传一个`stream/Buffer`对象。

```js
minioClient.putObject(bucketName, objectName, stream, size, contentType[, callback])
```

| 参数   | 描述 |
| :------: | :----- |
| `bucketName` | 存储桶名称。 |
| `objectName` | 对象名称。 |
| `stream` | 可以读的流。 |
| `size` | 对象的大小（可选） |
| `contentType` | 对象的Content-Type（可选，默认是application/octet-stream）。 |
| `callback(err,etag)` | 如果err不是null则代表有错误，etag _string_是上传的对象的etag值。如果没有传callback的话，则返回一个Promise对象。|



> ##### `objectName` 对象名称 其实是指Minio存储位置的路径 即后台返回要上传的位置 filePath


#### 将文件对象转成流并上传代码片段

```js
let reader = new FileReader();
    reader.readAsDataURL(this.file.fileData);
    reader.onloadend = function (e) {
           const dataurl = e.target.result
           //base64转blob
           const blob = _this.toBlob(dataurl)
           //blob转arrayBuffer
           let reader2 = new FileReader()
           reader2.readAsArrayBuffer(blob)
           reader2.onload = function(ex) {
              //定义流
              let bufferStream = new stream.PassThrough();
              //将buffer写入
              bufferStream.end(new Buffer(ex.target.result));
              //上传
              minioClient.putObject(res.bucketName, res.filePath, bufferStream, _this.file.size, function(err, etag) {
                 if (err == null) {
                    // err 为错误信息,返回null则表示成功了
                    // 由于上传文件到Minio Minio是没有回调 所以需要前端来完成这个操作
                    ...something
                    // 以下代码可以验证上传文件真实性，返回的presignedUrl是可以在浏览器上直接下载的
                    // minioClient.presignedGetObject(res.bucketName, res.filePath, 24*60*60, function(err, presignedUrl) {
                    //   if (err) return console.log(err)
                    //   console.log('presignedUrl',presignedUrl)
                    // })
                  }else{
                    console.log('上传Minio失败');
                  }
                })
              }
          }
```

!> bucketName 存储桶名称虽然是后台返回的但是需要前端进行是否存在的验证后台是没用验证操作的，通过`minioClient.bucketExists` 检验是否存在，如果不存在则使用`minioClient.makeBucket` 新增存储桶再进行上传

```js
toBlob (base64Data) {
      let byteString = base64Data
      if (base64Data.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(base64Data.split(',')[1]) // base64 解码
      } else {
        byteString = unescape(base64Data.split(',')[1])
      }
      // 获取文件类型
      let mimeString = base64Data.split(';')[0].split(":")[1] // mime类型
      // ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区
      // let arrayBuffer = new ArrayBuffer(byteString.length) // 创建缓冲数组
      // let uintArr = new Uint8Array(arrayBuffer)
      let uintArr = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i++) {
        uintArr[i] = byteString.charCodeAt(i)
      }
      // 生成blob
      const blob = new Blob([uintArr], {
        type: mimeString
      })
      // 使用 Blob 创建一个指向类型化数组的URL, URL.createObjectURL是new Blob文件的方法,可以生成一个普通的url,可以直接使用,比如用在img.src上
      return blob
  },
```

!> Minio 上传成功后并不会想OSS那样回调一个方法到后端，所以上传完成的回调需要前端来做

---

### minio下载部分：

下载部分就相对简单了

```js
presignedGetObject(bucketName, objectName, expiry[, cb])
```
| 参数   | 描述 |
| :------ | :----- |
| `bucketName` | 存储桶名称。 |
| `objectName` | 对象名称。 |
| `expiry` | 失效时间（以秒为单位），默认是7天，不得大于七天。 |
| `callback(err,presignedUrl)` | 如果err不是null则代表有错误。presignedUrl就是可用于临时下载的URL。 如果没有传callback的话，则返回一个Promise对象。 |

> 生成一个给HTTP GET请求用的presigned URL。浏览器/移动端的客户端可以用这个URL进行下载，即使其所在的存储桶是私有的。这个presigned URL可以设置一个失效时间，默认值是7天。

```js
minioClient.presignedGetObject(res.bucketName, res.filePath, 24*60*60, function(err, presignedUrl)
```

##### 和上传时创建连接时完全一样的操作再得到令牌和文件对象后连接后通过`minioClient.presignedGetObject`得到下载地址,其实这个完全可以让后端生成后返回给前端省去Minio的连接步骤
