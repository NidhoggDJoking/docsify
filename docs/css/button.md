### CSS 按钮篇

<div class="bruce flex-ct-x" data-title="悬浮跟踪按钮">
	<a class="track-btn">
		<span>妙用CSS变量，让你的CSS变得更心动</span>
	</a>
</div>


<script>
const btn = document.getElementsByClassName("track-btn")[0];
const btnStyle = btn.style;

btn.addEventListener("mousemove", e => {
	btnStyle.setProperty("--x", `${e.offsetX}px`);
	btnStyle.setProperty("--y", `${e.offsetY}px`);
});
</script>

```html
<div class="bruce flex-ct-x" data-title="悬浮跟踪按钮">
	<a class="track-btn">
		<span>妙用CSS变量，让你的CSS变得更心动</span>
	</a>
</div>
```

```javascript
const btn = document.getElementsByClassName("track-btn")[0];
const btnStyle = btn.style;

btn.addEventListener("mousemove", e => {
	btnStyle.setProperty("--x", `${e.offsetX}px`);
	btnStyle.setProperty("--y", `${e.offsetY}px`);
});
```

```css
.Fabulous{
    width:100%;
}
.bruce {
    height: 15vh;
}
.flex-ct-x {
    display: flex;
    justify-content: center;
    align-items: center;
}
.track-btn {
    overflow: hidden;
    position: relative;
    border-radius: 25px;
    width: 400px;
    height: 50px;
    background-color: #66f;
    cursor: pointer;
    line-height: 50px;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    color: #fff;
}

.track-btn span {
    color: #fff;
    position: relative;
    pointer-events: none; /* 不加会卡顿 */
}

.track-btn:hover:before {
    --size: 400px;
}

.track-btn::before {
    --size: 0;
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: var(--size);
    height: var(--size);
    background-image: radial-gradient(circle closest-side, #09f, transparent);
    content: "";
    transform: translate3d(-50%, -50%, 0);
    transition: width 200ms ease, height 200ms ease;
}
```



<div class="Pembosek">
    <button>AVAILABLE NOW</button>
</div>

```html
<div class="Pembosek">
    <button>AVAILABLE NOW</button>
</div>
```

```css
/* 朋博赛克风格按钮 */
.Pembosek {
  min-width:50%;
  margin:0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background-color: #F8F005;
}

.Pembosek>button, .Pembosek>button::after {
  width: 380px;
  height: 86px;
  font-size: 36px;
  font-family: 'Bebas Neue', cursive;
  background: linear-gradient(45deg, transparent 5%, #FF013C 5%);
  border: 0;
  color: #fff;
  letter-spacing: 3px;
  line-height: 88px;
  box-shadow: 6px 0px 0px #00E6F6;
  outline: transparent;
  position: relative;
  cursor: pointer;
}

.Pembosek>button::after {
  --slice-0: inset(50% 50% 50% 50%);
  --slice-1: inset(80% -6px 0 0);
  --slice-2: inset(50% -6px 30% 0);
  --slice-3: inset(10% -6px 85% 0);
  --slice-4: inset(40% -6px 43% 0);
  --slice-5: inset(80% -6px 5% 0);
  
  content: 'AVAILABLE NOW';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 3%, #00E6F6 3%, #00E6F6 5%, #FF013C 5%);
  text-shadow: -3px -3px 0px #F8F005, 3px 3px 0px #00E6F6;
  clip-path: var(--slice-0);
}

.Pembosek>button:hover::after {
  animation: 1s glitch;
  animation-timing-function: steps(2, end);
}

@keyframes glitch {
  0% {
    clip-path: var(--slice-1);
    transform: translate(-20px, -10px);
  }
  10% {
    clip-path: var(--slice-3);
    transform: translate(10px, 10px);
  }
  20% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 10px);
  }
  30% {
    clip-path: var(--slice-3);
    transform: translate(0px, 5px);
  }
  40% {
    clip-path: var(--slice-2);
    transform: translate(-5px, 0px);
  }
  50% {
    clip-path: var(--slice-3);
    transform: translate(5px, 0px);
  }
  60% {
    clip-path: var(--slice-4);
    transform: translate(5px, 10px);
  }
  70% {
    clip-path: var(--slice-2);
    transform: translate(-10px, 10px);
  }
  80% {
    clip-path: var(--slice-5);
    transform: translate(20px, -10px);
  }
  90% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 0px);
  }
  100% {
    clip-path: var(--slice-1);
    transform: translate(0);
  }
}
```

