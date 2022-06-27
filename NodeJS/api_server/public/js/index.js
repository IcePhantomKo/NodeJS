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
            // window.localStorage.setItem('token',data.token)
            $.ajax({
                url: my_ip + '/admin/homePage',
                type: "post",
                contentType: "application/json",
                // dataType: 'json',
                cache: true,
                async: false,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader("Authorization", data.token);
                },
                success: function (result) {
                    if(result.status == 1){
                        location.href = 'http://10.110.133.212:8000/homePage.html'
                    }else{
                        alert(result.message)
                    }   
                }
            })       
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


// var ajax1 = function(){
//     $.ajax({
//         type:'post',
//         url: my_ip + '/api/login',
//         data:{
//             username: new_account,
//             password: new_password
//         },
//         success:(res) =>{
//             if(res.status == 0){
//                 alert('登录成功')
//                 window.localStorage.setItem('token',res.token)
//             }
//         }
//     })
// }

// function ajax2() {
//     alert(window.localStorage.getItem('token'))
//     $.ajax({
//         url: my_ip + '/admin/homePage',
//         type: "post",
//         contentType: "application/json",
//         dataType: 'json',
//         cache: false,
//         async: true,
//         beforeSend: function (XMLHttpRequest) {
//             XMLHttpRequest.setRequestHeader("token", localStorage.token);
//         },
//         success: function (result) {
//             if (result.status === 0) {
//                 window.location.href = "homePage.html";
//             } else {
//                 alert(result.message)
//             }
//         }
//     });
// }