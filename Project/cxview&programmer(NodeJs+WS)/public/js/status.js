$(function(){
    $("#plc1-1").click(function(){
        $(".easyui-draggable").css("display","block");
    })
})
// 页面变化
$(function(){
    $("#moveNext").click(function(){
        $(".stat1Slide1").css("display","none");
        $(".stat1Slide2").css("display","block");
    });
    $("#movePrev").click(function(){
        $(".stat1Slide1").css("display","block");
        $(".stat1Slide2").css("display","none");
    })
})
//接入信息导航栏变化
function stat_nav(obj){
    var a = document.querySelector('.statNaviInfo').querySelectorAll('div');
    for(i = 0; i < a.length; i++){
        a[i].className = "";
        $(".statMain"+i).css("display","none");
    }
    obj.className = "current";
    var equNum = obj.id.charAt(obj.id.length-1);
    $(".statMain"+equNum).css("display","block");
}
// 设备状态信息组件
Vue.component('plc_eq',{
    props:['boxName','zm','fan','ls','co','ws'],
    template:
        '<div class="plcStatus">' +
            '<h3>{{boxName}}</h3>'+
            '<div class="plcInner_top" onclick = "findId(this)"></div>'+
            '<div id="statTable">' +
                '<table>' +
                    '<tr>' +
                        '<td style="width: 30%"><img src ="./img/照明.png"></td>' +
                        '<td>{{zm}}</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td><img src="./img/风机.png"></td>' +
                        '<td>{{fan}}</td>' +
                    '</tr>'+
                    '<tr>'+
                        '<td><img src="./img/指示器.png"></td>'+
                        '<td>{{ls}}</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td><img src="./img/传感器.png"></td>'+
                        '<td>{{co}}</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td><img src="./img/风向.png"></td>'+
                        '<td>{{ws}}</td>'+
                    '</tr>'+
                '</table>'+
        '</div>'+
    '</div>'
})
var vm = new Vue({
    el:'.status',
    data:{
        status_list:[
            {id:0,boxName:'ACU 01',zm:'zm01 zm02',fan:'fan01 fan02',ls:'LS01',co:'CO/VI1',ws:'WS01 WS02'},
            {id:1,boxName:'ACU 02',zm:'zm11 zm12',fan:'fan11 fan12',ls:'LS11',co:'CO/VI2',ws:'WS11 WS12'},
            {id:2,boxName:'ACU 03',zm:'zm22 zm22',fan:'fan22 fan22',ls:'LS22',co:'CO/VI3',ws:'WS22 WS22'},
            {id:3,boxName:'ACU 04',zm:'zm01 zm02',fan:'fan01 fan02',ls:'LS01',co:'CO/VI',ws:'WS01 WS02'},
            {id:4,boxName:'ACU 05',zm:'zm01 zm02',fan:'fan01 fan02',ls:'LS01',co:'CO/VI',ws:'WS01 WS02'},
            {id:5,boxName:'ACU 06',zm:'zm01 zm02',fan:'fan01 fan02',ls:'LS01',co:'CO/VI',ws:'WS01 WS02'},
            {id:6,boxName:'ACU 07',zm:'zm01 zm02',fan:'fan01 fan02',ls:'LS01',co:'CO/VI',ws:'WS01 WS02'},
            {id:7,boxName:'ACU 08',zm:'zm01 zm02',fan:'fan01 fan02',ls:'LS01',co:'CO/VI',ws:'WS01 WS02'},
        ],
    },
    methods: {
        // #plc_eq 赋 id名称 ACUx
        forId:function(index){
            return "ACU" + (index-(-1));
        }
    },
})

