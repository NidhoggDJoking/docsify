# 理论性知识

---

> ####  http 都有哪些状态码？

- ##### `200` 成功
- ##### `301` 重定向
- ##### `304` (未修改) 自从上次请求后，请求的网页未修改过。 服务器返回此响应时，不会返回网页内容。
- ##### `400` (错误请求) 服务器不理解请求的语法。
- ##### `403` (禁止) 服务器拒绝请求。
- ##### `404` (未找到) 服务器找不到请求的网页。
- ##### `500` (服务器内部错误) 服务器遇到错误，无法完成请求。
- ##### `501` (尚未实施) 服务器不具备完成请求的功能。 例如，服务器无法识别请求方法时可能会返回此代码。
- ##### `502` (错误网关) 服务器作为网关或代理，从上游服务器收到无效响应。
- ##### `503` (服务不可用) 服务器目前无法使用(由于超载或停机维护)。 通常，这只是暂时状态。
- ##### `504` (网关超时) 服务器作为网关或代理，但是没有及时从上游服务器收到请求。
- ##### `505` (HTTP 版本不受支持) 服务器不支持请求中所用的 HTTP 协议版本。


<!-- [八股文去Vitepree看]() -->