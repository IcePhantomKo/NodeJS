### NodeJS + Websocket PLC 监控平台项目

### 注意事项

#### IP 地址修改
- index.js
- login.js
- wsServer.js
- app.js

#### 存在的bug
- 查询报警7天内没有错误，则导致bug（问题在于handler admin.js 60行 DATE_SUB 显示为 undefined）