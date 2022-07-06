const path = require('path');
const db = require('../db/device')

// 跳转主页接口 post('/admin/homePage')
exports.login = (req,res) => {
    // 故障率数据接口
    const totalInfo = req.body

    // 定义请求的故障天数变量
    var new_timespan = req.headers.timespan

    // 故障总数
    const totalStr = "SELECT LEFT(t1.starttime,10) AS START_TIME,t1.endtime,CURDATE(),"
                    + " DATE_SUB(CURDATE(),INTERVAL " + new_timespan +" DAY),count(1) AS COUNT"
                    + " FROM `alarmrecord` t1" 
                    + " WHERE AlarmSourceType = 2" 
                    + " AND EndTime IS NOT NULL" 
                    + " AND StartTime >= DATE_SUB(CURDATE(),INTERVAL " + new_timespan + " DAY);"
    
    // 每一个故障
    const eachStr = "SELECT LEFT(t1.starttime,10) AS START_TIME,"
                    + " LEFT(CURDATE(),10) AS CUR_DATE," 
                    + " LEFT(DATE_SUB(CURDATE(),INTERVAL " + new_timespan + " DAY),10) AS DATE_SUB," 
                    + " count(1) AS COUNT"
                    + " FROM `alarmrecord` t1" 							
                    + " WHERE AlarmSourceType = 2 AND EndTime IS NOT NULL"
                    + " AND StartTime >= DATE_SUB(CURDATE(),INTERVAL " + new_timespan + " DAY)"
                    + " GROUP BY Left(t1.starttime,10);";

    // 数据库查询语句
    db.query(totalStr,totalInfo,(err,result1) =>{
        if(err) throw err

        db.query(eachStr,totalInfo,(err,result2) => {
            if(err) throw err

            // 日期格式转换 & 增加天数函数
            function dateAddDays(dataStr, dayCount) {  
                var strdate = dataStr; //日期字符串    
                var isdate = new Date(strdate.replace(/-/g, "/"));  //把日期字符串转换成日期格式    
                isdate = new Date((isdate / 1000 + (86400 * dayCount)) * 1000);  //日期加1天    
                var new_month = isdate.getMonth() + 1;
                new_month = new_month <10 ? '0' + new_month : new_month;
                var new_date = isdate.getDate();
                new_date = new_date <10 ? '0' + new_date : new_date;

                // var pdate = isdate.getFullYear() + "-" + (isdate.getMonth() + 1) + "-" + (isdate.getDate());   //把日期格式转换成字符串    
                var pdate = isdate.getFullYear() + "-" + (new_month) + "-" + (new_date);   //把日期格式转换成字符串    
                return pdate;  
            }
            
            var eachValue = {};
            // 开始时间
            var startdate = result2[0].DATE_SUB;

            // 时间列表
            var newDate = '';
            // 故障率列表
            var newData = [];

            for(i = 0; i < new_timespan; i++){
                newData.push('0');
                if(i != new_timespan - 1){
                    newDate += dateAddDays(startdate,i) + ",";
                }else{
                    newDate += dateAddDays(startdate,i);
                }
            }

            newDate = newDate.split(',');

            // 参数列表

            for(i=0;i<result2.length;i++){
                for(j=0;j<new_timespan;j++){
                    if(result2[i].START_TIME == newDate[j]){
                        newData.splice(j, 1, (result2[i].COUNT/result1[0].COUNT).toFixed(2)*100 + "")
                    }else{
                        // newData.splice(j,1,'0');
                    }
                }
            }
            
            eachValue = 
            {
                'desc': '区域控制器故障率',
                'startdate': startdate,
                'data': newData,
                'date': newDate
            }

            res.send({
                status:1,
                eachValue: eachValue,
            })
        })
    })
    // res.sendFile(path.join(__dirname,"../public/homePage.html"))
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

// 接入的设备接口 post('/admin/devCon')
exports.devConInfo = (req,res) =>{
    const devInfo = req.body
    const sqlStr =  'SELECT * FROM `autosystemdevicelist` t1 LEFT'+ 
                    ' JOIN plcinfo t2 ON t1.plc_id = t2.ID'+
                    ' ORDER BY plc_id ASC'

    db.query(sqlStr,devInfo,(err,result) => {
        if(err) return res.cc(err)

        res.send({
            status: 1,
            message: result
        })
    })
}

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