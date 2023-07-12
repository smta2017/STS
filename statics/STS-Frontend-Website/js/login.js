var loginEmail = document.getElementById("loginEmail")
var mobileNumber = document.getElementById("mobileNumber")
var fromApiBody;

// create a cookie with expiration time of 1 hour


loginEmail.addEventListener("focus", () => {
    document.getElementById("mobileNumberDiv").style.cssText = "display : none !important"
})
loginEmail.addEventListener("blur", () => {
    if (loginEmail.value != "") {
        document.getElementById("mobileNumberDiv").style.cssText = "display : none !important"
        // fromApiBody = {
        // email: document.getElementById("loginEmail").value,
        // password: document.getElementById("loginPassword").value,
        // lifeTime: document.getElementById("rememberMe").checked
        // }
    } else {
        document.getElementById("mobileNumberDiv").style.cssText = "display : block !important"
    }
})


mobileNumber.addEventListener("focus", () => {
    document.getElementById("loginEmailDiv").style.cssText = "display : none !important"
})
mobileNumber.addEventListener("blur", () => {
    if (mobileNumber.value != "") {
        document.getElementById("loginEmailDiv").style.cssText = "display : none !important"
        // fromApiBody = {
        //     mobileNumber: document.getElementById("mobileNumber").value,
        //     countryCallingCode: document.getElementById("callingCode").value,
        //     password: document.getElementById("loginPassword").value,
        //     lifeTime: document.getElementById("rememberMe").checked
        // }
    } else {
        document.getElementById("loginEmailDiv").style.cssText = "display : block !important"
    }
})

var selectBox = document.getElementById('callingCode');
var countries = window.intlTelInputGlobals.getCountryData();
for (var country of countries) {
    const option = document.createElement('option');
    option.value = country.iso2;
    option.textContent = `${country.name} (+${country.dialCode})`;
    selectBox.append(option);
}

document.getElementById("formToLogin").addEventListener("submit", function (e) {
    e.preventDefault();

    var country = document.getElementById('callingCode').value;

    var selectOption = document.querySelector(`option[value='${country}']`);
    var CountryCode = selectOption.textContent.split(' ').pop().match(/\d+/g).join('');

    fromApiBody = {
        email: document.getElementById("loginEmail").value == "" ? undefined : document.getElementById("loginEmail").value,
        mobileNumber: document.getElementById("mobileNumber").value == "" ? undefined : document.getElementById("mobileNumber").value,
        countryCallingCode: `+${CountryCode}` == "" ? undefined : `+${CountryCode}`,
        password: document.getElementById("loginPassword").value,
        lifeTime: document.getElementById("rememberMe").checked
    }
    document.getElementById("gif").style.display = "block"
    fetch(`${domainName}/sts/user/login`, {
        method: 'POST',
        body: JSON.stringify(fromApiBody),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
       .then(data => {
    if (!document.getElementById("rememberMe").checked) {
        const d = new Date();
        d.setTime(d.getTime() + (60 * 60 * 1000)); // expires after specified number of hours
        const expires = "expires=" + d.toUTCString();
        document.cookie = "expirationDate=" + expires + ";" + expires;
    }
    if (data.apiStatus) {
        if (data.data.isAdmin) {
            setCookie('admin', "true"); // expires after 1 hour
            // setCookie('role', data.data.user.role._id); // expires after 1 hour
        } else if (data.data.isRuler) {
            setCookie('ruler', "true", 1); // expires after 1 hour
        } else {
            setCookie('schoolName', data.data.user.academyDetails.schoolName); // expires after 1 hour
        }
        setCookie('token', data.data.token);
        setCookie('lastName', data.data.user.lastName);
        setCookie('firstName', data.data.user.firstName);
        setCookie('isOtherCountry', data.data.isOtherCountry);
        window.location.hash = "";
        window.location.reload();
    }
    document.getElementById("gif").style.display = "none";
    responseAlert(data);
})
        .catch(error => {
            console.log(error);
            document.getElementById("gif").style.display = "none";
            responseAlert(error);
        });
});



function ForgotPassword(event) {
    event.preventDefault();  // prevent the default action
    var email = document.getElementById('loginEmail').value;  // get the email value
    var emailReg = /[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|net|org|edu|gov)/;    /// email validation regex
    if (emailReg.test(email)) {  // if email is valid
        // window.open("forgetpassword.html", "_blank");
        fromApiBody = {
            email: document.getElementById("loginEmail").value,
        }

        document.getElementById("gif").style.display = "block"
        fetch(`${domainName}/sts/user/forgetpassword`, {
            method: 'POST',
            body: JSON.stringify(fromApiBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {  
            if (data.apiStatus == true) {
                console.log(data);
                document.getElementById('loginEmail').value = '';
            }
            document.getElementById("gif").style.display = "none";
            responseAlert(data);
        })
            .catch(error => {
                console.log(error);
                document.getElementById("gif").style.display = "none";
                responseAlert(error);
            });
    }
    else {  // if email is not valid
        alert("Please enter a valid email address.");  // show alert
    }
}
