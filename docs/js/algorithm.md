## 十大经典排序算法

<br>

### 堆排序：


?>  堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质

> #### 代码实现：

```javascript
var len;    // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量

function buildMaxHeap(arr) {   // 建立大顶堆
    len = arr.length;
    for (var i = Math.floor(len/2); i >= 0; i--) {
        heapify(arr, i);
    }
}

function heapify(arr, i) {     // 堆调整
    var left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;

    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest != i) {
        swap(arr, i, largest);
        heapify(arr, largest);
    }
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function heapSort(arr) {
    buildMaxHeap(arr);

    for (var i = arr.length-1; i > 0; i--) {
        swap(arr, 0, i);
        len--;
        heapify(arr, 0);
    }
    return arr;
}
```

> #### 代码拆分：

```javascript
function heapSort(arr) {
    buildMaxHeap(arr);

    for (var i = arr.length-1; i > 0; i--) {
        swap(arr, 0, i);
        // 头尾互换,确定了最大值,二叉树长度减1
        len--;
        heapify(arr, 0);
        // 重新重头开始运行堆调整
    }
    return arr;
}
```

```javascript
function buildMaxHeap(arr) {   // 建立大顶堆
    len = arr.length;
    for (var i = Math.floor(len/2); i >= 0; i--) {
        heapify(arr, i);
    }
}
// Math.floo 返回小于等于x的最大整数,如：Math.floor(1.6) = 1
// Math.floor(len/2) 取最后节点的父节点位数
```
```javascript
function heapify(arr, i) {     // 堆调整
    var left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;
    // 二叉树结构 左子树位数 = 父位数 * 2  + 1
    // 二叉树结构 右子树位数 = 父位数 * 2  + 2

    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }
    // left < len 和  right < len 判断长度是否超过树的长度

    if (largest != i) {
        swap(arr, i, largest);
        // 交换父子节点的值
        heapify(arr, largest);
        // 重新以现在的子节点为新的父节点继续循环
    }
    // largest != i 既：父节点的值大于两个在子节点的值,不做其他的操作
}
```
```javascript
// 交换数组中两位置的值
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
```

<img  src="static/gif/heapSort.gif" style="border-radius: 5px;"/>
<br>

##### [算法传送门](https://www.runoob.com/w3cnote/ten-sorting-algorithm.html)