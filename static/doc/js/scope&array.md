# 作用域与数组

## 作用域

### 全局作用域

- 没有用var定义的属性不是全局变量，而是作为window的属性存在（window为全局变量）
- 在函数外使用var定义的变量为全局变量

### 函数作用域（局部作用域）

```js
function test() {
    var a = 3
    return a + 4
}
```

### 块状作用域

- {}括起来的块

```js
function test() {                   // 闭包
    var a = 3
    function test2() {
        return a                    // 作用域链一层层向上找
    }
    return test2
}
```

```js
function test() {
    var a = 3
    // var b 变量提升
    if (a === 3) {
        // b = 4 变量提升
        var b = 4                   // 浏览器会自动做变量提升，就无法实现块状作用域
        console.log('log')
    } else {
        console.log('abcd')
    }
    return a + 4
}
```

```js
function test() {
    var a = 3
    if (a === 3) {
        let b = 4
        console.log('log')
    } else {
        console.log('abcd')
    }
    return a + 4
}
```

### 动态作用域

- this是动态的

```js
window.a = 3
function test(){
    console.log(this.a)
}
test()
test.bind({a:100})()                // bind动态绑定到对象上
```

### let & const

```js
{
    let a = 1
    console.log(a)                  // 1
}
// console.log(a)                      // 无法输出，因为a为块状作用域

var b = 3
let c = 4
console.log(b, c)                   // 3 4
console.log(window.b, window.c)     // 3 undefined

var b = 4
console.log(b)                      // 4

let c = 5                           // let定义的变量不能进行重复定义
```

```js
const a = 2
a = 3                               // const定义常量，不能修改
const b
b = 3                               // const不能先声明后初始化，let var都可以
```

## 数组

### ES5中的遍历

- for 数组
- forEach 数组 可遍历对象
- every 数组
- for in 对象

```js
const arr = [1,2,3,4,5]
// for循环
for (int i = 0; i < arr.length; i++) {
    if (arr[i] === 2) {
        break
    }
    console.log(arr[i])
}
// forEach 不支持break,continue
arr.forEach(function(item) {
    console.log(item)
})
// every 要不要继续遍历取决于返回值，默认是false
arr.every(function(item) {
    if (item === 2) {
        return false
    }
    console.log(item)
    return true
})
// for in 为object设计，进行遍历
// 数组是对象，如果 arr.a=8
// 支持continue和break，但是index是字符串
for (let index in arr) {
    // if (index === 2) {       不能匹配成功，因为index是字符串
    //     continue
    // }
    if (index == 2) {
        continue
    }
    console.log(index, arr[index])
}
```

### ES6中的遍历

- for of 什么数据结构都可以，只要可遍历就可以用

```js
const arr = [1,2,3,4,5]
// for of
for (let item of arr) {
    console.log(item)
}

// 自定义结构
const Price = {
    A:[1,2,3],
    B:[3,4,5],
    C:[2,3,4]
}

// for (let key in Price) {
//     console.log(key, Price[key])
// }
// 可以自定义遍历效果，接下去讲，然后可以用for of
```

### 将伪数组转换成数组

- ES5

```js
let args = [].slice.call(arguments) // collection
let imgs = [].slice.call(document.querySelectorAll('img')) //NodeList

// Array.prototype.from
let args = Array.from(arguments)
let imgs = Array.from(document.querySelectorAll('img'))

Array.from(arrayLike/* 伪数组 */, mapFn, thisArg)

let array = Array.from({length:5})  // {length:5}也为伪数组
let array = Array.from({length:5}), function(){return 1})   // 初始化一个长度为5值为1的数组
```

- 伪数组
  - 按照索引方式存储数据
  - 有length属性
  - 例: ```{0:'a',1:'b',length:2}```

### 创建新数组

- ES5

```js
let array = Array(5)
let array = []
let array = ['','']
```

- ES6

```js
let array = Array.from({length:5}), function(){return 1})
let array = Array.of(1,2,3,4,5)
let array = Array(5).fill(1)
// Array.fill(value,start,end)
let array = [1,2,3,4,5]
array.fill(8,2,4)                   // 1 2 8 8 5
```

### 查找一个元素

- ES5

```js
// 满足条件的所有值
let array = [1,2,3,4,5]
let find = array.filter(function(){
    // return item === 3               // [3]
    // return item === 6               // []
    return item % 2 === 0           // [2,4]
})
```

- ES6

```js
// 满足条件的第一个值
let find = array.find(function(item){
    // return item === 3               // 3
    // return item === 6               // undefined
    return item % 2 === 0           // 2
})
// Array.prototyoe.findIndex
let find = array.findIndex(function(item){
    return item % 2 === 0           // 1
```
