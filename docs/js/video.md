### `audio`音频剪裁剪切复制播放与上传


<br/>

> #### 版本一 `稳定截取15秒`

---

<form class="uploadBox">
    <svg t="1606975095651" class="uploadIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3325" width="32" height="32"><path d="M848.0256 474.0096h-297.984v-322.048H473.9584v322.048h-297.984a8.0384 8.0384 0 0 0-8.0384 7.9872v60.0064c0 4.4032 3.584 7.9872 7.9872 7.9872h297.984v322.048h76.032v-322.048h297.984c4.4032 0 8.0384-3.584 8.0384-7.9872V481.9968a8.0384 8.0384 0 0 0-8.0384-7.9872z" fill="#707070" fill-opacity=".65" p-id="3326"></path></svg>
    <input type="file" id="file" accept="audio/mpeg" style="position:absolute;opacity:0;">
    <p id="fileName">未选择任何文件</p>
</form>

<br/>

<p><audio id="audioNow" controls></audio></p>

---
<br/>

> #### 核心代码

```javascript
file.onchange = function (event) {
    var target = event.target;
    var file = target.files[0];
    var type = file.type;
    // 开始识别
    var reader = new FileReader();
    reader.onload = function (event) {
        var arrBuffer = event.target.result;
        console.log('源对象:',event);
        $('#fileName').html(document.getElementById('file').files[0].name);
        // console.log(document.getElementById('file').files[0].name)
        var audioCtx = new AudioContext();

        audioCtx.decodeAudioData(arrBuffer, function(audioBuffer) {
            var duration = audioBuffer.duration;
            var channels = audioBuffer.numberOfChannels;
            var rate = audioBuffer.sampleRate;

            // 秒数
            var startOffset = 0;
            var endOffset = rate * 15;
            var frameCount = endOffset - startOffset;
            var newAudioBuffer;

            newAudioBuffer = new AudioContext().createBuffer(channels, endOffset - startOffset, rate);
            var anotherArray = new Float32Array(frameCount);
            var offset = 0;

            for (var channel = 0; channel < channels; channel++) {
                audioBuffer.copyFromChannel(anotherArray, channel, startOffset);
                newAudioBuffer.copyToChannel(anotherArray, channel, offset);
            }

            /**
            * 直接播放使用下面的代码
            // 创建AudioBufferSourceNode对象
            var source = audioCtx.createBufferSource();
            // 设置AudioBufferSourceNode对象的buffer为复制的3秒AudioBuffer对象
            source.buffer = newAudioBuffer;
            // 这一句是必须的，表示结束，没有这一句没法播放，没有声音
            // 这里直接结束，实际上可以对结束做一些特效处理
            source.connect(audioCtx.destination);
            // 资源开始播放
            source.start();
            */

            var blob = bufferToWave(newAudioBuffer, frameCount);
            /**
            * 转换成Base64使用下面的代码
            var reader2 = new FileReader();
            reader2.onload = function(evt){
                audio.src = evt.target.result;
            };
            reader2.readAsDataURL(blob);
            */
            // 使用Blob地址
            audioNow.src = URL.createObjectURL(blob);
        });
    };
    reader.readAsArrayBuffer(file);

};

// Convert AudioBuffer to a Blob using WAVE representation
function bufferToWave(abuffer, len) {
    var numOfChan = abuffer.numberOfChannels,
    length = len * numOfChan * 2 + 44,
    buffer = new ArrayBuffer(length),
    view = new DataView(buffer),
    channels = [], i, sample,
    offset = 0,
    pos = 0;

    // write WAVE header
    setUint32(0x46464952);                         // "RIFF"
    setUint32(length - 8);                         // file length - 8
    setUint32(0x45564157);                         // "WAVE"

    setUint32(0x20746d66);                         // "fmt " chunk
    setUint32(16);                                 // length = 16
    setUint16(1);                                  // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2);                      // block-align
    setUint16(16);                                 // 16-bit (hardcoded in this demo)

    setUint32(0x61746164);                         // "data" - chunk
    setUint32(length - pos - 4);                   // chunk length

    // write interleaved data
    for(i = 0; i < abuffer.numberOfChannels; i++)
        channels.push(abuffer.getChannelData(i));

    while(pos < length) {
        for(i = 0; i < numOfChan; i++) {             // interleave channels
            sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
            sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0; // scale to 16-bit signed int
            view.setInt16(pos, sample, true);          // write 16-bit sample
            pos += 2;
        }
        offset++                                     // next source sample
    }

    // create Blob
    // 规定剪切后的类型
    // mp4 => m4a
    // wav => wav
    return new Blob([buffer], {type: "audio/wav"});

    function setUint16(data) {
        view.setUint16(pos, data, true);
        pos += 2;
    }

    function setUint32(data) {
        view.setUint32(pos, data, true);
        pos += 4;
    }
}
```

!>**注意**： `createBuffer()`曾被用于接收压缩后的音频数据，并返回被解码的音频，但是这项功能现在已经被移除，因为所有的解码工作应当在主线程中被完成，`createBuffer()` 阻塞了其他代码的执行。异步方法 `decodeAudioData()` 能够完成相同的工作 —— 传入一个压缩过的音频（如MP3格式的文件），并直接返回一个可以通过 `AudioBufferSourceNode`播放的 `AudioBuffer` 。因此播放诸如MP3等格式的压缩音频时，你应当使用 `decodeAudioData()` 方法。

