- 额外标签
	- 在最后一个浮动标签后，新增加一个标签，设置为clear:both
- 父级添加overflow属性（非默认```overflow: visiable```）
	- 触发BFC
- 使用after伪元素

	```html
	.clearfix:after{
		content: "";
        	display: block;
        	height: 0;
        	clear:both;
        	visibility: hidden;
	}
	```
