/* ========================================================
 *
 *  if (typeof navigator.serviceWorker !== 'undefined') {
 *      navigator.serviceWorker.register('sw.js')
 *  }
 *
 *            author by  Nidhogg·D·Joking
 *
 *  --------------------------------------------------------
 *
 *      serviceWorker 封装完毕：
 *  
 *      const RUNTIME = ''  
 *      CacheStorage => Cache '存储名'
 *
 *      const HOSTNAME_WHITELIST = [] 
 *      [需要存储数据的URL名单]
 *
 * ========================================================== */

const RUNTIME = 'eternal'

const HOSTNAME_WHITELIST = [
  self.location.hostname
]

// The Util Function to hack URLs of intercepted requests
const getFixedUrl = (req) => {
  var now = Date.now()
  var url = new URL(req.url)

  // 1. fixed http URL
  // Just keep syncing with location.protocol
  // fetch(httpURL) belongs to active mixed content.
  // And fetch(httpRequest) is not supported yet.

  url.protocol = self.location.protocol

  // 2. add query for caching-busting. 为缓存破坏添加查询。
  // Github Pages served with Cache-Control: max-age=600
  // max-age on mutable content is error-prone, with SW life of bugs can even extend.
  // Until cache mode of Fetch API landed, we have to workaround cache-busting with query string.
  // Cache-Control-Bug: https://bugs.chromium.org/p/chromium/issues/detail?id=453190
  
  if (url.hostname === self.location.hostname) {
    url.search += (url.search ? '&' : '?') + 'cache-bust=' + now
  }
  return url.href
}

/**
 *  @Lifecycle Activate
 *  New one activated when old isnt being used. 旧的不用的时候激活新的。
 *
 *  waitUntil(): activating ====> activated
 */
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

/**
 *  @Functional Fetch
 *  All network requests are being intercepted here. 所有的网络请求都在这里被拦截。
 *
 *  void respondWith(Promise<Response> r)
 */
self.addEventListener('fetch', event => {
  // Skip some of cross-origin requests, like those for Google Analytics.
  if (HOSTNAME_WHITELIST.indexOf(new URL(event.request.url).hostname) > -1) {

    // Stale-while-revalidate
    // similar to HTTP's stale-while-revalidate: https://www.mnot.net/blog/2007/12/12/stale
    // Upgrade from Jake's to Surma's: https://gist.github.com/surma/eb441223daaedf880801ad80006389f1

    const cached = caches.match(event.request)
    const fixedUrl = getFixedUrl(event.request)
    const fetched = fetch(fixedUrl, { cache: 'no-store' })
    const fetchedCopy = fetched.then(resp => resp.clone())

    // Call respondWith() with whatever we get first.
    // If the fetch fails (e.g disconnected), wait for the cache.
    //? 如果获取失败（例如断开连接），请等待缓存。 
    // If there’s nothing in cache, wait for the fetch.
    //? 如果缓存中没有任何内容，请等待获取。
    // If neither yields a response, return offline pages.
    //? 如果两者都不产生响应，则返回脱机页

    event.respondWith(
      Promise.race([fetched.catch(_ => cached), cached])
        .then(resp => resp || fetched)
        .catch(_ => { /* eat any errors */ })
    )

    // Update the cache with the version we fetched (only for ok status)
    event.waitUntil(
      Promise.all([fetchedCopy, caches.open(RUNTIME)])
        .then(([response, cache]) => response.ok && cache.put(event.request, response))
        .catch(_ => { /* eat any errors */ })
    )
  }
})
