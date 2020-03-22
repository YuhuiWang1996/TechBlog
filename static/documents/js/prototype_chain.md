# 原型和原型链

## 创建对象有几种方法

```js
// 方法一
var o1 = {name: 'o1'}
var o11 = new Object({name:'o11'})

// 方法二 通过构造函数
var M = function(name){this.name=name}
var o2 = new M('o2')

// 方法三 P作为o3的原型对象
var P = {name:'o3'}
var o3 = Object.create(P)
```

## 原型，构造函数和实例之间的关系

- ![prototype chain](/documents/img/js-prototype_chain.png)
    > 每个class(构造函数)都有显示原型prototype，每个实例都有隐式原型__proto__，实例的__proto__指向对应class的prototype

### intanceof

- ![intanceof](/documents/img/js-instanceof.png)
    > 实例对象的__proto__是不是构造函数的prototype

## new 运算符

- 一个新对象被创建。它继承自foo.prototype (构造函数的原型对象)
- 构造函数foo被执行。执行的时候，相应的传参会被传入，同时上下文(this)会被指定为这个新实例。(new foo等同于new foo()，只能用在不传递任何参数的情况)
- 如果构造函数返回一个“对象”，那么这个对象会取代整个new出来的结果。如果构造函数没有返回对象，那么new出来的结果为步骤1创建的对象。

- 模拟new工作原理

  ```js
  function myNew(constructor) {
      const o = Object.create(constructor.prototype);
      const k = constructor.call(o);
      if (typeof k === 'object') {
          return k;
      } else {
          return o;
      }
  }
  ```

## 面向对象

### ES5 实现继承

- 借助**构造函数**实现继承
  > 在子类的构造函数中运行父类的构造函数，使得父类的属性都会挂载到子类上

  ```js
  function Parent() {
    this.name = 'parent'
  }
  function Child() {
    Parent.call(this)
    this.childName = 'child'
  }
  ```

  > **缺点** : Parent**原型链上的方法丢失**

- 借助**原型链**实现继承
  
  ```js
  function Parent() {
    this.name = 'parent'
  }
  function Child() {
    this.childName = 'child'
  }
  Child.prototype = new Parent()
  ```

  > **缺点** : 修改原型链上的对象时，所有实例对象都会改变，因为引用的是同一个对象。

- 组合方式1
  > 解决了单纯借助原型链继承的缺点，因为每一个父类构造函数的属性都会在子类中，会一层层传递下来。

  ```js
  function Parent() {
    this.name = 'parent'
  }
  function Child() {
    Parent.call(this)
    this.childName = 'child'
  }
  Child.prototype = new Parent()
  ```

  > 缺点 : 父级的构造函数执行了两次

- 组合方式2 优化

  ```js
  function Parent() {
    this.name = 'parent'
  }
  function Child() {
    Parent.call(this)
    this.childName = 'child'
  }
  // 创建一个 中间对象
  Child.prototype = Object.create(Parent.prototype)
  // Child原型对象（新建的中间对象）的构造函数指向自己
  Child.prototype.constructor = Child
  ```

### 简易JQuery

```js
class jQuery {
    constructor(selector) {
        const result = document.querySelectorAll(selector)
        const length = result.length
        for (let i = 0; i < length; i++) {
            this[i] = result[i]
        }
        this.length = length
        this.selector = selector
    }
    get(index) {
        return this[index]
    }
    each(fn) {
        for (let i = 0; i < this.length; i++) {
            const elem = this[i]
            fn(elem)
        }
    }
    on(type, fn) {
        return this.each(elem => {
            elem.addEventListener(type, fn, false)
        })
    }
    // 扩展很多 DOM API
}

// 插件
jQuery.prototype.dialog = function (info) {
    alert(info)
}

// “造轮子”
class myJQuery extends jQuery {
    constructor(selector) {
        super(selector)
    }
    // 扩展自己的方法
    addClass(className) {

    }
    style(data) {}
}
