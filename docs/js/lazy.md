### 图片懒加载

---

> #### 通过元素高度判断进行加载

<div class="container">
        <div class="img">
            <!-- 注意我们并没有为它引入真实的src -->
            <i class="icon iconfont icon-tupian"></i>
            <img class="pic" alt="加载中" data-src="static/png/1980/1.jpg"">
        </div>
        <div class="img">
            <i class="icon iconfont icon-tupian"></i>
            <img class="pic" alt="加载中" data-src="static/png/1980/2.jpg"">
        </div>
        <div class="img">
            <i class="icon iconfont icon-tupian"></i>
            <img class="pic" alt="加载中" data-src="static/png/1980/3.jpg"">
        </div>
        <div class="img">
            <i class="icon iconfont icon-tupian"></i>
            <img class="pic" alt="加载中" data-src="static/png/1980/4.jpg"">
        </div>
        <div class="img">
            <i class="icon iconfont icon-tupian"></i>
            <img class="pic" alt="加载中" data-src="static/png/1980/5.jpg"">
        </div>
        <div class="img">
            <i class="icon iconfont icon-tupian"></i>
            <img class="pic" alt="加载中" data-src="static/png/1980/6.jpg"">
        </div>
        <div class="img">
            <i class="icon iconfont icon-tupian"></i>
            <img class="pic" alt="加载中" data-src="static/png/1980/7.jpg"">
        </div>
        <div class="img">
            <i class="icon iconfont icon-tupian"></i>
            <img class="pic" alt="加载中" data-src="static/png/1980/8.jpg"">
        </div>
        <div class="img">
            <i class="icon iconfont icon-tupian"></i>
            <img class="pic" alt="加载中" data-src="static/png/1980/9.jpg"">
        </div>
        <div class="img">
            <i class="icon iconfont icon-tupian"></i>
            <img class="pic" alt="加载中" data-src="static/png/1980/10.jpg"">
        </div>
        <div class="img">
            <i class="icon iconfont icon-tupian"></i>
            <img class="pic" alt="加载中" data-src="static/png/1980/11.jpg"">
        </div>
        <div class="img">
            <i class="icon iconfont icon-tupian"></i>
            <img class="pic" alt="加载中" data-src="static/png/1980/12.jpg"">
        </div>
        <div class="img">
            <i class="icon iconfont icon-tupian"></i>
            <img class="pic" alt="加载中" data-src="static/png/1980/13.jpg"">
        </div>
</div>

<!-- <i class="icon iconfont icon-tupian"></i> -->

```HTML
<div class="container">
        <div class="img">
            <!-- 注意我们并没有为它引入真实的src -->
            <i class="icon iconfont icon-tupian"></i>
            <img class="pic" alt="加载中" data-src="static/png/1980/1.jpg"">
        </div>
        <div class="img">
            <i class="icon iconfont icon-tupian"></i>
            <img class="pic" alt="加载中" data-src="static/png/1980/2.jpg"">
        </div>
        <div class="img">
            <i class="icon iconfont icon-tupian"></i>
            <img class="pic" alt="加载中" data-src="static/png/1980/3.jpg"">
        </div>
        <div class="img">
            <i class="icon iconfont icon-tupian"></i>
            <img class="pic" alt="加载中" data-src="static/png/1980/4.jpg"">
        </div>
        ...省略
</div>

```

```javascript
        // 获取所有的图片标签
        const imgs = document.getElementsByTagName('img')
        // 获取可视区域的高度
        const viewHeight = window.innerHeight || document.documentElement.clientHeight
        // num用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出
        let num = 0

        function lazyload() {
            console.log('懒加载滚动...')
            for (let i = num; i < imgs.length; i++) {
                // 用可视区域高度减去元素顶部距离可视区域顶部的高度
                let distance = viewHeight - imgs[i].getBoundingClientRect().top
                // 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明元素露出
                if (distance >= 0) {
                    // 给元素写入真实的src，展示图片
                    imgs[i].src = imgs[i].getAttribute('data-src');
                    // imgs[i].style.display = 'block';
                    // imgs[i].style.opacity = '1';
                    // 图片承载元素 做显隐不能使用`display:none`会影响对图片位置与顶部的距离计算
                    // imgs[i].parentNode.childNodes[1].style.display = 'none';
                    // 使用JS控制默认加载中显隐不是明确的选择
                    // imgs[i].parentNode.childNodes[1].style.opacity = '0';
                    // imgs[i].parentNode.childNodes[1].style.zIndex = '-1';
                    // console.log(imgs[i])
                    // console.log(imgs[i].parentNode.childNodes[1].style);
                    imgs[i].classList.add("load");
                    // 前i张图片已经加载完毕，下次从第i+1张开始检查是否露出
                    num = i + 1
                }
            }
        }

        // 防抖函数
        function debounce(fn, delay = 500) {
            let timer = null;
            return function(...args){
                if(timer) clearTimeout(timer);
                timer = setTimeout(()=>{
                    fn.call(this, args)
                }, delay)
            }    
        }

        // 是的页面初始化是加载首屏图片
        window.onload = lazyload;
        // 监听Scroll事件，为了防止频繁调用，使用防抖函数优化一下
        window.addEventListener('scroll', debounce(lazyload, 400), false);
```

