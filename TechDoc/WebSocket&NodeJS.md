### WebSocket
#### 特点
- 双向通信
websocket使得客户端跟服务端之间交互数据变得更加简单。允许服务器主动向客户端推送数据。浏览器只需要和服务器完成一次握手，就可以创建持久性的连接，并进行双向数据传输。
- 实时性强
服务器可以主动给客户端推送数据，相比 http 请求需要先由客户端发起请求，浏览器才会响应，延迟明显更少，时间更短。
- 连接保持
websocket 连接创建成功后，只要连接不断开，通信会一直保持，而且还会省略部分状态信息(http 请求可能每次请求都需要携带状态信息)

相对于http, websocket优势显而易见。所以在一些实时通信上，都需要用到 websocket, 比如多媒体聊天，玩家游戏，页面局部刷新，协同编辑等场景。

#### WebSocket的基本用法：
```
var ws = new WebSocket("ws://localhost:8181");

// 指定连接成功后的回调函数
ws.onopen = function() {  
// 向服务器发送数据，数据类型包括文本类型/blob对象/ArrayBuffer对象
  ws.send("Hello WebSockets!"); 
};

// 指定收到服务端数据后的回调函数
(注意：返回数据可能是文本，也可能是二进制数据（blob对象或Arraybuffer对象）)
ws.onmessage = function(e) {
  console.log( "收到服务端信息: " + e.data);
  ws.close(); // 关闭websocket连接方法
};

// 指定连接关闭后的回调函数
ws.onclose = function() {
  console.log("连接已关闭");
};    

```

然后是服务端，服务端需要下载nodejs-websocket：

```
npm i nodejs-websocket
```
