### Js 代码的写法与运行速度

<br>

>#### 将一个元素添加到数组的末尾：

```javascript
console.time()
var arr = [1,2,3,4,5];
arr.push(6)
console.log(arr)
console.timeEnd()

// default: 0.409912109375ms

console.time()
var arr2 = [1,2,3,4,5];
arr2[arr2.length] = 6

console.log(arr2)
console.timeEnd()

// default: 0.2548828125ms
```

<!-- <iframe
  src="https://carbon.now.sh/embed?bg=rgba(255%2C31%2C31%2C0)&t=seti&wt=none&l=auto&ds=true&dsyoff=4px&dsblur=21px&wc=true&wa=false&pv=19px&ph=100px&ln=false&fl=1&fm=Hack&fs=18px&lh=175%25&si=false&es=2x&wm=false&code=console.time()%250Avar%2520arr%2520%253D%2520%255B1%252C2%252C3%252C4%252C5%255D%253B%250Aarr.push(6)%250Aconsole.log(arr)%250Aconsole.timeEnd()%250A%250A%252F%252F%2520default%253A%25200.409912109375ms%250A%250Aconsole.time()%250Avar%2520arr2%2520%253D%2520%255B1%252C2%252C3%252C4%252C5%255D%253B%250Aarr2%255Barr2.length%255D%2520%253D%25206%250A%250Aconsole.log(arr2)%250Aconsole.timeEnd()%250A%250A%252F%252F%2520default%253A%25200.2548828125ms"
  style="transform:scale(0.7); width:1024px; height:650px; border:0; overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe> -->

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=446 height=86 src="//music.163.com/outchain/player?type=2&id=418708145&auto=0&height=66"></iframe>


?> 下面的方法明显快一些