```css
        .img {
            width: 500px;
            height: 300px;
            background-color: #cbcbcb;
            border-radius:10px;
            margin-bottom: 20px;
            position: relative;
        }

        .pic {
            width: 100%;
            height: 100%;
            border-radius:8px;
            /* 无法对图片位置具顶部位置距离计算 */
            /* display:none; */
            opacity: 0;
            z-index: 10;
            position: absolute;
        }
        .img>.icon{
            display:block;
            font-size: 30px;
            width:30px;
            height:30px;
            position: absolute;
            top:calc(50% - 15px);
            left:calc(50% - 15px);
            /* 层级高于容器低于图片易于控制 */
            z-index: 1;
        }

        .load{
            animation: loading 1s forwards;
        }
        /* 图片加载的过度效果 */
        @keyframes loading
        {
            from {opacity: 0;}
            to {opacity: 1;}
        }
```

> #### Next 使用 `IntersectionObserver`

<script>
        // 获取所有的图片标签
        const imgs = document.getElementsByTagName('img')
        // 获取可视区域的高度
        const viewHeight = window.innerHeight || document.documentElement.clientHeight
        // num用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出
        let num = 0

        function lazyload() {
            console.log('懒加载滚动...')
            for (let i = num; i < imgs.length; i++) {
                // 用可视区域高度减去元素顶部距离可视区域顶部的高度
                let distance = viewHeight - imgs[i].getBoundingClientRect().top
                // 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明元素露出
                if (distance >= 0) {
                    // 给元素写入真实的src，展示图片
                    imgs[i].src = imgs[i].getAttribute('data-src');
                    // imgs[i].style.display = 'block';
                    // imgs[i].style.opacity = '1';
                    // 使用JS控制默认加载中显隐不是明确的选择
                    // imgs[i].parentNode.childNodes[1].style.display = 'none';
                    // imgs[i].parentNode.childNodes[1].style.opacity = '0';
                    // imgs[i].parentNode.childNodes[1].style.zIndex = '-1';
                    // console.log(imgs[i])
                    // console.log(imgs[i].parentNode.childNodes[1].style);
                    imgs[i].classList.add("load");
                    // 前i张图片已经加载完毕，下次从第i+1张开始检查是否露出
                    num = i + 1
                }
            }
        }

        // 防抖函数
        function debounce(fn, delay = 500) {
            let timer = null;
            return function(...args){
                if(timer) clearTimeout(timer);
                timer = setTimeout(()=>{
                    fn.call(this, args)
                }, delay)
            }    
        }

        // 是的页面初始化是加载首屏图片
        window.onload = lazyload;
        // 监听Scroll事件，为了防止频繁调用，使用防抖函数优化一下
        window.addEventListener('scroll', debounce(lazyload, 400), false);

        window.removeEventListener('scroll', debounce());

</script>


<style>
/* @import url('static/css/code.css'); */

        .img {
            width: 500px;
            height: 300px;
            background-color: #cbcbcb;
            border-radius:10px;
            margin-bottom: 20px;
            position: relative;
        }

        .pic {
            width: 100%;
            height: 100%;
            border-radius:8px;
            /* display:none; */
            opacity: 0;
            z-index: 10;
            position: absolute;
        }
        .img>.icon{
            display:block;
            font-size: 30px;
            width:30px;
            height:30px;
            position: absolute;
            color: #686868;
            top:calc(50% - 15px);
            left:calc(50% - 15px);
            z-index: 1;
        }

        .load{
            animation: loading .8s forwards;
        }

        @keyframes loading
        {
            from {opacity: 0;}
            to {opacity: 1;}
        }
</style>