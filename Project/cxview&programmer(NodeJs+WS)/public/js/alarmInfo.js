var alarmStartTime, alarmEndTime;
layui.use('laydate', function () {
    var laydate = layui.laydate;
    //执行一个laydate实例
    laydate.render({
        elem: '#test1',
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
    // 发送请求
    $.ajax({
        url: 'http://10.110.133.212:8000/admin/alarmRecord',
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
            console.log(result);
        }
    })
}

//生成数据
let tableData = new Array();
for (let i = 0; i < 26; i++) {
    let age = (Math.random() * 30).toFixed(0);
    tableData.push({
        index: (i + 1),
        tagName: 'PLC' + i + '_A100',
        errorDes: '错误日志' + i,
        startTime: '2022-07-08 00:00:00 - 2022-08-08 23:59:59',
        endTime: '2022-07-08 00:00:00 - 2022-08-08 23:59:59',
        value: 18 + i
    });
};
let keyData = ['index', 'tagName', 'errorDes','startTime','endTime','value'];

//调用函数
createTable(tableData, keyData, 'tb_tbody');


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
};
//createTable(tableList, keyList, tbodyId)函数接收三个参数，分别如下：
//tableList：表格的json数据[{},{},{}]形式
//keyList:表格数组里面每一个对象所包含的字段数组，即表格中每一列所展示的数据对应的字段
//tbodyId:table表格中tbody的ID,注意，是tbody的ID，不是class