Vue.component('tunnel_pos',{
    props:['tunnelName'],
    template:
    '<div id="tunnelPos">'+
        '<div id="tunnelIcon"></div>'+
        '<div id="tunnelTitle" onclick = "mapToDetail(this)">'+
            '<p>{{tunnelName}}</p>'+
        '</div>'+
        '<div id="tunnelPic">'+
            '<div class="water1"></div>'+
            '<div class="water2"></div>'+
            '<div class="water3"></div>'+
            '<div class="water4"></div>'+
        '</div>'+
    '</div>'
})
  
var map = new Vue({
    el:'#midBar',
    data:{
        tunnelList:[
            {id:1,tunnelName:'金资隧道'},
            {id:2,tunnelName:'熊村隧道'},
            {id:3,tunnelName:'文峰山隧道'},
            {id:4,tunnelName:'进贤隧道'}
        ]   
    },
    methods: {
        tunnelID:function(index){
            return "tunnel_"+(index-(-1));
        }
    },
})

function mapToDetail(el){
    // 父级id提取
    var id = el.parentNode.id;
    switch(id){
        //******************* 需要加入跳转界面动作 ****************/
        case "tunnel_1":
            $(".equEnviroment").css("display","block");
            $(".Main").css("display","none");
            $("body").css("background-image","url(./img/背景.jpg)");
           break;
        case "tunnel_2":
            alert('跳转到 -> 熊村隧道');
            break;
        case "tunnel_3":
            alert('跳转到 -> 文峰山隧道');
            break;
        case "tunnel_4":
            alert('跳转到 -> 进贤隧道');
            break;
    }
}