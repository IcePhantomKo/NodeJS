function MostNonFatalErrorType(data){
  var myChart12 = echarts.init(document.getElementById('analysis5'));
  var option12;
  option12 = {
    title:{
      text: '故障数量(一般)',
      left:'left',
      textStyle:{
        color:'#fdd805',
        fontSize:'18px',
      },
      y:'10px',
    },
    dataset: {
      source: [
        //[颜色范围,发生数量,名称]
        ['score', 'amount', 'product'],
        [data[3].COUNT,data[3].COUNT,data[3].Description],
        [data[2].COUNT,data[2].COUNT,data[2].Description],
        [data[1].COUNT,data[1].COUNT,data[1].Description],
        [data[0].COUNT,data[0].COUNT,data[0].Description],
      ]
    },
    grid: {
      left:'10%',
      right:'12%',
      top:'20%',
      bottom:'15%',
    },
    xAxis: { 
      name: '发生次数',
      axisLabel:{
        textStyle:{
          color:'white',
        }
      } 
    },
    yAxis: { 
      type: 'category',
      axisLabel:{
        textStyle:{
          color:'white',
        }
      }
    },
    visualMap: {
      orient: 'horizontal',
      left: 'center',
      min: 0,
      max: data[0].COUNT,
      text: ['高', '低'],
      textStyle:{
        color:'white'
      },
      // Map the score column to color
      dimension: 0,
      inRange: {
        color: ['#65B581', '#FFCE34', '#FD665F']
      }
    },
    series: [
      {
        label:{
          show:true,
          position:'right',
          textStyle:{
            color:'white',
          }
        },
        type: 'bar',
        encode: {
          // Map the "amount" column to X axis.
          x: 'amount',
          // Map the "product" column to Y axis
          y: 'product'
        }
      }
    ]
  }

  option12 && myChart12.setOption(option12);
  $(window).resize(myChart12.resize);

}