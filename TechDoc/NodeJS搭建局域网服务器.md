#### 介绍
此文档将简单介绍如何用Node.js快速搭建局域网服务器。此文档写了一个简单的静态文件服务器，实现了基本的路由、静态文件读取、MIME类型支持的功能。

#### 第一步
确保使用的电脑上已安装Node.js。安装完以后在Terminal里输入`node -v` 来确认是否已经安装成功。


#### 第二步
创建app.js

```
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var mime = require('./mime');

//服务器端口号
var port = 1234;

//服务器路径
var root = './';

//默认访问根目录下的"index.html"
var index = 'index.html';

http.createServer(function (request, response) {

    var realPath = url.parse(request.url).pathname;

    //默认访问根目录下的index.html

    if (realPath.charAt(realPath.length - 1) == "/") {

        realPath += index;

    }

    //安全问题，禁止父路径
    realPath = realPath.replace(/\.\./g, '');

    var realPath = root + realPath;

    //获取文件的后缀名，为待会的MIME类型提供支持

    var ext = path.extname(realPath);

    ext = ext ? ext.slice(1) : 'unknown';

    //先判断访问文件是否存在，并返回对应的HTTP状态码，再读取静态文件

    fs.exists(realPath, function (exists) {

        console.log('path.exists--%s', exists);

        if (!exists) {

            response.writeHead(404, {'Content-Type': 'text/plain'});

            response.write(
                "This request URL " + realPath + " was not found on this server."
            );

            response.end();

        } else {

            fs.readFile(realPath, "binary", function (err, file) {

                if (err) {

                    response.writeHead(500, {'Content-Type': 'text/plain'});

                    response.end(err + '');

                } else {

                    //MIME类型支持

                    var contentType = mime[ext] || "text/plain";

                    response.writeHead(200, {'Content-Type': contentType});

                    response.write(file, "binary");

                    response.end();

                }

            });

        }

    });

}).listen(1234);

// 终端打印运行信息
console.log('Server running at http://127.0.0.1:1234/');
```

#### 第三步
创建 mime.js

```
var mime = {

    "html": "text/html",
    
    "ico": "image/x-icon",
    
    "css": "text/css",
    
    "gif": "image/gif",
    
    "jpeg": "image/jpeg",
    
    "jpg": "image/jpeg",
    
    "js": "text/javascript",
    
    "json": "application/json",
    
    "pdf": "application/pdf",
    
    "png": "image/png",
    
    "svg": "image/svg+xml",
    
    "swf": "application/x-shockwave-flash",
    
    "tiff": "image/tiff",
    
    "txt": "text/plain",
    
    "wav": "audio/x-wav",
    
    "wma": "audio/x-ms-wma",
    
    "wmv": "video/x-ms-wmv",
    
    "xml": "text/xml"
    
    };
    
    module.exports = mime;
```

#### 第四步
创建 index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    Hello
</body>
</html>
```

#### 第五步
Terminal中找到文件路径，并运行node。

```
node app.js
```
此时服务器已经搭建成功，下一步打开terminal查看本机的ip地址，此例子中ip为10.110.133.212。在浏览器中输入查到的本机ip address加上之前设置的port number就可以访问了。

 **To be continued...** 

