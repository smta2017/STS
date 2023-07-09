var selectedOptionsRole = "";

function getAllRoles() {
  var allRoles = document.querySelector('#position');
  document.getElementById("gif").style.display ="block"
  fetch(`${domainName}/sts/role/all`, {
  method: 'GET',
  headers: {'Authorization': token},
  })
    .then(response => response.json())
    .then(data => {
      allRoles.innerHTML = "";
      const chooseOption = document.createElement('option');
      chooseOption.value = "-1";
      chooseOption.disabled = true;
      chooseOption.selected = true;
      chooseOption.textContent = "Choose position";
      allRoles.appendChild(chooseOption);
      data.data.forEach(roles => {
        const option = document.createElement('option');
        option.id = roles._id;
        option.value = roles._id;
        option.textContent = roles.role;
        allRoles.appendChild(option);
      });
      document.getElementById("gif").style.display = "none";
    })
    .catch(error => {
      console.log(error);
      document.getElementById("gif").style.display = "none";
    }); 
}

getAllRoles();

document.getElementById("position").addEventListener("change", function() {
selectedOptionsRole = this.value;
  console.log(selectedOptionsRole);
});

var selectBox = document.getElementById('callingCodeForEmployee');
var countries = window.intlTelInputGlobals.getCountryData();
for (var country of countries) {
  const option = document.createElement('option');
  option.value = country.iso2;
  option.textContent = `${country.name} (+${country.dialCode})`;
  selectBox.append(option);
}

function addEmployee(e) {
  e.preventDefault();
  // if (!this.checkValidity()) {
  //   this.classList.add("was-validated");
  //   return;
  // } bellagogo832011@gmail.com   gogobella201183@gmail.com
  var country = document.getElementById('callingCodeForEmployee').value;
  
  var selectOption = document.querySelector(`option[value='${country}']`);
  var CountryCode = selectOption.textContent.split(' ').pop().match(/\d+/g).join('');

  const formData = {
    firstName: document.getElementById("firstNameForEmployee").value,
    lastName: document.getElementById("lastNameForEmployee").value,
    mobileNumber: document.getElementById("mobileNumbeForEmployee").value,
    countryCallingCode: `+${CountryCode}`,
    email: document.getElementById("EmailForEmployee").value,
    role: selectedOptionsRole
  };


  if (formData.firstName && formData.lastName && formData.countryCallingCode && formData.mobileNumber && formData.email && selectedOptionsRole.length > 0) {

    try {
      document.getElementById("gif").style.display ="block"
      fetch(`${domainName}/sts/user/employee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" , 'Authorization': token},
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then((response) => {
        if (response.apiStatus == true) {
          console.log("Employee added successfully");
          document.getElementById("firstNameForEmployee").value = "";
          document.getElementById("lastNameForEmployee").value = "";
          document.getElementById("mobileNumbeForEmployee").value = "";
          document.getElementById("callingCodeForEmployee").value = "";
          document.getElementById("EmailForEmployee").value = "";
          document.getElementById("position").selectedIndex = -1;
          
          getAllRoles();
        } else {
          throw new Error("Request failed.");
        }
        document.getElementById("gif").style.display = "none";
        responseAlert(response);
      })
      .catch(error => {
        console.log(error);
        document.getElementById("gif").style.display = "none";
        responseAlert(error);
      }); 
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Your fields are empty. Please fill them.");
  }
}