<!-- 点赞 -->
<div class="Fabulous">
    <div class="bruce flex-ct-x" data-title="点赞按钮">
		<button class="like-btn">
			<div class="like-wrapper">
				<div class="like-ripple"></div>
				<svg class="like-heart" width="24" height="24" viewBox="0 0 24 24">
					<path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path></svg>
				<div class="like-particle" style="--line-count: 6">
					<div class="like-particle-item" style="--line-index: 0"></div>
					<div class="like-particle-item" style="--line-index: 1"></div>
					<div class="like-particle-item" style="--line-index: 2"></div>
					<div class="like-particle-item" style="--line-index: 3"></div>
					<div class="like-particle-item" style="--line-index: 4"></div>
					<div class="like-particle-item" style="--line-index: 5"></div>
				</div>
			</div>
		</button>
	</div>
</div>

```html
<div class="Fabulous">
    <div class="bruce flex-ct-x" data-title="点赞按钮">
		<button class="like-btn">
			<div class="like-wrapper">
				<div class="like-ripple"></div>
				<svg class="like-heart" width="24" height="24" viewBox="0 0 24 24">
					<path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,
                    3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,
                    3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,
                    15.36 13.45,20.03L12,21.35Z"></path></svg>
				<div class="like-particle" style="--line-count: 6">
					<div class="like-particle-item" style="--line-index: 0"></div>
					<div class="like-particle-item" style="--line-index: 1"></div>
					<div class="like-particle-item" style="--line-index: 2"></div>
					<div class="like-particle-item" style="--line-index: 3"></div>
					<div class="like-particle-item" style="--line-index: 4"></div>
					<div class="like-particle-item" style="--line-index: 5"></div>
				</div>
			</div>
		</button>
	</div>
</div>
```

```css
.Fabulous{
  height: 200px;
  margin-top: 100px;
}
.like-btn {
  position: relative;
  z-index: 1;
  border: none;
  border-radius: 100%;
  width: 1em;
  height: 1em;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  background-color: #fff;
  cursor: pointer;
  font-size: 200px;
  transition: all 500ms cubic-bezier(0.7, 0, 0.3, 1);
  outline: transparent;
}
.like-btn::before {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  box-shadow: 0 0.3em 0.6em rgba(0, 0, 0, 0.3);
  content: "";
  transition: inherit;
}
.like-btn::after {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  background-color: #fff;
  content: "";
}
.like-btn:active::before {
  -webkit-animation: depress-shadow 500ms cubic-bezier(0.7, 0, 0.3, 1) both;
          animation: depress-shadow 500ms cubic-bezier(0.7, 0, 0.3, 1) both;
}
.like-btn:focus::after {
  -webkit-animation: depress 500ms cubic-bezier(0.7, 0, 0.3, 1) both;
          animation: depress 500ms cubic-bezier(0.7, 0, 0.3, 1) both;
}

.like-wrapper {
  display: grid;
  justify-content: center;
  align-items: center;
}
.like-wrapper > * {
  grid-area: 1/1;
  margin: auto;
}

.like-ripple {
  overflow: hidden;
  position: relative;
  border-radius: 100%;
  width: 1em;
  height: 1em;
}
.like-ripple::before {
  position: absolute;
  left: 0;
  top: 0;
  border: 0.4em solid #f66;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  content: "";
  transform: scale(0);
}
.like-btn:focus .like-ripple::before {
  -webkit-animation: ripple-out 500ms cubic-bezier(0.7, 0, 0.3, 1);
          animation: ripple-out 500ms cubic-bezier(0.7, 0, 0.3, 1);
}

.like-heart {
  display: block;
  width: 0.5em;
  height: 0.5em;
  transform-origin: center 80%;
}
.like-heart path {
  transition: all 500ms cubic-bezier(0.7, 0, 0.3, 1);
  stroke: #f66;
  stroke-width: 2;
  fill: transparent;
}
.like-btn:focus .like-heart path {
  fill: #f66;
}
.like-btn:focus .like-heart {
  -webkit-animation: heart-bounce 500ms cubic-bezier(0.7, 0, 0.3, 1);
          animation: heart-bounce 500ms cubic-bezier(0.7, 0, 0.3, 1);
}

.like-particle {
  position: relative;
  width: 1px;
  height: 1px;
}

.like-particle-item {
  --Θ: calc(var(--line-index) / var(--line-count) * 1turn);
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 0.05em;
  width: 0.1em;
  height: 0.1em;
  transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(0) scaleY(0);
  transition: all 500ms cubic-bezier(0.7, 0, 0.3, 1);
}
.like-particle-item:nth-child(1) {
  background-color: #f66;
}
.like-particle-item:nth-child(2) {
  background-color: #66f;
}
.like-particle-item:nth-child(3) {
  background-color: #f90;
}
.like-particle-item:nth-child(4) {
  background-color: #09f;
}
.like-particle-item:nth-child(5) {
  background-color: #9c3;
}
.like-particle-item:nth-child(6) {
  background-color: #3c9;
}
.like-btn:focus .like-particle-item {
  -webkit-animation: particle-out calc(500ms * 1.2) cubic-bezier(0.7, 0, 0.3, 1) forwards;
          animation: particle-out calc(500ms * 1.2) cubic-bezier(0.7, 0, 0.3, 1) forwards;
}

.like-btn:focus {
  cursor: normal;
  pointer-events: none;
}

@-webkit-keyframes depress {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: translateY(5%) scale(0.9);
  }
}

@keyframes depress {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: translateY(5%) scale(0.9);
  }
}
@-webkit-keyframes depress-shadow {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale(0.5);
  }
}
@keyframes depress-shadow {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale(0.5);
  }
}
@-webkit-keyframes heart-bounce {
  0%, 80%, 100% {
    transform: scale(1);
  }
  40% {
    transform: scale(0.7);
  }
}
@keyframes heart-bounce {
  0%, 80%, 100% {
    transform: scale(1);
  }
  40% {
    transform: scale(0.7);
  }
}
@-webkit-keyframes particle-out {
  50% {
    height: 0.3em;
  }
  50%, 60% {
    height: 0.3em;
    transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(0.8em) scale(1);
  }
  60% {
    height: 0.2em;
  }
  100% {
    transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(1em) scale(0);
  }
}
@keyframes particle-out {
  50% {
    height: 0.3em;
  }
  50%, 60% {
    height: 0.3em;
    transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(0.8em) scale(1);
  }
  60% {
    height: 0.2em;
  }
  100% {
    transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(1em) scale(0);
  }
}
@-webkit-keyframes ripple-out {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(5);
  }
}
@keyframes ripple-out {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(5);
  }
}
```


