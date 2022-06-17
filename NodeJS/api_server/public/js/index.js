const my_ip = 'http://10.110.133.212:8000'
// 登录按钮事件和方法
$('#logBtn').click(() => {
    var new_account = document.getElementById('accInfo').value;
    var new_password = document.getElementById('passInfo').value;
    // 发送请求
    $.post(my_ip + "/api/login", {
        username: new_account,
        password: new_password
    }, (data, status) => {
        console.log(data);
        if (data.status == 0) {
            alert('登录成功')
            // 存储 token
            var new_token = data.token;
            window.localStorage.setItem("token",new_token);
            // 客户端再次发起请求
            // 通过请求头的Authorization字段将token发送给/admin
            // $.ajax({
            //     url: my_ip + "/admin/homePage",
            //     method: "GET",
            //     headers: {Authorization: new_token},
            //     success:(data,status) =>{
            //         console.log(data.status);
            //         if(data.status == 200 && new_token == window.localStorage.getItem("token") ){
            //         // 页面跳转
            //         location.href = 'http://10.110.133.212:8000/homePage.html'
            //         }else{
            //             console.log(status);
            //         }
            //     }
            //  })
        } else {
            alert('错误的用户信息')
        }
    }),
    // $.get(my_ip + "/admin/homePage", {
    //     // authorization: window.localStorage.getItem("token")
    //     }, (data, status) => {
    //         if (data.status == 200) {
    //         location.href = 'http://10.110.133.212:8000/homePage.html'
    //     } else {
    //         console.log(data);
    //     }
    // })
    // location.href = 'http://10.110.133.212:8000/homePage.html'
    $.ajax({
        url: my_ip + "/admin/homePage",
        method: "GET",
        headers: {Authorization: window.localStorage.getItem("token")},
        success:(data,status) =>{
            if(data.status == 200){
                console.log(data);
                // location.href = 'http://10.110.133.212:8000/homePage.html'
            }else{
                console.log(data);
            }
        }
    })
    
})

//TODO: 注册按钮事件和方法
