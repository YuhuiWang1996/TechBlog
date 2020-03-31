### 简单使用

```js
function* fn(x) {
  yield x + 1;
  yield x + 2;
  return x + 3;
}

const f = fn(1)
console.log(f.next()) // { value: 2, done: false }
console.log(f.next()) // { value: 3, done: false }
console.log(f.next()) // { value: 4, done: false }
```

### 传递参数
- 但如果想要将前一个yield的值传递到下一个呢？
	- next(value)中可以指定**向生成器传递的值**
	- 也就是指定上一个迭代器的结果

```js
function* fn(x) {
  x = yield x + 1;
  x = yield x + 2;
  return x + 3;
}

const f = fn(1)
let res = f.next()
console.log(res); // { value: 2, done: false }
res = f.next(res.value)
console.log(res); // { value: 4, done: false }
res = f.next(res.value)
console.log(res); // { value: 7, done: true }
```

### 模拟 async / await

- 此时await与yield相似，function*与async相似

```js
function task() {
function task(duration) {
  return new Promise((resolve, reject) => {
    if (duration > 1000) {
      reject(duration)
    }
    setTimeout(() => {
      resolve(duration)
    }, duration);
  })
}

function* generator() {
  let res = yield task(500)
  console.log(res)
  res = yield task(1001)
  console.log(res)
  res = yield task(600)
  console.log(res)
}

function run(generator, res) {
  const curr = generator.next(res)
  if (curr.done) return;
  curr.value.then(res => {
    run(generator, res)
  }).catch(e => {
    console.log('Error', e)
    return;
  })
}

run(generator(), null)
```

- 这段代码如果只用promise写的话就是

```js
task(500).then(res => {
  console.log(res)
  return task(1001)
}).then(res => {
  console.log(res)
  return task(600)
}).then(res => {
  console.log(res)
}).catch(e => {
  console.log('Error', e)
})
```

- 如果用async / await写呢？

```js
async function run() {
  try {
    let res = await task(500);
    console.log(res)
    res = await task(1001);
    console.log(res)
    res = await task(600);
    console.log(res)
  } catch (e) {
    console.log('Error', e)
  }
}
run()
```