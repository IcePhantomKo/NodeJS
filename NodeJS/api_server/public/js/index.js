$('#logBtn').click(() =>{
    var acc = document.getElementById('accInfo').value;
    var pass = document.getElementById('passInfo').value;
    
    // 发送 post 请求
    $.ajax({
      url: "http://10.110.133.212:8000/api/login",
      type: "post",
      dataType: "json",
      data: {"username": acc, "password": pass},
      success: function (data) {
        console.log(data);
      }
    })
})
