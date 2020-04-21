# JS 类 - ES5与ES6对比

## ES5中怎么声明一个类

1. 尝试一

```js
let Animal = function (type) {
  this.type = type
  this.eat = function () {
    console.log('eat')
  }
}
```

- 直接将方法写在构造函数中，这会导致每个对象都有eat方法，然而eat是一个共有的方法，如果这样写的话，每个对象的eat都是个独立的方法，**违背了继承的原则**，并且**每一个对象都很大**（都包含所有的方法）。

2. 改进 **将方法写在原型链上，函数都有原型对象**

```js
let Animal = function (type) {
  this.type = type
}
Animal.prototype.eat = function () {
  console.log('eat')
}
```

	- 使用原型链写继承
	- 核心思想是要将**ES5的函数当做构造函数**，**共有的方法都放在原型链上**，不同的再使用构造函数构造。

## ES6中怎么声明一个类

```js
class Animal {
  constructor(type) {
    this.type = type
  }
  eat() {
    console.log('eat')
  }
}
```
- class其实就是ES5声明类的语法糖

## 属性

- getter，setter
	- 对某个属性设置存值函数和取值函数， 拦截该属性的存取行为。
	- get fn() {} 中的fn相当于是一个**出口**，里面可以打包各式的数据
	- set fn() {} 中的fn相当于一个**入口**，也可以设置除了fn外的属性
	- 实例

		```js
		let _age = 4
		class Animal {
		  constructor (type) {
		    this.type = type
		  }
		  get age() {
  		    return _age
		  }
		  set age(val) {
  		    if (val < 7 && val > 4) {
    		      _age = val
  		    }
		  }
		  eat() {
  		    console.log('eat')
		  }
		}
		```
		- class Animal可以读到_age，因为他们在相同的顶层作用域中
			- 但是Animal的实例对象._age会显示undefined，因为_age不是该对象的属性
			- 以此，达到了私有属性的保护
		- **age只是个数据的出口**（也是个属性），不是真实存储数据的地方，**真实存储数据是在_age**

## 方法

### 实例对象方法

### 静态方法

- 属于类不属于对象实例
- ES5
	```Animal.walk = function () { ... }```
- ES6
	- 使用static

### 使用场景
- 如果依赖于对象的默写属性或方法，该方法要定义为实例对象方法，反之，可以使用静态方法

## 继承

### ES5

- 使用原型链继承

```js
let Animal = function (type) {
  this.type = type
}
Animal.prototype.eat = function () {
  console.log('eat')
}

let Dog = function (type) {
  Animal.call(this, type)
}
Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog
Dog.prototype.run = function () {
  console.log('run')
}

let dog = new Dog('dog')
```

### ES6

- 使用ES6特性继承

```js
class Animal {
  constructor(type) {
    this.type = type
  }
  eat() {
    console.log('eat')
  }
}

class Dog extends Animal {
  constructor(type, age) {
    super(type)
    this.age = age
  }
}
```

	- 如果子类constructor里只有super，可以隐式调用，就是省略constructor