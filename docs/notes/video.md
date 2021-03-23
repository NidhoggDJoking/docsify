### 视频封面 之 取帧

---

> #### 使用HTML标签 （通过poster属性添加封面）

<video class="boki" src="https://gitee.com/NidhoggDJoking/Evolution/raw/master/docs/static/video/boki.mp4" controls="controls"  poster="static/video/jiji.jpg" preload="auto">
    您的浏览器不支持 video 标签。
    <!-- source 是为兼容浏览器 可以写多个 -->
    <!-- <source src="static/video/boki.mp4"  type="video/mp4"> -->
</video>

```HTML
<video class="boki" src="https://gitee.com/NidhoggDJoking/Evolution/raw/master/docs/static/video/boki.mp4" controls="controls"  poster="static/video/jiji.jpg" preload="auto">
    您的浏览器不支持 video 标签。
    <!-- source 是为兼容浏览器 可以写多个 -->
    <!-- <source src="static/video/boki.mp4"  type="video/mp4"> -->
</video>
```

> #### 使用JS

<div id="videoBox">
<!-- 视频承载容器 -->
</div>

```javascript
    function getVideoBase64(url){
        return new Promise(function (resolve, reject) {
            let dataURL = '';
            let video = document.createElement("video");
            // <!-- 视频承载容器 -->
            let box = document.getElementById('videoBox')
            video.setAttribute('crossOrigin', 'anonymous'); //处理跨域
            video.setAttribute('src', url);
            video.setAttribute('width', '100%');
            video.style.maxWidth="500px";
            // video.setAttribute('height', 240);
            video.setAttribute('controls', 'controls');
            
            video.addEventListener('loadeddata', function () {
                let canvas = document.createElement("canvas"),
                    width = video.width, //canvas的尺寸和图片一样
                    height = video.height;
                canvas.width = width;
                canvas.height = height;
                canvas.getContext("2d").drawImage(video, 0, 0, width, height); //绘制canvas
                dataURL = canvas.toDataURL('image/jpeg'); //转换为base64
                resolve(dataURL);
            });
            box.appendChild(video);
        })
    }

    getVideoBase64('static/video/boki.mp4').then(res =>{
        // 返回Base64格式的图片
        // console.log('data:image',res)
        // 这里把封面改了就好,但是用视频第一帧做封面总不如专门设计的一张图片做封面来的好看
    });
```

!> 目前暂时还没有可以获取视频第N帧的前端技术，这个要依赖于后端实现

<script>
    function getVideoBase64(url){
        return new Promise(function (resolve, reject) {
            let dataURL = '';
            let video = document.createElement("video");
            let box = document.getElementById('videoBox')
            
            video.setAttribute('crossOrigin', 'anonymous');//处理跨域
            video.setAttribute('src', url);
            video.setAttribute('width', '100%');
            video.style.maxWidth="500px";
            // video.setAttribute('height', 240);
            video.setAttribute('controls', 'controls');
            
            video.addEventListener('loadeddata', function () {
                let canvas = document.createElement("canvas"),
                    width = video.width, //canvas的尺寸和图片一样
                    height = video.height;
                canvas.width = width;
                canvas.height = height;
                canvas.getContext("2d").drawImage(video, 0, 0, width, height); //绘制canvas
                dataURL = canvas.toDataURL('image/jpeg'); //转换为base64
                resolve(dataURL);
            });
            box.appendChild(video);
        })
    }

    getVideoBase64('https://gitee.com/NidhoggDJoking/Evolution/raw/master/docs/static/video/boki.mp4').then(res =>{
        // 'static/video/boki.mp4' 这样的相对路径是不生效的
        // 返回Base64格式的图片
        // console.log('data:image',res)
        // 这里把封面改了就好,但是用视频第一帧做封面总不如专门设计的一张图片做封面来的好看
    });
</script>


<style>
/* @import url('static/css/VueCode.css'); */

.boki{
    width:100%;
    max-width:500px;

}
</style>