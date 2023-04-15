# Canvas 实现图片剪切

---

<div style="margin-bottom: 10px">
    上传图片：<input type="file" onchange="onChange(this.files[0])">
</div>

<canvas id="cvs"></canvas>
<canvas id="clipCvs"></canvas>
<button id="download">下载图片</button>


<details>
<summary>
<b>全部源码</b></summary><p>

```html
    <div style="margin-bottom: 10px">
        上传图片：<input type="file" onchange="onChange(this.files[0])">
    </div>

    <canvas id="cvs"></canvas>
    <canvas id="clipCvs"></canvas>
    <button id="download">下载图片</button>
```

```js
    const cvs = document.getElementById('cvs')
    const clipCvs = document.getElementById('clipCvs')
    const download = document.getElementById('download')
    const ctx = cvs.getContext('2d')
    const clipCtx = clipCvs.getContext('2d')
    const img = new Image()
    // 截取范围大小
    let size = 150
    // 底部图片宽度
    let maxW = 600
    const p = {
        left: 0,
        top: 0,
        stepX: 0,
        stepY: 0
    }
    const onChange = (file) => {
        onInit(URL.createObjectURL(file))
    }
    // 加载图片，并初始化裁剪功能
    const onInit = (src) => {
        clipCvs.width = clipCvs.height = size
        img.src = src
        img.onload = () => {
            let width = img.width
            let height = img.height
            if (width > maxW) {
                height = maxW / width * height
                width = maxW
            }
            cvs.width = width
            cvs.height = height
            render(width / 2 - size / 2, height / 2 - size / 2)
        }
    }
    // 渲染裁剪前canvas
    const render = (left = 0, top = 0) => {
        ctx.clearRect(0, 0, cvs.width, cvs.height)
        ctx.drawImage(img, 0, 0, cvs.width, cvs.height)
        if (left < 0) {
            left = 0
        }
        if (left > cvs.width - size) {
            left = cvs.width - size
        }
        if (top < 0) {
            top = 0
        }
        if (top > cvs.height - size) {
            top = cvs.height - size
        }
        clipPic(ctx.getImageData(left, top, size, size))
        ctx.beginPath()
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.fillRect(left, top, size, size)
        p.left = left
        p.top = top
    }
    // 裁剪图片，并显示在右侧
    const clipPic = (data) => {
        clipCtx.clearRect(0, 0, clipCvs.width, clipCvs.height)
        clipCtx.putImageData(data, 0, 0)
    }
    let isMoving = false
    cvs.onmousedown = (e) => {
        p.stepX = e.pageX - p.left
        p.stepY = e.pageY - p.top
        isMoving = true
    }
    cvs.onmousemove = (e) => {
        if (isMoving) {
            render(e.pageX - p.stepX, e.pageY - p.stepY)
        }
    }
    document.onmouseup = () => {
        isMoving = false
    }
    download.onclick = async () => {
        const res = await fetch(clipCvs.toDataURL('image/png'))
        const blob = await res.blob()
        const a = document.createElement('a')
        a.setAttribute('download', 'clip.png')
        a.href = URL.createObjectURL(blob)
        a.click()
    }
    onInit('static/png/SKT1.jpg')
```

</p>
</details>

<script>
    const cvs = document.getElementById('cvs')
    const clipCvs = document.getElementById('clipCvs')
    const download = document.getElementById('download')
    const ctx = cvs.getContext('2d')
    const clipCtx = clipCvs.getContext('2d')
    const img = new Image()
    // 截取范围大小
    let size = 150
    // 底部图片宽度
    let maxW = 600
    const p = {
        left: 0,
        top: 0,
        stepX: 0,
        stepY: 0
    }
    const onChange = (file) => {
        onInit(URL.createObjectURL(file))
    }
    // 加载图片，并初始化裁剪功能
    const onInit = (src) => {
        clipCvs.width = clipCvs.height = size
        img.src = src
        img.onload = () => {
            let width = img.width
            let height = img.height
            if (width > maxW) {
                height = maxW / width * height
                width = maxW
            }
            cvs.width = width
            cvs.height = height
            render(width / 2 - size / 2, height / 2 - size / 2)
        }
    }
    // 渲染裁剪前canvas
    const render = (left = 0, top = 0) => {
        ctx.clearRect(0, 0, cvs.width, cvs.height)
        ctx.drawImage(img, 0, 0, cvs.width, cvs.height)
        if (left < 0) {
            left = 0
        }
        if (left > cvs.width - size) {
            left = cvs.width - size
        }
        if (top < 0) {
            top = 0
        }
        if (top > cvs.height - size) {
            top = cvs.height - size
        }
        clipPic(ctx.getImageData(left, top, size, size))
        ctx.beginPath()
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.fillRect(left, top, size, size)
        p.left = left
        p.top = top
    }
    // 裁剪图片，并显示在右侧
    const clipPic = (data) => {
        clipCtx.clearRect(0, 0, clipCvs.width, clipCvs.height)
        clipCtx.putImageData(data, 0, 0)
    }
    let isMoving = false
    cvs.onmousedown = (e) => {
        p.stepX = e.pageX - p.left
        p.stepY = e.pageY - p.top
        isMoving = true
    }
    cvs.onmousemove = (e) => {
        if (isMoving) {
            render(e.pageX - p.stepX, e.pageY - p.stepY)
        }
    }
    document.onmouseup = () => {
        isMoving = false
    }
    download.onclick = async () => {
        const res = await fetch(clipCvs.toDataURL('image/png'))
        const blob = await res.blob()
        const a = document.createElement('a')
        a.setAttribute('download', 'clip.png')
        a.href = URL.createObjectURL(blob)
        a.click()
    }
    onInit('static/png/SKT1.jpg')
</script>