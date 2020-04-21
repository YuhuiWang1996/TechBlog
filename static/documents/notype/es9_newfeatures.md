### for await of

- ==遍历异步操作的集合==

```js
function gen(wait) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('p-' + wait)
    }, wait);
  })
}

async function test() {
  let tasks = [gen, gen, gen]
  for (let task of tasks) {
    console.log(Date.now(), await task(1000))
  }
}
```
- **注意** : promise在数组里面已经完成了初始化，也就是其中的settimeout已经开始运行了。
- 输出为：
	1586629147417 p-1000
	1586629147423 p-500
	1586629147423 p-100
	- 但里面的顺序还是对的，就是.then()

### Promise是如何“兜底”操作的？
- .finally()

### Object的Rest&Spread方法

- 实现浅拷贝，多个对象合并到一个

```js
const input = {
  a: 1,
  b: 2,
  obj: {
    d: 5
  }
}

const output = {
  ...input,
  c: 3
}

console.log(output) // { a: 1, b: 2, obj: { d: 5 }, c: 3 }
input.a = 4
console.log(output) // { a: 1, b: 2, obj: { d: 5 }, c: 3 }
input.obj.d = 100
console.log(output) // { a: 1, b: 2, obj: { d: 100 }, c: 3 }
```

- 一个对象拆分到几个中

```js
const input = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5
}
const { a, b, ...rest } = input
```