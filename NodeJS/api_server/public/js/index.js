const my_ip = 'http://10.110.133.212:8000'
// 登录按钮事件和方法
function loginBtn(){
    var new_account = document.getElementById('accInfo').value;
    var new_password = document.getElementById('passInfo').value;
    // 发送请求
    $.post(my_ip + "/api/login", {
        username: new_account,
        password: new_password
    }, (data, status) => {
        if (data.status == 0) {
            alert('登录成功')
            // $.ajax({
            //     url: my_ip + "/admin/homePage",
            //     method: "GET",
            //     Headers: {
            //         'Content-Type':'application/json;charset = utf8',
            //         'Authorization': data.token
            //     }
            //  },(data,status) =>{
            //      console.log(data);
            //  })
            $.get(my_ip + '/admin/homePage',{
                Headers:data.token
            })
            //  location.href = 'http://10.110.133.212:8000/public/test.html'
             location.href = 'http://10.110.133.212:8000/homePage.html'
        } else {
            alert('错误的用户信息')
        }
    })
}
// 绑定登录事件到回车
document.addEventListener('keyup',(e)=>{
    if(e.keyCode == 13){
        loginBtn();
    }
})
// 绑定登录事件到登录按钮
$('#logBtn').click(() =>{
    loginBtn();
})