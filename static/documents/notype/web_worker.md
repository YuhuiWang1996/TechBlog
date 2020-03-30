### 简介
> 在HTML页面中，如果在执行脚本时，页面的状态是不可响应的，直到脚本执行完成后，页面才变成可相应。web worker是运行在后台的 js，独立于其他脚本，不会影响页面你的性能。 并且通过postMessage将结果回传到主线程。这样在进行复杂操作的时候，就不会阻塞主线程了。

### 创建
- 只需调用Worker() 构造函数并传入一个要在 **worker** 线程内运行的脚本的URI，即可创建一个新的worker。
- 另外，通过URL.createObjectURL()创建URL对象，可以实现创建内嵌的worker

### 通讯方式
- Worker 与其主页面之间的通信是通过 onmessage 事件和 postMessage() 方法实现的。
- 在主页面与 Worker 之间传递的数据是通过拷贝，而不是共享来完成的，也就是说，Worker 与其主页面之间**只能单纯的传递数据**，不能传递复杂的引用类型

### 上下文
- Worker执行的上下文，与主页面执行时的上下文并不相同，最顶层的对象并不是window，所以无法访问window、以及与window相关的DOM API，但是可以与setTimeout、setInterval等协作。

### 处理错误
当 worker 出现运行时错误时，它的 onerror 事件处理函数会被调用。它会收到一个实现了 ErrorEvent 接口名为 error的事件。

