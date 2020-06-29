### 百度语言合成

?> 百度语言合成简单版,无法配置所有属性
```javascript

var zhText = "甲方普遍就是些智障";
    zhText = encodeURI(zhText);
    var audio = "<audio autoplay=\"autoplay\">" + 
    "<source src=\"http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=4&per=4&text=" + zhText + 
    "\" type=\"audio/mpeg\">" + 
    "<embed height=\"0\" width=\"0\" src=\"http://tts.baidu.com/text2audio?per=4&text=" + zhText + 
    "\">" + "</audio>";
    $('body').append(audio);

```

```javascript

var zhText = "妈卖批,腾讯的API天天改是脑壳里有屎吗？";
    zhText = encodeURI(zhText);
    var audio = "<audio autoplay=\"autoplay\">" + 
    "<source src=\"http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=4&per=4&text=" + zhText + 
    "\" type=\"audio/mpeg\">" + 
    "<embed height=\"0\" width=\"0\" src=\"http://tts.baidu.com/text2audio?per=4&text=" + zhText + 
    "\">" + "</audio>";
    document.body.insertAdjacentHTML('beforeend', audio);
```

<button id="baiduVoice">点击播放</button>

<script>

var btn = document.getElementById("baiduVoice");
    btn.onclick = function(){
        var zhText = "妈卖批,腾讯的API天天改是脑壳里有屎吗？";
        zhText = encodeURI(zhText);
        var audio = "<audio autoplay=\"autoplay\">" + 
        "<source src=\"http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=4&per=4&text=" + zhText + 
        "\" type=\"audio/mpeg\">" + 
        "<embed height=\"0\" width=\"0\" src=\"http://tts.baidu.com/text2audio?per=4&text=" + zhText + 
        "\">" + "</audio>";
        document.body.insertAdjacentHTML('beforeend', audio);
    }
</script>

<style>
#baiduVoice{
    width: 80px;
    height: 30px;
    cursor: pointer;
    background: linear-gradient(90deg,#23ead8,#00ff7e,#dbff00);
    border: 0;
    border-radius: 3px;
    box-shadow: 0px 0px 6px 2px #e5ffcc;
    color: #636363;
}
</style>