 function check(){
 				if (document.myForm.email.value == "" || document.myForm.password.value == "") {
 					//alert("Please input your email and password!");
					Showbo.Msg.alert("Please input your email and password!");
 					document.myForm.reset();
 				} else if((document.myForm.email.value=="admin"&& document.myForm.password.value =="123") || (document.myForm.email.value=="lm@qq.com"&& document.myForm.password.value=="321")){
					Showbo.Msg.alert("Success");
					window.location.href = "./index.html"
					alert('登录成功')
 					document.myForm.reset();
 				}else{
                Showbo.Msg.alert("The user name or password you entered is incorrect!"); 
                 document.myForm.reset();              
             } 
  }

  $(document).ready(function(){
	$("#login").hide();
	$('#toggle-login').click(function(){
	  $('#login').toggle();
	});
	})