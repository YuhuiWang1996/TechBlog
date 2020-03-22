# 变量类型和计算

## 值类型和引用类型

### 常见值类型

```js
const a               // undefined
const s = 'abc'       // string
const n = 100         // number
const b = true        // boolean
const s = Symbol('s') // symbol 唯一表示ID
```

### 常见引用类型

```js
const obj = { x: 100 }      // object
const arr = ['a', 'b', 'c'] // object
const n = null              // object 特殊引用类型，指针指向为空地址
function fn() {}            // function 特殊引用类型，但不用于存储数据，所以没有“拷贝，复制函数”这一说
```

### 类型判断

- typeof运算符
  - 识别所有值类型
  - 识别函数
  - 判断是否是引用类型（不可再细分）

### 手写深拷贝

```js
function deep_copy(obj) {
  if (typeof obj !== 'object' || typeof obj === null) {
    return obj
  }

  let result
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }

  for (let key in obj) {
    // 保证key是自身的属性，而不是原型的属性
    if (obj.hasOwnProperty(key)) {
      result[key] = deep_copy(obj[key])
    }
  }

  return result
}
```

## 变量计算

### 字符串拼接

```js
const a = 10 + 1                // 11
const b = 10 + '1'              // '101'
const c = true + '1'            // 'true1'
const d = 10 + parseInt('1')    // 11
```

### ==

```js
100 == '100'                    // true
0 == ''                         // true
0 == false                      // true
false == ''                     // true
null == undefined               // true
```

- 除了\==null之外，其他一律用\===

  ```js
  const obj = { x: 100 }
  if (obj.a == null) { }
  // 相当于
  if (obj.a === null || obj.a === undefined) { }
  ```

### if语句和逻辑运算

- truly变量: !!a===true的变量
- falsely变量: !!a===false的变量

  ```js
  // 以下是falsely变量。除此之外都是truly变量
  !!0
  !!NaN
  !!''
  !!null
  !!undefined
  !!false
  ```

- if语句判断的就是truly变量和falsely变量
- 逻辑判断也是判断truly变量和falsely变量

  ```js
  console.log(10 && 0)      // 0
  console.log('' || 'abc')  // 'abc'
  console.log(!window.abc)  // true
  ```
