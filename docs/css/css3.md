### CSS 文本溢出

<br>

>#### 单行文本溢出

<p style="font-family: HYDiS;font-size: 1.8rem;line-height: 2.6rem;color: #4c4c4c;" class="text-overflow">
    もうあなたからあいされることも、必要(ひつよう)とされることもない、そして私はこうして一人ぼつちで。
</p>

```css
p{
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
```

>#### 多行文本溢出

<p style="font-family: HYDiS;font-size: 1.2rem;line-height: 2.6rem;" class="text-overflow2">
    もうあなたからあいされることも、必要(ひつよう)とされることもない、そして私はこうして一人ぼつちで。離さないで、ぎゆつと手握つていて、優しかった。誰かを愛することなんてできるわけなくつて。だけど誰かに愛いされたくて、変わらない昨日(きのう)が　私ときみ。神きま、どこへ行(ぎょう)つてしまつたの　いつだつてそうだよ　あなだと行く　どんな罪(つみ)も　(せおい)背負いつてあげる(みち)道なき道を 歩(ほ)いてくの、あなたと二人で。
</p>


```css
p{  
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
```

### CSS 文本阴影

<br>

<h1 style="text-shadow: 5px 5px 5px #ff0053;" class="text-color">文本阴影效果</h1>

<br>

```css
.text{
    text-shadow: 5px 5px 5px #ff0053;
    animation: text 5s infinite;
}
@keyframes text
    {
        0%   {
            text-shadow: 5px 5px 5px #ff0053;
        }
        25%  {
            text-shadow: 5px 5px 5px #00ffa0;
        }
        50%  {
            text-shadow: 5px 5px 5px #ff7500;
        }
        75%  {
            text-shadow: 5px 5px 5px #2196f3;
        }
        100% {
            text-shadow: 5px 5px 5px #ff0053;
        }
    }
```

### CSS 自动换行

!> 中文自动换行，主要是针对`英语单词`的属性 

<div class="css-text-box">

<p style="border:2px solid #828282;width:190px;word-wrap: normal;padding:15px;border-image: linear-gradient(to right,#23cbcb,#c2c500,#21ff63,#26f7f2,#00d61d) 1 10;">
    This paragraph contains a very long word: thisisaveryveryveryveryveryverylongword. The long word will break and wrap to the next line.
</p>

<p style="width:190px;word-wrap:break-word;padding:15px;" class="boder-color">
    This paragraph contains a very long word: thisisaveryveryveryveryveryverylongword. The long word will break and wrap to the next line.
</p>

</div>


?> 在 CSS3 中，word-wrap 属性允许您允许文本强制文本进行换行 - 即使这意味着会对`单词`进行拆分

```css
p {
    word-wrap:break-word;
}
/*当屏幕尺寸小于600px时，应用下面的CSS样式*/
 @media screen and (max-width: 600px) { 
        .css-text-box{
            display:block;
        }      
}
```

### CSS 字体渐变色`ZERO`

<br>

<h5 style="font-family: HYDiS;font-size: 2rem;" class="text-gradient">愛にできることはまだあるかい、僕はできることはまだあるかい。</h5>

<br>

```css
.text-gradient{
    font-size: 1rem;
    color: transparent;
    font-family: HYDiS;
    -webkit-background-clip: text;
    background: linear-gradient(to right, #00bcff, #00ff96,#fbff00,#ff7600);
}
```
### CSS 字体动画渐变色`ONE`

<br>

<h5 style="font-family: HYDiS;font-size: 2rem;" class="text-gradient2">愛にできることはまだあるかい、僕はできることはまだあるかい。</h5>

<br>

```css
.text-gradient2{
        background: linear-gradient(to right, #00bcff, #00ff96,#fbff00,#ff7600);
        -webkit-background-clip: text;
        color: transparent;
        animation: color 5s infinite;
    }
    @keyframes color
        {
            0%   {
               background: linear-gradient(to right, #00bcff, #00ff96,#fbff00,#ff7600);
               -webkit-background-clip: text;
            }
            25%  {
                background: linear-gradient(to right, #ff7600,#00bcff, #00ff96,#fbff00);
                -webkit-background-clip: text;
            }
            50%  {
                background: linear-gradient(to right, #fbff00,#ff7600,#00bcff, #00ff96);
                -webkit-background-clip: text;
            }
            75%  {
                background: linear-gradient(to right, #00ff96,#fbff00,#ff7600,#00bcff);
                -webkit-background-clip: text;
            }
            100% {
                background: linear-gradient(to right, #00bcff,#00ff96,#fbff00,#ff7600);
                -webkit-background-clip: text;
            }
    }
```
!>  `当渐变颜色遇上CSS动画时无法像纯色一样自然的过度，如果是单纯的霓虹灯效果这种方法还是可以用的!`

