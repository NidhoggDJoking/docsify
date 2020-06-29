<canvas id="c"></canvas>
 
<input type="range" id="r" min="0" max="100" step="1">

```html
<canvas id="c"></canvas>
 
<input type="range" id="r" min="0" max="100" step="1">

```
```javascript
<script type="text/javascript">
 
    var canvas = document.getElementById('c');
 
    var ctx = canvas.getContext('2d');
 
    var range = document.getElementById('r');
 
    //range控件信息
 
    var rangeValue = range.value;
 
    var nowRange = 0; //用于做一个临时的range
 
    //画布属性
 
    var mW = canvas.width = 340;
 
    var mH = canvas.height = 340;
 
    var lineWidth = 2;
 
    //圆属性
 
    var r = mH / 2; //圆心
 
    var cR = r - 16 * lineWidth; //圆半径
 
    var circleColor="#1080d0";
 
    var waterColor="#1c86d1";
 
    ctx.lineWidth = lineWidth;
 
   
 
    /*画圈函数*/
 
    var drawCircle = function() {
 
        ctx.beginPath();
 
        ctx.strokeStyle = circleColor;
 
        ctx.arc(r, r, cR, 0, 2 * Math.PI);
        
        ctx.stroke();
 
        ctx.beginPath();
 
        ctx.arc(r, r, cR-8, 0, 2 * Math.PI);
 
        ctx.clip(); //裁剪
 
    }
 
     //Sin 曲线属性
 
    var sX = 0;
 
    var sY = mH / 2;
 
    var axisLength = mW; //轴长 ==> 可见的x轴的长度
 
    var waveWidth = 0.015; //波浪宽度,数越小越宽 ==>周期
 
    var waveHeight = 7; //波浪高度,数越大越高 ==>振幅
 
    var speed = 0.09; //波浪速度，数越大速度越快
 
    var xOffset = 0; //波浪x偏移量 
 
    var IsdrawCircled = false;
 
    //画sin 曲线函数
 
    var drawSin = function(xOffset) {
 
        ctx.save();
 
        // var points = []; //用于存放绘制Sin曲线的点
 
        ctx.beginPath();
 
        //在整个轴长上取点
 
        for (var x = 0; x < axisLength; x += 10/axisLength) {
 
            //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)==> y=Asin(wx+t）
 
            var y = -Math.sin( x * waveWidth + xOffset); //倒函数
 
            var dY = mH * (1 - nowRange / 100);
 
            // points.push([x, dY + y * waveHeight]);
 
            ctx.lineTo(x, dY + y * waveHeight);
 
        }
 
        //封闭路径
 
        ctx.lineTo(axisLength, mH);
 
        ctx.lineTo(0, mH);
 
        // ctx.lineTo(points[0][0], points[0][1]);
 
        var gradient = ctx.createLinearGradient(0, 250, 0, 0);
 
        gradient.addColorStop("0", "#3083ec");
 
        gradient.addColorStop("0.5", "#2cc8ec");
 
        gradient.addColorStop("1.0", "#15feff");
 
        ctx.fillStyle = gradient;
 
        // ctx.fillStyle = waterColor;
 
        ctx.shadowBlur=5;
        
        ctx.shadowColor="#1c86d1";
 
        ctx.fill();
 
        ctx.restore();
 
    };
 
    //写百分比文本函数
 
    var drawText = function() {
 
        ctx.save();
 
        var size = 0.4 * cR;
 
        ctx.font = size + 'px Microsoft Yahei';
 
        ctx.textAlign = 'center';
 
        ctx.fillStyle ="hsl(210,100%,"+(nowRange/2+50)+"%)";
        
        ctx.fillText(nowRange + '%', r, r + size / 2);
 
        ctx.restore();
 
    };
 
    /*开始*/
 
    var render = function() {
 
        ctx.clearRect(0, 0, mW, mH); //清空画布
 
        rangeValue = range.value;
 
        if (IsdrawCircled == false) {
 
            drawCircle(); //开始画圆
 
            IsdrawCircled = true;
 
        }
        /* 遍历+1 */
 
        if (nowRange <= rangeValue) {
 
            var tmp = 1;
 
            nowRange += tmp;
 
        }
 
        if (nowRange > rangeValue) {
 
            var tmp = 1;
 
            nowRange -= tmp;
 
        }
 
        drawSin(xOffset);
 
        drawText();
 
        xOffset += speed;
 
        requestAnimationFrame(render);//循环播放
 
    }
 
    render();
    </script>
```

