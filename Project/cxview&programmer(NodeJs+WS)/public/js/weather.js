var app = new Vue({
    el: ".weather",
    data: {
        city: '上海',
        temp: '未知',
        type: '未知',
        date:'',
        time:'',
        imgArr:[
            "./icon/多云.svg",
            "./icon/晴天.svg",
            "./icon/小雨.svg",
            "./icon/霾.svg",
            "./icon/阴天.svg",
            "./icon/中雨.svg",
            "./icon/大雨.svg",
        ],
        index: 0,
    },
    methods: {
        formatWeather(){
            var that = this;
            axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" + this.city)
                .then(function (response) {
                    if (response) {
                        // console.log(response);
                        var newWendu = response.data.data.wendu;
                        that.temp = newWendu;
                        that.type = response.data.data.forecast[0].type;
                        switch(that.type){
                            case "多云":that.index = 0; break;
                            case "晴":that.index = 1;   break;
                            case "小雨":that.index = 2; break; 
                            case "霾":that.index = 3;   break;
                            case "阴":that.index = 4;   break;
                            case "中雨":that.index = 5; break;
                            case "大雨":that.index = 6; break;
                        }
                    } 
                }, function (err) {
                    console.log(err);
                })
        },
        formatDate(){
            let yy = new Date().getFullYear();
            let mm = new Date().getMonth() + 1;
            let dd = new Date().getDate();
            let hh = new Date().getHours();
            let mf = new Date().getMinutes() < 10
                ? '0' + new Date().getMinutes()
                : new Date().getMinutes();
            let ss = new Date().getSeconds() < 10
                ? '0' + new Date().getSeconds()
                : new Date().getSeconds();

            this.date = yy+'/'+mm+'/'+dd;
            this.time = hh+':'+mf+':'+ss;
        },


        getCurrentTime:function(){
            setInterval(this.formatDate,1000);
        },
        getWeather: function () {
            setInterval(this.formatWeather,1000);
        },
    },


    //主动触发事件
    mounted: function () {
        this.getWeather();
        this.getCurrentTime();
    }
})