#### 小结：

 无论是通过 `btnStyle.setProperty("--x", ${e.offsetX}px);` 来控制 `left: var(--x);`
 还是 `style="--line-index: 0"` 直接影响 `var(--line-index)`
 都是可以在不改动ClassName的前提下改变CSS的渲染效果，
 而这种变量在Sass和Less是无法通过这种简单方法来实现。
 这可能就是`Facebook 重构：抛弃 Sass / Less ，迎接原子化 CSS 时代`的理由
 而 `CSS-in-JS` 被视为是`自动化的原子 CSS` 在React得到很好的体现
 Vue3里也提出新特性： [单文件组件状态驱动的 CSS 变量](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-style-variables.md)
>  通过这篇文章可以学习‘原子化 CSS’的代码风格，在迎接原子化 CSS 时代缓缓过度。



<div class="switch">
  <input type="checkbox" id="radio-switch" style="display: none" />
  <label for="radio-switch">
    <div></div>
  </label>
</div>

```html
<div class="switch">
  <input type="checkbox" id="radio-switch" style="display: none" />
  <label for="radio-switch">
    <div></div>
  </label>
</div>
```

```css
.switch>label {
  display: flex;
  border-radius: 99px;
  height: 32px;
  width: 64px;
  background-color: rgba(0, 0, 0, .1);
  border: 1px solid rgba(0, 0, 0, .3);
  background-color: #357edd;
  border: 1px solid #357edd;
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
  border: 1px solid rgba(0, 0, 0, .3);
}

.switch>input[type=checkbox]:checked+label>div {
  border: 1px solid rgba(156, 156, 156, 0.3);
}
```

<style>
/* .markdown-section pre>code{} */

/* 渐变按钮 */

.bruce {
    height: 15vh;
}
.flex-ct-x {
    display: flex;
    justify-content: center;
    align-items: center;
}
.track-btn {
    overflow: hidden;
    position: relative;
    border-radius: 25px;
    width: 400px;
    height: 50px;
    background-color: #66f;
    cursor: pointer;
    line-height: 50px;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    color: #fff;
}

