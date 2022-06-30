var myChart3 = echarts.init(document.getElementById('leftChart3'));

var option3;
option3 = {
    tooltip: {
        trigger: 'item'
    },
    series: [
        {
            type: 'pie',
            radius: ['60%', '80%'],
            center: ["61%", "50%"], 
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 2,
                borderColor: '#fff',
                borderWidth: 2,
                shadowBlur: 5,
                shadowColor: '#44d39f', 
                shadowOffsetX: 0,
                shadowOffsetY: 0,
            },
            label: {
                normal: {
                    show: true,
                    position: 'center',
                    formatter:function (argument) {
                        var html;
                        var value1 = option3.series[0].data[0].value;
                        var value2 = option3.series[0].data[1];
                        var percent = (value1/200*100).toFixed(2);
                        html='在线率\r\n\r\n'+ percent+'%';
                        return html;
                    },
                    textStyle:{
                        fontSize: 15,
                        fontWeight:'bold',
                        color:'#39CCCC',
                    }
                }
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '10',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: true
            },
            data: [
                {value: 58, name: '正常运行数量',itemStyle:{color:'#4FA4D0'}},
                {value: 10, name: '存在异常数量',itemStyle:{color:'red'}},
            ]
        }
    ],
    color:['#17efff','red'],
};
$(window).resize(myChart3.resize);
