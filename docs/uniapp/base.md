<p align="center">
  <a href="#" target="_blank">
    <img width="220" src="https://nidhoggdjoking.gitee.io/storage/project/NidhoggDJoking/uniapp.png" alt="uniApp">
  </a>
</p>
<p align="center">
  <a href="https://uniapp.dcloud.io/" target="_blank">
    <img src="https://img.shields.io/badge/UniApp-2.8.8-green">
  </a>
  <a href="https://uviewui.com/" target="_blank">
    <img src="https://img.shields.io/badge/uView-1.x-blue">
  </a>
</p>

## 个人习惯文档：

---

### 关于项目:

-  [UI框架:uView](https://www.uviewui.com/)
-  像素单位统一使用 `rpx`
-  预编译与uniApp保持统一使用`scss` 和添加 `scoped`
-  风格统一使用uniApp生命周期钩子(避免使用Vue钩子)

#### `应用生命周期`

| 函数名	| 说明|
| :-------- | :--------|
| onLaunch	| 当uni-app 初始化完成时触发（全局只触发一次）|
| onShow	| 当 uni-app 启动，或从后台进入前台显示|
| onHide	| 当 uni-app 从前台进入后台|
| onError	| 当 uni-app 报错时触发|
| onUniNViewMessage	| 对 nvue 页面发送的数据进行监听，可参考 nvue 向 vue 通讯|
| onUnhandledRejection	| 对未处理的 Promise 拒绝事件监听函数（2.8.1+）|
| onPageNotFound	| 页面不存在监听函数|
| onThemeChange	| 监听系统主题变化|

#### `页面生命周期`

| 函数名	| 说明|
| :-------- | :--------|
|onLoad	| 监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参），参考示例	|
|onShow	| 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面	|
|onReady	|监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发	|
|onHide	| 监听页面隐藏	|
|onUnload	| 监听页面卸载	|
|onResize	| 监听窗口尺寸变化	|
|onPullDownRefresh	| 监听用户下拉动作，一般用于下拉刷新，参考示例	|
|onReachBottom	| 页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。具体见下方注意事项	|
|onTabItemTap	| 点击 tab 时触发，参数为Object，具体见下方注意事项	|
|onShareAppMessage	|用户点击右上角分享	|
|onPageScroll	| 监听页面滚动，参数为Object	|
|onNavigationBarButtonTap	| 监听原生标题栏按钮点击事件，参数为Object	|
|onBackPress	|监听页面返回，返回 event = {from:backbutton、 navigateBack} ，backbutton 表示来源是左上角返回按钮或 android 返回键；navigateBack表示来源是 uni.navigateBack ；详细说明及使用：onBackPress 详解。支付宝小程序只有真机能触发，只能监听非navigateBack引起的返回，不可阻止默认行为。	|
|onNavigationBarSearchInputChanged	|监听原生标题栏搜索输入框输入内容变化事件	|
|onNavigationBarSearchInputConfirmed	|监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。	|
|onNavigationBarSearchInputClicked	|监听原生标题栏搜索输入框点击事件	|
|onShareTimeline	|监听用户点击右上角转发到朋友圈	|
|onAddToFavorites					|监听用户点击右上角收藏|

### 基本目录结构：

```shell
├── styles
│   ├── common         			# 处理请求相关
│   ├── components          	   # 组件包
│   ├── pages                	  # 存放页面
│   ├── static             		# 静态资源
│   ├── utils              		# 公共(全局拓展)方法
│   └── uni.scss           		# 全局样式变量
```

- components 组件库必须用文件夹包裹
- static 图片文件夹包裹并命名模块名称

   
  
### 请求相关

- #### 以下为可选的配置参数，这个配置是一次配置，全局通用的

```js
config = {
	baseUrl: '', // 请求的本域名
	method: 'POST',
	// 设置为json，返回后会对数据进行一次JSON.parse()
	dataType: 'json',
	showLoading: true, // 是否显示请求中的loading
	loadingText: '请求中...', // 请求loading中的文字提示
	loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
	originalData: false, // 是否在拦截器中返回服务端的原始数据
	loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
	// 配置请求头信息
	header: {
		'content-type': 'application/json;charset=UTF-8'
	},
}
```

- #### 请求模板：

```javascript
this.$u.get('/app/page/block?code=mobile.index.top-swiper').then(data => {
	console.log('初始化！', data)
}).catch(res => {
	console.log("失败", res);
})
```

- ### code 返回(后端决定规则)

| code | 状态 |
| ---- | ---- |
| 0    | 正常 |
| 100  | 失效 |
| 500  | 异常 |

- ### 请求错误过滤

```javascript
if (res.type == "warn") {
	uni.showToast({
		title: res.msg,
		duration: 2000,
		icon: 'none'
	});
	return false;
}
```

```js
<!-- 拦截器 Token 使用同步本地存储-->
const token = uni.getStorageSync('token');
```


### 骨架屏

- u-skeleton(必须)，该类名用于页面的最外层元素，供骨架屏组件查询和定位出绘制骨架的位置和尺寸
- u-skeleton-circle(可选)，该类名用于页面的圆形元素，供骨架组件描绘出圆形的骨架块
- u-skeleton-rect(可选)，该类名用于页面的矩形元素，供骨架组件描绘出矩形的骨架块
- u-skeleton-fillet(可选)，该类名用于页面的矩形带圆角元素，供骨架组件描绘出矩形带圆角的骨架块


```html
<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
<!-- 数据请求完成后，将loading设置为false，会隐藏骨架组件 -->
```

通过`query.selectAll('.u-skeleton')`查询相应的class进行css改变背景为灰色达到效果,是个“费力讨好”的方法

### 轮播图

```html
<swiper class="swiper" indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff" :autoplay="false"
	:indicator-dots="false" :interval="2000" :duration="500">
	<swiper-item v-for="(item,index) in list" :key="index">
		<view class="swiper-item">
			<u-image mode="aspectFill" width="100%" height="550" :src="item.image"></u-image>
		</view>
	</swiper-item>
</swiper>
```

~~ `<u-swiper :list="list"></u-swiper>` ~~

- #### `uView1.x` 无法做到轮播懒加载

### 图片懒加载

`threshold`:
如果取负值(如-300)，为尚未到达屏幕底部，距离300rpx时触发
如果取正数(如300)，为图片超出屏幕底部300rpx时触发

```html
<u-lazy-load :image="image" threshold="300" img-mode="aspectFill"></u-lazy-load>
```
封装的是uni.createIntersectionObserver 即 创建并返回一个 `IntersectionObserver` 对象实例(节点布局交叉状态 API 可用于监听两个或多个组件节点在布局位置上的相交状态)。

### or

```html
<u-image width="100%" height="300rpx" :src="src" mode="aspectFill"></u-image>
```
`u-image` 是封装了uniapp->image的图片懒加载。只针对page与scroll-view下的image有效,其他位置使用白搭同时也没有做到`IntersectionObserver`的那种效果。

## 分享:

```javascript
// main.js

// 其他内容

// 引入uView对小程序分享的mixin封装
let mpShare = require('uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare)

// 其他内容
```

```javascript
// 该对象已集成到this.$u中，内部属性如下
this.$u.mpShare = {
	title: '', // 默认为小程序名称，可自定义
	path: '', // 默认为当前页面路径，一般无需修改，QQ小程序不支持
	// 分享图标，路径可以是本地文件路径、代码包文件路径或者网络图片路径。
	// 支持PNG及JPG，默认为当前页面的截图
	imageUrl: '' 
}
```

```javascript
export default {
	onLoad() {
		this.$u.mpShare.title = '天苍苍野茫茫，风吹草低见牛羊';
	}
}
```

- #### 无须重写`onShareAppMessage`和配置路由

### 防抖、节流:

- ####  防抖

```html
<template>
    <view class="">
		<!-- 此处用法为在模板中使用，无需写this，直接$u.debounce()即可 -->
    	<view class="debounce" @tap="$u.debounce(btnAClick, 500)">
    	</view>
    	<view class="debounce" @tap="btnBClick">
    	</view>
    </view>
</template>

<script>
    export default {
        methods: {
            btnAClick() {
				console.log('btnClick');
			},
			btnBClick() {
				// 此处用法为在js中调用，需要写this.$u.debounce()
				this.$u.debounce(this.toNext, 500)
			},
			toNext() {
				console.log('btnBClick');
			}
        }
    }
</script>
```

- #### 节流

```html
<template>
    <view class="">
		<!-- 此处用法为在模板中使用，无需写this，直接$u.throttle()即可 -->
    	<view class="throttle" @tap="$u.throttle(btnAClick, 500)">
    	</view>
    	<view class="throttle" @tap="btnBClick">
    	</view>
    </view>
</template>

<script>
    export default {
        methods: {
            btnAClick() {
				console.log('btnClick');
			},
			btnBClick() {
				// 此处用法为在js中调用，需要写this.$u.throttle()
				this.$u.throttle(this.toNext, 500)
			},
			toNext() {
				console.log('btnBClick');
			}
        }
    }
</script>
```

### 父子组件传参

```
this.$parent.$parent

this.$children.$children

设计结构问题每个需要多加一层
```


###  SASS 全局变量计算使用

- ####  Sass 变量使用 `calc()` 需使用` #{ } `包裹

```css
<!-- 例子 -->
.toolTitle {
	$txtHei:80rpx;
	$fontSize:32rpx;
	position: relative;
	width: 340rpx;
	height: $txtHei;
	margin: 0 auto;
	font-size: $fontSize;
	color: #333;
	font-weight: 700;
	text-align: center;
   	// 运算符间保留空格 
	line-height: calc(#{$txtHei} * 2 - #{$fontSize} / 2);
}
```

- ####  Sass 使用` @mixin `指令

```css
@mixin bet{
	display: flex;
	justify-content: space-between;
	align-content: center;
}
<!-- @include bet-->

@mixin over($width) {
	max-width: $width;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
<!-- @include over(50%)-->
```

###  APP原型拓展 安装 

- #### 注册内容轻度封装减少`main.js`的代码量便于阅读和修改

 ```js
 // utils/install.js
 import {
 	getToken
 } from "@/utils/index.js";
 
 
 const install = (Vue, vm) => {
 	Vue.prototype.getToken = getToken;
 }
 
 export default {
 	install
 }
 
 
 // main.js
 import Vue from 'vue'
 import App from './App'
 
 import xx from "@/utils/xx.js";
 
 Vue.use(`你的install.js对象 xx`, app)
 ```


- #### 编译文件体积超过500kb 会跳过压缩以及`ES6`转`ES5`处理，出现的兼容问题：
1. 双向绑定数据需借助`this.$set`进行及时的数据渲染。

```javascript
<!-- old -->
_this.UserInfo = {
	'nickName': infoRes.userInfo.nickName, // 昵称
	'portrait': infoRes.userInfo.avatarUrl, // 头像
}

<!-- new -->
_this.$set(_this.UserInfo, 'nickName', infoRes.userInfo.nickName);
_this.$set(_this.UserInfo, 'portrait', infoRes.userInfo.avatarUrl)

```

2. vue 原型链拓展方法相互调用需直接使用 `vm` 对象而不是在使用 `this`

```javascript
<!-- 在拦截器中处理Token过期 -->
// this.getToken();
<!-- to -->
Vue.prototype.getToken()
```

### 上拉加载:`全屏版`

```js
<!-- 上拉加载显示组件 -->
<template>
	<u-loadmore v-if="dataList.length != 0" :status="status" margin-top="26" margin-bottom="34" :icon-type="iconType" :load-text="loadText" />
</template>
export default {
	data() {
		return {
			pageNo: 0,
			pageSize: 10,
			dataList: [],
			status: 'loadmore',
			iconType: 'flower',
			loadText: {
				loadmore: '上拉加载',
				loading: '努力加载中',
				nomore: '没有更多了'
			},
		}
	},
	methods: {
		getData() {
			this.$u.get(`/aaa/bbb?pageNo=${this.pageNo}&pageSize=${this.pageSize}`).then(data => {
				if (data.page.records.length < this.pageSize) {
					this.status = 'nomore';
				}
				this.dataList = this.dataList.concat(data.page.records)
			}).catch(res => {
				console.log("获取数据失败", res);
			})
		}
	}
	<!-- 生命周期级别函数 -->
	onReachBottom() {
		if (this.status == 'nomore') return;
		this.status = 'loading';
		this.pageNo = ++this.pageNo;
		this.getData();
	}
}
```

### 上拉加载:`scroll-view`

```js
<template>
	<scroll-view scroll-y class="right-box" v-if="current==index" @scrolltolower="bottomLoading">
		<view>内容</view>
		<u-loadmore :status="status" margin-top="26" margin-bottom="34" :icon-type="iconType" :load-text="loadText" />
	</scroll-view>
</template>
export default {
	data() {
		return {
			pageNo: 0,
			pageSize: 10,
			dataList: [],
			status: 'loadmore',
			iconType: 'flower',
			loadText: {
				loadmore: '上拉加载',
				loading: '努力加载中',
				nomore: '没有更多了'
			},
		}
	},
	methods: {
		getData() {
			this.$u.get(`/aaa/bbb?pageNo=${this.pageNo}&pageSize=${this.pageSize}`).then(data => {
				if (data.page.records.length < this.pageSize) {
					this.status = 'nomore';
				}
				this.dataList = this.dataList.concat(data.page.records)
			}).catch(res => {
				console.log("获取数据失败", res);
			})
		}
		bottomLoading() {
			if (this.status == 'nomore') return;
			this.pageNo = ++this.pageNo;
			this.status = 'loading';
			this.getData();
		},
	}

}
```

### 页面位置变换

```js
<!-- 锚链接 -->
uni.createSelectorQuery().select(".evaluate-data").boundingClientRect((data) => { //data - 各种参数
	uni.pageScrollTo({
		scrollTop: this.PageScrollTop + data.top - 50,
		duration: 300
	});
}).exec()

<!-- 返回顶部 -->
uni.pageScrollTo({
	scrollTop: 0,
	duration: 300
});
```

### 左右滑动

```
<scroll-view scroll-x="true" class="scroll">
	<block v-for="item in dataList" :key="item.id">
		<view class="box">
			<view class="images">
				<u-image mode="aspectFit" width="100rpx" height="100rpx" border-radius="50%" :src="item.image"></u-image>
			</view>
		</view>
	</block>
</scroll-view>
```

```css
.scroll {
	width: 100%;
	overflow: hidden;
	white-space: nowrap;
}

.box {
	display: inline-block;
	width: calc(25% - 20rpx);
	height: 200rpx;
	margin-right: 20rpx;
	position: relative;

	.images {
		display: flex;
		justify-content: center;
		width: 100%;
		height: 100rpx;
		border-radius: 16rpx;
		position: relative;
		margin-bottom: 10rpx;
	}
}

.box:last-child {
	margin-right: 0;
}
```

### 支付宝富文本

```javascript
/**支付宝处理富文本文件*/
changeText(html){
	if(html!=''&&html!=undefined&&html!=null){
	let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
		match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
		match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
		match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
		return match;
	});
	newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
		match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
		return match;
	});
	newContent = newContent.replace(/<br[^>]*\/>/gi, '');
	newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
	//将 HTML String转化为 nodes 数组
	//const content = new HTMLParser(newContent.replace()?.trim());
	//console.log(content)
	return newContent;
	}else{
		return html;
	}
}
```

<style>
/* @import url('static/css/code3.css'); */
.markdown-section td, .markdown-section th {
    border: 1px solid #ddd;
    padding: 8px 13px;
}
</style>