<br/>

> #### 用了许多平日里不常用的JS API 这里附带传送门
 
#### [Blob()](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob/Blob)

#### [DataView()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)

#### [ArrayBuffer()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

#### [Float32Array()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Float32Array)

#### [AudioContext()](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext)

#### [AudioContext.createBuffer()](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext/createBuffer)

<script>
$('.uploadIcon').click(function(){
    console.log($('.uploadBox'))
    setTimeout(function(){
        $('#file').click();
    },200);
});
// console.log(file)
// console.log(audioNow)
file.onchange = function (event) {
    var target = event.target;
    var file = target.files[0];
    var type = file.type;
    // 开始识别
    var reader = new FileReader();
    reader.onload = function (event) {
        var arrBuffer = event.target.result;
        console.log('源对象:',event);
        $('#fileName').html(document.getElementById('file').files[0].name);
        // console.log(document.getElementById('file').files[0].name)
        var audioCtx = new AudioContext();

        audioCtx.decodeAudioData(arrBuffer, function(audioBuffer) {
            var duration = audioBuffer.duration;
            var channels = audioBuffer.numberOfChannels;
            var rate = audioBuffer.sampleRate;

            // 秒数
            var startOffset = 0;
            var endOffset = rate * 15;
            var frameCount = endOffset - startOffset;
            var newAudioBuffer;

            newAudioBuffer = new AudioContext().createBuffer(channels, endOffset - startOffset, rate);
            var anotherArray = new Float32Array(frameCount);
            var offset = 0;

            for (var channel = 0; channel < channels; channel++) {
                audioBuffer.copyFromChannel(anotherArray, channel, startOffset);
                newAudioBuffer.copyToChannel(anotherArray, channel, offset);
            }

            /**
            * 直接播放使用下面的代码
            // 创建AudioBufferSourceNode对象
            var source = audioCtx.createBufferSource();
            // 设置AudioBufferSourceNode对象的buffer为复制的3秒AudioBuffer对象
            source.buffer = newAudioBuffer;
            // 这一句是必须的，表示结束，没有这一句没法播放，没有声音
            // 这里直接结束，实际上可以对结束做一些特效处理
            source.connect(audioCtx.destination);
            // 资源开始播放
            source.start();
            */

            var blob = bufferToWave(newAudioBuffer, frameCount);
            /**
            * 转换成Base64使用下面的代码
            var reader2 = new FileReader();
            reader2.onload = function(evt){
                audio.src = evt.target.result;
            };
            reader2.readAsDataURL(blob);
            */
            // 使用Blob地址
            audioNow.src = URL.createObjectURL(blob);
        });
    };
    reader.readAsArrayBuffer(file);

};

// Convert AudioBuffer to a Blob using WAVE representation
function bufferToWave(abuffer, len) {
    var numOfChan = abuffer.numberOfChannels,
    length = len * numOfChan * 2 + 44,
    buffer = new ArrayBuffer(length),
    view = new DataView(buffer),
    channels = [], i, sample,
    offset = 0,
    pos = 0;

    // write WAVE header
    setUint32(0x46464952);                         // "RIFF"
    setUint32(length - 8);                         // file length - 8
    setUint32(0x45564157);                         // "WAVE"

    setUint32(0x20746d66);                         // "fmt " chunk
    setUint32(16);                                 // length = 16
    setUint16(1);                                  // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2);                      // block-align
    setUint16(16);                                 // 16-bit (hardcoded in this demo)

    setUint32(0x61746164);                         // "data" - chunk
    setUint32(length - pos - 4);                   // chunk length

    // write interleaved data
    for(i = 0; i < abuffer.numberOfChannels; i++)
        channels.push(abuffer.getChannelData(i));

    while(pos < length) {
        for(i = 0; i < numOfChan; i++) {             // interleave channels
            sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
            sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0; // scale to 16-bit signed int
            view.setInt16(pos, sample, true);          // write 16-bit sample
            pos += 2;
        }
        offset++                                     // next source sample
    }

    // create Blob
    // 规定剪切后的类型
    // mp4 => m4a
    // wav => wav
    return new Blob([buffer], {type: "audio/wav"});

    function setUint16(data) {
        view.setUint16(pos, data, true);
        pos += 2;
    }

    function setUint32(data) {
        view.setUint32(pos, data, true);
        pos += 4;
    }
}
</script>


<style>
.uploadBox{
    position:relative;
    width:100px;
    height:100px;
    background:#f1f3f4;
    cursor: pointer;
    box-shadow: 1px 1px 2px 2px #e6e6e6;
}
.uploadBox:hover{
    box-shadow: 1px 1px 4px 1px #b4b5c3;
}
.uploadIcon{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
}
#fileName{
    width: 200px;
    height: 50px;
    position: absolute;
    left: 120%;
    font-size: 15px;
    color: #5d5d5d;
    margin: 0;
</style>