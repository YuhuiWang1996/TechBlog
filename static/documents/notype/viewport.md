> viewport决定，css中设置==多少像素能占满屏==幕。比如，viewport=320，那么如果div的宽度为320px，则刚好占满屏幕

- 移动设备中1px不等于1个物理像素
	- 移动设备多已经采用高倍屏，物理分辨率要比逻辑分辨率高
	- 可以使用如下代码来让**viewport宽度等于逻辑分辨率宽度**(**width=device-width**)，这个时候1px是不等于一个物理像素的，而是等于==多个物理像素==。
	- 如果不设置的话，浏览器默认会按照默认的viewport宽度（很多是980px）渲染，再缩放到逻辑分辨率，导致页面元素看上去很小。
	- 
	```html
	<meta id="viewport" name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1; user-scalable=no;">
	```


