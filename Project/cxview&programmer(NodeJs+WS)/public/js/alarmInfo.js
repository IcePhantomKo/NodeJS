var value1;
layui.use('laydate', function () {
    var laydate = layui.laydate;

    //执行一个laydate实例
    laydate.render({
        elem: '#test1',
        range:true,
        type: 'datetime'
    });
    laydate.render({
        elem: '#test2', 
        type:'datetime',
        done: (value,date,endDate) =>{
            value1 = value
        }
    });
});

function alarmSearch(){
    alert(value1)
}