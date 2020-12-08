### VUE中使用百度地图

<br>

?> Vue项目传统引用是在`index.html`文件添加js文件路径,但在项目中不是所有模块都需要百度的JS的,可以按需加载优化性能

> ##### 百度地图JS引用方法 :

```javascript
// 异步加载百度地图报更加实用
export default function loadBMap(ak) {
  return new Promise(function(resolve, reject) {
    if (typeof BMap !== 'undefined') {
      resolve(BMap)
      return true
    }
    window.onBMapCallback = function() {
      resolve(BMap)
    }
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src =
      '//api.map.baidu.com/api?v=3.0&ak=' + ak + '&callback=onBMapCallback'
    script.onerror = reject
    document.head.appendChild(script)
  })
}

// V3 版本是兼容V2的 主要是主题兼容

// 此处考虑到HTTPS协议的拦截先不写上协议，百度地图可以自动识别改变成HTTP或HTTPS

```

> ##### 百度地图JS使用方法 :

```javascript
import loadBMap from "@/???/loadBMap.js"; //?异步加载百度地图报

// 使用
loadBMap("你的AK").then(() => {
        //   你的代码
        this.myMap = new BMap.Map("allmap", { minZoom: 11, maxZoom: 14 }); // 创建Map实例并限制缩放大小
        var point = new BMap.Point(112, 26);
        this.myMap.centerAndZoom(point, 12); // 初始化地图,设置中心点坐标和地图级别
        ....
    }).catch((err) => {
            console.log("百度地图加载失败:", err);
    });
```


!> 在前端项目中我个人不推荐实用 `vue-baidu-map` 这一类的地图插件：文档随意，案例很少，无法在网上找到解决办法。


图片位深度对覆盖物是否影响

<style>
@import url('static/css/code2.css');
</style>