# JS ES8 新特性

## Async / Await
	
- ==async自动将返回值变成promise实例==
	- 如果返回值是一个常数，会自动包上Promise.resolve(value)这个Promise的静态方法
- await 需要在async中使用，==后面会跟一个promise对象==，如果后面是一个常数，也会自动使用Promise.resolve

> **例1** async自动将返回值变成promise实例

```js
async function fn() {
  return 123
}
async function fn1() {
  return Promise.resolve(321)
}
fn().then(val => {
  console.log(val) // 123
  return fn1()
}).then(val => {
  console.log(val) // 321
})
```

> **例2** async中有promise

```js
async function fn() {
  const promise1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('p-1')
      }, 1000);
    })
  }

  const promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('p-2')
      }, 1000);
    })
  }

  await promise1().then(val => {
    console.log(val) // p-1
  })
  await promise2().then(val => {
    console.log(val) // p-2
  })

  return 123
}

fn().then(val => {
  console.log(val) // 123
})
```
> - **注意** : 输出为 p-1 p-2 123，且p-1 p-2 之间无时间差
> - 原因 : promise在初始化的时候里面的状态是pending，此时定时器已经启动了，然后在.then的时候调用resolve，状态变为fulfilled

> **例3** 使p-1 p-2之间有一秒时间差

```js
async function fn() {
  function promise1() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('p-1')
      }, 1000);
    })
  }

  function promise2() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('p-2')
      }, 1000);
    })
  }

  await promise1().then(val => {
    console.log(val) // p-1
  })
  await promise2().then(val => {
    console.log(val) // p-2
  })

  return 123
}

fn().then(val => {
  console.log(val) // 123
})
```

## Object快速遍历

- 获取keys
```Object.keys(obj)```
- 筛选keys		
```Object.keys(obj).filter(item => item === target)```
- 获取values
```Object.values(obj)```
- 筛选values
```Object.values.filter(item => item === target)```
- **获取到的keys和values都是数组，可以方便实用数组的各种API进行操作**
- 将object变成可遍历对象
	- Object.entries(obj)
	- 然后就可以用for ... of 遍历

## String补白

- 场景 : 想要输出0到99 : 01, 02, 03 ... 10, 11, ... 99
> **例1** 使用padStart([输出的字符串有几位], [补足的是什么])

```js
for (let i = 1; i < 320; i += 10) {
  console.log(i.toString().padStart(3, '0')) // 001 011 021 ...
}
```

> **例2**

```js
for (let i = 1; i < 30000; i += 1000) {
  console.log(i.toString().padStart(5, '*#'))
}
```

> 输出 : *#*#1, *1001, *2001 ...

> **例3** 使用padEnd从后面开始补足

```js
for (let i = 1; i < 30000; i += 1000) {
  console.log(i.toString().padEnd(5, '*#')) // 1*#*#, 1001* 2001* ...
}
```


## 如何获取Object数据的操作符

- Object.defineProperty(object, property, descriptor)
	- descriptor
		- **enumerable**
			- 是否可以枚举
			- 如果是false，keys、values、entries等无法取到
		- **writable**
			- 是否可写
			- 如果是false，则无法修改
- Object.getOwnPropertyDescriptors(object)
	- **获取数据的全部信息**，包括能否枚举
- Object.getOwnPropertyDescriptor(object, property)
	- 获取某一项数据的全部信息