.track-btn span {
    color: #fff;
    position: relative;
    pointer-events: none; /* 不加会卡顿 */
}

.track-btn:hover:before {
    --size: 400px;
}

/* 此处编译错误：
.track-btn<img class="emoji" src="https://github.githubassets.com/images/icons/emoji/hover.png" alt="hover" />before {
    --size: 400px;
} */

/* 原因:默认是提供 emoji 解析的，能将类似 :100: 解析成 100。但是它不是精准的，因为没有处理非 emoji 的字符串。
如果你需要正确解析 emoji 字符串，你可以引入这个插件。'//cdn.jsdelivr.net/npm/docsify/lib/plugins/emoji.min.js' 
禁用 emoji 解析。
noEmoji: true,
*/

.track-btn::before {
    --size: 0;
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: var(--size);
    height: var(--size);
    background-image: radial-gradient(circle closest-side, #09f, transparent);
    content: "";
    transform: translate3d(-50%, -50%, 0);
    transition: width 200ms ease, height 200ms ease;
}

/* 朋博赛克风格按钮 */
.Pembosek {
  min-width:50%;
  margin:0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background-color: #F8F005;
}

.Pembosek>button, .Pembosek>button::after {
  width: 380px;
  height: 86px;
  font-size: 36px;
  font-family: 'Bebas Neue', cursive;
  background: linear-gradient(45deg, transparent 5%, #FF013C 5%);
  border: 0;
  color: #fff;
  letter-spacing: 3px;
  line-height: 88px;
  box-shadow: 6px 0px 0px #00E6F6;
  outline: transparent;
  position: relative;
  cursor: pointer;
}

.Pembosek>button::after {
  --slice-0: inset(50% 50% 50% 50%);
  --slice-1: inset(80% -6px 0 0);
  --slice-2: inset(50% -6px 30% 0);
  --slice-3: inset(10% -6px 85% 0);
  --slice-4: inset(40% -6px 43% 0);
  --slice-5: inset(80% -6px 5% 0);
  
  content: 'AVAILABLE NOW';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 3%, #00E6F6 3%, #00E6F6 5%, #FF013C 5%);
  text-shadow: -3px -3px 0px #F8F005, 3px 3px 0px #00E6F6;
  clip-path: var(--slice-0);
}

.Pembosek>button:hover::after {
  animation: 1s glitch;
  animation-timing-function: steps(2, end);
}

@keyframes glitch {
  0% {
    clip-path: var(--slice-1);
    transform: translate(-20px, -10px);
  }
  10% {
    clip-path: var(--slice-3);
    transform: translate(10px, 10px);
  }
  20% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 10px);
  }
  30% {
    clip-path: var(--slice-3);
    transform: translate(0px, 5px);
  }
  40% {
    clip-path: var(--slice-2);
    transform: translate(-5px, 0px);
  }
  50% {
    clip-path: var(--slice-3);
    transform: translate(5px, 0px);
  }
  60% {
    clip-path: var(--slice-4);
    transform: translate(5px, 10px);
  }
  70% {
    clip-path: var(--slice-2);
    transform: translate(-10px, 10px);
  }
  80% {
    clip-path: var(--slice-5);
    transform: translate(20px, -10px);
  }
  90% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 0px);
  }
  100% {
    clip-path: var(--slice-1);
    transform: translate(0);
  }
}

/* 点赞按钮 */
.Fabulous{
  height: 250px;
  margin-top: 150px;
}
.like-btn {
  position: relative;
  z-index: 1;
  border: none;
  border-radius: 100%;
  width: 1em;
  height: 1em;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  background-color: #fff;
  cursor: pointer;
  font-size: 200px;
  transition: all 500ms cubic-bezier(0.7, 0, 0.3, 1);
  outline: transparent;
}
.like-btn::before {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  box-shadow: 0 0.3em 0.6em rgba(0, 0, 0, 0.3);
  content: "";
  transition: inherit;
}
.like-btn::after {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  background-color: #fff;
  content: "";
}
.like-btn:active::before {
  -webkit-animation: depress-shadow 500ms cubic-bezier(0.7, 0, 0.3, 1) both;
          animation: depress-shadow 500ms cubic-bezier(0.7, 0, 0.3, 1) both;
}
.like-btn:focus::after {
  -webkit-animation: depress 500ms cubic-bezier(0.7, 0, 0.3, 1) both;
          animation: depress 500ms cubic-bezier(0.7, 0, 0.3, 1) both;
}

