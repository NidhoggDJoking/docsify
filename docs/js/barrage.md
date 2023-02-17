### 前端视频相关

---

> #### 字幕篇


?> 视频可以利用自带的 `track` 标签制作字幕效果，比之前在我的个人官网做的音频字幕更加方便，那种方法其实更适用于弹幕之类了，但使用`track` 前端可以省略一个响应任务，节省了监听和时间比对的代码。

<video class="boki" controls="controls">
  <source src="https://gitee.com/NidhoggDJoking/storage/raw/master/static/video/MadeinHeaven.mp4" type="video/mp4" />
  <track default kind="captions" srclang="en" src="static/video/friday.vtt" />
  <track  kind="captions" srclang="zh" src="static/video/friday_zh.vtt" />
  <p>辣鸡浏览器</p>
</video>


```html
<video class="boki" controls="controls">
  <source src="https://gitee.com/NidhoggDJoking/storage/raw/master/static/video/MadeinHeaven.mp4" type="video/mp4" />
  <track default kind="captions" srclang="en" src="static/video/friday.vtt" />
  <track kind="captions" srclang="zh" src="static/video/friday_zh.vtt" />
</video>

```

```WEBVTT
WEBVTT

start
00:00:01.000 --> 00:00:02.000  line:80%
<font>Made In Heaven!</font>


end
00:00:05.000 --> 00:00:08.000 line:80%
<b>神のみめにおいたん退ける!</b>
```

```css
/* 控制字幕样式 */
video::cue {
    background: transparent;
    color: #fff;
    font-size:21px;
    font-family: 'Comic Sans MS', cursive;
    bottom:0;
    position: absolute;
}
video::cue(font) {
    color: #fff;
    font-family: 'Comic Sans MS', cursive;
}
video::cue(b) {
    color: #fff;
    font-size:26px;
    font-family: HYDiS;
}
video::cue(#start) {
    font-size:30px;
    text-shadow:0 1px 1px red;
}
video::cue(#start_zh) {
    font-size:33px;
}
video::cue(#end) {
    text-shadow:0 1px 1px red;
}
video::cue(#end_zh) {
    font-size:26px;
    font-family: HYDiS;
    background-image: linear-gradient(to right, #00bcff, #00ff96,#fbff00,#ff7600);
    -webkit-background-clip: text;
    color: transparent;
}
```

#### [W3C webvtt 传送门](https://w3c.github.io/webvtt/)


> #### 合成篇

?> 蹲一波 `FFmpeg`

```bash
<script src="https://unpkg.com/@ffmpeg/ffmpeg@0.9.5/dist/ffmpeg.min.js"></script>
<script src="https://unpkg.com/@ffmpeg/core@0.8.5/dist/ffmpeg-core.js"></script>
<script src="https://unpkg.com/@ffmpeg/core@0.8.5/dist/ffmpeg-core.worker.js"></script>
<script src="https://unpkg.com/@ffmpeg/core@0.8.5/dist/ffmpeg-core.wasm"></script>
```

```js
<script>
const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({
    corePath: "static/js/ffmpeg-core.js",
    log: true,
});
(async () => {
    await ffmpeg.load();
    
    const dataInputVideo = await fetchFile('bj.mp4');
    const dataInputAudio = await fetchFile('record.mp3');

    ffmpeg.FS('writeFile', 'bj.mp4', dataInputVideo);
    ffmpeg.FS('writeFile', 'record.mp3', dataInputAudio);
    
    // ffmpeg -i video.mp4 -i audio.wav -c:v copy -c:a aac -strict experimental -map 0:v:0 -map 1:a:0 output.mp4
    await ffmpeg.run('-i', 'bj.mp4', '-i', 'record.mp3', '-c:v', 'copy', '-c:a', 'aac', '-strict', 'experimental', '-map', '0:v:0', '-map', '1:a:0', 'output.mp4');
    
    const data = ffmpeg.FS('readFile', 'output.mp4');
    const video = document.getElementById('player');
    video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
})();
</script>
```

<br>

#### [张鑫旭大大 FFmpeg 的文章](https://www.zhangxinxu.com/wordpress/2021/03/ffmpeg-wasm-audio-video-merge/)

!>  大佬文章最后提到 ffmpeg.wasm 目前只能作为VIP功能小部分用户使用、或者给自己人使用，大规模对外还不成熟。<br>
以及报`WebAssembly.Memory(): could not allocate memory` 和 `Uncaught (in promise) out of memory` 等错误 反正我是遇到了,我电脑一直跑不起暂时放弃

<style>
.boki{
    width:100%;
    max-width:500px;
}
/* 控制字幕样式 */
video::cue {
    background: transparent;
    color: #fff;
    font-size:21px;
    font-family: 'Comic Sans MS', cursive;
    bottom:0;
    position: absolute;
}
video::cue(font) {
    color: #fff;
    font-family: 'Comic Sans MS', cursive;
}
video::cue(b) {
    color: #fff;
    font-size:26px;
    font-family: HYDiS;
}
video::cue(#start) {
    font-size:30px;
}
video::cue(#start_zh) {
    font-size:30px;
    text-shadow:0 1px 1px red;
}
video::cue(#end) {
    text-shadow:0 1px 1px red;
}
video::cue(#end_zh) {
    font-size:26px;
    font-family: HYDiS;
    background-image: linear-gradient(to right, #00bcff, #00ff96,#fbff00,#ff7600);
    -webkit-background-clip: text;
    color: transparent;
}
</style>