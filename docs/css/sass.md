# CSS 预处理之 Sass

>####  基本用法不在阐述了与`Less`类似


- ####  Sass 变量使用 `calc()` 需使用` #{ } `包裹

```css
<!-- 例子 -->
.toolTitle {
	$txtHei:80rpx;
	$fontSize:32rpx;
	position: relative;
	width: 340rpx;
	height: $txtHei;
	margin: 0 auto;
	font-size: $fontSize;
	color: #333;
	font-weight: 700;
	text-align: center;
    // 运算符间保留空格 
	line-height: calc(#{$txtHei} * 2 - #{$fontSize} / 2);
}
```

---

- ### 混合器

?> 混合器使用`@mixin`标识符定义。看上去很像其他的CSS @标识符，比如说`@media`或者`@font-face`。这个标识符给一大段样式赋予一个名字，这样你就可以轻易地通过引用这个名字重用这段样式。下边的这段sass代码，定义了一个非常简单的混合器，目的是添加跨浏览器的圆角边框。

```css
@mixin bet{
	display: flex;
	justify-content: space-between;
	align-content: center;
}
<!-- @include bet-->

@mixin over($width) {
	max-width: $width;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
/* 使用 */
<!-- @include over(50%)-->
```

```css
.notice {
    @include over(50%)
}
/* 即 */
.notice {
    max-width: 50%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
```

### 样式结构与伪类

```html
<div class="box">
	<div class="box-content"></div>
</div>
```

```css
.box {
	width: 100%;
	height: 100%;
	position: relative;
	&-content {
		width: 100%;
		height: 100%;
	}
	&::after {
		content: '';
		position: absolute;
		top: 0px;
		right: 0px;
		width: 0;
		height: 0;
	}
	&::before {
		content: '';
		position: absolute;
		bottom: 0px;
		right: 0px;
		width: 0;
		height: 0;
	}
}
```

#### [Sass传送门](https://www.sass.hk/guide/)

<style>
/* @import url('static/css/vueCode.css'); */
</style>