var myChart4 = echarts.init(document.getElementById('rightChart1'));

var option4;

option4 = {
    grid:{
        bottom:'12%',
        top:'15%'
    },
    legend: {
        data:['最高','最低'],
        left:'right',
        textStyle:{
            color:'white',
        },
        show:true,
    },
    tooltip: {},
    xAxis: {
        type: 'category',
        data:['温度','湿度','功耗'],
        axisLabel:{
            textStyle:{
                color:'white',
            },
        },
    },
    yAxis: {},
    series: [
        {
            name:'最高',
            type: 'bar',
            itemStyle:{
                shadowBlur:5,
                shadowColor:'white',
                shadowOffsetX:0,
                shadowOffsetY:0,
                },
            data:[
                {value:44, name:'温度'},
                {value:44, name:'湿度'},
                {value:44, name:'功耗'},
                ]
        },
        {
            name: '最低',
            type: 'bar',
            itemStyle:{
                shadowBlur:5,
                shadowColor:'white',
                shadowOffsetX:0,
                shadowOffsetY:0,
                },
            data:[
                {value:55,name:'温度'},
                {value:55,name:'湿度'},
                {value:55,name:'功耗'}
                ]
        },
    ],
    color:['#ff3c00','#17e6ff']
};
$(window).resize(myChart4.resize);