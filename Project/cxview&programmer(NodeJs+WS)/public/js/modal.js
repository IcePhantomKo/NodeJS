// 模块通道图
Vue.component('modal_con',{
    props:[
        'modName','modal','slotNum','modInfo','statImg',
        'dvcName','dvcCount','dvcAccess','dvcIndex','dvcPos'
    ],
    template:
    '<div class="easyui-draggable">'+
        '<div id="title">PLC 模块状态监控 <div id="close">x</div></div>'+
        '<div class="euLeft">'+
            '<div id="power"></div><div id="restart"><p>重启</p></div>'+
        '</div>'+
        '<div class = "euRight">'+
            '<div class="euTop">'+
                '<h3>模块通道图</h3>'+
                '<table id = "test">'+
                    '<tr class="titleBlue">'+
                        '<th></th>'+
                        '<th>名称</th>'+
                        '<th>型号</th>'+
                        '<th>槽号</th>'+
                        '<th>模块信息</th>'+
                        '<th>模块状态</th>'+
                    '</tr>'+
                    // <!-- 电源 -->
                    '<tr class="darkBlue">'+
                        '<td><img src="./img/设备状态点击弹框/CPU.png"></td>'+
                        '<td>{{modName[0]}}</td>'+
                        '<td>{{modal[0]}}</td>'+
                        '<td>{{slotNum[0]}}</td>'+
                        '<td>{{modInfo[0]}}</td>'+
                        '<td><img :src="statImg.img0"></td>'+
                    '</tr>'+
                    // <!-- CPU -->
                    '<tr class="lightBlue">'+
                        '<td><img src="./img/设备状态点击弹框/CPU.png"></td>'+
                        '<td>{{modName[1]}}</td>'+
                        '<td>{{modal[1]}}</td>'+
                        '<td>{{slotNum[1]}}</td>'+
                        '<td>{{modInfo[1]}}</td>'+
                        '<td><img :src="statImg.img1"></td>'+
                    '</tr>'+
                    // <!-- 通讯模块 -->
                    '<tr class="darkBlue">'+
                        '<td><img src="./img/设备状态点击弹框/通讯模块.png"></td>'+
                        '<td>{{modName[2]}}</td>'+
                        '<td>{{modal[2]}}</td>'+
                        '<td>{{slotNum[2]}}</td>'+
                        '<td>{{modInfo[2]}}</td>'+
                        '<td><img :src="statImg.img2"></td>'+
                    '</tr>'+
                    // <!-- DI/DO模块 -->
                    '<tr class="lightBlue">'+
                        '<td id="eui4"><img src="./img/设备状态点击弹框/DIDO.png"></td>'+
                        '<td>{{modName[3]}}</td>'+
                        '<td>{{modal[3]}}</td>'+
                        '<td>{{slotNum[3]}}</td>'+
                        '<td>{{modInfo[3]}}</td>'+
                        '<td><img :src="statImg.img3"></td>'+
                    '</tr>'+
                    // <!-- DO模块 -->
                    '<tr class="darkBlue">'+
                        '<td id="eui5"><img src="./img/设备状态点击弹框/DIDO.png"></td>'+
                        '<td>{{modName[4]}}</td>'+
                        '<td>{{modal[4]}}</td>'+
                        '<td>{{slotNum[4]}}</td>'+
                        '<td>{{modInfo[4]}}</td>'+
                        '<td><img :src="statImg.img4"></td>'+
                    '</tr>'+
                    // <!-- I/O模块 -->
                    '<tr class="lightBlue">'+
                        '<td id="eui6"><img src="./img/设备状态点击弹框/IO.png"></td>'+
                        '<td>{{modName[5]}}</td>'+
                        '<td>{{modal[5]}}</td>'+
                        '<td>{{slotNum[5]}}</td>'+
                        '<td>{{modInfo[5]}}</td>'+
                        '<td><img :src="statImg.img5"></td>'+
                    '</tr>'+
                '</table>'+
            '</div>'+


            '<div class="euBot1">'+
                '<h3>接入的设备</h3>'+
                '<table>'+
                    '<tr class="titleBlue">'+
                        '<th></th>'+
                        '<th>名称</th>'+
                        '<th>数量</th>'+
                        '<th>接入方式</th>'+
                        '<th>接入的设备</th>'+
                        '<th>设备位置</th>'+
                    '</tr>'+
                    '<tr class="darkBlue">'+
                        '<td><img src="./img/照明.png"></td>'+
                        '<td>{{dvcName[0]}}</td>'+
                        '<td>{{dvcCount[0]}}</td>'+
                        '<td>{{dvcAccess[0]}}</td>'+
                        '<td>{{dvcIndex[0]}}</td>'+
                        '<td>{{dvcPos[0]}}</td>'+
                    '</tr>'+
                    '<tr class="lightBlue">'+
                        '<td><img src="./img/风机.png"></td>'+
                        '<td>{{dvcName[1]}}</td>'+
                        '<td>{{dvcCount[1]}}</td>'+
                        '<td>{{dvcAccess[1]}}</td>'+
                        '<td>{{dvcIndex[1]}}</td>'+
                        '<td>{{dvcPos[1]}}</td>'+
                    '</tr>'+
                    '<tr class="darkBlue">'+
                        '<td><img src="./img/指示器.png"></td>'+
                        '<td>{{dvcName[2]}}</td>'+
                        '<td>{{dvcCount[2]}}</td>'+
                        '<td>{{dvcAccess[2]}}</td>'+
                        '<td>{{dvcIndex[2]}}</td>'+
                        '<td>{{dvcPos[2]}}</td>'+
                    '</tr>'+
                    '<tr class="lightBlue">'+
                        '<td><img src="./img/传感器.png"></td>'+
                        '<td>{{dvcName[3]}}</td>'+
                        '<td>{{dvcCount[3]}}</td>'+
                        '<td>{{dvcAccess[3]}}</td>'+
                        '<td>{{dvcIndex[3]}}</td>'+
                        '<td>{{dvcPos[3]}}</td>'+
                    '</tr>'+
                    '<tr class="darkBlue">'+
                        '<td><img src="./img/风向.png"></td>'+
                        '<td>{{dvcName[4]}}</td>'+
                        '<td>{{dvcCount[4]}}</td>'+
                        '<td>{{dvcAccess[4]}}</td>'+
                        '<td>{{dvcIndex[4]}}</td>'+
                        '<td>{{dvcPos[4]}}</td>'+
                    '</tr>'+
                    '<tr class="lightBlue">'+
                        '<td><img src="./img/传感器.png"></td>'+
                        '<td>{{dvcName[5]}}</td>'+
                        '<td>{{dvcCount[5]}}</td>'+
                        '<td>{{dvcAccess[5]}}</td>'+
                        '<td>{{dvcIndex[5]}}</td>'+
                        '<td>{{dvcPos[5]}}</td>'+
                    '</tr>'+
                '</table>'+
            '</div>'+
        '</div>'+
    '</div>'
})
var modal  = new Vue({
    el:'.modal',
    data:{
        modalList:[
            {
                modName:['-', '-', '-', '-', '-', '-'],
                modal:  ['-', '-', '-', '-', '-', '-'],
                slotNum:['-', '-', '-', '-', '-', '-'],
                modInfo:['-', '-', '-', '-', '-', '-'],
                statImg:{
                    img0: noData, img1:noData, img2:noData,
                    img3: noData, img4:noData, img5:noData,
                },
                dvcName: ['-', '-', '-', '-', '-', '-'],
                dvcCount: ['-', '-', '-', '-', '-', '-'],
                dvcAccess: ['-', '-', '-', '-', '-', '-'],
                dvcIndex: ['-', '-', '-', '-', '-', '-'],
                dvcPos:['-', '-', '-', '-', '-', '-'],
            }
        ]
    },
    methods: {

    },
})
//模块图片状态传输,从数据库槽位来的数据
function sendData(data){
    var arr = new Array();
    arr = data.split(',');

    var firstNum = new Array();
    var secNum = new Array();
    for(i=0;i<3;i++){
        firstNum += (arr[i].substr(0,1) + ',');
        secNum += (arr[i].substr(1,1) + ',');
    }
    modalStatus = firstNum.split(',');
    modalStatus2 = secNum.split(','); 
}
// sendData();

