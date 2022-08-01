ws = new WebSocket("ws://10.110.133.212:9100");
// ws = new WebSocket("ws://172.20.10.2:9100");

if (window.WebSocket) {
    var temp = new Array();
    var objS = new Array();
    var temp1 = new Array();

    // 建立连接方法
    function connectServer() {
        this.ws.onopen = () => {
            // 登录验证
            loginInfo = '{\
                "Request":"LoginUser",\
                "UserName":"Admin",\
                "UserPassword":"Admin",\
                "AppNameForIdentify":"test client",\
                "NeedRdb":true,\
                "NeedHtr":true,\
                "NeedAlm":true\
            }';
            // 发送
            this.ws.send(loginInfo);

            page1Info()
            GetAlarm()
        }

        this.ws.onclose = (e) =>{
            console.log('服务器关闭了');
        }

        this.ws.onmessage = (e) =>
			{
                // console.log(e.data);

                var obj = JSON.parse(e.data);
                // console.log(obj);
                switch(obj.Response){
                    // PLC & Switch 在线率 + 系统参数
                    case "RDB_GetTagFieldValue":
                        for(i = 0; i < obj.TagFieldValue.length; i++){
                            objS[i] = JSON.stringify(obj.TagFieldValue[i].V);
                        }
                            var ojbStr = JSON.stringify(objS);
                            var tempStr = JSON.stringify(temp);
                            if (ojbStr != tempStr) {  
                                temp = objS;
                                objS = [];
                                // plc在线率
                                // plc 正常的个数
                                $('#plcOnline').html(10 - obj.TagFieldValue[6].V);
                                // plc 故障个数
                                $('#plcOffline').html((obj.TagFieldValue[6].V));

                                // 正常个数
                                option2.series[0].data[0].value = 10- obj.TagFieldValue[6].V;
                                // 故障个数
                                option2.series[0].data[1].value = obj.TagFieldValue[6].V;
                                // 正常运行百分比
                                option2.series[0].data[2].percent = (10 - obj.TagFieldValue[6].V)/10
                                
                                myChart2.setOption(option2,true);


                                // 交换机在线率
                                $('#switchOnline').html(obj.TagFieldValue[1].V);
                                $('#switchOffline').html((200 - obj.TagFieldValue[1].V));
                                // 系统参数
                                option4.series[0].data[0].value = obj.TagFieldValue[0].V;
                                option4.series[1].data[0].value = obj.TagFieldValue[1].V;
                                option4.series[0].data[1].value = obj.TagFieldValue[2].V;
                                option4.series[1].data[1].value = obj.TagFieldValue[3].V;
                                option4.series[0].data[2].value = obj.TagFieldValue[4].V;
                                option4.series[1].data[2].value = obj.TagFieldValue[5].V;
                                myChart4.setOption(option4,true);

                                // 网络拓扑图-plc状态

                            } else {
                                // console.log('same');
                                return;
                            }
                        break;
                    // 报警列表
                    case 'ALM_QueryAlarm':
                        var alarmLength = obj.AlarmRecord.length;
                        for(i=0;i<alarmLength;i++){
                            if(i<10){
                                Items[i].Ranking = i+1;
                                Items[i].Time = obj.AlarmRecord[i].AlarmStartTime;
                                Items[i].TagName = obj.AlarmRecord[i].AlarmTagDesc;
                                Items[i].Value = obj.AlarmRecord[i].AlarmValue;
                            }else{
                                var iNew = i % 10; 
                                Items[iNew].Ranking = iNew+1;
                                Items[iNew].Time = obj.AlarmRecord[iNew].AlarmStartTime;                       
                                Items[iNew].TagName = obj.AlarmRecord[iNew].AlarmTagDesc;
                                Items[iNew].Value = obj.AlarmRecord[iNew].AlarmValue;
                            }
                        }
                        break
                }
                // console.log(e.data);
			}
    }

    // 获取报警列表方法
    function GetAlarm(){
        alarmStat = '{\
            "Request":"ALM_QueryAlarm",\
            "SourceTypeBit":16777215,\
            "ConditionBit":16777215,\
            "PriorityBit":16777215,\
            "AreaBit":16777215,\
            "AcknowledgeBit":16777215,\
            "TagNameFilterString":"*",\
            "StartIndex":0,\
            "NeedAlarmCount":110,\
            "AlarmSortColumnIndex_MayBeNegative":1\
        }';
        ws.send(alarmStat);
    }

    // 获取plc&swtich 在线率 + 动环参数
    function page1Info(){
        // 标签点获取
        wsStr = '{\
            "Request":"RDB_GetTagFieldValue",\
            "TagFieldName":[\
                "Param1.F_CV","Param2.F_CV","Param3.F_CV",\
                "Param4.F_CV","Param5.F_CV","Param6.F_CV","Param7.F_CV",\
            ]\
        }'
        ws.send(wsStr)
    }

    //网络拓扑图-plc状体

    // 执行连接
    connectServer();
}