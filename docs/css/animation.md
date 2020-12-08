## CSS animation

!> 注释：Internet Explorer 9，以及更早的版本，不支持 `@keyframe` 规则或 `animation` 属性。

```css
div
{
animation: myfirst 5s;
-moz-animation: myfirst 5s;	/* Firefox */
-webkit-animation: myfirst 5s;	/* Safari 和 Chrome */
-o-animation: myfirst 5s;	/* Opera */
}

```

>#### 实例 ：
```css
@keyframes myfirst
{
from {background: red;}
to {background: yellow;}
}

@-moz-keyframes myfirst /* Firefox */
{
from {background: red;}
to {background: yellow;}
}

@-webkit-keyframes myfirst /* Safari 和 Chrome */
{
from {background: red;}
to {background: yellow;}
}

@-o-keyframes myfirst /* Opera */
{
from {background: red;}
to {background: yellow;}
}
```

<div class="animation-obg">
    CSS 动画
</div>

<br>

#### [W3C传送门](https://www.w3school.com.cn/css3/css3_animation.asp)

<br>

## CSS3 transition 属性

```css
div{
    width:100px;
    transition: width 2s;
    -moz-transition: width 2s; /* Firefox 4 */
    -webkit-transition: width 2s; /* Safari 和 Chrome */
    -o-transition: width 2s; /* Opera */
}

div:hover{
    width:300px;
}

```

>#### 图方便的写法（只有两个参数是位置可以互换）

```css
transition: 0.5s all;

```

?>**语法 ：** `transition: property duration timing-function delay;`

```bash
transition-property	        规定设置过渡效果的 CSS 属性的名称。

transition-duration	        规定完成过渡效果需要多少秒或毫秒。

transition-timing-function	规定速度效果的速度曲线。

transition-delay	        定义过渡效果何时开始。

```

<div class="transition-obg">⭐</div>

```css
.transition-obg{
    width:100px;
    height:100px;
    display:flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #f13232;
    background: #fd4733a3;
    border-radius: 5px;
    z-index: 10;
    transition: all 1s;
    cursor: grab;
}
.transition-obg:hover{
    transform: translate3d(10px, -10px, 0px);
}

```
#### [W3C传送门](https://www.w3school.com.cn/cssref/pr_transition.asp)

<br>

###  3D 旋转 rotate
```css
div
{
transform: rotateX(120deg);
-webkit-transform: rotateX(120deg);	/* Safari 和 Chrome */
-moz-transform: rotateX(120deg);	/* Firefox */
}

/* rotate3d(x,y,z,angle) */
```

?> X 轴平行屏幕水平、Y 轴平行屏幕竖直，Z 轴垂直穿过屏幕


!> 3D旋转的Z轴rotateZ相当于2D旋转的rotate   `transform: rotate(120deg) == transform: rotateZ(120deg)`

<br>

#### CSS3动画结束后停在最后一帧

?> `animation-fill-mode: forwards;`   保留最后一帧的状态

| 值 |描述 |
| :-------- | :--------|
| none | 不改变默认行为(默认) |
| forwards | 当动画完成后，保持最后一个属性值（在最后一个关键帧中定义） |
| backwards | 在 animation-delay 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义） |
| both | 向前和向后填充模式都被应用 |

<br>

#### [W3C传送门](https://www.w3school.com.cn/css3/css3_3dtransform.asp)




<script>

</script>

<style>
.animation-obg{
    width: 100px;
    height: 100px;
    text-align:center;
    background: #fffa1d;
    display:flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: relative;
    font-weight: bold;
    animation: animation 5s infinite;
    -moz-animation: animation 5s infinite;
    -webkit-animation: animation 5s infinite;
    -o-animation: animation 5s infinite;
    border-radius: 5px;
    -webkit-border-radius: 5px;
}
/* linear-gradient(45deg, #fffa1d, #59ff56, #00d7ff) */
@keyframes animation
{
    0% {
        transform: rotate(0deg);
        left: 0px;
        background:#fffa1d;
    }
    20% {
        transform: rotate(20deg);
        left: 0px;
         background: #59ff56;

    }
    40% {
        transform: rotate(0deg,0deg,0deg);
        left: 500px;
        background:#00d7ff;

    }
    60% {
        transform: rotate(0deg,180deg,0deg);
        transform: tr(0deg);
        left: 500px;
        background:#00d7ff;

    }
    80% {
        transform: rotate(0deg,360deg,0deg);
        left: 500px;
        background:#59ff56;
    }
    100% {
        transform: rotate(-360deg);
        left: 0px;
        background: #fffa1d;
    }
}
.transition-obg{
    width:100px;
    height:100px;
    display:flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #f13232;
    background: #fd4733a3;
    border-radius: 5px;
    z-index: 10;
    transition: all 1s;
    cursor: grab;
}
.transition-obg:hover{
    transform: translate3d(10px, -10px, 0px);
}
</style>