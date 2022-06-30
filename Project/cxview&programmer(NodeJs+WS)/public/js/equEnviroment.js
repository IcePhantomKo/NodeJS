// 柜体环境
var equEnvObj = '';

Vue.component('plc_box',{
    //柜内参数名称,温度,湿度,功耗
    props: ['boxName','temperature','humidity',"powerS"],
    template:
        '<div id="plcParameter1">'+
            '<h3>{{boxName}}</h3>'+
            '<div id="equTable">'+
            '<table style="width: 100%;height: 100%;text-align: center;color: white;">'+
                '<tr>'+
                    '<td><img src="./img/温度.png"></td>'+
                        '<td>温度：</td>'+
                        '<td>{{temperature}} °C</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td><img src="./img/温湿度.png"></td>'+
                        '<td>湿度：</td>'+
                        '<td>{{humidity}} %</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td><img src="./img/能耗数据.png"></td>'+
                        '<td>功耗：</td>'+
                        '<td>{{powerS}} w</td>'+
                    '</tr>'+
                '</table>'+
            '</div>'+
        '</div>'
})
var equ = new Vue({
    el:'.equEnviroment',
    data:{
        plc_box_list:[
            {id:1,boxName:'PLC1 柜内环境参数',temperature:'暂无数据',humidity:'暂无数据',powerS:'暂无数据'},
            {id:2,boxName:'PLC2 柜内环境参数',temperature:'暂无数据',humidity:'暂无数据',powerS:'暂无数据'},
            {id:3,boxName:'PLC3 柜内环境参数',temperature:'暂无数据',humidity:'暂无数据',powerS:'暂无数据'},
            {id:4,boxName:'PLC4 柜内环境参数',temperature:'暂无数据',humidity:'暂无数据',powerS:'暂无数据'},
        ],
        tn1:'金资隧道',
        tn2:'熊村隧道',
        tn3:'文峰山隧道',
        tn4:'进贤隧道',
        tn5:'xxx隧道',
        tn6:'zzz隧道',
    },
    methods: {
        // 柜内环境参数传输
        equEnv:function(equEnv){
            var equEnvNew = JSON.stringify(equEnv);
            if(equEnvNew == equEnvObj){
                return;
            }else{
                equEnvObj = equEnvNew;
                for(i=0;i<4;i++){
                    this.plc_box_list[i].temperature = equEnv[i].Temperature;
                    this.plc_box_list[i].humidity = equEnv[i].Humidity;
                    this.plc_box_list[i].powerS = equEnv[i].PowerDissipation;
                }
            }
        }
    },
})

function change_bg(obj) {
    var a = document.querySelector('.equNaviInfo').querySelectorAll('div');
    for (var i = 0; i < a.length; i++) {
        a[i].className = "";
        $(".equMain"+i).css("display","none");
    }
    obj.className = "current";
    var equNum = obj.id.charAt(obj.id.length-1);
    $(".equMain" + equNum).css("display","block");
}

