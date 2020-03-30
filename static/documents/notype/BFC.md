> BFC, 块格式化上下文(Block Formatting Context),是Web页面的可视化CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

- 创建BFC [BFC所有情况](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)
	1. float的值不是none。
	2. position的值不是static或者relative。
	3. display的值是inline-block、table-cell、flex、table-caption或者inline-flex
	4. overflow的值不是visible

- 使用场景
	- 清除浮动
	- 解决外边距塌陷