.like-wrapper {
  display: grid;
  justify-content: center;
  align-items: center;
}
.like-wrapper > * {
  grid-area: 1/1;
  margin: auto;
}

.like-ripple {
  overflow: hidden;
  position: relative;
  border-radius: 100%;
  width: 1em;
  height: 1em;
}
.like-ripple::before {
  position: absolute;
  left: 0;
  top: 0;
  border: 0.4em solid #f66;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  content: "";
  transform: scale(0);
}
.like-btn:focus .like-ripple::before {
  -webkit-animation: ripple-out 500ms cubic-bezier(0.7, 0, 0.3, 1);
          animation: ripple-out 500ms cubic-bezier(0.7, 0, 0.3, 1);
}

.like-heart {
  display: block;
  width: 0.5em;
  height: 0.5em;
  transform-origin: center 80%;
}
.like-heart path {
  transition: all 500ms cubic-bezier(0.7, 0, 0.3, 1);
  stroke: #f66;
  stroke-width: 2;
  fill: transparent;
}
.like-btn:focus .like-heart path {
  fill: #f66;
}
.like-btn:focus .like-heart {
  -webkit-animation: heart-bounce 500ms cubic-bezier(0.7, 0, 0.3, 1);
          animation: heart-bounce 500ms cubic-bezier(0.7, 0, 0.3, 1);
}

.like-particle {
  position: relative;
  width: 1px;
  height: 1px;
}

.like-particle-item {
  --Θ: calc(var(--line-index) / var(--line-count) * 1turn);
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 0.05em;
  width: 0.1em;
  height: 0.1em;
  transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(0) scaleY(0);
  transition: all 500ms cubic-bezier(0.7, 0, 0.3, 1);
}
.like-particle-item:nth-child(1) {
  background-color: #f66;
}
.like-particle-item:nth-child(2) {
  background-color: #66f;
}
.like-particle-item:nth-child(3) {
  background-color: #f90;
}
.like-particle-item:nth-child(4) {
  background-color: #09f;
}
.like-particle-item:nth-child(5) {
  background-color: #9c3;
}
.like-particle-item:nth-child(6) {
  background-color: #3c9;
}
.like-btn:focus .like-particle-item {
  -webkit-animation: particle-out calc(500ms * 1.2) cubic-bezier(0.7, 0, 0.3, 1) forwards;
          animation: particle-out calc(500ms * 1.2) cubic-bezier(0.7, 0, 0.3, 1) forwards;
}

.like-btn:focus {
  cursor: normal;
  pointer-events: none;
}

@-webkit-keyframes depress {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: translateY(5%) scale(0.9);
  }
}

@keyframes depress {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: translateY(5%) scale(0.9);
  }
}
@-webkit-keyframes depress-shadow {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale(0.5);
  }
}
@keyframes depress-shadow {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale(0.5);
  }
}
@-webkit-keyframes heart-bounce {
  0%, 80%, 100% {
    transform: scale(1);
  }
  40% {
    transform: scale(0.7);
  }
}
@keyframes heart-bounce {
  0%, 80%, 100% {
    transform: scale(1);
  }
  40% {
    transform: scale(0.7);
  }
}
@-webkit-keyframes particle-out {
  50% {
    height: 0.3em;
  }
  50%, 60% {
    height: 0.3em;
    transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(0.8em) scale(1);
  }
  60% {
    height: 0.2em;
  }
  100% {
    transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(1em) scale(0);
  }
}
@keyframes particle-out {
  50% {
    height: 0.3em;
  }
  50%, 60% {
    height: 0.3em;
    transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(0.8em) scale(1);
  }
  60% {
    height: 0.2em;
  }
  100% {
    transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(1em) scale(0);
  }
}
@-webkit-keyframes ripple-out {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(5);
  }
}
@keyframes ripple-out {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(5);
  }
}

/* switch 按钮 */

.switch>label {
  display: flex;
  border-radius: 99px;
  height: 32px;
  width: 64px;
  background-color: rgba(0, 0, 0, .1);
  border: 1px solid rgba(0, 0, 0, .3);
  background-color: #357edd;
  border: 1px solid #357edd;
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
  border: 1px solid rgba(0, 0, 0, .3);
}

.switch>input[type=checkbox]:checked+label>div {
  border: 1px solid rgba(156, 156, 156, 0.3);
}
</style>