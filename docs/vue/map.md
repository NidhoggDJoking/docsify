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


!> 在前端项目中我个人不推荐实用 `vue-baidu-map` 这个地图插件：文档随意，功能不全，案例很少，出现问题无法在网上找到解决办法，最好还是使用以上方法js配合原生写法。


!> 图片位深度对覆盖物产生了影响


<br>

### 从2021年回来补充

---

###  [MapVGL](http://lbsyun.baidu.com/solutions/mapvdata) 

#### 👇

####  [示例中心](http://lbsyun.baidu.com/jsdemo.htm#a1_2)

> MapVGL，是一款基于WebGL的地理信息可视化库，可以用来展示大量基于3D的地理信息点线面数据。设计初衷主要是为了解决大数据量的三维地理数据展示问题及一些炫酷的三维效果。

### `产品简介:`

> 百度地图JavaScript API GL v1.0是一套由JavaScript语言编写的应用程序接口，可帮助您在网站中构建功能丰富、交互性强的地图应用，支持PC端和移动端基于浏览器的地图应用开发，且支持HTML5特性的地图开发。百度地图JavaScript API`支持HTTP和HTTPS`，`免费对外开放`，可直接使用。`接口使用无次数限制`。在使用前，您需先申请密钥（ak）才可使用。在您使用百度地图JavaScript API之前，请先阅读百度地图API使用条款。任何非营利性应用请直接使用，商业应用请参考使用须知。JavaScript API GL使用了WebGL对地图、覆盖物等进行渲染，支持3D视角展示地图。 `GL版本接口基本向下兼容`，迁移成本低。目前v1.0版本支持了基本的3D地图展示、基本地图控件和覆盖物。

```bash
$ npm i mapvgl
```

<br>

#### 类似如下的原生的写法，不像`vue-baidu-map`那样随意封装 👍 (推荐使用)


```javascript
// 1. 创建地图实例
var bmapgl = new BMapGL.Map('map_container');
var point = new BMapGL.Point(116.403748, 39.915055);
bmapgl.centerAndZoom(point, 17);

// 2. 创建MapVGL图层管理器
var view = new mapvgl.View({
    map: bmapgl
});

// 3. 创建可视化图层，并添加到图层管理器中
var layer = new mapvgl.PointLayer({
    color: 'rgba(50, 50, 200, 1)',
    blend: 'lighter',
    size: 2
});
view.addLayer(layer);

// 4. 准备好规范化坐标数据
var data = [{
    geometry: {
        type: 'Point',
        coordinates: [116.403748, 39.915055]
    }
}];

// 5. 关联图层与数据，享受震撼的可视化效果
layer.setData(data);
```


---

### `实际操作代码`

> 将生成的地图对象通过vue的this属性使得全局使用

```javascript
    mounted() {
        // this.oldinit(); // 放弃index.html 加载模式,采用动态加载判断
        loadBMap("pG81aHGjuCF1tuLqMZvebqaykwE3RSot")
            .then(() => {
                // 百度地图API功能
                this.myMap = new BMap.Map("allmap", {
                    minZoom: 11,
                    maxZoom: 14
                }); // 创建Map实例并限制缩放大小
                var point = new BMap.Point(113.76024666806232,25.5562378897174);
                this.myMap.centerAndZoom(point, 12); // 初始化地图,设置中心点坐标和地图级别

                // 这个才是V3版本虽然结尾有V2字样
                this.myMap.setMapStyleV2({
                    styleId: "270a785157180de9752e222fc40edb51",
                });
                // this.myMap.setMapStyle({
                //   styleId: 'faa46429b3c5affc4e04a1a41d488510'
                // });
                this.myMap.enableScrollWheelZoom(true); // PC鼠标滑动

                // this.getCityPlus(); // 获取用户当前位置信息
                this.getBoundary(this.myMap); // 区域划分
                this.addMapOverlay(this.myMap); // 覆盖物
                // this.addMarker(point, this.myMap);
                this.addMarkerNew(point, this.myMap);
                this.menu(this.myMap);
                // 添加自定义控件
                // this.initSearchControl()
                // 搜索功能
                // this.initSearchControlNew();
                // this.selectControl();
                this.boxControl();
            })
            .catch((err) => {
                console.log("百度地图加载失败:", err);
            });
    },
    methods: {
      // 初始化自定义控件
        initSearchControl() {
            var _this = this;
            var SearchControl = function () {
                this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
                this.defaultOffset = new BMap.Size(10, 10);
            };
            SearchControl.prototype = new BMap.Control();
            SearchControl.prototype.initialize = function (map) {
                var div = document.createElement("div");
                var tit = document.createTextNode("搜索功能");
                div.appendChild(tit);
                div.id = "super";
                div.style.cursor = "pointer";
                div.style.border = "1px solid #79aeff";
                div.style.backgroundColor = "#2288fe";
                div.style.color = "#ececec";
                div.style.borderRadius = "28px";
                div.style.padding = "5px 20px 5px 20px";
                div.style.boxShadow = "1px 2px 5px 1px #b8d9ff";
                _this.myMap.getContainer().appendChild(div);
                return div;
            };
            var myZoomCtrl = new SearchControl();
            this.myMap.addControl(myZoomCtrl);
        },
    }
```

<style>
@import url('static/css/code2.css');
</style>