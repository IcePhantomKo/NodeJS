const db = require('../db/device')

// 跳转主页接口 post('/admin/homePage')
exports.login = (req,res) => {
    res.send({
        status:1
    })
    // res.sendFile(path.join(__dirname,"../public/homePage.html"))
}

// 故障率接口 post('/admin/errorRate)
exports.errorRate = (req,res) =>{
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

// 报警信息 - 搜索 接口 post('/admin/alarmRecord')
exports.alarmRecord = (req,res) => {

    // 客户端请求的开始时间
    var reqStartTime = req.headers.alarmstarttime
    // 客户端请求的结束时间
    var reqEndTime = req.headers.alarmendtime

    const alarmBody = req.body;
    const sqlStr =  ' SELECT TagName, TagDescription, StartTime, EndTime, AlarmValue'
                    + ' FROM alarmrecord'
                    + ' WHERE StartTime >= ' + '\'' + reqStartTime + '\''
                    + ' AND StartTime <= ' + '\'' + reqEndTime + '\''

    db.query(sqlStr,alarmBody,(err,result) => {
        if(err) throw err
        res.send({
            status:1,
            message: result
        })
    })
}

// 一键巡查
exports.quickSearch = (req,res) => {
    res.send({
        msg:'hi'
    })
}

// 智能分析接口 post('/admin/analysis')
exports.analyInfo = (req,res) =>{
    var SelectStringArray = new Array();

    const analyInfo = req.body

    SelectStringArray[0] = "SELECT t2.positionname,COUNT( * )AS COUNT,LEFT (t1.Tagname, 5 ) AS PLCNAME"
                            + " FROM alarmrecord t1 LEFT JOIN plcinfo  t2 ON t2.plctagname = LEFT ( t1.Tagname, 5 )"
                            + " WHERE t1.AlarmSourceType = 2"
                            + " AND t2.PositionName IS NOT NULL"
                            + " GROUP BY PLCNAME"
                            + " ORDER BY COUNT(*)";
    
    SelectStringArray[1] = "SELECT t2.ErrorType,count(*) AS COUNT ,t2.Description FROM `alarmrecord` t1"
                            + " LEFT JOIN errorsummary t2 ON RIGHT ( t1.TagName, 7 ) = t2.errorBit"
                            + " WHERE t1.AlarmSourceType = 2"
                            + " AND ErrorType IS NOT NULL"
                            + " GROUP BY t2.errortype "
                            + " ORDER BY COUNT(*) DESC";

    SelectStringArray[2] = "SELECT slot_unit_name,COUNT(1) AS COUNT,TagAndFieldName,"
                            + " TagDescription,plc_id,slot_unit_name,slot_id,rack_type FROM"
                            + " (SELECT * FROM eventrecord t1 LEFT JOIN plcslotinfo t2 on t1.SetValue= t2.slot_id) t3"
                            + " WHERE Mid(t3.tagandfieldname,6,5) = 'A404.' OR Mid(t3.tagandfieldname,6,5) = 'A408.'"
                            + " GROUP BY slot_unit_name";

    SelectStringArray[3] = "SELECT t2.Description,count( * ) AS COUNT ,t2.ErrorType FROM `alarmrecord` t1"
                            +" LEFT JOIN errorsummary t2 ON RIGHT ( t1.TagName, 7 ) = t2.errorBit"
                            + " WHERE t1.AlarmSourceType = 2 AND t2.ErrorType = '致命'"
                            + " GROUP BY t2.Description"
                            + " ORDER BY COUNT(*) DESC"
                            + " LIMIT 4";

    SelectStringArray[4] = "SELECT t2.Description,count( * ) AS COUNT ,t2.ErrorType FROM `alarmrecord` t1"
                            +" LEFT JOIN errorsummary t2 ON RIGHT ( t1.TagName, 7 ) = t2.errorBit"
                            + " WHERE t1.AlarmSourceType = 2 AND t2.ErrorType = '非致命'"
                            + " GROUP BY t2.Description"
                            + " ORDER BY COUNT(*) DESC"
                            + " LIMIT 4";

    SelectStringArray[5] = "SELECT t2.Description,count( * ) AS COUNT,t2.ErrorType FROM	`alarmrecord` t1"
                            +" LEFT JOIN errorsummary t2 ON RIGHT ( t1.TagName, 7 ) = t2.errorBit"
                            + " WHERE t1.AlarmSourceType = 2 AND t2.ErrorType = '非致命'"
                            + " GROUP BY t2.Description"
                            + " ORDER BY COUNT(*) DESC"
                            + " LIMIT 4";
    
    db.query(SelectStringArray[0],analyInfo,(err,mostErrorPLC) => {
        if(err) return res.cc(err)

        db.query(SelectStringArray[1],analyInfo,(err,mostErrorType) => {
            if(err) return res.cc(err)

            db.query(SelectStringArray[2],analyInfo,(err,mostErrorUnit) => {
                if(err) return res.cc(err)

                db.query(SelectStringArray[3],analyInfo,(err,mostFatalErrorType) => {
                    if(err) return res.cc(err)
        
                    db.query(SelectStringArray[4],analyInfo,(err,mostNonFatalErrorType) => {
                        if(err) return res.cc(err)
            
                        db.query(SelectStringArray[5],analyInfo,(err,mostPowerOffPLC) => {
                            if(err) return res.cc(err)
                            
                            res.send({
                                msg:'智能分析请求成功',
                                mostErrorPLC: mostErrorPLC,
                                mostErrorType: mostErrorType,
                                mostErrorUnit: mostErrorUnit,
                                mostFatalErrorType: mostFatalErrorType,
                                mostNonFatalErrorType: mostNonFatalErrorType,
                                mostPowerOffPLC: mostPowerOffPLC
                            })
                        })    
                    })
                })               
            })
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