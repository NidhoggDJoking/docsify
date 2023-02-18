# vite

> Webpack 已死 Vite 当立

### 观 Evan You vite介绍

- 部署静态资源【静态文件服务器】

- 无配置情况的热更新【跟踪所有引用资源】

- 依然遵循所有的npm Node 模块解析算法

- 不同于webpack以main.js 作为入口的模式 vite 的入口为index.html 来构建整个模块图，从而达到热更新的目的

- 如 .module. 约定格式的文件命名 将不在热更新而是重新加载 等约定


### 安装

!> 兼容性注意 Vite 需要 Node.js 版本 >= 12.0.0。

解决方法: `npm install -g n` (Node.js 版本管理)[https://www.npmjs.com/package/n]

如果出现:
Unsupported platform for n@9.0.0: wanted {"os":"!win32","arch":"any"} (current: {"os":"win32","arch":"x64"})

npm install -g n 后面添加 --force即可


还是改用老伙计 `nvm` 吧

### nvm:  node.js version management。

```sh
nvm list 查看已经安装的版本
nvm list installed 查看已经安装的版本
nvm list available 查看网络可以安装的版本
nvm version 查看当前的版本
nvm install 安装最新版本nvm
nvm use <version> ## 切换使用指定的版本node
nvm ls 列出所有版本
nvm current显示当前版本
nvm alias <name> <version> ## 给不同的版本号添加别名
nvm unalias <name> ## 删除已定义的别名
nvm reinstall-packages <version> ## 在当前版本node环境下，重新全局安装指定版本号的npm包
nvm on 打开nodejs控制
nvm off 关闭nodejs控制
nvm proxy 查看设置与代理
nvm node_mirror [url] 设置或者查看setting.txt中的node_mirror，如果不设置的默认是 https://nodejs.org/dist/
nvm npm_mirror [url] 设置或者查看setting.txt中的npm_mirror,如果不设置的话默认的是： https://github.com/npm/npm/archive/.
nvm uninstall <version> 卸载制定的版本
nvm root [path] 设置存储不同版本node的目录。如果未设置，默认使用当前目录
nvm arch 显示node是运行在32位还是64位。
nvm install <version> [arch] 安装node， version是特定版本也可以是最新稳定版本latest。可选参数arch指定安装32位还是64位版本，默认是系统位数。可以添加--insecure绕过远程服务器的SSL。
```

使用use命令如出现一下报错:请使用window+x，终端管理员再运行use命令
`exit status 1: �ܾ����ʡ�`


`yarn create vite` 短的yyds

`npm init vite@latest`

### 框架选择

Select a framework: » - Use arrow-keys. Return to submit.
vanilla
vue
react
preact
lit
svelte

> `angular` 算是凉透了坐等`svelte`登上神坛


vue3 + ts 存在的一个问题对低版本的浏览器的兼容不到位

<!-- <style>
    @import url('static/prism/prism.css');
</style> -->