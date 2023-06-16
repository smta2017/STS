// next button
document.querySelectorAll('.next').forEach((button) => {

    button.addEventListener('click', function (event) {
        document.querySelector(`#${event.target.parentElement.parentElement.parentElement.nextElementSibling.id + "-tab"}`).click()
    })
})
// previous button
document.querySelectorAll('.previous').forEach((button) => {

    button.addEventListener('click', function (event) {
        document.querySelector(`#${event.target.parentElement.parentElement.parentElement.previousElementSibling.id + "-tab"}`).click()
    })
})

//form validation styles Bootstrap
// Fetch all the forms we want to apply custom Bootstrap validation styles to
var forms = document.querySelectorAll('.needs-validation')

// Loop over them and prevent submission
Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }

        form.classList.add('was-validated')
    }, false)
})

//not aplay to press space
document.addEventListener("keydown", function (e) {
    if (e.key == " " && e.target.id == "firstName"
        || e.key == " " && e.target.id == "lastName"
        || e.key == " " && e.target.id == "Email") {
        e.preventDefault();
    }
});

var selectedOptionsCountry = "";

function getAllCountries() {
    var allCountry = document.querySelector('#selectBox');
    fetch(`${domainName}/sts/country/all`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
        .then(response => response.json())
        .then(data => {
            allCountry.innerHTML = "";
            const chooseOption = document.createElement('option');
            chooseOption.value = "-1";
            chooseOption.disabled = true;
            chooseOption.selected = true;
            chooseOption.textContent = "Select Country";
            allCountry.appendChild(chooseOption);
            data.data.forEach(countries => {
                const option = document.createElement('option');
                option.id = countries._id;
                option.value = countries._id;
                option.textContent = countries.countryName;
                allCountry.appendChild(option);
            });
        })
        .catch(error => console.log(error));
}

getAllCountries();


//check if password the same
document.forms[0].onsubmit = function (e) {
    let password = document.getElementById("password").value;
    let repeatPassword = document.getElementById("repeatpassword").value;
    console.log(password)
    console.log(repeatpassword)
    if (password != repeatPassword) {
        e.preventDefault()
        alert("not same password")
    }

}


document.getElementById("formSignUp").onsubmit = function (e) {
    e.preventDefault();
    let data = {
        schoolLocation: {
            blockNum: document.getElementById("buldingNumber").value,
            street: document.getElementById("Address").value,
            cityOrTown: document.getElementById("City").value,
            provinceOrState: document.getElementById("State").value,
            postalCode: document.getElementById("Postal").value
        },
        owner: {
            role: "6480d5701c02f26cd6668987",
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            mobileNumber: document.getElementById("mobileNumber").value,
            countryCallingCode: document.getElementById("callingCode").value,
            email: document.getElementById("Email").value,
            password: document.getElementById("password").value
        },
        schoolName: document.getElementById("schoolName").value,
        country: document.getElementById("selectBox").value
    }

    let dataAfterStringify = JSON.stringify(data);
    // console.log(dataAfterStringify);

    try {
        // alert("start form");
        e.preventDefault();
        // console.log(dataAfterStringify);
        fetch(`${domainName}/sts/user`,
            {
                method: 'POST',
                body: dataAfterStringify,
                headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then(data => {
                responseAlert(data)
                if (data.apiStatus == true) {
                    window.location.hash = "#login";
                }
            })
    } catch (eror) {
        console.log(eror);
    }
}

