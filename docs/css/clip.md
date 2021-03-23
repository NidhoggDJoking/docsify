# clip-path
> #### CSS 属性使用裁剪方式创建元素的可显示区域。区域内的部分显示，区域外的隐藏。
<hr>

# `文字裂开效果`

<div class="clipbox">
    <div class="clip" data-text="Text Crack">
        <span>Text Crack</span>
    </div>
</div>


```HTML
<div class="clipbox">
    <div class="clip" data-text="Text Crack">
        <span>Text Crack</span>
    </div>
</div>

```

```css
.clipbox{
    display: flex;
    height: 200px;
    width: 100%;
    background-color: #151515;
    overflow: hidden;
    font-family: sans-serif;
    border-radius: 8px;
    cursor:pointer;
}
.clip {
    position: relative;
    margin: auto;
    font-size: calc(20px + 5vw);
    font-weight: bold;
    color: #fff;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    text-shadow: 0 0 10px blue;
    user-select: none;
    white-space: nowrap;
    filter: blur(0.007em);
    animation: shake 2.5s linear forwards;
    /* infinite */
}

.clip span {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    clip-path: polygon(10% 0%, 44% 0%, 70% 100%, 55% 100%);
}

.clip::before,
.clip::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
}

.clip::before {
    animation: crack1 2.5s linear forwards;
    clip-path: polygon(0% 0%, 10% 0%, 55% 100%, 0% 100%);
}

.clip::after {
    animation: crack2 2.5s linear forwards;
    clip-path: polygon(44% 0%, 100% 0%, 100% 100%, 70% 100%);
}

@keyframes shake {
    5%,
    15%,
    25%,
    35%,
    55%,
    65%,
    75%,
    95% {
        filter: blur(0.018em);
        transform: translateY(0.018em) rotate(0deg);
    }

    10%,
    30%,
    40%,
    50%,
    70%,
    80%,
    90% {
        filter: blur(0.01em);
        transform: translateY(-0.018em) rotate(0deg);
    }

    20%,
    60% {
        filter: blur(0.03em);
        transform: translate(-0.018em, 0.018em) rotate(0deg);
    }

    45%,
    85% {
        filter: blur(0.03em);
        transform: translate(0.018em, -0.018em) rotate(0deg);
    }

    100% {
        filter: blur(0.007em);
        transform: translate(0) rotate(-0.5deg);
    }
}

@keyframes crack1 {
    0%,
    95% {
        transform: translate(-50%, -50%);
    }

    100% {
        transform: translate(-53%, -47%);
    }
}

@keyframes crack2 {
    0%,
    95% {
        transform: translate(-50%, -50%);
    }

    100% {
        transform: translate(-47%, -53%);
    }
}

```

?> **思路:** 将带有文字的元素和拥有相同文字的两个伪类通过`clip-path`分别裁剪成合适拼图模块,通过`translate`偏移达到文字裂开的效果。

<hr>


#### [CSS clip-path 生成器](https://www.html.cn/tool/css-clip-path/)

<br/>

 `clip-path CSS` 属性可以创建一个只有元素的部分区域可以显示的剪切区域。区域内的部分显示，区域外的隐藏。剪切区域是被引用内嵌的URL定义的路径或者外部 SVG 的路径。

<div class="clipath">Hello</div>

```html
<div class="clipath">Hello</div>
```

```css
.clipath {
    position: relative;
    margin: auto;
    width: 160px;
    line-height: 160px;
    text-align: center;
    font-size: 24px;
}

.clipath::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid gold;
    transition: all .5s;
    animation: clippath 3s infinite linear;
}

@keyframes clippath {
    0%,
    100% {
        clip-path: inset(0 0 95% 0);
    }

    25% {
        clip-path: inset(0 95% 0 0);
    }
    50% {
        clip-path: inset(95% 0 0 0);
    }
    75% {
        clip-path: inset(0 0 0 95%);
    }
}
```

<script>
$('.clipbox').click(function(){
    console.log("%c这里还没写"," text-shadow: 0 1px 0 #0066cc,0 2px 0 #c9c9c9,0 3px 0 #bbb;font-size:2em")
});
</script>



<style>
/* @import url('static/css/code3.css'); */
.clipbox{
    display: flex;
    height: 200px;
    width: 100%;
    background-color: #151515;
    overflow: hidden;
    font-family: sans-serif;
    border-radius: 8px;
    cursor:pointer;
}
.clip {
    position: relative;
    margin: auto;
    font-size: calc(16px + 5vw);
    font-weight: bold;
    color: #fff;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    text-shadow: 0 0 10px blue;
    user-select: none;
    white-space: nowrap;
    filter: blur(0.007em);
    animation: shake 2.5s linear forwards;
    /* infinite */
}

.clip span {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    clip-path: polygon(10% 0%, 44% 0%, 70% 100%, 55% 100%);
}

.clip::before,
.clip::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
}

.clip::before {
    animation: crack1 2.5s linear forwards;
    clip-path: polygon(0% 0%, 10% 0%, 55% 100%, 0% 100%);
}

.clip::after {
    animation: crack2 2.5s linear forwards;
    clip-path: polygon(44% 0%, 100% 0%, 100% 100%, 70% 100%);
}

@keyframes shake {
    5%,
    15%,
    25%,
    35%,
    55%,
    65%,
    75%,
    95% {
        filter: blur(0.018em);
        transform: translateY(0.018em) rotate(0deg);
    }

    10%,
    30%,
    40%,
    50%,
    70%,
    80%,
    90% {
        filter: blur(0.01em);
        transform: translateY(-0.018em) rotate(0deg);
    }

    20%,
    60% {
        filter: blur(0.03em);
        transform: translate(-0.018em, 0.018em) rotate(0deg);
    }

    45%,
    85% {
        filter: blur(0.03em);
        transform: translate(0.018em, -0.018em) rotate(0deg);
    }

    100% {
        filter: blur(0.007em);
        transform: translate(0) rotate(-0.5deg);
    }
}

@keyframes crack1 {
    0%,
    95% {
        transform: translate(-50%, -50%);
    }

    100% {
        transform: translate(-53%, -47%);
    }
}

@keyframes crack2 {
    0%,
    95% {
        transform: translate(-50%, -50%);
    }

    100% {
        transform: translate(-47%, -53%);
    }
}


.clipath {
    position: relative;
    margin: auto;
    width: 160px;
    line-height: 160px;
    text-align: center;
    font-size: 24px;
}

.clipath::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid gold;
    transition: all .5s;
    animation: clippath 3s infinite linear;
}

@keyframes clippath {
    0%,
    100% {
        clip-path: inset(0 0 95% 0);
    }

    25% {
        clip-path: inset(0 95% 0 0);
    }
    50% {
        clip-path: inset(95% 0 0 0);
    }
    75% {
        clip-path: inset(0 0 0 95%);
    }
}
</style>