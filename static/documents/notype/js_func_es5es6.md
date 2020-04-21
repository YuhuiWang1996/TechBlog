# JS 函数 - ES5与ES6对比

## 函数参数的默认值

### ES5
- 通过设置undefined

```js
function fn(x, y, z) {
  if (y === undefined) {
    y = 1
  }
  if (z === undefined) {
    z = 2
  }
  return x + y + z
}
```

### ES6
- 更加简洁
	- 默认值可以是表达式
	- 缺省值可以用undefined表示

```js
function fn(x, y = 1, z = x + y) {
  return x + y + z
}

console.log(fn(2)); // 4
console.log(fn(2, undefined, 5)); // 5
```

- ES6函数内部不能使用arguments，fn.length获取没有默认值的参数个数

## 不确定参数

### ES5

- 实现求和函数

```js
function sum() {
  let num = 0
  // Array.prototype.forEach.call(arguments, function (item) {
  //   num += item * 1
  // })
  Array.from(arguments).forEach(function (item) {
    num += item * 1
  })
  return num
}
```

### ES6

- 使用Rest参数实现求和函数
	- nums是数组

```js
function sum(base, ...nums) {
  let num = 0
  num += base * 10
  nums.forEach(function (item) {
    num += item * 1
  })
  return num
}
```

- Rest参数的逆运算，Spread操作符

```js
function sum(x = 1, y = 2, z = 3) {
  return x + y + z
}

let params = [3, 4, 5]
console.log(sum(params[0], params[1], params[2])) // 12
console.log(sum.apply(this, params)) // 12
console.log(sum(...params)) // 12
```

## 箭头函数

- ES6新特性

```js
let hello = name => {
  console.log('hello!', name)
}
hello('es6')

let sum = (x, y, z) => x + y + z // 省略return
console.log(sum(1, 2, 3))

let obj = (x, y, z) => ({
  x: x,
  y: y,
  z: z
}) // 小括号相当于运算表达式
console.log(obj(1, 2, 3))
```

## this

### ES5

- **谁调用function，this就指向谁。**

```js
let test = {
  name: 'test',
  say: function () {
    console.log(this.name)
  }
}

test.say() // test
```

### ES6

**箭头函数中，定义的时候this指向谁，调用的时候this就指向谁**。具体来说就是==上级作用域this的值==。

```js
let test = {
  name: 'test',
  say: () => {
    console.log(this.name)
  }
}

test.say() // undefined
```

	- 在浏览器中的话，此时this指向window，如果使用babel，会使用eval方法，所以this会指向一个空对象