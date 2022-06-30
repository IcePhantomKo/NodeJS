const path = require('path');
const db = require('../db/device')

// 跳转主页接口 post('/admin/homePage')
exports.login = (req,res) => {
    res.send({
        status: 1,
        message:'登录成功'
    })
    res.sendFile(path.join(__dirname,"../public/homePage.html"))
}

// 网络拓扑图接口 post('/admin/topology')
exports.topoInfo = (req,res) =>{
    const topoinfo = req.body
    const sqlStr = 'SELECT * FROM plcassociationtable'

    db.query(sqlStr,topoinfo,(err,result) =>{
        if(err) return res.cc(err)

        // 调用res.send()响应给客户端
        res.send({
            status:1,
            message:result
        })
    })
}

// 模块通道图接口 post('/admin/modChal')
exports.modChalInfo = (req,res) =>{
    const modinfo = req.body
    const sqlStr = 'SELECT * FROM plcslotinfo'

    db.query(sqlStr,modinfo,(err,result) => {
        if(err) return res.cc(err)

        res.send({
            status: 1,
            message: result
        })
    })
}

// 接入设备接口 post('/admin/devCon')
// 'SELECT * FROM `autosystemdevicelist` t1 LEFT'+ 
// ' JOIN plcinfo t2 ON t1.plc_id = t2.ID'+
// ' ORDER BY plc_id ASC',

// ping 接口 post('/admin/pings')
exports.Pings = (req,res) =>{
    const childProcess = require('child_process')
    var iconv = require('iconv-lite');
    iconv.skipDecodeWarning = true;
    var encodings = 'cp936';
    var binaryEncoding = 'binary';

    childProcess.exec(`ping www.baidu.com`, {
        encoding: binaryEncoding
    }, (err, stdout, stderr) => {
        if (err) {
            console.log(iconv.decode(err, encodings))
            return false;
        } else {
            let data = iconv.decode(stdout, encodings);
            console.log(data)
            res.send({
                msg:'ping 成功'
            })
        }
    })
}