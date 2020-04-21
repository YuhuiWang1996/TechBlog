# JS ES10 新特性

## Array

### arr.flat()

- 扁平化输出
- arr.flat(depth) **depth**用于指定递归的深度

```js
let arr = [1, [2, 3],
  [4, 5, [6, 7, [8, 9]]]
]
console.log(arr.flat(1)) // [ 1, 2, 3, 4, 5, [ 6, 7, [ 8, 9 ] ] ]
console.log(arr.flat(Infinity)) // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

function myFlat(arr) {
  while (arr.some(item => item instanceof Array)) {
    arr = arr.flat()
  }
  return arr;
}
console.log(myFlat(arr)) // [ 1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(arr) // [ 1, [ 2, 3 ], [ 4, 5, [ 6, 7, [Array] ] ] ]
```
- 使用Infinity关键字实现不定层数拉平
- 手写不定层数拉平

> 不使用flat实现

```js
function myFlat2(arr) {
  if (!Array.isArray(arr)) {
    return arr
  }
  let res = []
  for (let e of arr) {
    res = res.concat(myFlat2(e))
  }
  return res
}
```

### arr.flatMap()

- arr.map(item => ...)
- flatMap就是**map和flat的结合**

```js
console.log(arr.map(item => item + 1).flat())
console.log(arr.flatMap(item => item + 1))
```

## String

### trim()
- **前后去空格**

```js
let str = '   foo   '
console.log(str.replace(/^\s+|\s+$/g, ''))
console.log(str.trimStart()) // OR trimLeft()
console.log(str.trimEnd()) // OR trimRight()
console.log(str.trim())
```

### matchAll()

- 例1 使用exec，不断执行

```js
let str = `"foo" and "bar" and "baz"`
function select(regExp, str) {
  const matches = []
  while (true) {
    const match = regExp.exec(str)
    if (match === null) break
    matches.push(match[1])
  }
  return matches
}
console.log(select(/"([^"]*)"/g, str)) // [ 'foo', 'bar', 'baz' ]
```

- 例2 直接使用match

```js
console.log(str.match(/"([^"]*)"/g)) // [ '"foo"', '"bar"', '"baz"' ]
```
			
> **问题** : 获取的是完整匹配

- 例3 使用replace，并在第二个参数传入方法，获取完整匹配和捕获

```js
function selectRe(regExp, str) {
  const matches = []
  str.replace(regExp, function (all, first) {
    // all是完整匹配
    // first是捕获
    matches.push(first)
  })
  return matches
}
console.log(selectRe(/"([^"]*)"/g, str)) // [ 'foo', 'bar', 'baz' ]
```

- 例4 使用matchAll直接获取迭代器在进行遍历

```js
function selectAll(regExp, str) {
  const matches = []
  for (let match of str.matchAll(regExp)) {
    matches.push(match[1])
  }
  return matches
}
console.log(selectAll(/"([^"]*)"/g, str)) // [ 'foo', 'bar', 'baz' ]
```

### Object

- 数组转化为Object
	- Object.fromEntries(arr)

	```js
	let arr = [
  	  ['a', 1],
  	  ['b', 2]
	]
	let obj = Object.fromEntries(arr);
	console.log(obj) // { a: 1, b: 2 }
	```

- Object转化为键值对数组，然后就可以使用数组中强大的API
	- Object.entries(obj)
	```js
	let obj = { a: 1, b: 2 }
	let obj1 = Object.fromEntries(
  	  Object.entries(obj).filter(([key, val]) => key === 'a')
	)
	console.log(obj1) // { a: 1 }
	```
### 其它
- try.catch
	- 允许在catch后不加()
- BigInt
	- 处理超过2^53的数字
	- 在数字后加上n