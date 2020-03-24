# JS 数组相关操作(1)

## 1. 新建数组

- ```var a = [1, 2, 3];```
- Constructor
  - ```var a = new Array(element0, element1[, ...[, elementN]])```
    - Array 构造器会根据给定的元素创建一个 JavaScript 数组，但是当仅有一个参数且为数字时除外（详见下面的 arrayLength 参数）
  - ```var a = new Array(arrayLength)```
    - 一个范围在 0 到 232-1 之间的整数，此时将返回一个 length 的值等于 arrayLength 的数组对象
  - ES6
    - ```let a = Array.of(1, 2, 3)```
    - ```let a = Array.from([1, 2, 3], x => x + x)```
      - ```console.log(Array.from('foo'));``` : ```Array ["f", "o", "o"]```
      - The Array.from() method creates a new, **shallow-copied** Array instance from an **array-like** or **iterable object**.
        - 对象拥有length属性 ```{0: 1, 1: 2, 2: 3, length: 3 }```
        - 部署了Iterator接口的数据结构 比如: 字符串、Set、NodeList对象

## 2. 改变原数组的方法

- ```splice()```
  - 向数组中 **添加** 或且 **删除** 项目，返回**被删除的元素组成的数组**。
  - ```array.splice(start[, deleteCount[, item1[, item2[, ...]]]])```
    - start : 指定修改的开始位置（从0计数）
    - deleteCount : 表示要移除的数组元素的个数
    - item1, item2, ... : 要添加进数组的元素

- ```sort()```
  - 对数组进行排序**in place**，并返回这个数组。
  - ```arr.sort([compareFunction])```
    - compareFunction : Specifies a function that defines the sort order. If omitted, the array elements are converted to strings, then sorted according to each character's **Unicode code point value**.
      - firstEl
      - secondEl
      - e.g.

        ```js
        // 降序
        arr.sort(function(a,b){
          return b - a;
        });
        ```

- ```pop()```
  - 删除数组最后一个元素，并返回
- ```shift()```
  - 删除数组第一个元素，并返回
- ```push()```
  - 向数组末尾添加任意个数元素，并返回新的长度
- ```unshift()```
  - 向数组开头添加任意个数元素，并返回新的长度

- ```reverse()```
  - 颠倒数组

- ES6 ```copyWithin()```
  - 浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。
  - ```arr.copyWithin(target[, start[, end]])```
    - target : 复制序列到该位置
    - start : 开始复制元素的起始位置
    - end : 开始复制元素的结束位置，如果end被忽略，copyWithin方法将会一直复制至数组结尾

- ES6 ```fill()```
  - 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。
  - ```arr.fill(value[, start[, end]])```
    - value : 用来填充数组元素的值。
    - start : 可选
    - end : 可选
    - ```[].fill.call({ length: 3 }, 4);``` -> ```{0: 4, 1: 4, 2: 4, length: 3}```

## 3. 不改变原数组的方法

- ```slice()```
  - 返回一个新的数组对象，这一对象是一个由 begin 和 end **决定的原数组的浅拷贝** *(包括begin，不包括end)*。
  - ```arr.slice([begin[, end]])```

- ```join()```
  - 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。
  - ```arr.join([separator])```
    - separator : 指定一个字符串来分隔数组的每个元素。如果缺省该值，数组元素用逗号分隔。
  
- ```cancat()```
  - 合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
  - ```var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])```

- ES6 ```...```
  - ```...```运算符可以实现cancat的功能

  ```js
  let a = [1, 2, 3]
  let b = [4, ...a, 4] // [4, 1, 2, 3, 4]
  ```

- ```indexOf()``` : 找到一个给定元素的第一个索引，如果不存在，则返回-1。
- ```lastIndexOf()``` : 返回指定元素最后一个的索引

- ES7 ```includes()```
  - The includes() method determines **whether an array includes a certain value among its entries**, returning true or false as appropriate.
  - arr.includes(valueToFind[, fromIndex])
    - valueToFind
    - fromIndex : The position in this array at which to begin searching for valueToFind.
  - 弥补indexOf方法不能识别NaN的缺点
    - ```[1, 2, NaN].includes(NaN)  // true```