### CSS 字体动画渐变色`TWO`

<br>

<h5 style="font-family: HYDiS;font-size: 2rem;" class="text-gradient3">愛にできることはまだあるかい、僕はできることはまだあるかい。</h5>

<br>

```css
.text-gradient3{
        background-image: -webkit-linear-gradient(left,#D81159, #E53A40 10%, #FFBC42 20%, #75D701 30%, #30A9DE 40%,#D81159 50%, #E53A40 60%, #FFBC42 70%, #75D701 80%, #30A9DE 90%,#D81159);
        background-size: 200% 100%;
        -webkit-background-clip: text;
        color: transparent;
        animation: color2 3s infinite;
}

@keyframes color2{
        0%{
            background-position: 0 0;
        }
        100%{
            background-position: -100% 0;
        }
}    
```
!> 效果是靠`background-size: 200% 100%;`将背景拉伸一倍在通过动画`background-position: -100% 0;`移动背景位置达到效果,背景颜色必须首尾色差不大不然会显得不连贯。
<style>
    .text-overflow{
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .text-overflow2{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    .text-color{
        animation: text 5s infinite;
        text-align: center;
    }

    .css-text-box{
        display:flex;
        justify-content: space-around;
    }
    @media screen and (max-width: 600px) { /*当屏幕尺寸小于600px时，应用下面的CSS样式*/
        .css-text-box{
            display:block;
        }      
    }
    .boder-color{
         border: 2px solid;
         border-image:linear-gradient(to right,#cb2323,#ffc800,#23cb55,#17dad6,#9423cb) 1 10;
    }
    @keyframes text
        {
            0%   {
                text-shadow: 5px 5px 5px #ff0053;
            }
            25%  {
                text-shadow: 5px 5px 5px #00ffa0;
            }
            50%  {
                text-shadow: 5px 5px 5px #ff7500;
            }
            75%  {
                text-shadow: 5px 5px 5px #2196f3;
            }
            100% {
                text-shadow: 5px 5px 5px #ff0053;
            }
    }
    .text-gradient{
        background: linear-gradient(to right, #00bcff, #00ff96,#fbff00,#ff7600);
        -webkit-background-clip: text;
        color: transparent;
    }
    .text-gradient2{
        background: linear-gradient(to right, #00bcff, #00ff96,#fbff00,#ff7600);
        -webkit-background-clip: text;
        color: transparent;
        animation: color 4s infinite;
    }
    .text-gradient3{
        background-image: -webkit-linear-gradient(left,#D81159, #E53A40 10%, #FFBC42 20%, #75D701 30%, #30A9DE 40%,#D81159 50%, #E53A40 60%, #FFBC42 70%, #75D701 80%, #30A9DE 90%,#D81159);
        background-size: 200% 100%;
        -webkit-background-clip: text;
        color: transparent;
        animation: color2 3s infinite;
    }
    @keyframes color
        {
            0%   {
               background: linear-gradient(to right, #00bcff, #00ff96,#fbff00,#ff7600);
               -webkit-background-clip: text;
                color: transparent;
            }
            25%  {
                background: linear-gradient(to right, #ff7600,#00bcff, #00ff96,#fbff00);
                -webkit-background-clip: text;
            }
            50%  {
                background: linear-gradient(to right, #fbff00,#ff7600,#00bcff, #00ff96);
                -webkit-background-clip: text;
            }
            75%  {
                background: linear-gradient(to right, #00ff96,#fbff00,#ff7600,#00bcff);
                -webkit-background-clip: text;
            }
            100% {
                background: linear-gradient(to right, #00bcff,#00ff96,#fbff00,#ff7600);
                -webkit-background-clip: text;
            }
    }
    @keyframes color2
    {
        0%{
            background-position: 0 0;
        }
        100%{
            background-position: -100% 0;
        }
    }
</style>