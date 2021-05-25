## 图片相关

---

> ## picture


```html
<picture>
  <source media="(min-width: 1050px)" srcset="static/joker/7.png">
  <source media="(min-width: 850px)" srcset="static/joker/9.png">
  <source media="(min-width: 680px)" srcset="static/joker/10.png">
  <source media="(min-width: 450px)" srcset="static/joker/3.png">
  <img src="static/joker/2.png"  style="width:auto;">
</picture>
```

<picture>
  <source media="(min-width: 1050px)" srcset="static/joker/7.png">
  <source media="(min-width: 850px)" srcset="static/joker/9.png">
  <source media="(min-width: 680px)" srcset="static/joker/10.png">
  <source media="(min-width: 450px)" srcset="static/joker/3.png">
  <img src="static/joker/2.png"  style="width:auto;">
</picture>


?>  通过浏览器窗口宽度变化`picture`加载对应的图片,可以运用到响应式布局


> ## map

```html
<img src="static/joker/6.png" width="600" height="352" alt="Planets" usemap="#planetmap">

<map name="planetmap">
  <area shape="rect" coords="0,0,200,352" alt="Lender" href="#/css/fit" target="_blank">
  <area shape="rect" coords="200,0,350,352" alt="Kasey" href="#/css/clip" target="_blank">
  <area shape="rect" coords="360,0,550,352" alt="Adoif" href="#/css/filter" target="_blank">
</map>
```

<img src="static/joker/6.png" width="600" height="352" alt="Planets" usemap="#planetmap">

<map name="planetmap">
  <area shape="rect" coords="0,0,200,352" alt="Lender" href="#/css/fit" target="_blank">
  <area shape="rect" coords="200,0,350,352" alt="Kasey" href="#/css/clip" target="_blank">
  <area shape="rect" coords="360,0,550,352" alt="Adoif" href="#/css/filter" target="_blank">
</map>

?> 用于相对较大的图片分隔区域进行对应的点击事件,此处将这3个人所在区域分隔采取不同的点击事件


##### `area > shape` 属性：

<div class="event-loop-flex">

| 值   | 描述  |
| :----- | :----- |
| `x1,y1,x2,y2` | 如果 `shape` 属性设置为 `rect`，则该值规定矩形左上角和右下角的坐标。  |
| `x,y,radius`   | 如果 shape 属性设置为 `circ`，则该值规定圆心的坐标和半径。  |
| `x1,y1,x2,y2,..,xn,yn`   | 如果 `shape` 属性设置为 `poly`，则该值规定多边形各顶点的值。如果第一个坐标和最后一个坐标不一致，那么为了关闭多边形，浏览器必须添加最后一对坐标。 |

</div>


## HTML <img> loading 属性

```html
<img src="static/joker/11.png" alt="Eva">
 
<!-- 设置延迟加载的图片 -->
<img src="static/joker/4.png" alt="Inori" loading="lazy">
```

<img src="static/joker/11.png" alt="Eva">

<br>
 
<!-- 设置延迟加载的图片 -->
<img src="static/joker/4.png" alt="Inori" loading="lazy">

?> 感觉不太使用 谷歌得77以上版本才开始兼容，目前还是`IntersectionObserver`更好

#### [IntersectionObserver 延迟加载](js/intersection)

<script>

</script>

<style>
/* @import url('static/css/code2.css'); */
.event-loop-flex{
    display:flex;
    justify-content: flex-start;
}
.event-loop-flex table{
    width:80%;
}
</style>