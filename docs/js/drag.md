## 拖拽

---

<canvas id="canvas" width="2000" height="1200"></canvas>

---

```js
// 绘制连接曲线方法
var drawCurve = function () {
    // 按照坐标位置排序
    var dataSort = data.sort(function (objA, objB) {
        return (objA.y + objA.height) - (objB.y + objB.height);
    });
    // 知道上下数据
    var from = dataSort[0];
    var to = dataSort[1];

    // 曲线的起点终点
    var fromX = from.x + from.width / 2;
    var fromY = from.y + from.height;
    var toX = to.x + to.width / 2;
    var toY = to.y;

    // 曲线控制点坐标
    var cp1x = fromX;
    var cp1y = fromY + (toY - fromY) / 2;

    var cp2x = toX;
    var cp2y = toY - (toY - fromY) / 2;

    // 开始绘制曲线
    context.beginPath();
    context.lineWidth = 4;
    context.strokeStyle = '#2bff28';
    context.moveTo(fromX, fromY);
    // 绘制曲线点
    context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, toX, toY);
    context.stroke();
};
```

[《参考文章》](https://www.zhangxinxu.com/wordpress/2023/02/js-curve-two-points/)

<script>
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
// 绘制尺寸
var width = canvas.width;
var height = canvas.height;

// 两个方块的坐标、尺寸，颜色等数据
var data = [{
    x: 800,
    y: 180,
    width: 280,
    height: 180,
    color: 'deepskyblue'
}, {
    x: 600,
    y: 680,
    width: 280,
    height: 150,
    color: 'deeppink'
}];

// 拖拽数据存储
var store = {};

// 绘制矩形方法
var drawRect = function () {
    data.forEach(function (obj) {
        context.beginPath();
        context.fillStyle = obj.color;
        context.fillRect(obj.x, obj.y, obj.width, obj.height);
        context.closePath();
    });
};

// 绘制连接曲线方法
var drawCurve = function () {
    // 按照坐标位置排序
    var dataSort = data.sort(function (objA, objB) {
        return (objA.y + objA.height) - (objB.y + objB.height);
    });
    // 知道上下数据
    var from = dataSort[0];
    var to = dataSort[1];

    // 曲线的起点终点
    var fromX = from.x + from.width / 2;
    var fromY = from.y + from.height;
    var toX = to.x + to.width / 2;
    var toY = to.y;

    // 曲线控制点坐标
    var cp1x = fromX;
    var cp1y = fromY + (toY - fromY) / 2;

    var cp2x = toX;
    var cp2y = toY - (toY - fromY) / 2;

    // 开始绘制曲线
    context.beginPath();
    context.lineWidth = 4;
    context.strokeStyle = '#2bff28';
    context.moveTo(fromX, fromY);
    // 绘制曲线点
    context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, toX, toY);
    context.stroke();
};

// 绘制方法
var draw = function () {
    context.clearRect(0, 0, width, height);
    
    drawRect();
    drawCurve();
};

draw();

// 是否在矩形内
var isPointInSquare = function (x, y) {
    store.isPointInA = false;
    store.isPointInB = false;
    // 两个矩形的绘制数据
    data.some(function (obj, index) {
        if (!(x < obj.x || x > obj.x + obj.width || y < obj.y || y > obj.y + obj.height)) {
            return store['isPointIn' + ['A', 'B'][index]] = true;
        }
    });
};

// 拖拽方块
canvas.addEventListener('pointerdown', function (event) {
    // 判断坐标是否在图形之内
    var clientX = event.clientX;
    var clientY = event.clientY;
    // canvas 画布的偏移
    var bound = this.getBoundingClientRect();
    // 点击坐标
    var clickX = clientX - bound.left;
    var clickY = clientY - bound.top;
    // 缩放比例
    var scaleX = width / bound.width;
    var scaleY = height / bound.height;
    // 转换为canvas坐标
    var x = clickX * scaleX;
    var y = clickY * scaleY;

    // 此时可以判断是不是在范围内了
    // 这里的图形比较简单，就不使用 isPointInPath 方法判断了
    isPointInSquare(x, y);
    // 记住位置
    store.clientX = clientX;
    store.clientY = clientY;
    // 目标元素
    store.dataMatch = data[Number(store.isPointInB)];
    // 记住初始位置
    store.originX = store.dataMatch.x;
    store.originY = store.dataMatch.y;
    // 记住缩放比例
    store.scaleX = scaleX;
    store.scaleY = scaleY;
});

document.addEventListener('pointermove', function (event) {
    if (!store.isPointInA && !store.isPointInB) {
        return;
    }

    event.preventDefault();
    // 需要移动的坐标
    var dataMatch = store.dataMatch;
    // 此时的偏移大小
    var distanceX = (event.clientX - store.clientX) * store.scaleX;
    var distanceY = (event.clientY - store.clientY) * store.scaleY;
    dataMatch.x = store.originX + distanceX;
    dataMatch.y = store.originY + distanceY;
    // 边界判断
    if (dataMatch.x < 0) {
        dataMatch.x = 0;
    } else if (dataMatch.x + dataMatch.width > width) {
        dataMatch.x = width - dataMatch.width;
    }

    if (dataMatch.y < 0) {
        dataMatch.y = 0;
    } else if (dataMatch.y + dataMatch.height > height) {
        dataMatch.y = height - dataMatch.height;
    }
    // 重新绘制
    draw();
}, {
    passive: false
});
document.addEventListener('pointerup', function () {
    store.isPointInA = store.isPointInB = false;
});
</script>


<style>
canvas {
    display: block;
    width: 1000px;
    height: 600px;
    background: conic-gradient(#eee 25%, white 0deg 50%, #eee 0deg 75%, white 0deg) 0 / 20px 20px;
    margin-inline: auto;
    
}
@media (max-width: 640px) {
    canvas {
        width: 100vw;
        height: 60vw;
    }
}
</style>