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
        if (data.status == 0) {
            alert('登录成功')
            // 存储 token
            var new_token = data.token;
            window.localStorage.setItem('token',data.token);
            // 客户端再次发起请求
            // 通过请求头的Authorization字段将token发送给服务器
            $.get(my_ip + "/admin",{
              Authorization: new_token,
            },(data) => {
              console.log(data);
            })
            // 页面跳转
            // window.location.href = 'http://10.110.133.212:8000/homePage.html'
        } else {
            alert('错误的用户信息')
        }
    })
})

//TODO: 注册按钮事件和方法
