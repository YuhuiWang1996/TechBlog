# JS 数组相关操作(2) - ES5与ES6对比

## 数组遍历

### ES5中数组遍历的方法

1. **for 循环**
2. **forEach**
	- ==更简洁的for循环==
	- **优势** : forEach写法更简洁
	- **劣势** : 但是不支持break和continue
	- ```arr.forEach(function(item){ ... })```
3. **every**
	- ==every默认不继续执行循环==，只有函数返回true才会继续遍历
	- 除了遍历，every用于**测试一个数组内的所有元素是否都能通过某个指定函数的测试**。
		- 它返回一个布尔值。如果回调函数的每一次返回都为 truthy 值，返回 true ，否则返回 false。
	- ```arr.every(function(item){ ... })```
4. **for in**
	- ==是为遍历object设计的==
	- 之所以能遍历数组，是因为数组本身也是对象，并且是可遍历的。
	- **劣势** : 因为数组本身是个对象，可以为它设置自定义的属性，如果此时使用for in对数组进行遍历，会将自定义属性也遍历出来。
	- **注意** : index是字符串

### ES6中数组遍历的方法

1. for of
	- for，forEach，every都是针对数组遍历，for in是针对object，而for of是==针对任何可遍历的对象==（可以针对自定义数据结构，自定义遍历效果）

## 数组转换

- ==伪数组==
	- 比如 : **arguments (collection)**，**DOM中的node list**
	- 特征 : 
		- ==按照索引方式存储数据==
		- ==有length属性==
	
### ES5中将伪数组转化成数组
1.  **```var args = [].slice.call(arguments)```**

### ES6中将伪数组转化成数组

1. **```Array.prototype.from```**
	- ```Array.from(arrayLike, mapFn, thisArg)```

		```js
		let args = Array.from(arguments)
		```

	- 自定义数组

		```js
		let array = Array.from({length:5}, function() {return 1}) // [1, 1, 1, 1, 1]
		```

## 生成新数组
		
### ES5

1. ```var array = Array(5)```
2. ```var array = []```

### ES6

1. ```Array.from```
2. ```Array.prototype.of```

	```js
	Array.of(1,2,3,4,5) //[1, 2, 3, 4, 5]
	```

3. ```Array.prototype.fill```
	- ```Array.fill(value, start, end)```

	```js
	Array(5).fill(1) // [1, 1, 1, 1, 1]
	```
			
## 查找

### ES5

1. 遍历的过程中查找
2. filter查找
	- 筛选出所有满足条件的元素，组成一个数组，如果不存在，返回空数组
	- **缺点** : 如果只要知道是否存在，**不够高效**，因为需要遍历整个数组

### ES6

1. ```Array.prototype.find```
	- 返回单个数据，不是索引，如果有返回满足条件的这个数据，如果没有返回undefined

	```js
	[1,2,3,4,5].find(function(item){return item === 2})
	```

	- **特点** : 找到目标就不继续寻找

2. ```Array.prototype.findIndex```
	- 与find类似，只是返回的是位置