```css
<style>
    #c {
        margin: 0 auto;
        display: block;
        width: 170px;
        height: 170px;
    }

    input[type="range"] {
        -webkit-appearance: none;
        width: 300px;
        margin: 0;
        background: transparent;
    }
 
    input[type="range"]:focus {
        outline: none;
    }
 
    /*滑道*/
    input[type="range"]::-webkit-slider-runnable-track {
        background: transparent;
        border: none;
    }
 
    /*滑块*/
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-bottom: 15px;
        margin-top:5px;
        background-color: transparent;
        box-shadow: 0 0 0 3px white, 0 1px 3px 3px rgba(5, 10, 70, 0.33);
    }
    #r {
        display: block;
        margin: 0 auto;
        /*display: none;*/
 
    }
 
    #r::before {
        color: #404040;
        content: attr(min);
        padding-right: 10px;
        font-family: fantasy;
        font-size: 20px;
 
    }
 
    #r::after {
        color: #404040;
        content: attr(max);
        padding-left: 10px;
        font-family: fantasy;
        font-size: 20px;
    }
</style>
```
<style>
    #c {
        margin: 0 auto;
        display: block;
        width: 170px;
        height: 170px;
    }

    input[type="range"] {
        -webkit-appearance: none;
        width: 300px;
        margin: 0;
        background: transparent;
    }
 
    input[type="range"]:focus {
        outline: none;
    }
 
    /*滑道*/
    input[type="range"]::-webkit-slider-runnable-track {
        background: transparent;
        border: none;
    }
 
    /*滑块*/
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-bottom: 15px;
        margin-top:5px;
        background-color: transparent;
        box-shadow: 0 0 0 3px white, 0 1px 3px 3px rgba(5, 10, 70, 0.33);
    }
    #r {
        display: block;
        margin: 0 auto;
        /*display: none;*/
 
    }
 
    #r::before {
        color: #404040;
        content: attr(min);
        padding-right: 10px;
        font-family: fantasy;
        font-size: 20px;
 
    }
 
    #r::after {
        color: #404040;
        content: attr(max);
        padding-left: 10px;
        font-family: fantasy;
        font-size: 20px;
    }
</style>


 <script type="text/javascript">
 
    var canvas = document.getElementById('c');
 
    var ctx = canvas.getContext('2d');
 
    var range = document.getElementById('r');
 
    //range控件信息
 
    var rangeValue = range.value;
 
    var nowRange = 0; //用于做一个临时的range
 
    //画布属性
 
    var mW = canvas.width = 340;
 
    var mH = canvas.height = 340;
 
    var lineWidth = 2;
 
    //圆属性
 
    var r = mH / 2; //圆心
 
    var cR = r - 16 * lineWidth; //圆半径
 
    var circleColor="#1080d0";
 
    var waterColor="#1c86d1";
 
    ctx.lineWidth = lineWidth;
 
   
 
    /*画圈函数*/
 
    var drawCircle = function() {
 
        ctx.beginPath();
 
        ctx.strokeStyle = circleColor;
 
        ctx.arc(r, r, cR, 0, 2 * Math.PI);
        
        ctx.stroke();
 
        ctx.beginPath();
 
        ctx.arc(r, r, cR-8, 0, 2 * Math.PI);
 
        ctx.clip(); //裁剪
 
    }
 
     //Sin 曲线属性
 
    var sX = 0;
 
    var sY = mH / 2;
 
    var axisLength = mW; //轴长 ==> 可见的x轴的长度
 
    var waveWidth = 0.015; //波浪宽度,数越小越宽 ==>周期
 
    var waveHeight = 7; //波浪高度,数越大越高 ==>振幅
 
    var speed = 0.09; //波浪速度，数越大速度越快
 
    var xOffset = 0; //波浪x偏移量 
 
    var IsdrawCircled = false;
 
    //画sin 曲线函数
 
    var drawSin = function(xOffset) {
 
        ctx.save();
 
        // var points = []; //用于存放绘制Sin曲线的点
 
        ctx.beginPath();
 
        //在整个轴长上取点
 
        for (var x = 0; x < axisLength; x += 10/axisLength) {
 
            //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)==> y=Asin(wx+t）
 
            var y = -Math.sin( x * waveWidth + xOffset); //倒函数
 
            var dY = mH * (1 - nowRange / 100);
 
            // points.push([x, dY + y * waveHeight]);
 
            ctx.lineTo(x, dY + y * waveHeight);
 
        }
 
        //封闭路径
 
        ctx.lineTo(axisLength, mH);
 
        ctx.lineTo(0, mH);
 
        // ctx.lineTo(points[0][0], points[0][1]);
 
        var gradient = ctx.createLinearGradient(0, 250, 0, 0);
 
        gradient.addColorStop("0", "#3083ec");
 
        gradient.addColorStop("0.5", "#2cc8ec");
 
        gradient.addColorStop("1.0", "#15feff");
 
        ctx.fillStyle = gradient;
 
        // ctx.fillStyle = waterColor;
 
        ctx.shadowBlur=5;
        
        ctx.shadowColor="#1c86d1";
 
        ctx.fill();
 
        ctx.restore();
 
    };
 
    //写百分比文本函数
 
    var drawText = function() {
 
        ctx.save();
 
        var size = 0.4 * cR;
 
        ctx.font = size + 'px Microsoft Yahei';
 
        ctx.textAlign = 'center';
 
        ctx.fillStyle ="hsl(210,100%,"+(nowRange/2+50)+"%)";
        
        ctx.fillText(nowRange + '%', r, r + size / 2);
 
        ctx.restore();
 
    };
 
    /*开始*/
 
    var render = function() {
 
        ctx.clearRect(0, 0, mW, mH); //清空画布
 
        rangeValue = range.value;
 
        if (IsdrawCircled == false) {
 
            drawCircle(); //开始画圆
 
            IsdrawCircled = true;
 
        }
        /* 遍历+1 */
 
        if (nowRange <= rangeValue) {
 
            var tmp = 1;
 
            nowRange += tmp;
 
        }
 
        if (nowRange > rangeValue) {
 
            var tmp = 1;
 
            nowRange -= tmp;
 
        }
 
        drawSin(xOffset);
 
        drawText();
 
        xOffset += speed;
 
        requestAnimationFrame(render);//循环播放
 
    }
 
    render();
    </script>