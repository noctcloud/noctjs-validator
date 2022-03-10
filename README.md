# NOCTJS-VALIDATOR

noctjs云函数请求数据校验器，校验器对`JSON Schema`进行了扩展，主要是本地化错误信息和数据类型转换。

## 使用方式
在数据使用前对数据进行校验
```javascript
const { service } = require("noctjs");
const validator = require("noctjs-validator"); // 数据校验器

module.exports = class test extends service {
	
	async test(data) {
		let validate = validator.data({
			data: data,
			schema: {
				"type": "object",
				"title": "test.validator",
				"description": "test.validator校验integer",
				"properties": {
					"id": {
						"display": "编号",
						"type": "integer",
						"requiredErrorMessage": "{display}不能为空",
						"minimum": 1,
						"minimumErrorMessage": "{display}最小为{minimum}"
					}
				},
				"required": ["id"]
			}
		});
		if (validate.result.valid) {
			// 将请求参数类型转换为JSON Schema对应类型
			data = validate.data;
		} else {
			throw new Error(validate.errors[0]);
		}
	}
	
}
```

每项校验属性都可以通过属性名称+ErrorMessage配置错误信息，例：

|属性名称|对应错误信息属性|
|--	|--	|
|required|requiredErrorMessage|
|minimum|minimumErrorMessage|
|maximum|maximumErrorMessage|

在ErrorMessage中可以使用`{属性名称}`得到同级属性的值，例：

```javascript
{
	"display": "编号",
	"minimum": 1,
	"minimumErrorMessage": "{display}最小为{minimum}"
}
```

验证失败时将返回错误信息为：`编号最小为1`

最后附上一个JSON Schema的基础知识链接：[https://zhuanlan.zhihu.com/p/72607132](https://zhuanlan.zhihu.com/p/72607132)