// 接入信息每个柜体信息打开图标
function findId(element){
    // 发送请求
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
            
            // 选取 ACU 详情页小图标id
            var acuImgID = element.parentNode.id;
            // 初始化所有状态图片
            for(var key in modal.modalList[0].statImg){
                modal.modalList[0].statImg[key] = normalImg;
            }

            // 从数据库取上来plc信息数量
            var plcInfoLength = result.message.length;
            var plc1_modal_Num = 0;
            var plc2_modal_Num = 0;
            var plc3_modal_Num = 0;
            var plc1_pos = 0;
            var plc2_pos = 0;
            var plc3_pos = 0;

            // 查询各 plc 有多少模块
            for(i=0;i<plcInfoLength;i++){
                switch(result.message[i].plc_id){
                    case 1: plc1_modal_Num++;break;
                    case 2: plc2_modal_Num++;break;
                    case 3: plc3_modal_Num++;break;
                }
            }

            plc2_pos = plc1_modal_Num;
            plc3_pos = plc2_pos + plc2_modal_Num;

            switch(acuImgID){
                case 'ACU1':modalData(plc1_modal_Num,0,plc1_pos);break;
                case 'ACU2':modalData(plc2_modal_Num,1,plc2_pos);break;
                case 'ACU3':modalData(plc3_modal_Num,2,plc3_pos);break;
            }

        //         dev_res = devResp;
        //         // alert(JSON.stringify(dev_res));
        //         //接入设备信息数量
        //         var dataLength = devResp.data.length;
        //         for(i = 1; i < dataLength+1; i++){
        //             this["plc" + i + "_device_Num"] = 0;
        //             this["device" + i + "_pos"] = 0;
        //             // 查询每个plc_id下有多少个接入的设备
        //             switch(devResp.data[i-1].plc_id){
        //                 case 1: plc1_device_Num++;break;
        //                 case 2: plc2_device_Num++;break;
        //                 case 3: plc3_device_Num++;break;
        //             }
        //         }
        //         //出现的位置
                // device2_pos = plc1_device_Num;
                // device3_pos = device2_pos + plc2_device_Num;

                // switch(acuImgID){
                //     case 'ACU1':devData(plc1_device_Num,device1_pos);break;
                //     case 'ACU2':devData(plc2_device_Num,device2_pos);break;
                //     case 'ACU3':devData(plc3_device_Num,device3_pos);break;
                // }
        //     }))
            $(".modal").css("display","block");
        // }
        //modal数据传输函数 param为plc_modal数量 imgNum为图片状态切换状态数字 pos为plc_id位置
        function modalData(param,imgNum,pos){
            for(i=0;i<param;i++){
                modal.modalList[0].modName[i] = result.message[pos+i].rack_type;
                modal.modalList[0].modal[i] = result.message[pos+i].slot_unit_name;
                modal.modalList[0].slotNum[i] = result.message[pos+i].slot_unit_id;
                modal.modalList[0].modInfo[i] = result.message[pos+i].plc_id;
            }
            // switch(modalStatus[imgNum]){
            //     case '0':modal.modalList[0].statImg.img0 = newNormal; break;
            //     case '1':modal.modalList[0].statImg.img0 = errorImg; break;
            //     case '2':modal.modalList[0].statImg.img1 = errorImg; break;
            //     case '3':modal.modalList[0].statImg.img2 = errorImg; break
            //     case '4':modal.modalList[0].statImg.img3 = errorImg; break;
            //     case '5':modal.modalList[0].statImg.img4 = errorImg; break;
            //     case '6':modal.modalList[0].statImg.img5 = errorImg; break;
            // }
            // switch(modalStatus2[imgNum]){
            //     case '1':modal.modalList[0].statImg.img0 = errorImg; break;
            //     case '2':modal.modalList[0].statImg.img1 = errorImg; break;
            //     case '3':modal.modalList[0].statImg.img2 = errorImg; break
            //     case '4':modal.modalList[0].statImg.img3 = errorImg; break;
            //     case '5':modal.modalList[0].statImg.img4 = errorImg; break;
            //     case '6':modal.modalList[0].statImg.img5 = errorImg; break;
            // }
        }
        // function devData(param,pos){
        //     for(i=0;i<param;i++){
        //         modal.modalList[0].dvcName[i] = dev_res.data[pos+i].device_name;
        //         modal.modalList[0].dvcCount[i] = dev_res.data[pos+i].device_count;
        //         modal.modalList[0].dvcAccess[i] = dev_res.data[pos+i].access_way;
        //         modal.modalList[0].dvcIndex[i] = dev_res.data[pos+i].device_index;
        //         modal.modalList[0].dvcPos[i] = dev_res.data[pos+i].device_position;
        //     }
        // }
        }
    })
}




// modal界面关闭
$("#close").click(function(){
    $(".modal").css("display","none");
    //  初始化Table
    for(i=0;i<6;i++){
        // 接入设备
        modal.modalList[0].dvcName[i] = '-';
        modal.modalList[0].dvcCount[i] = '-';
        modal.modalList[0].dvcAccess[i] = '-';
        modal.modalList[0].dvcIndex[i] = '-';
        modal.modalList[0].dvcPos[i] = '-';

        // 模块通道图
        modal.modalList[0].modName[i] = '-';
        modal.modalList[0].modal[i] = '-';
        modal.modalList[0].slotNum[i] = '-';
        modal.modalList[0].modInfo[i] = '-';
    }
})

//重启
$("#restart").click(function(){
    alert('PLC restart')
})
