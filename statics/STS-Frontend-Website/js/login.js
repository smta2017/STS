let loginEmail = document.getElementById("loginEmail")
let mobileNumber = document.getElementById("mobileNumber")
var fromApiBody;

// create a cookie with expiration time of 1 hour
function setCookie(name, value, hours) {
    const d = new Date();
    d.setTime(d.getTime() + (hours * 60 * 60 * 1000)); // expires after specified number of hours
    const expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires ;
}

loginEmail.addEventListener("focus" , () => {
    document.getElementById("mobileNumberDiv").style.cssText  = "display : none !important"
})
loginEmail.addEventListener("blur" , () => {
    if(loginEmail.value != ""){
        document.getElementById("mobileNumberDiv").style.cssText  = "display : none !important"
        // fromApiBody = {
            // email: document.getElementById("loginEmail").value,
            // password: document.getElementById("loginPassword").value,
            // lifeTime: document.getElementById("rememberMe").checked
        // }
    }else{
        document.getElementById("mobileNumberDiv").style.cssText  = "display : block !important"
    }
})


mobileNumber.addEventListener("focus" , () => {
    document.getElementById("loginEmailDiv").style.cssText  = "display : none !important"
})
mobileNumber.addEventListener("blur" , () => {
    if(mobileNumber.value != ""){
        document.getElementById("loginEmailDiv").style.cssText  = "display : none !important"
        // fromApiBody = {
        //     mobileNumber: document.getElementById("mobileNumber").value,
        //     countryCallingCode: document.getElementById("callingCode").value,
        //     password: document.getElementById("loginPassword").value,
        //     lifeTime: document.getElementById("rememberMe").checked
        // }
    }else{
        document.getElementById("loginEmailDiv").style.cssText  = "display : block !important"
    }
})


document.getElementById("formToLogin").addEventListener("submit", function (e) {
    e.preventDefault();
            fromApiBody = {
            email: document.getElementById("loginEmail").value == "" ? undefined : document.getElementById("loginEmail").value,
            mobileNumber: document.getElementById("mobileNumber").value == "" ? undefined : document.getElementById("mobileNumber").value ,
            countryCallingCode: document.getElementById("callingCode").value == "" ? undefined : document.getElementById("callingCode").value,
            password: document.getElementById("loginPassword").value,
            lifeTime: document.getElementById("rememberMe").checked
            }
        document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/user/login`, {
        method: 'POST',
        body: JSON.stringify(fromApiBody),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            responseAlert(data)
            if(data.data.isAdmin){
                token = data.data.token
                setCookie('token', data.data.token, 1); // expires after 1 hour
                setCookie('admin', "true", 1); // expires after 1 hour
            }
            if(data.data.isRuler){
                token = data.data.token
                setCookie('token', data.data.token, 1); // expires after 1 hour
                setCookie('ruler', "true", 1); // expires after 1 hour
            }else{
                if(data.apiStatus){
                    token = data.data.token
                    setCookie('token', data.data.token, 1); // expires after 1 hour
                }

            }
            if (document.getElementById("rememberMe").checked) { // لو عامل هنا مش هيتمسح ابدا 
                token = data.data.token
                setCookie('email', document.getElementById("loginEmail").value); // expires after 1 hour
                setCookie('mobileNumber', document.getElementById("mobileNumber").value); // expires after 1 hour
                setCookie('firstName', data.data.user.firstName); // expires after 1 hour
                setCookie('lastName', data.data.user.lastName); // expires after 1 hour
                setCookie('token', data.data.token); // expires after 1 hour
                if(data.data.isAdmin){
                    setCookie('admin', "true");
                }
                if(data.data.isRuler){
                    setCookie('ruler', "true"); 
                }
                // document.getElementById("loginEmail").value = localStorage.getItem('email');
                // document.getElementById("loginPassword").value = localStorage.getItem('password');

                // if (document.getElementById("admin").checked) {
                //     localStorage.setItem('admin', data.data.user.firstName + " " + data.data.user.lastName);
                // }

                // if (document.getElementById("ruler").checked) {
                //     localStorage.setItem('ruler', data.data.user.firstName + " " + data.data.user.lastName);
                // }
                }
            // expiration date هنفزها بعد ساعة تمسح token  وكل حاجة زى logout لو مش عامل  remember me 
            // time.now + ساعة
            // الى عملناه فوق expiration date هو نفسه واخد  localStorage  فى  experation date اسمه key ونسجل 
            
            window.location.hash = "";
            window.location.reload();
        })
        .catch(error => console.log(error));
        document.getElementById("gif").style.display ="none"

        // .catch(error => console.log('Error:', error));
});
