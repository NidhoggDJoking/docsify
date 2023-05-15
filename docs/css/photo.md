# 图片相关CSS

---

## CSS  mask-image

<br>

<div class="mask-bg"></div>

<br>

 ` mask-image 为一张遮罩层 png 文件`



```css
/* <div class="mask-bg"></div> */
.mask-bg{
    width: 396px;
    height: 122px;
    mask-image: url(static/joker/joking1.png);
    -webkit-mask-image: url(static/joker/joking1.png);
    background-image: linear-gradient(353deg,#89C027,#89C027 11%,#E96036 26%,#E96036 41%,#FEF158 74%,#FEF158 66%,#76C5EE 79%);
    background-image: -webkit-linear-gradient(353deg,#89C027,#89C027 11%,#E96036 26%,#E96036 41%,#FEF158 74%,#FEF158 66%,#76C5EE 79%);
    background-image: -moz-linear-gradient(353deg,#89C027,#89C027 11%,#E96036 26%,#E96036 41%,#FEF158 74%,#FEF158 66%,#76C5EE 79%);
}
```


<div class="switch-box" >
    <div class="switch">
        <input type="checkbox" checked id="mask-image" style="display: none" />
        <label for="mask-image">
            <div></div>
        </label>
    </div>
    <span>加入动画</span>
</div>

```css
/* 添加 mask-add 类 */
.mask-add{
    animation: color 3s infinite;
    background-size: 200% 100%;
}

@keyframes color{
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -100% 0;
    }
}
```



!> 区分 `-webkit-background-clip: text ` 对应的字体截切原理类似不过图片使用 ` mask-image `

#### [更多 Mask 相关属性](css/mask)

---

> ## picture `适合响应式`


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


> ## map `大图的分区点击响应`

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

| 值                     | 描述                                                                                                                                             |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `x1,y1,x2,y2`          | 如果 `shape` 属性设置为 `rect`，则该值规定矩形左上角和右下角的坐标。                                                                             |
| `x,y,radius`           | 如果 shape 属性设置为 `circ`，则该值规定圆心的坐标和半径。                                                                                       |
| `x1,y1,x2,y2,..,xn,yn` | 如果 `shape` 属性设置为 `poly`，则该值规定多边形各顶点的值。如果第一个坐标和最后一个坐标不一致，那么为了关闭多边形，浏览器必须添加最后一对坐标。 |

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
const btn =  document.querySelector("#mask-image");
btn.addEventListener("click", e => {
    $(".mask-bg").toggleClass("mask-add");
});
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

.mask-bg{
    mask-image: url(static/joker/joking1.png);
    -webkit-mask-image: url(static/joker/joking1.png);
    /* position: absolute; */
    width: 396px;
    height: 122px;
    background-image: linear-gradient(353deg,#89C027,#89C027 11%,#E96036 26%,#E96036 41%,#FEF158 74%,#FEF158 66%,#76C5EE 79%);
    background-image: -webkit-linear-gradient(353deg,#89C027,#89C027 11%,#E96036 26%,#E96036 41%,#FEF158 74%,#FEF158 66%,#76C5EE 79%);
    background-image: -moz-linear-gradient(353deg,#89C027,#89C027 11%,#E96036 26%,#E96036 41%,#FEF158 74%,#FEF158 66%,#76C5EE 79%);
}

.mask-add{
    animation: color 3s infinite;
    background-size: 200% 100%;
}

@keyframes color{
        0%{
            background-position: 0 0;
        }
        100%{
            background-position: -100% 0;
        }
}

/* 按钮开始 */

.switch-box{
    display:flex;
    align-items:center;
}
.switch-box>span{
    font-size:20px;
    font-family: 'Comic Sans MS', cursive;
    margin-left:10px;
    padding: 10px;
}
.switch>label {
  display: flex;
  border-radius: 99px;
  height: 32px;
  width: 64px;
  background-color: #3ce7b8;
  border: 1px solid #3ce7b8;
  justify-content: flex-end;
}

.switch>input[type=checkbox]:checked+label {
  background-color: #f9f9f9;
  border: 1px solid #c5c5c5;
  justify-content: flex-start;
}

.switch>label>div {
  border-radius: 9999px;
  width: 32px;
  background-color: #FFF;
  border: 1px solid rgba(0, 0, 0, .1);
}

.switch>input[type=checkbox]:checked+label>div {
  border: 1px solid rgba(156, 156, 156, 0.3);
}
/* 按钮结束 */
</style>