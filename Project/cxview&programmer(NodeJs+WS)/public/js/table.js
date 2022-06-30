var MyMarhq = '';
clearInterval(MyMarhq);
$('.tbl-body tbody').empty();
$('.tbl-header tbody').empty();

var Items = [
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
if(Items.length > 9){
    // console.log(Items.length);
    $('.tbl-body tbody').html($('.tbl-body tbody').html()+$('.tbl-body tbody').html());
    $('.tbl-body').css('top', '0');
    var tblTop = 0;
    var speedhq = 50; // 数值越大越慢
    var outerHeight = $('.tbl-body tbody').find("tr").outerHeight();

    function Marqueehq(){
        $('.tbl-body tbody').empty();
        $('.tbl-header tbody').empty();
        $.each(Items,function (i, item) {
            str = '<tr>'+
                '<td>'+item.Ranking+'</td>'+
                '<td>'+item.Time+'</td>'+
                '<td>'+item.TagName+'</td>'+
                '<td>'+item.Value+'</td>'+
                '</tr>';
                $('.tbl-body tbody').append(str);
                $('.tbl-header tbody').append(str); 
            }
        );
        $('.tbl-body tbody').html($('.tbl-body tbody').html()+$('.tbl-body tbody').html());
        $('.tbl-body').css('top', '0');
            
        if(tblTop <= -300){
            tblTop = 0;
        } else {
            tblTop -= 1;
        }
        $('.tbl-body').css('top', tblTop+'px');
        // console.log(Items);
    }
    MyMarhq = setInterval(Marqueehq,speedhq);

    // 鼠标移上去取消事件
    $(".tbl-header tbody").hover(function (){
        clearInterval(MyMarhq);
    },function (){
        clearInterval(MyMarhq);
        MyMarhq = setInterval(Marqueehq,speedhq);
    })
}