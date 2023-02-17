### 视频封面 之 取帧

---

> #### 使用HTML标签 （通过poster属性添加封面）

<video class="boki" 
    src="https://gitee.com/NidhoggDJoking/Evolution/raw/master/docs/static/video/boki.mp4"
    controls="controls"  poster="static/video/jiji.jpg" preload="auto">
    您的浏览器不支持 video 标签。
    <!-- source 是为兼容浏览器 可以写多个 -->
    <!-- <source src="static/video/boki.mp4"  type="video/mp4"> -->
</video>

```HTML
<video class="boki"
    src="https://gitee.com/NidhoggDJoking/Evolution/raw/master/docs/static/video/boki.mp4"
    controls="controls"
    poster="static/video/jiji.jpg" preload="auto">
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

---

### 2021年 补 - JS截取视频饱和度较高的帧作为封面


#### 一、获取视频基本信息（分辨率、时长）

```js
// 获取视频基本信息
function getVideoBasicInfo(videoSrc) {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video')
        video.src = videoSrc
        video.preload = 'auto'
        video.crossOrigin = 'Anonymous'
        video.addEventListener('error', error => {
            reject(error)
        })
        video.addEventListener('loadedmetadata', () => {
            const videoInfo = {
                video,
                width: video.videoWidth,
                height: video.videoHeight,
                duration: video.duration
            }
            resolve(videoInfo)
        })
    })
}
```

#### [CORS settings attributes](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/crossorigin)

<br>

#### 二、将视频绘入canvas用以生成图片地址

```js
// 获取视频当前帧图像信息与饱和度
function getVideoPosterInfo(videoInfo) {
    return new Promise(resolve => {
        const { video, width, height } = videoInfo
        video.addEventListener('canplay', () => {
            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')
            // 将视频对象直接绘入canvas
            ctx.drawImage(video, 0, 0, width, height)
          	// 获取图像的整体平均饱和度
            const saturation = getImageSaturation(canvas)
            const posterUrl = canvas.toDataURL('image/jpg')
            resolve({ posterUrl, saturation })
        })
    })
}
```


```js
// 获取一个图片的平均饱和度
function getImageSaturation(canvas) {
    const ctx = canvas.getContext('2d')
    const uint8ClampedArray = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    // ....
}
```

#### 三、“合适的帧”



#### 四、传入视频地址与第N秒，获取第N秒的图片地址与饱和度

```js
// 根据视频地址与播放时长获取图片信息与图片平均饱和度
function getVideoPosterByFrame(videoSrc, targetTime) {
    return getVideoBasicInfo(videoSrc).then(videoInfo => {
        const { video, duration } = videoInfo
        video.currentTime = targetTime
        return getVideoPosterInfo(videoInfo)
    })
}
```

#### 五、传入视频地址与指定饱和度品质，截取指定饱和度的视频作为封面

```js
async function getBestPoster(videoSrc, targetSaturation) {
    const videoInfo = await getVideoBasicInfo(videoSrc)
    const { duration } = videoInfo
    for (let i = 0; i <= duration; i++) {
        const posterInfo = await getVideoPosterByFrame(videoSrc, i)
        const { posterUrl, saturation } = posterInfo
        if (saturation >= targetSaturation) {
            return posterUrl
        }
    }
}

```

#### 整体代码

```js
// 获取视频基本信息
function getVideoBasicInfo(videoSrc) {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video')
        video.src = videoSrc
        // 视频一定要添加预加载
        video.preload = 'auto'
        // 视频一定要同源或者必须允许跨域
        video.crossOrigin = 'Anonymous'
        // 监听：异常
        video.addEventListener('error', error => {
            reject(error)
        })
        // 监听：加载完成基本信息,设置要播放的时常
        video.addEventListener('loadedmetadata', () => {
            const videoInfo = {
                video,
                width: video.videoWidth,
                height: video.videoHeight,
                duration: video.duration
            }
            resolve(videoInfo)
        })
    })
}

// 将获取到的视频信息，转化为图片地址
function getVideoPosterInfo(videoInfo) {
    return new Promise(resolve => {
        const { video, width, height } = videoInfo
        video.addEventListener('canplay', () => {
            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')
            ctx.drawImage(video, 0, 0, width, height)
            const saturation = getImageSaturation(canvas)
            const posterUrl = canvas.toDataURL('image/jpg')
            resolve({ posterUrl, saturation })
        })
    })
}
// 获取一个图片的平均饱和度
function getImageSaturation(canvas) {
    const ctx = canvas.getContext('2d')
    const uint8ClampedArray = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    console.log(uint8ClampedArray)
    const rgbaList = binary2rgba(uint8ClampedArray)
    const hslList = rgbaList.map(item => {
        return rgb2hsl(item.r, item.g, item.b)
    })
    const avarageSaturation = hslList.reduce((total, curr) => total + curr.s, 0) / hslList.length
    return avarageSaturation
}

function rgb2hsl(r, g, b) {
    r = r / 255;
    g = g / 255;
    b = b / 255;

    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var l = (min + max) / 2;
    var difference = max - min;
    var h, s, l;
    if (max == min) {
        h = 0;
        s = 0;
    } else {
        s = l > 0.5 ? difference / (2.0 - max - min) : difference / (max + min);
        switch (max) {
            case r: h = (g - b) / difference + (g < b ? 6 : 0); break;
            case g: h = 2.0 + (b - r) / difference; break;
            case b: h = 4.0 + (r - g) / difference; break;
        }
        h = Math.round(h * 60);
    }
    s = Math.round(s * 100);//转换成百分比的形式
    l = Math.round(l * 100);
    return { h, s, l };
}

function binary2rgba(uint8ClampedArray) {
    const rgbaList = []
    for (let i = 0; i < uint8ClampedArray.length; i++) {
        if (i % 4 === 0) {
            rgbaList.push({ r: uint8ClampedArray[i] })
            continue
        }
        const currentRgba = rgbaList[rgbaList.length - 1]
        if (i % 4 === 1) {
            currentRgba.g = uint8ClampedArray[i]
            continue
        }
        if (i % 4 === 2) {
            currentRgba.b = uint8ClampedArray[i]
            continue
        }
        if (i % 4 === 3) {
            currentRgba.a = uint8ClampedArray[i]
            continue
        }
    }
    return rgbaList
}

// 根据视频地址与播放时长获取图片信息与图片平均饱和度
function getVideoPosterByFrame(videoSrc, targetTime) {
    return getVideoBasicInfo(videoSrc).then(videoInfo => {
        const { video, duration } = videoInfo
        video.currentTime = targetTime
        return getVideoPosterInfo(videoInfo)
    })
}

async function getBestPoster(videoSrc, targetSaturation) {
    const videoInfo = await getVideoBasicInfo(videoSrc)
    const { duration } = videoInfo
    for (let i = 0; i <= duration; i++) {
        const posterInfo = await getVideoPosterByFrame(videoSrc, i)
        const { posterUrl, saturation } = posterInfo
        // 判断当前饱和度是否大于等于期望的饱和度
        if (saturation >= targetSaturation) {
            return posterUrl
        }
    }
}
// 这里通过http-server将视频地址与js进行同源
const videoSrc = 'xxx.mp4'
// 饱和度品质 0/10/30/50
const targetSaturation = 0
getBestPoster(videoSrc, targetSaturation).then(posterUrl => {
    const image = new Image()
    image.src = posterUrl
    document.body.append(image)
}).catch(error => {
    console.log(error)
})

```


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