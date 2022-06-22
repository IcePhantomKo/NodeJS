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

            $.get(my_ip + '/admin/homePage',{
                headers:{
                    Accept: "application/json; charset=utf-8",
                    authorization: data.token
                }
            }) 
            // location.href = 'http://10.110.133.212:8000/homePage.html'
            // $.ajax({
            //     type:'post',
            //     url: my_ip + '/admin/homePage',
            //     headers:{
            //         "Content-Type":"text/plain;charset=UTF-8",
            //         "Authorization":data.token
            //     }
            // })           
        }else {
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