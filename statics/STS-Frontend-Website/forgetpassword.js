// document.getElementById("password").addEventListener('change',confirmPasswordValidation)
var token=document.getElementById('hello').value
console.log(token)
document.getElementById('hello').remove()
document.getElementById('newPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();  // prevent the default action
    var password = document.getElementById("password").value;  // get the new password value
    var confirmPassword = document.getElementById('confirmPassword').value;
     // get the confirm password value
    const formEditProfile = {
        password ,
        confirmPassword
    }
    debugger
    console.log(JSON.stringify(formEditProfile))
    fetch(`https://sts-5s7p.onrender.com/sts/user/changepassword`, {
method: "PUT",
headers: { "Content-Type": "application/json", 'Authorization': token },
body: JSON.stringify(formEditProfile),
})
// .then(res=>{
//     console.log(typeof res)
//     if(!res.ok){
//    return res.json()}}).then(res=>{
//     console.log(res)
// // if(res){document.querySelector('.signupSection').innerHTML=`<h1 style="background-color:${res.apiStatus?'rgb(10, 180, 81)':'rgb(204, 3, 3)'} ;">${res.apiMessage}</h1>`
// // }
// })
});
var alertRedInput = "#8C1010";
var defaultInput = "rgba(10, 180, 180, 1)";

function passwordValidation() {
    var password = document.getElementById("password")
    const passReg = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    console.log(password.value.match(passReg))
    if(!password.value.match(passReg)){
        password.setCustomValidity('your password must have at least 8 characters contains a capital character and small character and number and any other special symbol ')
        password.style.borderColor = alertRedInput;
    }else{
        password.setCustomValidity('')
        password.style.borderColor = defaultInput;
    }
}
function confirmPasswordValidation(){
    var confirmPassword = document.getElementById('confirmPassword')
    console.log(document.getElementById('password').value==confirmPassword.value,document.getElementById('password').value,confirmPassword.value)
    if(document.getElementById('password').value==confirmPassword.value){
        confirmPassword.setCustomValidity('')
        confirmPassword.style.borderColor = defaultInput;
    }else{
        confirmPassword.setCustomValidity('this field must match the password field')
        confirmPassword.style.borderColor = alertRedInput;
    }
}