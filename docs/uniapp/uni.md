### Hbuild 自定义代码片段：

```json
// 注意：本文档仅支持单行注释，并且//'前不能有任何非空字符！！！
//
// HBuilderX使用json扩展代码块，兼容vscode的代码块格式
// 本文档修改完毕，保存即可生效，无需重启。
// 本文档用于用户自定义vue代码块。
// 每个配置项的说明如下：
// "key"    ：代码块显示名称，显示在代码助手列表中的名字，以下例子中"console.log"就是一个key。
// "prefix" ：代码块的触发字符，就是敲什么字母匹配这个代码块。
// "body"   ：代码块的内容。内容中有如下特殊格式
//          $1 表示代码块输入后光标的所在位置。如需要多光标，就在多个地方配置$1,如该位置有预置数据，则写法是${1:foo1}。多选项即下拉候选列表使用${1:foo1/foo2/foo3}
//          $2 表示代码块输入后再次按tab后光标的切换位置tabstops（代码块展开后按tab可以跳到下一个tabstop）
//          $0代表代码块输入后最终光标的所在位置（也可以按回车直接跳过去）。
//          双引号使用\"转义
//          换行使用多个数组表示，每个行一个数组，用双引号包围，并用逗号分隔
//          缩进需要用\t表示，不能直接输入缩进！
// "triggerAssist" ：为true表示该代码块输入到文档后立即在第一个tabstop上触发代码提示，拉出代码助手，默认为false。
// 每个代码块以key为主键，多个代码块需要逗号分隔。
// 如果json语法不合法，底部会弹出错误信息，请注意修正。
// 例子:
// "console.log": {
//  "prefix": "logtwo",
//  "body": [
//      "console.log('$1');",
// 	    "\tconsole.log('$2');"
// 	],
// 	"triggerAssist": false,
// 	"description": "Log output to console twice"
// }
```

> #### vue代码块：

```json
// Vue base Template:
{
	"jokingVue":{
		"description": "Base for Vue",
		"prefix": "jv",
		"body": [
		    "<template>",
		    "\t<view>",
		    "",
		    "\t</view>",
		    "</template>",
		    "",
		    "<script>",
		    "\texport default {",
			"\t\tonLoad() {",
			"\t\t",
			"\t\t},",
		    "\t\tdata() {",
			"\t\t\treturn {",
			"\t\t\t\t",
			"\t\t\t}",
			"\t\t},",
		    "\t}",
		    "</script>",
		    "",
		    "<style lang=\"scss\" scoped>",
		    "",
		    "</style>"
		]
	}
}

```

<!-- <style>
@import url('static/css/code3.css');
</style> -->