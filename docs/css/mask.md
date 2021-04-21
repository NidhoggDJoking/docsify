## CSS MASK  

?> 顾名思义，mask 译为遮罩。在 CSS 中，mask 属性允许使用者通过遮罩或者裁切特定区域的图片的方式来隐藏一个元素的部分或者全部可见区域。

!>`MASK` 属于一个比较冷门的属性 兼容性还不太行 很多属性处于实验阶段  `-webkit-mask-image` 📌 **[兼容性查看](https://caniuse.com/#search=mask)** / **[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Masking)**

<br>

#### 基础语法 :

```css
{
    /* Image values */
    mask: url(mask.png);                   /* 使用位图来做遮罩 */
    mask: url(masks.svg#star);             /* 使用 SVG 图形中的形状来做遮罩 */
}

```

##### `除了图片，mask 还可以接受一个类似 background 的参数，也就是渐变`

```css
{
    mask: linear-gradient(#000, transparent)      /* 使用渐变来做遮罩 */
}

```

<div class="mask1"></div>


##### `具体使用:`

```css
{
    background: url(static/png/Raven.jpg) no-repeat;
    mask: linear-gradient(90deg, transparent, #fff);
}

```

<hr>

#### mask 实现图片切角遮罩

<div class="mask2"></div>


##### `上图代码如下:`

```css
.mask2{
    width: 600px;
    height: 33vh;
    margin: auto;
    background: url(static/png/Yasso.jpg) no-repeat;
    background-size: cover;
    mask:
    linear-gradient(135deg, transparent 10px, #fff 0)
    top left,
    linear-gradient(-135deg, transparent 10px, #fff 0)
    top right,
    linear-gradient(-45deg, transparent 10px, #fff 0)
    bottom right,
    linear-gradient(45deg, transparent 10px, #fff 0)
    bottom left;
    mask-size: 50% 50%;
    mask-repeat: no-repeat;
    -webkit-mask:
    linear-gradient(135deg, transparent 10px, #fff 0)
    top left,
    linear-gradient(-135deg, transparent 10px, #fff 0)
    top right,
    linear-gradient(-45deg, transparent 10px, #fff 0)
    bottom right,
    linear-gradient(45deg, transparent 10px, #fff 0)
    bottom left;
    -webkit-mask-size: 50% 50%;
    -webkit-mask-repeat: no-repeat;
}
```

<br>

#### 多张图片下使用 `mask`

<br>

<div class="mask4"></div>

##### `上图代码如下:`

```css
.mask4{
    margin: auto;
    position: relative;
    width: 38vw;
    height: 35vh;
    background: url(static/png/Raven.jpg) no-repeat;
    background-size: cover;
}
.mask4:before {
    position: absolute;
    content: "";
    top: 0;left: 0; right: 0;bottom: 0;
    background: url(static/png/Yasso.jpg) no-repeat;
    background-size: cover;
    mask: linear-gradient(45deg, #000 50%, transparent 50%);
    -webkit-mask-image: linear-gradient(45deg, #000 50%, transparent 50%);
    z-index: 1;
}
```

<div class="mask5"></div>


##### `稍微修改 ：`

```css
{
- mask: linear-gradient(45deg, #000 50%, transparent 50%)
+ mask: linear-gradient(45deg, #000 40%, transparent 60%)
}

```

<hr>

### MASK 进行转场动画

<br>

<div class="mask3"></div>

```css
.mask3{
    width: 33vw;
    height: 33vh;
    margin: 0 auto;
    background: url(static/png/Raven.jpg) no-repeat;;
    animation: maskRotate 3s cubic-bezier(0.56, 0.94, 0.6, 0.96);
    animation-iteration-count:infinite;
}

@keyframes {
  0% {
    mask: linear-gradient(45deg, #000 0%, transparent 5%, transparent 5%);
    -webkit-mask: linear-gradient(45deg, #000 0%, transparent 5%, transparent 1%);
  }
  1% {
    mask: linear-gradient(45deg, #000 1%, transparent 6%, transparent 6%);
    -webkit-mask: linear-gradient(45deg, #000 1%, transparent 6%, transparent 6%);
  }
  ...
  100% {
    mask: linear-gradient(45deg, #000 100%, transparent 105%, transparent 105%);
    -webkit-mask: linear-gradient(45deg, #000 100%, transparent 105%, transparent 105%);
  }
}

```

!> CSS3 `animation` 涉及到 `linear-gradient` 光写头部尾部是无法做到平滑运动的得靠多写,<br>
因为CSS3的 `gradient` 渐变属性是被当成背景图片来看的你觉得CSS3现在能做到图片渐变吗


<div class="mask6"></div>


```css
.mask6{
    width: 600px;
    height: 33vh;
    margin: 0 auto;
    position: relative;
    background: url(static/png/Raven.jpg) no-repeat;
}
.mask6:before {
    position: absolute;
    content: "";
    top: 0;left: 0; right: 0;bottom: 0;
    background: url(static/png/Yasso.jpg) no-repeat;
    animation: maskRotate 3s ease-in-out;
    animation-iteration-count:infinite;
    animation-direction:alternate;
}
```
`动画效果手写代码过长 通常我们可以借助 SASS/LESS 等预处理器进行操作`


```css
@keyframes maskRotate {
    @for $i from 0 through 100 { 
        #{$i}% {
            mask: linear-gradient(45deg, #000 #{$i + '%'}, transparent #{$i + 5 + '%'}, transparent 1%);
        }
    }
}

```

> #### 或使用 &nbsp;[Sass to CSS](https://www.sassmeister.com)&nbsp; 工具生成

<hr>

#### 使用角向渐变 `mask: conic-gradient()` 进行切换

<br>

<div class="mask7"></div>

```css
@keyframes maskRotate {
    @for $i from 0 through 100 { 
        #{$i}% {
            mask: conic-gradient(#000 #{$i - 10 + '%'}, transparent #{$i + '%'}, transparent);
        }
    }
}
```

```css
.mask7{
    width: 600px;
    height: 33vh;
    margin: 0 auto;
    background: url(static/png/Raven.jpg) no-repeat;
    animation: maskRotate2 3s cubic-bezier(0.56, 0.94, 0.6, 0.96);
    animation-iteration-count:infinite;
}
```

##### `拓展 One： `

<div class="mask8"></div>

> #### 将原基础的放在伪类上 `mask8` 元素只起到作为底图的作用

```css
.mask8{
    margin: auto;
    position: relative;
    width: 600px;
    height: 33vh;
    background: url(static/png/Raven.jpg) no-repeat;
    background-size: cover;
}
.mask8:before {
    position: absolute;
    content: "";
    top: 0;left: 0%; right: 0;bottom: 0;
    background: url(static/png/Yasso.jpg) no-repeat;
    background-size: cover;
    animation: maskRotate2 3s cubic-bezier(0.56, 0.94, 0.6, 0.96);
    animation-iteration-count:infinite;
    z-index: 1;
}

@keyframes maskRotate2 {
    0% {
    mask: conic-gradient(#000 -10%, transparent 0%, transparent);
    -webkit-mask: conic-gradient(#000 -10%, transparent 0%, transparent);
  }
  1% {
    mask: conic-gradient(#000 -9%, transparent 1%, transparent);
    -webkit-mask: conic-gradient(#000 -9%, transparent 1%, transparent);
  }
  2% {
    mask: conic-gradient(#000 -8%, transparent 2%, transparent);
    -webkit-mask: conic-gradient(#000 -8%, transparent 2%, transparent);
  }
  ...
  99% {
    mask: conic-gradient(#000 89%, transparent 99%, transparent);
    -webkit-mask: conic-gradient(#000 89%, transparent 99%, transparent);
  }
  100% {
    mask: conic-gradient(#000 90%, transparent 100%, transparent);
    -webkit-mask: conic-gradient(#000 90%, transparent 100%, transparent);
  }
}
```

##### `拓展 Two：`

<div class="mask9"></div>

<br>

> #### 原型 `mask4` 加入 `animation` 不断变换deg

```css
.mask9{
    margin: auto;
    position: relative;
    width: 600px;
    height: 33vh;
    background: url(static/png/Raven.jpg) no-repeat;
    background-size: cover;
}
.mask9:before {
    position: absolute;
    content: "";
    top: 0;left: 0%; right: 0;bottom: 0;
    background: url(static/png/Yasso.jpg) no-repeat;
    background-size: cover;
    mask: linear-gradient(0deg, #000 45%, transparent 55%);
    -webkit-mask-image: linear-gradient(0deg, #000 45%, transparent 55%);
    animation: maskXuan 3s ease;
    animation-iteration-count:infinite;
    z-index: 1;
}

/* Less */
@keyframes maskXuan {
    @for $i from 0 through 100 { 
         #{$i}% {
            mask: linear-gradient(#{$i*3.6}deg, #000000e6 45%, #00000021 55%);
            -webkit-mask: linear-gradient(#{$i*3.6}deg, #000000e6 45%, #00000021 55%);
        }
    }
}
```

##### `拓展 Three：`

<div class="mask12"></div>

<br>

> #### 原型 `mask4` 更改 `mask` 渐变的透明度从而改变两张图片的透明度
> 
```css
.mask12{
    margin: auto;
    position: relative;
    width: 600px;
    height: 33vh;
    background: url(static/png/Raven.jpg) no-repeat;
    background-size: cover;
}
.mask12:before {
    position: absolute;
    content: "";
    top: 0;left: 0%; right: 0;bottom: 0;
    background: url(static/png/Yasso.jpg) no-repeat;
    background-size: cover;
    /* 前一个颜色后一个颜色的透明度决定2张图片的透明度*/
    mask: linear-gradient(158deg, #0000009e 45%, #0000007a 55%);
    -webkit-mask-image: linear-gradient(158deg, #0000009e 45%, #0000007a 55%);
    z-index: 1;
}
```
<hr>

### mask 与图片


<br>

<!-- <div class="mask-box">
<div class="mask11">
</div>
<div class="mask10">
</div>
</div> -->

<br>


<style>
.mask1{
    width: 600px;
    height: 35vh;
    margin: auto;
    background: url(static/png/Raven.jpg) no-repeat;
    mask: linear-gradient(90deg, transparent, #fff);
    -webkit-mask-image: linear-gradient(90deg, transparent, #fff);
}
.mask2{
    width: 600px;
    height: 33vh;
    margin: auto;
    background: url(static/png/Yasso.jpg) no-repeat;
    background-size: cover;
    mask:
    linear-gradient(135deg, transparent 10px, #fff 0)
    top left,
    linear-gradient(-135deg, transparent 10px, #fff 0)
    top right,
    linear-gradient(-45deg, transparent 10px, #fff 0)
    bottom right,
    linear-gradient(45deg, transparent 10px, #fff 0)
    bottom left;
    mask-size: 50% 50%;
    mask-repeat: no-repeat;
    -webkit-mask:
    linear-gradient(135deg, transparent 10px, #fff 0)
    top left,
    linear-gradient(-135deg, transparent 10px, #fff 0)
    top right,
    linear-gradient(-45deg, transparent 10px, #fff 0)
    bottom right,
    linear-gradient(45deg, transparent 10px, #fff 0)
    bottom left;
    -webkit-mask-size: 50% 50%;
    -webkit-mask-repeat: no-repeat;
}

.mask4{
    margin: auto;
    position: relative;
    width: 600px;
    height: 33vh;
    background: url(static/png/Raven.jpg) no-repeat;
    background-size: cover;
}
.mask4:before {
    position: absolute;
    content: "";
    top: 0;left: -10%; right: 0;bottom: 0;
    background: url(static/png/Yasso.jpg) no-repeat;
    background-size: cover;
    mask: linear-gradient(45deg, #000 50%, transparent 50%);
    -webkit-mask-image: linear-gradient(45deg, #000 50%, transparent 50%);
    z-index: 1;
}
.mask5{
    margin: auto;
    position: relative;
    width: 600px;
    height: 33vh;
    background: url(static/png/Raven.jpg) no-repeat;
    background-size: cover;
}
.mask5:before {
    position: absolute;
    content: "";
    top: 0;left: -10%; right: 0;bottom: 0;
    background: url(static/png/Yasso.jpg) no-repeat;
    background-size: cover;
    mask: linear-gradient(45deg, #000 40%, transparent 60%);
    -webkit-mask-image: linear-gradient(45deg, #000 40%, transparent 60%);
    z-index: 1;
}

.mask3{
    width: 600px;
    height: 33vh;
    margin: 0 auto;
    background: url(static/png/Raven.jpg) no-repeat;
    animation: maskRotate 3s cubic-bezier(0.56, 0.94, 0.6, 0.96);
    animation-iteration-count:infinite;
}

.mask6{
    width: 600px;
    height: 33vh;
    margin: 0 auto;
    position: relative;
    background: url(static/png/Raven.jpg) no-repeat;
}
.mask6:before {
    position: absolute;
    content: "";
    top: 0;left: 0; right: 0;bottom: 0;
    background: url(static/png/Yasso.jpg) no-repeat;
    animation: maskRotate 3s ease-in-out;
    animation-iteration-count:infinite;
    animation-direction:alternate;
}

.mask7{
    width: 600px;
    height: 33vh;
    margin: 0 auto;
    background: url(static/png/Raven.jpg) no-repeat;
    animation: maskRotate2 3s cubic-bezier(0.56, 0.94, 0.6, 0.96);
    animation-iteration-count:infinite;
}
.mask8{
    margin: auto;
    position: relative;
    width: 600px;
    height: 33vh;
    background: url(static/png/Raven.jpg) no-repeat;
    background-size: cover;
}
.mask8:before {
    position: absolute;
    content: "";
    top: 0;left: 0%; right: 0;bottom: 0;
    background: url(static/png/Yasso.jpg) no-repeat;
    background-size: cover;
    animation: maskRotate2 3s cubic-bezier(0.56, 0.94, 0.6, 0.96);
    animation-iteration-count:infinite;
    z-index: 1;
}

.mask9{
    margin: auto;
    position: relative;
    width: 600px;
    height: 33vh;
    background: url(static/png/Raven.jpg) no-repeat;
    background-size: cover;
}
.mask9:before {
    position: absolute;
    content: "";
    top: 0;left: 0%; right: 0;bottom: 0;
    background: url(static/png/Yasso.jpg) no-repeat;
    background-size: cover;
    mask: linear-gradient(0deg, #000 45%, transparent 55%);
    -webkit-mask-image: linear-gradient(0deg, #000 45%, transparent 55%);
    animation: maskXuan 3s ease;
    animation-iteration-count:infinite;
    z-index: 1;
}
.mask12{
    margin: auto;
    position: relative;
    width: 600px;
    height: 33vh;
    background: url(static/png/Raven.jpg) no-repeat;
    background-size: cover;
}
.mask12:before {
    position: absolute;
    content: "";
    top: 0;left: 0%; right: 0;bottom: 0;
    background: url(static/png/Yasso.jpg) no-repeat;
    background-size: cover;
    -webkit-mask-image: linear-gradient(158deg, #0000009e 45%, #0000007a 55%);
    mask: linear-gradient(158deg, #0000009e 45%, #0000007a 55%);
    z-index: 1;
}
.mask-box{
    width: 480px;
    height: 250px;
    position: relative;
}
.mask10{
    width: 500px;
    height: 250px;
    background: url(static/png/Raven.jpg) no-repeat;
    background-size: cover;
    mask-image: url(static/png/mask.png);
    -webkit-mask-image: url(static/png/mask2.png);
    mask-size: 3000% 100%;
    -webkit-mask-size: 3000% 100%;
    animation: maskMove2 3s steps(20) infinite;
    mask-position: 2.2% 0;
    -webkit-mask-position: 2.2% 0;
    position: absolute;
    top: 0;left: 0; right: 0;bottom: 0;
}

.mask11 {
    position: absolute;
    top: 0;left: 0; right: 0;bottom: 0;
    background: url(static/png/SKT1.jpg) no-repeat;
    background-size: cover;
    width: 500px;
    height: 250px;
}


@keyframes maskMove {
    0% {
        mask-position: 0 0;
        -webkit-mask-position: 2.2% 0;
    }
    
    100% {
        mask-position: 100% 0;
        -webkit-mask-position: 100% 0;
    }
}
@keyframes maskMove2 {
  0% {
    mask-position: 1.95% 0;
    -webkit-mask-position: 1.95% 0;
  }
  5% {
    mask-position: 12.5% 0;
    -webkit-mask-position: 12.5% 0;
  }
  10% {
    mask-position: 17.8% 0;
    -webkit-mask-position: 17.8% 0;
  }
  15% {
    mask-position: 23.1% 0;
    -webkit-mask-position: 23.1% 0;
  }
  20% {
    mask-position: 28.4% 0;
    -webkit-mask-position: 28.4% 0;
  }
  25% {
    mask-position: 33.7% 0;
    -webkit-mask-position: 33.7% 0;
  }
  30% {
    mask-position: 39% 0;
    -webkit-mask-position: 39% 0;
  }
  35% {
    mask-position: 44.3% 0;
    -webkit-mask-position: 44.3% 0;
  }
  40% {
    mask-position: 49.6% 0;
    -webkit-mask-position: 49.6% 0;
  }
  45% {
    mask-position: 54.9% 0;
    -webkit-mask-position: 54.9% 0;
  }
  50% {
    mask-position: 60.2% 0;
    -webkit-mask-position: 60.2% 0;
  }
  55% {
    mask-position: 65.5% 0;
    -webkit-mask-position: 65.5% 0;
  }
  60% {
    mask-position: 70.8% 0;
    -webkit-mask-position: 70.8% 0;
  }
  65% {
    mask-position: 76.1% 0;
    -webkit-mask-position: 76.1% 0;
  }
  70% {
    mask-position: 81.4% 0;
    -webkit-mask-position: 81.4% 0;
  }
  75% {
    mask-position: 86.7% 0;
    -webkit-mask-position: 86.7% 0;
  }
  80% {
    mask-position: 91.9% 0;
    -webkit-mask-position: 91.9% 0;
  }
  85% {
    mask-position: 97.3% 0;
    -webkit-mask-position: 97.3% 0;
  }
  90% {
    mask-position: 102.6% 0;
    -webkit-mask-position: 102.6% 0;
  }
  95% {
    mask-position: 107.9% 0;
    -webkit-mask-position: 107.9% 0;
  }
  100% {
    mask-position: 113.2% 0;
    -webkit-mask-position: 113.2% 0;
  }
}

/* @for $i from 0 through 100 { 
         #{$i}% {
            mask-position: linear-gradient(#{$i}deg, #000 45%, transparent 55%);
            -webkit-mask-position: linear-gradient(#{$i}deg, #000 45%, transparent 55%);
         
      }
       
    } */
@keyframes maskXuan {

  0% {
    mask: linear-gradient(0deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(0deg, #000000e6 45%, #00000021 55%);
  }
  1% {
    mask: linear-gradient(3.6deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(3.6deg, #000000e6 45%, #00000021 55%);
  }
  2% {
    mask: linear-gradient(7.2deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(7.2deg, #000000e6 45%, #00000021 55%);
  }
  3% {
    mask: linear-gradient(10.8deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(10.8deg, #000000e6 45%, #00000021 55%);
  }
  4% {
    mask: linear-gradient(14.4deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(14.4deg, #000000e6 45%, #00000021 55%);
  }
  5% {
    mask: linear-gradient(18deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(18deg, #000000e6 45%, #00000021 55%);
  }
  6% {
    mask: linear-gradient(21.6deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(21.6deg, #000000e6 45%, #00000021 55%);
  }
  7% {
    mask: linear-gradient(25.2deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(25.2deg, #000000e6 45%, #00000021 55%);
  }
  8% {
    mask: linear-gradient(28.8deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(28.8deg, #000000e6 45%, #00000021 55%);
  }
  9% {
    mask: linear-gradient(32.4deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(32.4deg, #000000e6 45%, #00000021 55%);
  }
  10% {
    mask: linear-gradient(36deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(36deg, #000000e6 45%, #00000021 55%);
  }
  11% {
    mask: linear-gradient(39.6deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(39.6deg, #000000e6 45%, #00000021 55%);
  }
  12% {
    mask: linear-gradient(43.2deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(43.2deg, #000000e6 45%, #00000021 55%);
  }
  13% {
    mask: linear-gradient(46.8deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(46.8deg, #000000e6 45%, #00000021 55%);
  }
  14% {
    mask: linear-gradient(50.4deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(50.4deg, #000000e6 45%, #00000021 55%);
  }
  15% {
    mask: linear-gradient(54deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(54deg, #000000e6 45%, #00000021 55%);
  }
  16% {
    mask: linear-gradient(57.6deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(57.6deg, #000000e6 45%, #00000021 55%);
  }
  17% {
    mask: linear-gradient(61.2deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(61.2deg, #000000e6 45%, #00000021 55%);
  }
  18% {
    mask: linear-gradient(64.8deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(64.8deg, #000000e6 45%, #00000021 55%);
  }
  19% {
    mask: linear-gradient(68.4deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(68.4deg, #000000e6 45%, #00000021 55%);
  }
  20% {
    mask: linear-gradient(72deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(72deg, #000000e6 45%, #00000021 55%);
  }
  21% {
    mask: linear-gradient(75.6deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(75.6deg, #000000e6 45%, #00000021 55%);
  }
  22% {
    mask: linear-gradient(79.2deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(79.2deg, #000000e6 45%, #00000021 55%);
  }
  23% {
    mask: linear-gradient(82.8deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(82.8deg, #000000e6 45%, #00000021 55%);
  }
  24% {
    mask: linear-gradient(86.4deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(86.4deg, #000000e6 45%, #00000021 55%);
  }
  25% {
    mask: linear-gradient(90deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(90deg, #000000e6 45%, #00000021 55%);
  }
  26% {
    mask: linear-gradient(93.6deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(93.6deg, #000000e6 45%, #00000021 55%);
  }
  27% {
    mask: linear-gradient(97.2deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(97.2deg, #000000e6 45%, #00000021 55%);
  }
  28% {
    mask: linear-gradient(100.8deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(100.8deg, #000000e6 45%, #00000021 55%);
  }
  29% {
    mask: linear-gradient(104.4deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(104.4deg, #000000e6 45%, #00000021 55%);
  }
  30% {
    mask: linear-gradient(108deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(108deg, #000000e6 45%, #00000021 55%);
  }
  31% {
    mask: linear-gradient(111.6deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(111.6deg, #000000e6 45%, #00000021 55%);
  }
  32% {
    mask: linear-gradient(115.2deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(115.2deg, #000000e6 45%, #00000021 55%);
  }
  33% {
    mask: linear-gradient(118.8deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(118.8deg, #000000e6 45%, #00000021 55%);
  }
  34% {
    mask: linear-gradient(122.4deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(122.4deg, #000000e6 45%, #00000021 55%);
  }
  35% {
    mask: linear-gradient(126deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(126deg, #000000e6 45%, #00000021 55%);
  }
  36% {
    mask: linear-gradient(129.6deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(129.6deg, #000000e6 45%, #00000021 55%);
  }
  37% {
    mask: linear-gradient(133.2deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(133.2deg, #000000e6 45%, #00000021 55%);
  }
  38% {
    mask: linear-gradient(136.8deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(136.8deg, #000000e6 45%, #00000021 55%);
  }
  39% {
    mask: linear-gradient(140.4deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(140.4deg, #000000e6 45%, #00000021 55%);
  }
  40% {
    mask: linear-gradient(144deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(144deg, #000000e6 45%, #00000021 55%);
  }
  41% {
    mask: linear-gradient(147.6deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(147.6deg, #000000e6 45%, #00000021 55%);
  }
  42% {
    mask: linear-gradient(151.2deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(151.2deg, #000000e6 45%, #00000021 55%);
  }
  43% {
    mask: linear-gradient(154.8deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(154.8deg, #000000e6 45%, #00000021 55%);
  }
  44% {
    mask: linear-gradient(158.4deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(158.4deg, #000000e6 45%, #00000021 55%);
  }
  45% {
    mask: linear-gradient(162deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(162deg, #000000e6 45%, #00000021 55%);
  }
  46% {
    mask: linear-gradient(165.6deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(165.6deg, #000000e6 45%, #00000021 55%);
  }
  47% {
    mask: linear-gradient(169.2deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(169.2deg, #000000e6 45%, #00000021 55%);
  }
  48% {
    mask: linear-gradient(172.8deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(172.8deg, #000000e6 45%, #00000021 55%);
  }
  49% {
    mask: linear-gradient(176.4deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(176.4deg, #000000e6 45%, #00000021 55%);
  }
  50% {
    mask: linear-gradient(180deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(180deg, #000000e6 45%, #00000021 55%);
  }
  51% {
    mask: linear-gradient(183.6deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(183.6deg, #000000e6 45%, #00000021 55%);
  }
  52% {
    mask: linear-gradient(187.2deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(187.2deg, #000000e6 45%, #00000021 55%);
  }
  53% {
    mask: linear-gradient(190.8deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(190.8deg, #000000e6 45%, #00000021 55%);
  }
  54% {
    mask: linear-gradient(194.4deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(194.4deg, #000000e6 45%, #00000021 55%);
  }
  55% {
    mask: linear-gradient(198deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(198deg, #000000e6 45%, #00000021 55%);
  }
  56% {
    mask: linear-gradient(201.6deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(201.6deg, #000000e6 45%, #00000021 55%);
  }
  57% {
    mask: linear-gradient(205.2deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(205.2deg, #000000e6 45%, #00000021 55%);
  }
  58% {
    mask: linear-gradient(208.8deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(208.8deg, #000000e6 45%, #00000021 55%);
  }
  59% {
    mask: linear-gradient(212.4deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(212.4deg, #000000e6 45%, #00000021 55%);
  }
  60% {
    mask: linear-gradient(216deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(216deg, #000000e6 45%, #00000021 55%);
  }
  61% {
    mask: linear-gradient(219.6deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(219.6deg, #000000e6 45%, #00000021 55%);
  }
  62% {
    mask: linear-gradient(223.2deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(223.2deg, #000000e6 45%, #00000021 55%);
  }
  63% {
    mask: linear-gradient(226.8deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(226.8deg, #000000e6 45%, #00000021 55%);
  }
  64% {
    mask: linear-gradient(230.4deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(230.4deg, #000000e6 45%, #00000021 55%);
  }
  65% {
    mask: linear-gradient(234deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(234deg, #000000e6 45%, #00000021 55%);
  }
  66% {
    mask: linear-gradient(237.6deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(237.6deg, #000000e6 45%, #00000021 55%);
  }
  67% {
    mask: linear-gradient(241.2deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(241.2deg, #000000e6 45%, #00000021 55%);
  }
  68% {
    mask: linear-gradient(244.8deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(244.8deg, #000000e6 45%, #00000021 55%);
  }
  69% {
    mask: linear-gradient(248.4deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(248.4deg, #000000e6 45%, #00000021 55%);
  }
  70% {
    mask: linear-gradient(252deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(252deg, #000000e6 45%, #00000021 55%);
  }
  71% {
    mask: linear-gradient(255.6deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(255.6deg, #000000e6 45%, #00000021 55%);
  }
  72% {
    mask: linear-gradient(259.2deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(259.2deg, #000000e6 45%, #00000021 55%);
  }
  73% {
    mask: linear-gradient(262.8deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(262.8deg, #000000e6 45%, #00000021 55%);
  }
  74% {
    mask: linear-gradient(266.4deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(266.4deg, #000000e6 45%, #00000021 55%);
  }
  75% {
    mask: linear-gradient(270deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(270deg, #000000e6 45%, #00000021 55%);
  }
  76% {
    mask: linear-gradient(273.6deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(273.6deg, #000000e6 45%, #00000021 55%);
  }
  77% {
    mask: linear-gradient(277.2deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(277.2deg, #000000e6 45%, #00000021 55%);
  }
  78% {
    mask: linear-gradient(280.8deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(280.8deg, #000000e6 45%, #00000021 55%);
  }
  79% {
    mask: linear-gradient(284.4deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(284.4deg, #000000e6 45%, #00000021 55%);
  }
  80% {
    mask: linear-gradient(288deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(288deg, #000000e6 45%, #00000021 55%);
  }
  81% {
    mask: linear-gradient(291.6deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(291.6deg, #000000e6 45%, #00000021 55%);
  }
  82% {
    mask: linear-gradient(295.2deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(295.2deg, #000000e6 45%, #00000021 55%);
  }
  83% {
    mask: linear-gradient(298.8deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(298.8deg, #000000e6 45%, #00000021 55%);
  }
  84% {
    mask: linear-gradient(302.4deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(302.4deg, #000000e6 45%, #00000021 55%);
  }
  85% {
    mask: linear-gradient(306deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(306deg, #000000e6 45%, #00000021 55%);
  }
  86% {
    mask: linear-gradient(309.6deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(309.6deg, #000000e6 45%, #00000021 55%);
  }
  87% {
    mask: linear-gradient(313.2deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(313.2deg, #000000e6 45%, #00000021 55%);
  }
  88% {
    mask: linear-gradient(316.8deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(316.8deg, #000000e6 45%, #00000021 55%);
  }
  89% {
    mask: linear-gradient(320.4deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(320.4deg, #000000e6 45%, #00000021 55%);
  }
  90% {
    mask: linear-gradient(324deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(324deg, #000000e6 45%, #00000021 55%);
  }
  91% {
    mask: linear-gradient(327.6deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(327.6deg, #000000e6 45%, #00000021 55%);
  }
  92% {
    mask: linear-gradient(331.2deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(331.2deg, #000000e6 45%, #00000021 55%);
  }
  93% {
    mask: linear-gradient(334.8deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(334.8deg, #000000e6 45%, #00000021 55%);
  }
  94% {
    mask: linear-gradient(338.4deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(338.4deg, #000000e6 45%, #00000021 55%);
  }
  95% {
    mask: linear-gradient(342deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(342deg, #000000e6 45%, #00000021 55%);
  }
  96% {
    mask: linear-gradient(345.6deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(345.6deg, #000000e6 45%, #00000021 55%);
  }
  97% {
    mask: linear-gradient(349.2deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(349.2deg, #000000e6 45%, #00000021 55%);
  }
  98% {
    mask: linear-gradient(352.8deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(352.8deg, #000000e6 45%, #00000021 55%);
  }
  99% {
    mask: linear-gradient(356.4deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(356.4deg, #000000e6 45%, #00000021 55%);
  }
  100% {
    mask: linear-gradient(360deg, #000000e6 45%, #00000021 55%);
    -webkit-mask: linear-gradient(360deg, #000000e6 45%, #00000021 55%);
  }
}

@keyframes maskRotate {
  0% {
    mask: linear-gradient(45deg, #000 0%, transparent 5%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 0%, transparent 5%, transparent 1%);
  }
  1% {
    mask: linear-gradient(45deg, #000 1%, transparent 6%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 1%, transparent 6%, transparent 1%);
  }
  2% {
    mask: linear-gradient(45deg, #000 2%, transparent 7%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 2%, transparent 7%, transparent 1%);
  }
  3% {
    mask: linear-gradient(45deg, #000 3%, transparent 8%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 3%, transparent 8%, transparent 1%);
  }
  4% {
    mask: linear-gradient(45deg, #000 4%, transparent 9%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 4%, transparent 9%, transparent 1%);
  }
  5% {
    mask: linear-gradient(45deg, #000 5%, transparent 10%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 5%, transparent 10%, transparent 1%);
  }
  6% {
    mask: linear-gradient(45deg, #000 6%, transparent 11%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 6%, transparent 11%, transparent 1%);
  }
  7% {
    mask: linear-gradient(45deg, #000 7%, transparent 12%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 7%, transparent 12%, transparent 1%);
  }
  8% {
    mask: linear-gradient(45deg, #000 8%, transparent 13%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 8%, transparent 13%, transparent 1%);
  }
  9% {
    mask: linear-gradient(45deg, #000 9%, transparent 14%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 9%, transparent 14%, transparent 1%);
  }
  10% {
    mask: linear-gradient(45deg, #000 10%, transparent 15%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 10%, transparent 15%, transparent 1%);
  }
  11% {
    mask: linear-gradient(45deg, #000 11%, transparent 16%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 11%, transparent 16%, transparent 1%);
  }
  12% {
    mask: linear-gradient(45deg, #000 12%, transparent 17%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 12%, transparent 17%, transparent 1%);
  }
  13% {
    mask: linear-gradient(45deg, #000 13%, transparent 18%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 13%, transparent 18%, transparent 1%);
  }
  14% {
    mask: linear-gradient(45deg, #000 14%, transparent 19%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 14%, transparent 19%, transparent 1%);
  }
  15% {
    mask: linear-gradient(45deg, #000 15%, transparent 20%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 15%, transparent 20%, transparent 1%);
  }
  16% {
    mask: linear-gradient(45deg, #000 16%, transparent 21%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 16%, transparent 21%, transparent 1%);
  }
  17% {
    mask: linear-gradient(45deg, #000 17%, transparent 22%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 17%, transparent 22%, transparent 1%);
  }
  18% {
    mask: linear-gradient(45deg, #000 18%, transparent 23%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 18%, transparent 23%, transparent 1%);
  }
  19% {
    mask: linear-gradient(45deg, #000 19%, transparent 24%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 19%, transparent 24%, transparent 1%);
  }
  20% {
    mask: linear-gradient(45deg, #000 20%, transparent 25%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 20%, transparent 25%, transparent 1%);
  }
  21% {
    mask: linear-gradient(45deg, #000 21%, transparent 26%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 21%, transparent 26%, transparent 1%);
  }
  22% {
    mask: linear-gradient(45deg, #000 22%, transparent 27%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 22%, transparent 27%, transparent 1%);
  }
  23% {
    mask: linear-gradient(45deg, #000 23%, transparent 28%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 23%, transparent 28%, transparent 1%);
  }
  24% {
    mask: linear-gradient(45deg, #000 24%, transparent 29%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 24%, transparent 29%, transparent 1%);
  }
  25% {
    mask: linear-gradient(45deg, #000 25%, transparent 30%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 25%, transparent 30%, transparent 1%);
  }
  26% {
    mask: linear-gradient(45deg, #000 26%, transparent 31%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 26%, transparent 31%, transparent 1%);
  }
  27% {
    mask: linear-gradient(45deg, #000 27%, transparent 32%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 27%, transparent 32%, transparent 1%);
  }
  28% {
    mask: linear-gradient(45deg, #000 28%, transparent 33%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 28%, transparent 33%, transparent 1%);
  }
  29% {
    mask: linear-gradient(45deg, #000 29%, transparent 34%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 29%, transparent 34%, transparent 1%);
  }
  30% {
    mask: linear-gradient(45deg, #000 30%, transparent 35%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 30%, transparent 35%, transparent 1%);
  }
  31% {
    mask: linear-gradient(45deg, #000 31%, transparent 36%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 31%, transparent 36%, transparent 1%);
  }
  32% {
    mask: linear-gradient(45deg, #000 32%, transparent 37%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 32%, transparent 37%, transparent 1%);
  }
  33% {
    mask: linear-gradient(45deg, #000 33%, transparent 38%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 33%, transparent 38%, transparent 1%);
  }
  34% {
    mask: linear-gradient(45deg, #000 34%, transparent 39%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 34%, transparent 39%, transparent 1%);
  }
  35% {
    mask: linear-gradient(45deg, #000 35%, transparent 40%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 35%, transparent 40%, transparent 1%);
  }
  36% {
    mask: linear-gradient(45deg, #000 36%, transparent 41%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 36%, transparent 41%, transparent 1%);
  }
  37% {
    mask: linear-gradient(45deg, #000 37%, transparent 42%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 37%, transparent 42%, transparent 1%);
  }
  38% {
    mask: linear-gradient(45deg, #000 38%, transparent 43%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 38%, transparent 43%, transparent 1%);
  }
  39% {
    mask: linear-gradient(45deg, #000 39%, transparent 44%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 39%, transparent 44%, transparent 1%);
  }
  40% {
    mask: linear-gradient(45deg, #000 40%, transparent 45%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 40%, transparent 45%, transparent 1%);
  }
  41% {
    mask: linear-gradient(45deg, #000 41%, transparent 46%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 41%, transparent 46%, transparent 1%);
  }
  42% {
    mask: linear-gradient(45deg, #000 42%, transparent 47%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 42%, transparent 47%, transparent 1%);
  }
  43% {
    mask: linear-gradient(45deg, #000 43%, transparent 48%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 43%, transparent 48%, transparent 1%);
  }
  44% {
    mask: linear-gradient(45deg, #000 44%, transparent 49%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 44%, transparent 49%, transparent 1%);
  }
  45% {
    mask: linear-gradient(45deg, #000 45%, transparent 50%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 45%, transparent 50%, transparent 1%);
  }
  46% {
    mask: linear-gradient(45deg, #000 46%, transparent 51%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 46%, transparent 51%, transparent 1%);
  }
  47% {
    mask: linear-gradient(45deg, #000 47%, transparent 52%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 47%, transparent 52%, transparent 1%);
  }
  48% {
    mask: linear-gradient(45deg, #000 48%, transparent 53%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 48%, transparent 53%, transparent 1%);
  }
  49% {
    mask: linear-gradient(45deg, #000 49%, transparent 54%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 49%, transparent 54%, transparent 1%);
  }
  50% {
    mask: linear-gradient(45deg, #000 50%, transparent 55%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 50%, transparent 55%, transparent 1%);
  }
  51% {
    mask: linear-gradient(45deg, #000 51%, transparent 56%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 51%, transparent 56%, transparent 1%);
  }
  52% {
    mask: linear-gradient(45deg, #000 52%, transparent 57%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 52%, transparent 57%, transparent 1%);
  }
  53% {
    mask: linear-gradient(45deg, #000 53%, transparent 58%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 53%, transparent 58%, transparent 1%);
  }
  54% {
    mask: linear-gradient(45deg, #000 54%, transparent 59%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 54%, transparent 59%, transparent 1%);
  }
  55% {
    mask: linear-gradient(45deg, #000 55%, transparent 60%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 55%, transparent 60%, transparent 1%);
  }
  56% {
    mask: linear-gradient(45deg, #000 56%, transparent 61%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 56%, transparent 61%, transparent 1%);
  }
  57% {
    mask: linear-gradient(45deg, #000 57%, transparent 62%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 57%, transparent 62%, transparent 1%);
  }
  58% {
    mask: linear-gradient(45deg, #000 58%, transparent 63%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 58%, transparent 63%, transparent 1%);
  }
  59% {
    mask: linear-gradient(45deg, #000 59%, transparent 64%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 59%, transparent 64%, transparent 1%);
  }
  60% {
    mask: linear-gradient(45deg, #000 60%, transparent 65%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 60%, transparent 65%, transparent 1%);
  }
  61% {
    mask: linear-gradient(45deg, #000 61%, transparent 66%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 61%, transparent 66%, transparent 1%);
  }
  62% {
    mask: linear-gradient(45deg, #000 62%, transparent 67%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 62%, transparent 67%, transparent 1%);
  }
  63% {
    mask: linear-gradient(45deg, #000 63%, transparent 68%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 63%, transparent 68%, transparent 1%);
  }
  64% {
    mask: linear-gradient(45deg, #000 64%, transparent 69%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 64%, transparent 69%, transparent 1%);
  }
  65% {
    mask: linear-gradient(45deg, #000 65%, transparent 70%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 65%, transparent 70%, transparent 1%);
  }
  66% {
    mask: linear-gradient(45deg, #000 66%, transparent 71%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 66%, transparent 71%, transparent 1%);
  }
  67% {
    mask: linear-gradient(45deg, #000 67%, transparent 72%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 67%, transparent 72%, transparent 1%);
  }
  68% {
    mask: linear-gradient(45deg, #000 68%, transparent 73%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 68%, transparent 73%, transparent 1%);
  }
  69% {
    mask: linear-gradient(45deg, #000 69%, transparent 74%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 69%, transparent 74%, transparent 1%);
  }
  70% {
    mask: linear-gradient(45deg, #000 70%, transparent 75%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 70%, transparent 75%, transparent 1%);
  }
  71% {
    mask: linear-gradient(45deg, #000 71%, transparent 76%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 71%, transparent 76%, transparent 1%);
  }
  72% {
    mask: linear-gradient(45deg, #000 72%, transparent 77%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 72%, transparent 77%, transparent 1%);
  }
  73% {
    mask: linear-gradient(45deg, #000 73%, transparent 78%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 73%, transparent 78%, transparent 1%);
  }
  74% {
    mask: linear-gradient(45deg, #000 74%, transparent 79%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 74%, transparent 79%, transparent 1%);
  }
  75% {
    mask: linear-gradient(45deg, #000 75%, transparent 80%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 75%, transparent 80%, transparent 1%);
  }
  76% {
    mask: linear-gradient(45deg, #000 76%, transparent 81%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 76%, transparent 81%, transparent 1%);
  }
  77% {
    mask: linear-gradient(45deg, #000 77%, transparent 82%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 77%, transparent 82%, transparent 1%);
  }
  78% {
    mask: linear-gradient(45deg, #000 78%, transparent 83%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 78%, transparent 83%, transparent 1%);
  }
  79% {
    mask: linear-gradient(45deg, #000 79%, transparent 84%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 79%, transparent 84%, transparent 1%);
  }
  80% {
    mask: linear-gradient(45deg, #000 80%, transparent 85%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 80%, transparent 85%, transparent 1%);
  }
  81% {
    mask: linear-gradient(45deg, #000 81%, transparent 86%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 81%, transparent 86%, transparent 1%);
  }
  82% {
    mask: linear-gradient(45deg, #000 82%, transparent 87%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 82%, transparent 87%, transparent 1%);
  }
  83% {
    mask: linear-gradient(45deg, #000 83%, transparent 88%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 83%, transparent 88%, transparent 1%);
  }
  84% {
    mask: linear-gradient(45deg, #000 84%, transparent 89%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 84%, transparent 89%, transparent 1%);
  }
  85% {
    mask: linear-gradient(45deg, #000 85%, transparent 90%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 85%, transparent 90%, transparent 1%);
  }
  86% {
    mask: linear-gradient(45deg, #000 86%, transparent 91%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 86%, transparent 91%, transparent 1%);
  }
  87% {
    mask: linear-gradient(45deg, #000 87%, transparent 92%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 87%, transparent 92%, transparent 1%);
  }
  88% {
    mask: linear-gradient(45deg, #000 88%, transparent 93%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 88%, transparent 93%, transparent 1%);
  }
  89% {
    mask: linear-gradient(45deg, #000 89%, transparent 94%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 89%, transparent 94%, transparent 1%);
  }
  90% {
    mask: linear-gradient(45deg, #000 90%, transparent 95%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 90%, transparent 95%, transparent 1%);
  }
  91% {
    mask: linear-gradient(45deg, #000 91%, transparent 96%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 91%, transparent 96%, transparent 1%);
  }
  92% {
    mask: linear-gradient(45deg, #000 92%, transparent 97%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 92%, transparent 97%, transparent 1%);
  }
  93% {
    mask: linear-gradient(45deg, #000 93%, transparent 98%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 93%, transparent 98%, transparent 1%);
  }
  94% {
    mask: linear-gradient(45deg, #000 94%, transparent 99%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 94%, transparent 99%, transparent 1%);
  }
  95% {
    mask: linear-gradient(45deg, #000 95%, transparent 100%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 95%, transparent 100%, transparent 1%);
  }
  96% {
    mask: linear-gradient(45deg, #000 96%, transparent 101%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 96%, transparent 101%, transparent 1%);
  }
  97% {
    mask: linear-gradient(45deg, #000 97%, transparent 102%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 97%, transparent 102%, transparent 1%);
  }
  98% {
    mask: linear-gradient(45deg, #000 98%, transparent 103%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 98%, transparent 103%, transparent 1%);
  }
  99% {
    mask: linear-gradient(45deg, #000 99%, transparent 104%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 99%, transparent 104%, transparent 1%);
  }
  100% {
    mask: linear-gradient(45deg, #000 100%, transparent 105%, transparent 1%);
    -webkit-mask: linear-gradient(45deg, #000 100%, transparent 105%, transparent 1%);
  }
}

@keyframes maskRotate2 {
  0% {
    mask: conic-gradient(#000 -10%, transparent 0%, transparent);
    -webkit-mask: conic-gradient(#000 -10%, transparent 0%, transparent);
  }
  1% {
    mask: conic-gradient(#000 -9%, transparent 1%, transparent);
    -webkit-mask: conic-gradient(#000 -9%, transparent 1%, transparent);
  }
  2% {
    mask: conic-gradient(#000 -8%, transparent 2%, transparent);
    -webkit-mask: conic-gradient(#000 -8%, transparent 2%, transparent);
  }
  3% {
    mask: conic-gradient(#000 -7%, transparent 3%, transparent);
    -webkit-mask: conic-gradient(#000 -7%, transparent 3%, transparent);
  }
  4% {
    mask: conic-gradient(#000 -6%, transparent 4%, transparent);
    -webkit-mask: conic-gradient(#000 -6%, transparent 4%, transparent);
  }
  5% {
    mask: conic-gradient(#000 -5%, transparent 5%, transparent);
    -webkit-mask: conic-gradient(#000 -5%, transparent 5%, transparent);
  }
  6% {
    mask: conic-gradient(#000 -4%, transparent 6%, transparent);
    -webkit-mask: conic-gradient(#000 -4%, transparent 6%, transparent);
  }
  7% {
    mask: conic-gradient(#000 -3%, transparent 7%, transparent);
    -webkit-mask: conic-gradient(#000 -3%, transparent 7%, transparent);
  }
  8% {
    mask: conic-gradient(#000 -2%, transparent 8%, transparent);
    -webkit-mask: conic-gradient(#000 -2%, transparent 8%, transparent);
  }
  9% {
    mask: conic-gradient(#000 -1%, transparent 9%, transparent);
    -webkit-mask: conic-gradient(#000 -1%, transparent 9%, transparent);
  }
  10% {
    mask: conic-gradient(#000 0%, transparent 10%, transparent);
    -webkit-mask: conic-gradient(#000 0%, transparent 10%, transparent);
  }
  11% {
    mask: conic-gradient(#000 1%, transparent 11%, transparent);
    -webkit-mask: conic-gradient(#000 1%, transparent 11%, transparent);
  }
  12% {
    mask: conic-gradient(#000 2%, transparent 12%, transparent);
    -webkit-mask: conic-gradient(#000 2%, transparent 12%, transparent);
  }
  13% {
    mask: conic-gradient(#000 3%, transparent 13%, transparent);
    -webkit-mask: conic-gradient(#000 3%, transparent 13%, transparent);
  }
  14% {
    mask: conic-gradient(#000 4%, transparent 14%, transparent);
    -webkit-mask: conic-gradient(#000 4%, transparent 14%, transparent);
  }
  15% {
    mask: conic-gradient(#000 5%, transparent 15%, transparent);
    -webkit-mask: conic-gradient(#000 5%, transparent 15%, transparent);
  }
  16% {
    mask: conic-gradient(#000 6%, transparent 16%, transparent);
    -webkit-mask: conic-gradient(#000 6%, transparent 16%, transparent);
  }
  17% {
    mask: conic-gradient(#000 7%, transparent 17%, transparent);
    -webkit-mask: conic-gradient(#000 7%, transparent 17%, transparent);
  }
  18% {
    mask: conic-gradient(#000 8%, transparent 18%, transparent);
    -webkit-mask: conic-gradient(#000 8%, transparent 18%, transparent);
  }
  19% {
    mask: conic-gradient(#000 9%, transparent 19%, transparent);
    -webkit-mask: conic-gradient(#000 9%, transparent 19%, transparent);
  }
  20% {
    mask: conic-gradient(#000 10%, transparent 20%, transparent);
    -webkit-mask: conic-gradient(#000 10%, transparent 20%, transparent);
  }
  21% {
    mask: conic-gradient(#000 11%, transparent 21%, transparent);
    -webkit-mask: conic-gradient(#000 11%, transparent 21%, transparent);
  }
  22% {
    mask: conic-gradient(#000 12%, transparent 22%, transparent);
    -webkit-mask: conic-gradient(#000 12%, transparent 22%, transparent);
  }
  23% {
    mask: conic-gradient(#000 13%, transparent 23%, transparent);
    -webkit-mask: conic-gradient(#000 13%, transparent 23%, transparent);
  }
  24% {
    mask: conic-gradient(#000 14%, transparent 24%, transparent);
    -webkit-mask: conic-gradient(#000 14%, transparent 24%, transparent);
  }
  25% {
    mask: conic-gradient(#000 15%, transparent 25%, transparent);
    -webkit-mask: conic-gradient(#000 15%, transparent 25%, transparent);
  }
  26% {
    mask: conic-gradient(#000 16%, transparent 26%, transparent);
    -webkit-mask: conic-gradient(#000 16%, transparent 26%, transparent);
  }
  27% {
    mask: conic-gradient(#000 17%, transparent 27%, transparent);
    -webkit-mask: conic-gradient(#000 17%, transparent 27%, transparent);
  }
  28% {
    mask: conic-gradient(#000 18%, transparent 28%, transparent);
    -webkit-mask: conic-gradient(#000 18%, transparent 28%, transparent);
  }
  29% {
    mask: conic-gradient(#000 19%, transparent 29%, transparent);
    -webkit-mask: conic-gradient(#000 19%, transparent 29%, transparent);
  }
  30% {
    mask: conic-gradient(#000 20%, transparent 30%, transparent);
    -webkit-mask: conic-gradient(#000 20%, transparent 30%, transparent);
  }
  31% {
    mask: conic-gradient(#000 21%, transparent 31%, transparent);
    -webkit-mask: conic-gradient(#000 21%, transparent 31%, transparent);
  }
  32% {
    mask: conic-gradient(#000 22%, transparent 32%, transparent);
    -webkit-mask: conic-gradient(#000 22%, transparent 32%, transparent);
  }
  33% {
    mask: conic-gradient(#000 23%, transparent 33%, transparent);
    -webkit-mask: conic-gradient(#000 23%, transparent 33%, transparent);
  }
  34% {
    mask: conic-gradient(#000 24%, transparent 34%, transparent);
    -webkit-mask: conic-gradient(#000 24%, transparent 34%, transparent);
  }
  35% {
    mask: conic-gradient(#000 25%, transparent 35%, transparent);
    -webkit-mask: conic-gradient(#000 25%, transparent 35%, transparent);
  }
  36% {
    mask: conic-gradient(#000 26%, transparent 36%, transparent);
    -webkit-mask: conic-gradient(#000 26%, transparent 36%, transparent);
  }
  37% {
    mask: conic-gradient(#000 27%, transparent 37%, transparent);
    -webkit-mask: conic-gradient(#000 27%, transparent 37%, transparent);
  }
  38% {
    mask: conic-gradient(#000 28%, transparent 38%, transparent);
    -webkit-mask: conic-gradient(#000 28%, transparent 38%, transparent);
  }
  39% {
    mask: conic-gradient(#000 29%, transparent 39%, transparent);
    -webkit-mask: conic-gradient(#000 29%, transparent 39%, transparent);
  }
  40% {
    mask: conic-gradient(#000 30%, transparent 40%, transparent);
    -webkit-mask: conic-gradient(#000 30%, transparent 40%, transparent);
  }
  41% {
    mask: conic-gradient(#000 31%, transparent 41%, transparent);
    -webkit-mask: conic-gradient(#000 31%, transparent 41%, transparent);
  }
  42% {
    mask: conic-gradient(#000 32%, transparent 42%, transparent);
    -webkit-mask: conic-gradient(#000 32%, transparent 42%, transparent);
  }
  43% {
    mask: conic-gradient(#000 33%, transparent 43%, transparent);
    -webkit-mask: conic-gradient(#000 33%, transparent 43%, transparent);
  }
  44% {
    mask: conic-gradient(#000 34%, transparent 44%, transparent);
    -webkit-mask: conic-gradient(#000 34%, transparent 44%, transparent);
  }
  45% {
    mask: conic-gradient(#000 35%, transparent 45%, transparent);
    -webkit-mask: conic-gradient(#000 35%, transparent 45%, transparent);
  }
  46% {
    mask: conic-gradient(#000 36%, transparent 46%, transparent);
    -webkit-mask: conic-gradient(#000 36%, transparent 46%, transparent);
  }
  47% {
    mask: conic-gradient(#000 37%, transparent 47%, transparent);
    -webkit-mask: conic-gradient(#000 37%, transparent 47%, transparent);
  }
  48% {
    mask: conic-gradient(#000 38%, transparent 48%, transparent);
    -webkit-mask: conic-gradient(#000 38%, transparent 48%, transparent);
  }
  49% {
    mask: conic-gradient(#000 39%, transparent 49%, transparent);
    -webkit-mask: conic-gradient(#000 39%, transparent 49%, transparent);
  }
  50% {
    mask: conic-gradient(#000 40%, transparent 50%, transparent);
    -webkit-mask: conic-gradient(#000 40%, transparent 50%, transparent);
  }
  51% {
    mask: conic-gradient(#000 41%, transparent 51%, transparent);
    -webkit-mask: conic-gradient(#000 41%, transparent 51%, transparent);
  }
  52% {
    mask: conic-gradient(#000 42%, transparent 52%, transparent);
    -webkit-mask: conic-gradient(#000 42%, transparent 52%, transparent);
  }
  53% {
    mask: conic-gradient(#000 43%, transparent 53%, transparent);
    -webkit-mask: conic-gradient(#000 43%, transparent 53%, transparent);
  }
  54% {
    mask: conic-gradient(#000 44%, transparent 54%, transparent);
    -webkit-mask: conic-gradient(#000 44%, transparent 54%, transparent);
  }
  55% {
    mask: conic-gradient(#000 45%, transparent 55%, transparent);
    -webkit-mask: conic-gradient(#000 45%, transparent 55%, transparent);
  }
  56% {
    mask: conic-gradient(#000 46%, transparent 56%, transparent);
    -webkit-mask: conic-gradient(#000 46%, transparent 56%, transparent);
  }
  57% {
    mask: conic-gradient(#000 47%, transparent 57%, transparent);
    -webkit-mask: conic-gradient(#000 47%, transparent 57%, transparent);
  }
  58% {
    mask: conic-gradient(#000 48%, transparent 58%, transparent);
    -webkit-mask: conic-gradient(#000 48%, transparent 58%, transparent);
  }
  59% {
    mask: conic-gradient(#000 49%, transparent 59%, transparent);
    -webkit-mask: conic-gradient(#000 49%, transparent 59%, transparent);
  }
  60% {
    mask: conic-gradient(#000 50%, transparent 60%, transparent);
    -webkit-mask: conic-gradient(#000 50%, transparent 60%, transparent);
  }
  61% {
    mask: conic-gradient(#000 51%, transparent 61%, transparent);
    -webkit-mask: conic-gradient(#000 51%, transparent 61%, transparent);
  }
  62% {
    mask: conic-gradient(#000 52%, transparent 62%, transparent);
    -webkit-mask: conic-gradient(#000 52%, transparent 62%, transparent);
  }
  63% {
    mask: conic-gradient(#000 53%, transparent 63%, transparent);
    -webkit-mask: conic-gradient(#000 53%, transparent 63%, transparent);
  }
  64% {
    mask: conic-gradient(#000 54%, transparent 64%, transparent);
    -webkit-mask: conic-gradient(#000 54%, transparent 64%, transparent);
  }
  65% {
    mask: conic-gradient(#000 55%, transparent 65%, transparent);
    -webkit-mask: conic-gradient(#000 55%, transparent 65%, transparent);
  }
  66% {
    mask: conic-gradient(#000 56%, transparent 66%, transparent);
    -webkit-mask: conic-gradient(#000 56%, transparent 66%, transparent);
  }
  67% {
    mask: conic-gradient(#000 57%, transparent 67%, transparent);
    -webkit-mask: conic-gradient(#000 57%, transparent 67%, transparent);
  }
  68% {
    mask: conic-gradient(#000 58%, transparent 68%, transparent);
    -webkit-mask: conic-gradient(#000 58%, transparent 68%, transparent);
  }
  69% {
    mask: conic-gradient(#000 59%, transparent 69%, transparent);
    -webkit-mask: conic-gradient(#000 59%, transparent 69%, transparent);
  }
  70% {
    mask: conic-gradient(#000 60%, transparent 70%, transparent);
    -webkit-mask: conic-gradient(#000 60%, transparent 70%, transparent);
  }
  71% {
    mask: conic-gradient(#000 61%, transparent 71%, transparent);
    -webkit-mask: conic-gradient(#000 61%, transparent 71%, transparent);
  }
  72% {
    mask: conic-gradient(#000 62%, transparent 72%, transparent);
    -webkit-mask: conic-gradient(#000 62%, transparent 72%, transparent);
  }
  73% {
    mask: conic-gradient(#000 63%, transparent 73%, transparent);
    -webkit-mask: conic-gradient(#000 63%, transparent 73%, transparent);
  }
  74% {
    mask: conic-gradient(#000 64%, transparent 74%, transparent);
    -webkit-mask: conic-gradient(#000 64%, transparent 74%, transparent);
  }
  75% {
    mask: conic-gradient(#000 65%, transparent 75%, transparent);
    -webkit-mask: conic-gradient(#000 65%, transparent 75%, transparent);
  }
  76% {
    mask: conic-gradient(#000 66%, transparent 76%, transparent);
    -webkit-mask: conic-gradient(#000 66%, transparent 76%, transparent);
  }
  77% {
    mask: conic-gradient(#000 67%, transparent 77%, transparent);
    -webkit-mask: conic-gradient(#000 67%, transparent 77%, transparent);
  }
  78% {
    mask: conic-gradient(#000 68%, transparent 78%, transparent);
    -webkit-mask: conic-gradient(#000 68%, transparent 78%, transparent);
  }
  79% {
    mask: conic-gradient(#000 69%, transparent 79%, transparent);
    -webkit-mask: conic-gradient(#000 69%, transparent 79%, transparent);
  }
  80% {
    mask: conic-gradient(#000 70%, transparent 80%, transparent);
    -webkit-mask: conic-gradient(#000 70%, transparent 80%, transparent);
  }
  81% {
    mask: conic-gradient(#000 71%, transparent 81%, transparent);
    -webkit-mask: conic-gradient(#000 71%, transparent 81%, transparent);
  }
  82% {
    mask: conic-gradient(#000 72%, transparent 82%, transparent);
    -webkit-mask: conic-gradient(#000 72%, transparent 82%, transparent);
  }
  83% {
    mask: conic-gradient(#000 73%, transparent 83%, transparent);
    -webkit-mask: conic-gradient(#000 73%, transparent 83%, transparent);
  }
  84% {
    mask: conic-gradient(#000 74%, transparent 84%, transparent);
    -webkit-mask: conic-gradient(#000 74%, transparent 84%, transparent);
  }
  85% {
    mask: conic-gradient(#000 75%, transparent 85%, transparent);
    -webkit-mask: conic-gradient(#000 75%, transparent 85%, transparent);
  }
  86% {
    mask: conic-gradient(#000 76%, transparent 86%, transparent);
    -webkit-mask: conic-gradient(#000 76%, transparent 86%, transparent);
  }
  87% {
    mask: conic-gradient(#000 77%, transparent 87%, transparent);
    -webkit-mask: conic-gradient(#000 77%, transparent 87%, transparent);
  }
  88% {
    mask: conic-gradient(#000 78%, transparent 88%, transparent);
    -webkit-mask: conic-gradient(#000 78%, transparent 88%, transparent);
  }
  89% {
    mask: conic-gradient(#000 79%, transparent 89%, transparent);
    -webkit-mask: conic-gradient(#000 79%, transparent 89%, transparent);
  }
  90% {
    mask: conic-gradient(#000 80%, transparent 90%, transparent);
    -webkit-mask: conic-gradient(#000 80%, transparent 90%, transparent);
  }
  91% {
    mask: conic-gradient(#000 81%, transparent 91%, transparent);
    -webkit-mask: conic-gradient(#000 81%, transparent 91%, transparent);
  }
  92% {
    mask: conic-gradient(#000 82%, transparent 92%, transparent);
    -webkit-mask: conic-gradient(#000 82%, transparent 92%, transparent);
  }
  93% {
    mask: conic-gradient(#000 83%, transparent 93%, transparent);
    -webkit-mask: conic-gradient(#000 83%, transparent 93%, transparent);
  }
  94% {
    mask: conic-gradient(#000 84%, transparent 94%, transparent);
    -webkit-mask: conic-gradient(#000 84%, transparent 94%, transparent);
  }
  95% {
    mask: conic-gradient(#000 85%, transparent 95%, transparent);
    -webkit-mask: conic-gradient(#000 85%, transparent 95%, transparent);
  }
  96% {
    mask: conic-gradient(#000 86%, transparent 96%, transparent);
    -webkit-mask: conic-gradient(#000 86%, transparent 96%, transparent);
  }
  97% {
    mask: conic-gradient(#000 87%, transparent 97%, transparent);
    -webkit-mask: conic-gradient(#000 87%, transparent 97%, transparent);
  }
  98% {
    mask: conic-gradient(#000 88%, transparent 98%, transparent);
    -webkit-mask: conic-gradient(#000 88%, transparent 98%, transparent);
  }
  99% {
    mask: conic-gradient(#000 89%, transparent 99%, transparent);
    -webkit-mask: conic-gradient(#000 89%, transparent 99%, transparent);
  }
  100% {
    mask: conic-gradient(#000 90%, transparent 100%, transparent);
    -webkit-mask: conic-gradient(#000 90%, transparent 100%, transparent);
  }
}
</style>