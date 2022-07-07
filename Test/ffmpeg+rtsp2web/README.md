# 轻松实现在web页面中直接播放rtsp视频流

### 实现
rtsp2web 是一个依赖 ffmpeg，能实时将传入的 rtsp 视频流转码成图像数据并通过 ws 推送到前端的智能工具。

前端页面借助 jsmpeg.js 就可以很轻松的实现播放啦~

而且 rtsp2web 还有以下特点：

- 并发，支持同时播放多路视频。
- 合并同源，同时播放多个同一个rtsp视频源时，只会创建一个转码推流进程，不会创建多个。
- 智能释放资源，智能检测当前没有使用的转码推流进程，将其关闭，并释放电脑资源。

### 如何使用
使用 rtsp2web是简单的，你只需要:

### 准备ffmpeg
安装成功以后，你重新打开一个命令行终端，输入：ffmpeg -h，如果能输出 ffmpeg 的相关信息出来，则证明你的电脑安装 ffmpeg 成功。
添加到windows变量里。

### 运行 rtsp2web
创建一个空的目录（目录名不能是rtsp2web），进入目录后，一次运行下面的命令：
```
npm i --yes
npm i rtsp2web
```

创建 index.js,内容如下
```
// index.js

const RTSP2web = require('rtsp2web')

// 服务端长连接占据的端口号；端口号可以自定义
const port = 9999
new RTSP2web({
    port
})

```

运行命令： node index.js 即可。

到此，你的视频转码服务就已经运行起来了。

### 前端代码
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no,viewport-fit=cover">
  <script src="https://jsmpeg.com/jsmpeg.min.js" charset="utf-8"></script>
  <title>播放rtsp</title>
</head>
<body>
<canvas id="canvas" style="width: 600px; height: 600px;"></canvas>
</body>
<script>
    var rtsp = 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4'
  window.onload = () => {
    // 将rtsp视频流地址进行btoa处理一下
    new JSMpeg.Player("ws://localhost:9999/rtsp?url="+btoa(rtsp), {
       canvas: document.getElementById("canvas")
    })
  }
</script>
</html>

```

不管你是用原生的 html 还是在框架中使用，操作起来都非常简单。

1、你需要先在全局的模板 html 文件头部引入 jsmpeg.js 或者 jsmpeg.min.js；

2、创建一个 canvas 容器，用来播放视频的；

3、创建视频源播放实例：

```
var rtsp = 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4'
// 将rtsp视频流地址进行btoa处理一下
new JSMpeg.Player("ws://localhost:9999/rtsp?url="+btoa(rtsp), {
  canvas: document.getElementById("canvas")
})

```
JSMpeg.Player 第一个参数是拼接转码链接 'ws://localhost:9999/rtsp?url=' + btoa(rtsp)； 第二个参数是一个对象，对象属性包含 canvas。