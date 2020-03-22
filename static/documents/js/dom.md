# DOM

- DOM树
  - ![prototype chain](/documents/img/js-dom.jpg)

- nodeName
  > 节点的名称
  - 元素节点的 nodeName 是标签名称
  - 属性节点的 nodeName 是属性名称
  - 文本节点的 nodeName 永远是 #text
  - 文档节点的 nodeName 永远是 #document
- nodeValue
  - 对于文本节点，nodeValue 属性包含文本。
  - 对于属性节点，nodeValue 属性包含属性值。
  - nodeValue属性对于文档节点和元素节点是不可用的。
- nodeType
  > 节点的类型
  - 元素element 1
  - 属性attr 2
  - 文本text 3
  - 注释comments 8
  - 文档document 9

## 1. 节点操作

- 获取DOM节点
  - getElementsByTagName与querySelectorAll的区别
    > getElementsByTagName速度更快，返回的是HTMLCollection集合，是动态的。而querySelectorAll返回的是NodeList集合，是静态的。

  ```js
  const div1 = document.getElementById('div1')          // 元素
  const divList = document.getElementsByTagName('div')   // 集合
  const containerList = document.getElementsByClassName('.container')  // 集合
  const pList = document.querySelectorAll('p')  // 集合
  ```

- attribute - 修改html属性，会改变html结构
  
  ```js
  const pList = document.querySelectorAll('p')
  const p = pList[0]
  p.getAttribute('data-name')
  p.setAttribute('data-name', 'wyh')
  p.getAttribute('style')
  p.setAttribute('style', 'font-size: 14px;')
  ```

- property - 修改对象属性，不会体现到html结构中
  
  ```js
  const pList = document.querySelectorAll('p')
  const p = pList[0]
  // 获取与修改样式
  console.log(p.style.width)
  p.style.width = '100px'
  // 获取与修改class
  console.log(p.className)
  p.className = 'pClass'

  console.log(p.nodeName)   // 节点名称
  console.log(p.nodeValue)  // 节点值
  console.log(p.nodeType)   // 节点类型 : 元素节点，文本节点，属性节点
  ```

## 2. 树结构操作

- 新增/插入节点

```js
const div1 = document.getElementById('div1')

// 新增节点
const newP = document.createElement('p')
newP.innerHTML = 'newP'
div1.appendChild(newP)

// 移动节点
const p1 = document.getElementById('p1')
div1.appendChild(p1)
```

- 获取子元素列表，获取父元素

```js
// 获取父节点
console.log(p1.parentNode)

// 获取子元素列表
const divChildNodes = div1.childNodes // 子节点集合
const divChildNodesP = Array.prototype.slice.call(div1.childNodes).filter(child => {
  return child.nodeType === 1
}) // 筛选出其中的元素
```

- 删除节点

```js
div1.removeChild(divChildNodesP[0])
```

## 3. 性能优化

- DOM查询做缓存

```js
// 不缓存DOM查询结果
for (let i = 0; i < document.getElementsByTagName('p').length; i++) {
  // 每次循环，都会计算length，频繁进行DOM查询
}

// 缓存DOM查询结果
const pList = document.getElementsByTagName('p')
const length = pList.length
for (let i = 0; i < length; i++) {
  // 缓存length，只进行一次DOM查询
}
```

- 将频繁操作改为一次性操作

```js
const listNode = document.getElementById('list')

// 常见一个文档片段
const frag = document.createDocumentFragment()

// 插入节点
for (let i = 0; i < 10; i++) {
  const li = document.createElement('li')
  frag.appendChild(li)
}

// 最后插入到DOM树中
listNode.appendChild(frag)
```
