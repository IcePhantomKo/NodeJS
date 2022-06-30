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
    //选中CX-View弹窗界面时的动作,现为固定死
    if(equNum == "5"||equNum=="6"||equNum == "8"){
        $(".Page3").css("display","block");
        // $("#navImg4").css("background-image","url(./img/选中/"+imgList[3]+")");
    }else{
        var c = $(".Page"+(equNum-1));
        $(c).css("display","block");
        $("#"+obj.id).css("background-image","url(./img/选中/"+imgList[equNum-1]+")");
    }  

    var interval;

    switch(equNum){
        case '1':
            var interval = setInterval(() => {
                GetAlarm();
                plcStatus();
            }, 1000);
            break;

        // 网络拓扑图 POST('/admin/topology') 
        case '2':
            clearInterval(interval)
            
            var new_token = window.localStorage.getItem('token')
            $.ajax({
                url: 'http://10.110.133.212:8000/admin/topology',
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

            // WebSocket 请求

            // function GetValue(){
            //     test = '{\
            //         "Request":"RDB_GetTagFieldValue",\
            //         "TagFieldName":[\
            //             "switch1_online"\
            //         ]\
            //     }';
            //     ws.send(test);
            // }
            // ws.onmessage=(e)=>{
            //     console.log(e.data);
            // }
            // GetValue();

            break;
        
        // 
        case '3':
            //TODO
        
        // 接入信息 
        // POST('/admin/modChal')
        // POST('/admin/devCon')
        case '4':
            var new_token = window.localStorage.getItem('token')
            $.ajax({
                url: 'http://10.110.133.212:8000/admin/modChal',
                type: 'post',
                contentType: 'application/json',
                cache:true,
                async:true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader("Authorization", new_token);
                },
                success:function(result){
                    console.log(result.message);
                }
            })
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
    //报警信息
    $("#erroReport").click(function(){
        window.OnReceive2(4,"","");
    })
    //一键巡查
    $("#quickFind").click(function(){
        window.OnReceive2(5,"","");
    })
    //打开文件夹
    $("#fileOpen").click(function(){
        window.OnReceive2(6,"","");
    })
})
