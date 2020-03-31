[参考MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

> replace() 方法返回一个由替换值替换一些或所有匹配的模式后的新字符串。

- ```str.replace(regexp|substr, newSubStr|function)```

- 使用正则表达式
	- global : 全局替换
	- ignore : 忽略大小写
	```js
	const re = /apples/gi;
	let str = "Apples are round, and apples are juicy.";
	let newstr = str.replace(re, "oranges");

	console.log(newstr); // oranges are round, and oranges are juicy.
	```
- 一些正则基本规则
	- ^ 字符串开始
	- [ ]任意一个
	- \w 数字字母下划线
	- { , } 长度
	- \s 匹配空白字符
	- \S 匹配非空白字符
	- \t 制表符
	- $ 结尾
	- \* 0 or more
	- \+ 1 or more
	- . any

- 交换字符串中的两个单词
	```js
	var re = /(\w+)\s(\w+)/;
	var str = "John Smith";
	var newstr = str.replace(re, "$2, $1");
	console.log(newstr); // Smith, John
	```
