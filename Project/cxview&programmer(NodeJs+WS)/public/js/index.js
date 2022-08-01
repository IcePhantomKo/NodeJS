const my_ip = 'http://10.110.133.212:8000'

const plcName = [
    '金资隧道plc1','金资隧道plc2','金资隧道plc3','金资隧道plc4','金资隧道plc5',
    '金资隧道plc6','金资隧道plc7','金资隧道plc8','金资隧道plc9','金资隧道plc10',
]
// 底部导航栏
function botNavChange(obj){
    var imgList = new Array();
    var oriList = new Array();
    // 获取底部导航栏对应图标id number
    var equNum = obj.id.charAt(obj.id.length-1);

    for(i=1;i<9;i++){
        imgList[i-1] = "选中" + i + ".png";
        oriList[i-1] = "起始" + i + ".png";
    }
    for(i=0;i<imgList.length;i++){
        var a = document.querySelector('.navImg'+(i+1)).className;
        //init all Icon & Background image
        $("."+a).css("background-image","url(./img/选中/"+oriList[i]+")");  
        $(".Page"+i).css("display","none"); 
        //点击主页和其他页面时候的背景变化
        if(equNum == "1"){
            $("body").css("background-image","url(./img/weixingMap3.png)");
        }else{
            $("body").css("background-image","url(./img/背景.jpg)")
        }
    }
        var c = $(".Page"+(equNum-1));
        $(c).css("display","block");
        $("#"+obj.id).css("background-image","url(./img/选中/"+imgList[equNum-1]+")");

    switch(equNum){
        case '1':
            // setInterval(()=>{
            //     GetAlarm();
            // },1000)
            // ws.onmessage = (e) =>{
            //     console.log(e.data);
            // }
            break;

        // 网络拓扑图 POST('/admin/topology') 
        case '2':
            // setInterval(() => {
            //     page1Info()
            // }, 1000);
            // ws.onmessage=(e)=>{
            //     console.log(e.data);
            // }
            var new_token = window.localStorage.getItem('token')
            $.ajax({
                // url: 'http://10.110.133.212:8000/admin/topology',
                url: my_ip + '/admin/topology',
                type: 'post',
                contentType: 'application/json',
                cache:true,
                async:true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader("Authorization", new_token);
                },
                success:function(result){
                    for(i=0;i<topo.topo_list.length;i++){
                        topo.topo_list[i].plcIp = ' ' + result.message[i].PLCIpAddress;
                        topo.topo_list[i].plcNum = ' ' + result.message[i].Comments;
                        topo.topo_list[i].swtIp = ' ' + result.message[i].swtIpAddress;
                    }
                }
            })
            break;
        
        // 
        case '3':
            //TODO
        
        // 接入信息 
        // POST('/admin/modChal')
        // POST('/admin/devCon')
            break;








        case '6':
            // TODO: 一键巡查
            function plcStatus(){
                var test = '';
                for (i = 1; i < 23; i++) {
                    if (i <= 19) {
                        test += '"PLC1_stat' + i + '.F_CV",'
                    } else {
                        test += '"PLC1_stat' + i + '.A_CV",'
                    }
                }
                wsStr = '{ "Request":"RDB_GetTagFieldValue","TagFieldName":[' + test +']}'
                ws.send(wsStr)
            }

            plcStatus();

            ws.onmessage = (e) =>{
                var obj = JSON.parse(e.data);
                console.log(obj);
                // 创建table
                let tableData = new Array();
                let keyData = [
                    'index','plcName','onlineStatus',
                    'stat1','stat2','stat3','stat4','stat5','stat6',
                    'stat7','stat8','stat9','stat10','stat11','stat12',
                    'stat13','stat14','stat15','stat16','stat17','stat18',
                    'stat19','stat20','stat21'
                ]
                for(i=0;i<obj.TagFieldValue.length;i++){
                    tableData.push({
                        // index: (i+1),
                        // plcName: plcName[i],
                        // onlineStatus: i,
                        stat1: obj.TagFieldValue[i].V,
                        stat2: obj.TagFieldValue[i].T
                    })
                }
                console.log(tableData);
            }
            break;
            






















        case '7':
            // TODO: 智能分析请求
            $.ajax({
                url: my_ip + '/admin/analyInfo',
                type: 'post',
                contentType: 'application/json',
                cache:true,
                async:false,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader("Authorization", window.localStorage.getItem('token'));
                },
                success:function(result){
                    MostErrorPLC(result.mostErrorPLC);
                    MostErrorType(result.mostErrorType);
                    MostErrorUnit(result.mostErrorUnit);
                    MostFatalErrorType(result.mostFatalErrorType);
                    MostNonFatalErrorType(result.mostNonFatalErrorType);
                }
            })
            break;

        case '8':
            // TODO: 打开本地文件夹
            alert('暂不可用!')
            break;
    }
    
    $(window).trigger('resize'); 
}

// ------------------------------------------------------------------------------------------
$(function(){
    // 自适应
    $(".homePage").click(function(){
        $(window).trigger('resize');
    })
    //退出
    $("#quitPage").click(function(){
        window.location.reload();
    })
    // DI模块发送指令
    $("#eui4").click(function(){
        window.OnReceive2(1,"","");            
    });
    // DO 模块发送指令
    $("#eui5").click(function(){
        window.OnReceive2(2,"","");
    });
    // AI 模块发送指令
    $("#eui6").click(function(){
        window.OnReceive2(3,"","");
    });
})

