$('#loginError').css('display','none')

$('#submit').on('click',()=>{
    $('#loginError').css('display','none')
const userName=$('#username').val();
const password=$('#password').val();

if($.trim(userName)!="" && $.trim(password)!=""){
    let data={
        userName,password
    }
axios.post("http://localhost:3000/login",data).then((result)=>{
    console.log(result.data.token)
    if(result.status==200){
        sessionStorage.setItem('token',result.data.token);
        location.href="./profile.html"
    }
},
(err)=>{
    console.log(err.response)
    $('#loginError').html(err.response.data.message)
    $('#loginError').css('display','block')
})
}else{
    $('#loginError').html('Username and Password should not empty')
    $('#loginError').css('display','block')
}
});