var newPlc = '';
var newSwt = '';
var errorImg = 'icon/fail.png';
var normalImg = 'icon/normal.png';
var newNormal = 'icon/newNormal.png';
var noData = 'icon/无数据.svg';
// 模块通道图状态显示变量
var modalStatus,modalStatus2;
// modal.json中的response数据 全局变量
var modal_response;
var dev_res;

Vue.component('topo_box',{
    props:['plcIp','plcNum','swtIp','plcImg','swtImg'],
    template:
    '<div class="topoBox">'+
        '<div class="plcIP">PLC 地址:{{plcIp}}</div>'+
        '<div class="plcNum">桩号: {{plcNum}}</div>'+
        '<div class="plcPic"></div>'+
        '<div class="plcStat"><img :src = "plcImg"></div>'+
        '<div class="swtIP">交换机地址:{{swtIp}}</div>'+
        '<div class="swtPic"></div>'+
        '<div class="swtStat"><img :src = "swtImg"></div>'+
    '</div>'
})
var topo = new Vue({
    el:'.topology',
    data:{
        topo_list:[
            {id:1,plcIp:'',plcNum:'',swtIp:' 暂无数据',plcImg: errorImg, swtImg: errorImg},
            {id:2,plcIp:'',plcNum:'',swtIp:' 暂无数据',plcImg: errorImg, swtImg: errorImg},
            {id:3,plcIp:'',plcNum:'',swtIp:' 暂无数据',plcImg: errorImg, swtImg: errorImg},
            {id:4,plcIp:'',plcNum:'',swtIp:' 暂无数据',plcImg: errorImg, swtImg: errorImg},
        ],
        index:0,
    },
    // Vue传数据例子
    methods: {
        // PLC状态变化
        plcStat:function(plcStat){
            if(plcStat == newPlc){
                return;
            }else{
                newPlc = plcStat;
                var plcList = new Array();
                plcList = plcStat.split(',');
                var that = this;
                for(i=0;i<that.topo_list.length;i++){
                    if(plcList[i] == 0){
                        that.topo_list[i].plcImg = errorImg;
                    }else{
                        that.topo_list[i].plcImg = normalImg;
                    }
                }
            }
        },
        //交换机状态变化
        swtStat:function(swtStat){
            if(swtStat == newSwt){
                return;
            }else{
                newSwt = swtStat;
                var swtList = new Array();
                swtList = swtStat.split(',');
                var that = this;
                for(i=0;i<that.topo_list.length;i++){
                    if(swtList[i] == 0){
                        that.topo_list[i].swtImg = errorImg;
                    }else{
                        that.topo_list[i].swtImg = normalImg;
                    }
                }
            }
        }
    }
})

// 网络拓扑导航栏
function topo_nav(obj) {
    var a = document.querySelector('.topoNaviInfo').querySelectorAll('div');
    for (var i = 0; i < a.length; i++) {
        a[i].className = "";
        $(".topoMain"+i).css("display","none");
    }
    obj.className = "current";
    var equNum = obj.id.charAt(obj.id.length-1);
    $(".topoMain" + equNum).css("display","block");
}

