var temp = '';
var alarmTemp = '';
function receiveData(data){
    if(data != temp){
        temp = data;

        var arr = new Array();
        var total = 200;
        arr = data.split(',');

        $("#Param0").html(total-arr[6]);
        $("#Param1").html(arr[6] * 1);
        $("#Param2").html(arr[7] * 1);
        $("#Param3").html(total-arr[7]);

        //plc在线率
        option2.series[0].data[0].value = arr[6];
        option2.series[0].data[1].value = total - arr[6];
        // 交换机在线率
        option3.series[0].data[0].value = arr[7];
        option3.series[0].data[1].value = total - arr[7];

        // 系统参数
        option4.series[0].data[0].value = arr[0];
        option4.series[0].data[1].value = arr[2];
        option4.series[0].data[2].value = arr[4];

        option4.series[1].data[0].value = arr[1];
        option4.series[1].data[1].value = arr[3];
        option4.series[1].data[2].value = arr[5];   

        //Initial
        option2 && myChart2.setOption(option2);
        option3 && myChart3.setOption(option3);
        option4 && myChart4.setOption(option4);
    }else{
        // alert('same');
        return;
    }
}

function alarmData(data){
    var dataStr = JSON.stringify(data);
    var alarmLength = data.length;
    if(dataStr != alarmTemp){
        alarmTemp = dataStr;
        Items = [
            {"Ranking":"1","Time":"数据正常","TagName":"数据正常","Value":"数据正常"},
            {"Ranking":"2","Time":"数据正常","TagName":"数据正常","Value":"数据正常"},
            {"Ranking":"3","Time":"数据正常","TagName":"数据正常","Value":"数据正常"},
            {"Ranking":"4","Time":"数据正常","TagName":"数据正常","Value":"数据正常"},
            {"Ranking":"5","Time":"数据正常","TagName":"数据正常","Value":"数据正常"},
            {"Ranking":"6","Time":"数据正常","TagName":"数据正常","Value":"数据正常"},
            {"Ranking":"7","Time":"数据正常","TagName":"数据正常","Value":"数据正常"},
            {"Ranking":"8","Time":"数据正常","TagName":"数据正常","Value":"数据正常"},
            {"Ranking":"9","Time":"数据正常","TagName":"数据正常","Value":"数据正常"},
            {"Ranking":"10","Time":"数据正常","TagName":"数据正常","Value":"数据正常"}
        ];
        for(i=0;i<alarmLength;i++){
            Items[i].Ranking = i+1;
            Items[i].Time = data[i].alarmTime;
            Items[i].TagName = data[i].alarmName;
            Items[i].Value = data[i].alarmValue;
        }
    }
    else{
        return;
    }
}