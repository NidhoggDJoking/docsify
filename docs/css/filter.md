## CSS3 filter(滤镜) 属性

<hr>

> #### 例如：修改所有图片的颜色为黑白 (100% 灰度)

```css
img {
    -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
    filter: grayscale(100%);
}
```
<div class="img-box-father">
    <div class="img-box">
        <img src="static/png/DeeMo.jpg">
        <span>灰度</span>
    </div>
    <div class="img-box">
        <img src="static/png/DeeMo.jpg">
        <span>褐色</span>
    </div>
    <div class="img-box">
        <img src="static/png/DeeMo.jpg">
        <span>饱和度</span>
    </div>
    <div class="img-box">
        <img src="static/png/DeeMo.jpg">
        <span>反色</span>
    </div>
    <div class="img-box">
        <img src="static/png/DeeMo.jpg">
        <span>透明度</span>
    </div>
    <div class="img-box">
        <img src="static/png/DeeMo.jpg">
        <span>亮度</span>
    </div>
    <div class="img-box">
        <img src="static/png/DeeMo.jpg">
        <span>对比度</span>
    </div>
    <div class="img-box">
        <img src="static/png/DeeMo.jpg">
        <span>模糊</span>
    </div>
    <div class="img-box">
        <img src="static/png/DeeMo.jpg">
        <span>阴影</span>
    </div>
    <div class="img-box">
        <img src="static/png/DeeMo.jpg">
        <span>色相旋转</span>
    </div>
        <div class="img-box">
        <img src="static/png/DeeMo.jpg">
        <span>无</span>
    </div>
</div>

`同时添加了 cursor 演示`

```css
     /* 灰度 */
    .img-box:nth-child(1)>img{
        -webkit-filter: grayscale(1);
        filter: grayscale(1);
        cursor: alias;
    }
    /* 褐色 */
    .img-box:nth-child(2)>img{
        -webkit-filter: sepia(1);
        filter: sepia(1);
        cursor: all-scroll;
    }
    /* 饱和度 */
    .img-box:nth-child(3)>img{
        -webkit-filter: saturate(2);
        filter: saturate(2);
        cursor: wait;
    }
    /* 反色 */
    .img-box:nth-child(4)>img{
        -webkit-filter: invert(1);
        filter: invert(1);
        cursor: cell;
    }
    /* 透明度 */
    .img-box:nth-child(5)>img{
        -webkit-filter: opacity(.2);
        filter: opacity(.2);
        cursor: w-resize;
    }
    /* 亮度 */
    .img-box:nth-child(6)>img{
        -webkit-filter: brightness(.5);
        filter: brightness(.5);
        cursor: col-resize;
    }
    /* 对比度 */
    .img-box:nth-child(7)>img{
        -webkit-filter: contrast(2);
        filter: contrast(2);
        cursor: zoom-in;
    }
    /* 模糊 */
    .img-box:nth-child(8)>img{
         -webkit-filter: blur(3px);
         filter: blur(3px);
         cursor: copy;
    }
    /* 阴影 */
    .img-box:nth-child(9)>img{
        -webkit-filter: drop-shadow(5px 5px 5px #ccc);
        filter: drop-shadow(5px 5px 5px #ccc);
        cursor: crosshair;
    }
    /* 色相旋转 */
    .img-box:nth-child(10)>img{
        -webkit-filter: hue-rotate(90deg);
        filter: hue-rotate(90deg);
        cursor: grabbing;
    }
```

!> IOS : -webkit-backdrop-filter



<style>
   .img-box-father{
        display:flex;
        justify-content:space-around;
        flex-wrap:wrap;
    }
   .img-box{
        display:flex;
        flex-direction:column;
        margin:16px;
    }
   .img-box > span{
        text-align:center;
        height: 35px;
        line-height: 30px;
        font-family: cursive;
        color: #3c3c3c;
        font-weight: 700;
        font-size: 16px;
    }
   .img-box>img{
        width:150px;
        height:150px;
    }
     /* 灰度 */
    .img-box:nth-child(1)>img{
        -webkit-filter: grayscale(1);
        filter: grayscale(1);
        cursor: alias;
    }
    /* 褐色 */
    .img-box:nth-child(2)>img{
        -webkit-filter: sepia(1);
        filter: sepia(1);
        cursor: all-scroll;
    }
    /* 饱和度 */
    .img-box:nth-child(3)>img{
        -webkit-filter: saturate(2);
        filter: saturate(2);
        cursor: wait;
    }
    /* 反色 */
    .img-box:nth-child(4)>img{
        -webkit-filter: invert(1);
        filter: invert(1);
        cursor: cell;
    }
    /* 透明度 */
    .img-box:nth-child(5)>img{
        -webkit-filter: opacity(.2);
        filter: opacity(.2);
        cursor: w-resize;
    }
    /* 亮度 */
    .img-box:nth-child(6)>img{
        -webkit-filter: brightness(.5);
        filter: brightness(.5);
        cursor: col-resize;
    }
    /* 对比度 */
    .img-box:nth-child(7)>img{
        -webkit-filter: contrast(2);
        filter: contrast(2);
        cursor: zoom-in;
    }
    /* 模糊 */
    .img-box:nth-child(8)>img{
         -webkit-filter: blur(3px);
         filter: blur(3px);
         cursor: copy;
    }
    /* 阴影 */
    .img-box:nth-child(9)>img{
        -webkit-filter: drop-shadow(5px 5px 5px #ccc);
        filter: drop-shadow(5px 5px 5px #ccc);
        cursor: crosshair;
    }
    /* 色相旋转 */
    .img-box:nth-child(10)>img{
        -webkit-filter: hue-rotate(90deg);
        filter: hue-rotate(90deg);
        cursor: grabbing;
    }
</style>