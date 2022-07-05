var myChart2 = echarts.init(document.getElementById('leftChart2'));

var option2;

option2 = {
    tooltip: {
        trigger: 'item'
    },
    series: [
        {
            type: 'pie',
            radius: ['60%', '80%'],
            center: ["50%", "50%"], 
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

                    formatter:function () {
                        var html;
                    //     var value1 = option2.series[0].data[0].value;
                    //     var value2 = option2.series[0].data[1].value;
                        html='正常运行\r\n\r\n'+ option2.series[0].data[2].percent*100 +'%';
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
                {percent:100}
            ]
        }
    ],
    color:['#17efff','red'],
};

$(window).resize(myChart2.resize);

