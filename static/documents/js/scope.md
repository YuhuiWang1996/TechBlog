# 作用域和闭包

## 作用域和自由变量

### 作用域

- 全局作用域
- 函数作用域
- 块级作用域（ES6新增）

### 自由变量

> 跨越了自己的作用域的变量都叫自由变量

- 一个变量在当前作用域没有定义，但被使用了。向上级作用域，一层一层一次寻找，直至找到为止。如果到全局作用域都没有找到，则报错xx is not defined。
- 所有的自由变量的查找，是在**函数定义的地方**，向上级作用域查找，不是在执行的地方。

## 闭包

- 作用域应用的特殊情况
- 闭包就是**能够读取其他函数内部变量的函数**。由于在JS中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成*定义在一个函数内部的函数*。所以，在本质上，闭包就是**将函数内部和函数外部连接起来的一座桥梁**。

### 函数作为参数被传递

```js
function print(fn) {
  const a = 200
  fn()
}
const a = 100
function fn() {
  console.log(a)
}
print(fn) // 100
```

### 函数作为返回值被返回

```js
function create() {
  const a = 100
  return function () {
    console.log(a)
  }
}

const fn = create()
const a = 200
fn()      // 100
```

### 闭包的应用

- cache工具（隐藏数据）
- 同理也可以实现私有变量（函数）

```js
function createCache() {
  // 闭包中的数据被隐藏，外界不能访问
  const data = {}
  return {
    set: function(key, val) {
      data[key] = val
    },
    get: function(key) {
      return data[key]
    }
  }
}

const cache = createCache()
cache.set('key', 'value')
console.log(cache.get('key')) // value
```

## this

> this的取值是在**函数执行时确定的**，不是在函数定义时确定的

### 模拟bind

```js
Function.prototype.myBind = function() {
  // 将参数转化为数组
  const args = Array.prototype.slice.call(arguments)

  // 获取 this (数组第一项为this)
  const t = args.shift()

  // 获取 fn.bind() 中的 fn
  const self = this

  // bind 返回的是一个函数
  return function() {
    return self.apply(t, args)
  }
}
```

### call apply bind

> 传入什么绑定什么

- Call Apply Bind 的区别
  - call 、bind 、 apply 这三个函数的第一个参数都是 this 的指向对象，第二个参数差别就来了：
  - call 的参数是直接放进去的，第二第三第 n 个参数全都用逗号分隔，直接放到后面 obj.myFun.call(db,'成都', ... ,'string' )。
  - apply 的所有参数都必须放在一个数组里面传进去 obj.myFun.apply(db,['成都', ..., 'string' ])。
  - bind 除了返回是函数以外，它 的参数和 call 一样。

### this取值的不同情况

- 作为普通函数
  - window

  ```js
  function fn() {
    console.log(this)
  }
  fn()  // window
  ```

- 作为对象方法被调用
  - 对象本身

- 在构造函数中调用
  - 对应的实例

- 箭头函数
  - **上级作用域**this的值
