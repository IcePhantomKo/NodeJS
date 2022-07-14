var alarmStartTime, alarmEndTime;
layui.use('laydate', function () {
    var laydate = layui.laydate;
    //执行一个laydate实例
    laydate.render({
        elem: '#dateSearch',
        range:true,
        type: 'datetime',
        done:(value,date,endDate) =>{
            // value为输入的值 string
            // date 为起始时间的对象
            // endDate 为结束时间的对象
            alarmStartTime = value.slice(0,19)
            alarmEndTime = value.slice(22,41)
        }
    });
});

function alarmSearch(){
    // 判断输入值为空的情况
    if(typeof alarmStartTime == 'undefined' || typeof alarmEndTime == 'undefined'){
        alert('请选择正确的时间')
    }else{
    // 发送请求
        $.ajax({
            // url: 'http://10.110.133.212:8000/admin/alarmRecord',
            url: my_ip + '/admin/alarmRecord',
            type: "post",
            contentType: "application/json",
            dataType: 'json',
            cache: true,
            async: false,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader(
                    "Authorization",window.localStorage.getItem('token')
                );
            },
            headers:{
                // 故障率天数放在header里请求到服务器
                'alarmStartTime': alarmStartTime,
                'alarmEndTime': alarmEndTime
            },
            success: function (result) {
                let tableData = new Array();
                let keyData = ['index', 'tagName', 'errorDes','startTime','endTime','value'];
                
                for(i=0;i<result.message.length;i++){
                    tableData.push({
                        index:(i+1),
                        tagName: result.message[i].TagName,
                        errorDes: result.message[i].TagDescription,
                        startTime: result.message[i].StartTime,
                        endTime: result.message[i].EndTime,
                        value: result.message[i].AlarmValue
                    })
                }

                //动态创建table表格函数
                function createTable(tableList, keyList, tbodyId) {
                    let str = '';
                    $('.table').css('height','10px')
                    for (let i = 0; i < tableList.length; i++) {
                        str += "<tr>";
                        for (let j = 0; j < keyList.length; j++) {
                            str += "<td>" + tableList[i][keyList[j]] + "</td>";
                        };
                    };
                    document.querySelector(`#${tbodyId}`).innerHTML = str;
                    //createTable(tableList, keyList, tbodyId)函数接收三个参数，分别如下：
                    //tableList：表格的json数据[{},{},{}]形式
                    //keyList:表格数组里面每一个对象所包含的字段数组，即表格中每一列所展示的数据对应的字段
                    //tbodyId:table表格中tbody的ID,注意，是tbody的ID，不是class
                };

                if(result.message.length < 1){
                    alert('未查询到任何数据');
                    createTable(tableData,keyData,'tb_tbody');
                }else{
                    //调用函数
                    createTable(tableData, keyData, 'tb_tbody');
                }
                
            }
        })
    }
}
