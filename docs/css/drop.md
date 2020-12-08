# CSS3 - filter:drop-shadow

<br>

> ### `filter:drop-shadow`更符合真实世界的投影！
<hr>

<div class="drop-flex">
    <div>
        <img class="drop" src="static/png/joker.png">
        <p>drop-shadow</p>
    </div>
    <div>
        <img class="drop2" src="static/png/joker.png">
        <p>box-shadow</p>
    </div>
</div>


```css
.drop{
    width:110px;
    height:110px;
    filter: drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5));
}
```

```css
.drop2{
    width:110px;
    height:110px;
    box-shadow:0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5);
}
```

?> `box-shadow` 为盒阴影如图所示对于PNG和SVG只能使用到当前的块状元素上是无法做到像`filter: drop-shadow`这样的效果的.

> #### 语法

```css
/* 参数类似于box-shadow */
filter: drop-shadow(x偏移, y偏移, 模糊大小, 色值);
```

!>  `drop-shadow`没有内阴影效果 / `drop-shadow`不能阴影叠加 / IE 孤儿

* #### `box-shadow`支持`inset`内阴影 而 `filter:drop-shadow`不支持

* #### `box-shadow`的阴影效果可以任意累加 而 `filter:drop-shadow`不能

<br>

<hr>

# CSS3 - filter:blur

<br>

> ### `filter:blur`给投影赋予颜色！

<hr>

<div class="blur-box">
    <div>
        <img src="static/png/filter.png">
        <p>box-shadow</p>
    </div>
    <div>
        <div class="blur" style="background-image: url(static/png/filter.png)"></div>
        <p>blur</p>
    </div>
</div>

```HTML
<div class="blur-box">
    <div>
        <img src="static/png/filter.png">
        <p>box-shadow</p>
    </div>
    <div>
        <div class="blur" style="background-image: url(../static/png/filter.png)"></div>
        <p>blur</p>
    </div>
</div>
```

```css
/* box-shadow: */
.blur-box  img{
    width:200px;
    height:200px;
    border-radius: 50%;
    object-fit: cover;
    /* object-position: right top; */
    object-position: center center;
    box-shadow: -1px 2px 14px 0px #019ee0, 3px -3px 11px 0px #eb99f0;

}

/* filter: blur */
.blur{
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #fff;
    background-size: 100% 100%;
    background: 50%/cover no-repeat;
    position: relative;
    
}
.blur:after{
    content: "";
    position: absolute;
    top: 10%;
    left: 0%;
    width: 100%;
    height: 100%;
    background: inherit;
    background-size: 100% 100%;
    border-radius: 50%;
    filter: blur(10px) brightness(80%) opacity(.8);
    z-index: -1;
    /* box-shadow: 0px 2px 8px 2px #c3c3c3; */
}
```

<hr>

# CSS3 - filter:circle

<br>

> ### `filter:circle`不一样的转场动画！

<div class="circle-box">
    <img src="static/png/DeeMo.jpg"/>
</div>


```HTML
<div class="circle-box">
    <img src="static/png/DeeMo.jpg"/>
</div>
```

```css
.circle-box >img{
    width:200px;
    height:200px;
    border-radius: 2;
    animation: clipCircleIn 1s infinite;

}

@keyframes clipCircleIn {
    0%   {
        clip-path: circle(0 at 50% 50%);
    }
    100% {
        clip-path: circle(200px at 50% 50%);
    }    
}
```
> 类似的转场都一样

#### [大佬的转场 😎](https://www.zhangxinxu.com/wordpress/2019/05/css-transfer-animation/?shrink=1)

<style>
/* @import url('static/css/code.css'); */
.drop-flex{
    display:flex;
    justify-content: space-around;
    align-items: center;
}
.drop-flex>div{
    display:flex;
    flex-direction:column;
    align-items: center;
}
.drop-flex>div p{
    font-size:26px;
    font-weight:600;
    font-family: CooperBlaOutConD;
}

.drop{
    width:110px;
    height:110px;
    filter: drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5));
}
.drop2{
    width:110px;
    height:110px;
    box-shadow:0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5);
}
.blur-box{
    display:flex;
    justify-content: space-around;
    align-items: center;
    /* overflow-x: scroll; */
}
.blur-box>div{
    display:flex;
    flex-direction:column;
    align-items: center;
}
.blur-box p{
    font-size:26px;
    font-weight:600;
    font-family: CooperBlaOutConD;
    margin-top:4rem;
}
.blur-box  img{
    width:200px;
    height:200px;
    border-radius: 50%;
    object-fit: cover;
    /* object-position: right top; */
    object-position: center center;
    box-shadow: -1px 2px 14px 0px #019ee0, 3px -3px 11px 0px #eb99f0;

}

.blur{
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #fff;
    background-size: 100% 100%;
    background: 50%/cover no-repeat;
    position: relative;
    
}
.blur:after{
    content: "";
    position: absolute;
    top: 10%;
    left: 0%;
    width: 100%;
    height: 100%;
    background: inherit;
    background-size: 100% 100%;
    border-radius: 50%;
    filter: blur(10px) brightness(80%) opacity(.8);
    z-index: -1;
    /* box-shadow: 0px 2px 8px 2px #c3c3c3; */
}
.circle-box >img{
    width:200px;
    height:200px;
    border-radius: 2;
    animation: clipCircleIn 1s infinite;
}

@keyframes clipCircleIn {
    0%   {
        clip-path: circle(0 at 50% 50%);
    }
    100% {
        clip-path: circle(200px at 50% 50%);
    }
}
</style>