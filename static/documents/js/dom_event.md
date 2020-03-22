# DOM事件绑定

## 1. DOM事件的级别

- DOM0
  - **定义** : 把一个函数(或者匿名函数)赋值给一个事件的处理程序属性
  - **优点** : 兼容所有浏览器。
  - **缺点** : 不能给元素添加多个事件处理程序，只能添加一个，如果添加多个事件处理程序，后面的会覆盖前面的。

  ```js
  element.onclick = function(){}
  // 解除
  element.onclick = null
  ```

- DOM2

  ```js
  // false : 冒泡阶段触发 (default)
  // true : 捕获阶段触发
  element.addEventListener('click', function(){}, false)
  // 解除 必须传递一样的参数
  element.removeEventListener('click', function(){}, false)
  ```

  - **注意** : IE不支持addEventListener()和removeEventListener()，可以使用：
    - **添加事件** : element.attachEvent('onclick',function(){})
    - **删除事件** : element.detachEvent('onclick',function(){})

  - **通用的事件绑定函数**
    - Event.target 和 Event.currentTarget区别
      - target返回触发事件的元素，currentTarget返回绑定事件的元素
    - Element.matches()
      - The matches() method checks to see if the Element would be selected by the provided selectorString -- in other words -- checks if the element "is" the selector.
    - 代理绑定优点
      - 代码比较简洁
      - 减少浏览器内存占用

    ```js
    function bindEvent(elem, type, selector, fn) {
      if (fn == null) {
        fn = selector
        selector = null
      }
      // 注意：需要传递DOM Event对象
      elem.addEventListener(type, (event) => {
        const target = event.target
        if (selector) {
          // 代理绑定
          if (target.matches(selector)) {
            fn.call(target, event)
          }
        } else {
          // 普通绑定
          fn.call(target, event)
        }
      })
    }

    // 代理绑定
    const div1 = document.getElementByID('div1')
    bindEvent(div1, 'click', 'a', function(event) {
      event.preventDefault() // 阻止默认行为
      console.log(this.innerHTML)
    })
    ```

- DOM3

  - **定义** : DOM3级事件是在DOM2级事件的基础上添加很多事件类型。
  - 新增事件
    - UI事件 : 当用户与页面上的元素交互时触发，如：load、scroll
    - 焦点事件 : 当元素获得或失去焦点时触发，如：blur、focus
    - 鼠标事件 : 当用户通过鼠标在页面执行操作时触发如：dbclick、mouseup
    - 滚轮事件 : 当使用鼠标滚轮或类似设备时触发，如：mousewheel
    - 文本事件 : 当在文档中输入文本时触发，如：textInput
    - 键盘事件 : 当用户通过键盘在页面上执行操作时触发，如：keydown、keypress
    - 合成事件 : 当为IME（输入法编辑器）输入字符时触发，如：compositionstart
    - 变动事件 : 当底层DOM结构发生变化时触发，如：DOMsubtreeModified
    - 同时DOM3级事件也允许使用者自定义一些事件。

  ```js
  element.addEventListener('keyup', function(){}, false)
  ```

## 2. DOM事件模型

- DOM事件流
  1. **捕获**
  2. 目标阶段
  3. **冒泡**

- Event对象的常见应用
  - event.preventDefault()
    - 比如阻止a标签默认跳转
  - event.stopPropagation()
    - 阻止冒泡
  - event.stopImmediatePropagation()
    - 如果一个element有多个绑定事件，只执行第一个
  - event.currentTarget
    - 当前绑定的事件
  - event.target
    - 当前被点击的元素，用于事件代理

## 3. 自定义事件

- Event
  - elem.dispatchEvent(event) : 相当于手动触发事件

  ```js
  var event = new Event('build')
  // listen for the event
  elem.addEventListener('build', function(e) { ... }, false)
  // Dispatch the event
  elem.dispatchEvent(event)
  ```

- CustomEvent
  - 要向事件对象添加更多数据，可以使用CustomEvent，detail属性可用于传递自定义数据
  - CustomEvent构造函数

    ```js
    CustomEvent(
      DOMString type,
      optional CustomEventInit eventInitDict
    )
    ```

    - eventInitDict包含:
      - bubbles : 一个布尔值,表明该事件是否会冒泡。
      - cancelable : 一个布尔值,表明该事件是否可以被取消。
      - detail : 当事件初始化时传递的数据。

  ```js
  // 添加一个适当的事件监听器
  obj.addEventListener('build', function(e) { console.log(e.detail) })

  // 创建并分发事件
  var event = new CustomEvent('build', {'detail': 'wyh'})
  obj.dispatchEvent(event)
  ```
