# Ajax

## 1. XMLHttpRequest

- XMLHttpRequest对象用于**在后台与服务器交换数据**。
- 状态码
  - **readyState**
    - 0 － （未初始化）还没有调用send()方法
    - 1 － （载入）已调用send()方法，正在发送请求
    - 2 － （载入完成）send()方法执行完成，已经接收到全部响应内容
    - 3 － （交互）正在解析响应内容
    - 4 － （完成）响应内容解析完成，可以在客户端调用了
  - **status**
    - 2xx - 表示成功处理请求，如200
    - 3xx - 需要重定向，浏览器直接跳转，如301，302，304
    - 4xx - 客户端请求错误，如404，403
    - 5xx - 服务器端错误
    - ![http status codes](../../img/HTTP_codes.png)

  ```js
  // GET
  const xhr = new XMLHttpRequest()
  xhr.open('GET', '/data/test.json', true)
  xhr.onreadystatechange =  function() {
    if (xhr.status === 4) {
      console.log(JSON.parse(xhr.responseText))
    } else if (xhr.status === 404) {
      console.log('404 not found')
    }
  }
  xhr.send(null)
  ```

  ```js
  // POST
  const xhr = new XMLHttpRequest()
  xhr.open("post", '/data/test', true);
  var data;
  if (type === "formdata") {
    // 键值对形式构建表单数据
    // 可用于文件上传
    xhr.setRequestHeader("Content-Type", "multipart/form-data");
    data = new FormData();
    data.append("key", "value");
  } else if (type === "json") {
    xhr.setRequestHeader("Content-Type", "application/json");
    data = JSON.stringify({"key": "value"});
  } else if (type === "text") {
    xhr.setRequestHeader("Content-Type", "text/xml");
    data = "key=value";
  } else if (type === "www") {
    // 原生 form 表单
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    data = "key=value";
  }
  xhr.send(data);
  ```

## 2. 跨域

### 2.1. 同源策略

- ajax请求时，浏览器要求当前网页和server必须同源（安全）
  - 同源：协议，域名，端口，三者必须一致
- 加载图片，css，js可无视同源策略
  - \<img />可用于统计打点，可使用第三方统计服务
  - \<link /> \<script>可使用CDN，CDN一般都是外域
  - \<script>可实现JSONP
- 所有的跨域，都必须经过server端允许和配合

### 2.2. 跨域解决方案

- \<script> 可绕过跨域限制，服务器可以任意动态拼接数据返回，所以，\<script>就可以获得跨域的数据，只要服务端愿意返回。
  - 原生jsonp

  ```js
  <script>
    // 回调
    window.abc = function(data) {
      console.log(data)
    }
  </script>
  <script src="http://localhost:3000/jsonp.js?name=wyh&callbacabc"></script>
  ```

  - JQuery实现jsonp

  ```js
  $.ajax({
    url: 'http://localhost:3000/jsonp.js',
    dataType: 'jsonp',
    jsonpCallback: 'abc',
    success: function(data) {
      console.log(data)
    }
  })
  ```

- CORS - 服务器设置http header
- Hash - Hash改变，页面不刷新
- postMessage
  - HTML5标准

    ```js
    window.postMessage('data', 'http://B.com')
    ```

    ```js
    window.addEventListner('message', function(event){}, false)
    ```

- WebSocket
  - 浏览器通过 JavaScript 向服务器发出建立 WebSocket 连接的请求，连接建立以后，客户端和服务器端就可以通过 TCP 连接直接交换数据。当你获取 Web Socket 连接后，你可以通过 send() 方法来向服务器发送数据，并通过 onmessage 事件来接收服务器返回的数据。
  - 可以用于实现**推送功能**，代替Ajax轮询
  - 声明一个WebSocket对象
  - ws.onopen = function () {}
  - ws.onmessage
  - ws.onclose

  ```js
  // 打开一个 web socket
  var ws = new WebSocket("ws://localhost:3000/echo");
  ws.onopen = function(){
    // Web Socket 已连接上，使用 send() 方法发送数据
    ws.send("发送数据");
    alert("数据发送中...");
  };
  ws.onmessage = function (evt) {
    var received_msg = evt.data;
    alert("数据已接收...");
  };
  ws.onclose = function() {
    // 关闭 websocket
    alert("连接已关闭...");
  };
  ```

## 3. Ajax

- 手写ajax

  ```js
  function myAjax(url) {
    const p = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
    })
  }
  ```

- JQuery ajax
- axios
  - 对原生XHR的封装，只不过它是Promise的实现版本

  ```js
  axios({
      method: 'post',
      url: '/test',
      data: {
          name: 'wyh'
      }
  })
  .then(function (response) {
      console.log(response);
  })
  .catch(function (error) {
      console.log(error);
  });
  ```

- Fetch
  - 更加底层，脱离了XHR
  - 需要再次进行封装
    1. fetch只对网络请求报错，对400，500都当做成功的请求，需要封装去处理。
    2. fetch默认不会带cookie，需要添加配置项。
    3. fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费。
    4. fetch没有办法原生监测请求的进度，而XHR可以。

  ```js
  fetch('/test', {
      method: 'GET';
  }).then(res => {
      res.json();
  }).then(data => {
      console.log(data);
  }).catch(error => {
      console.log(error.msg);
  })
  ```
