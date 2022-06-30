//故障率
function errorOption(obj) {
    var timeSpanList = new Array();
    timeSpanList = ["7", "15", "50"];
    var a = document.querySelector('#rightChart2TopOption').querySelectorAll('div');
    for (i = 0; i < a.length; i++) {
        a[i].className = "";
        $("#rightChart2-" + i).css("display", "none");
    }
    var equNum = obj.id.charAt(obj.id.length - 1);

    obj.className = "option_current";
    $("#rightChart2-" + equNum).css("display", "block");
    //向CX-view 传输命令
    window.OnReceive2(0,"PicUdf.SettingTimeSpanFromHtml",timeSpanList[equNum - 1]);
    $(window).trigger('resize');
}

// 故障率 ---------------------------------------------------------------
function errorRate(data) {
    var sevenDate = new Array();
    var sevenData = new Array();
    var fifteenDate = new Array();
    var fifteenData = new Array();
    var thirtyData = new Array();
    var thirtyDate = new Array();

    for (i = 0; i < 7; i++) {
        sevenDate.push(data.date[i]);
        sevenData.push(data.data[i]);
    }
    for (i = 0; i < 15; i++) {
        fifteenDate.push(data.date[i]);
        fifteenData.push(data.data[i]);
    }
    for (i = 0; i < 50; i++) {
        thirtyDate.push(data.date[i]);
        thirtyData.push(data.data[i]);
    }
    var myChart5 = echarts.init(document.getElementById('rightChart2-1'));
    var myChart6 = echarts.init(document.getElementById('rightChart2-2'));
    var myChart7 = echarts.init(document.getElementById('rightChart2-3'));
    // Option 7天 ---------------------------------------------------------------
    var option5 = {
        grid: {
            left: '12%',
            top: '5%',
            bottom: '20%',
            right: '5%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: sevenDate,
            axisLabel: {
                textStyle: {
                    color: 'white'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                textStyle: {
                    color: 'white'
                },
                formatter: '{value} %'
            },
            axisPointer: {
                snap: true
            }
        },
        visualMap: {
            show: false,
            dimension: 0,
            pieces: [
                {
                    lte: 6,
                    color: 'orange'
                }, {
                    gt: 6,
                    lte: 8,
                    color: 'red'
                }, {
                    gt: 8,
                    lte: 14,
                    color: '#4FA4D0'
                }, {
                    gt: 14,
                    lte: 17,
                    color: 'red'
                }, {
                    gt: 17,
                    color: 'green'
                }
            ]
        },
        series: [
            {
                name: '故障率',
                type: 'line',
                smooth: true,
                data: sevenData,
                markArea: {
                    itemStyle: {
                        color: 'rgba(255, 173, 177, 0.4)'
                    }
                }
            }
        ]
    }
    // Option 15天 ---------------------------------------------------------------
    var option6 = {
        grid: {
            left: '12%',
            top: '5%',
            bottom: '20%',
            right: '5%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: fifteenDate,
            axisLabel: {
                textStyle: {
                    color: 'white'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                textStyle: {
                    color: 'white'
                },
                formatter: '{value} %'
            },
            axisPointer: {
                snap: true
            }
        },
        visualMap: {
            show: false,
            dimension: 0,
            pieces: [
                {
                    lte: 6,
                    color: 'orange'
                }, {
                    gt: 6,
                    lte: 8,
                    color: 'red'
                }, {
                    gt: 8,
                    lte: 14,
                    color: '#4FA4D0'
                }, {
                    gt: 14,
                    lte: 17,
                    color: 'red'
                }, {
                    gt: 17,
                    color: 'green'
                }
            ]
        },
        series: [
            {
                name: '故障率',
                type: 'line',
                smooth: true,
                // prettier-ignore
                data: fifteenData,
                markArea: {
                    itemStyle: {
                        color: 'rgba(255, 173, 177, 0.4)'
                    }
                }
            }
        ]
    };
    // Option 50天 ---------------------------------------------------------------
    var option7 = {
        grid: {
            left: '12%',
            top: '5%',
            bottom: '20%',
            right: '5%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: thirtyDate,
            axisLabel: {
                textStyle: {
                    color: 'white'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                textStyle: {
                    color: 'white'
                },
                formatter: '{value} %'
            },
            axisPointer: {
                snap: true
            }
        },
        visualMap: {
            show: false,
            dimension: 0,
            pieces: [
                {
                    lte: 6,
                    color: 'orange'
                }, {
                    gt: 6,
                    lte: 8,
                    color: 'red'
                }, {
                    gt: 8,
                    lte: 14,
                    color: '#4FA4D0'
                }, {
                    gt: 14,
                    lte: 17,
                    color: 'red'
                }, {
                    gt: 17,
                    color: 'green'
                }
            ]
        },
        series: [
            {
                name: '故障率',
                type: 'line',
                smooth: true,
                // prettier-ignore
                data: thirtyData,
                markArea: {
                    itemStyle: {
                        color: 'rgba(255, 173, 177, 0.4)'
                    }
                }
            }
        ]
    };
    option5 && myChart5.setOption(option5);
    option6 && myChart6.setOption(option6);
    option7 && myChart7.setOption(option7);

    $(window).resize(myChart7.resize);
    $(window).resize(myChart5.resize);
    $(window).resize(myChart6.resize);
}
