document.addEventListener('DOMContentLoaded', function() {
  var sidebarCollapse = document.querySelector('#sidebarCollapse');
  var sidebar = document.querySelector('#sidebar');
  sidebarCollapse.addEventListener('click', function() {
      sidebar.classList.toggle('active');
  });
});

function getCookie(name) {
const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
return cookieValue ? cookieValue.pop() : null;
}


function editProfile() { 
  document.getElementById("editFirstNameForAdmin").value = getCookie('firstName'); 
  document.getElementById("editLastNameForAdmin").value = getCookie('lastName'); 
} 

// function setCookie(name, value) {
// document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; path=/';
// }

var selectBox = document.getElementById('callingCodeForMyProfile');
var countries = window.intlTelInputGlobals.getCountryData();
for (var country of countries) {
  const option = document.createElement('option');
  option.value = country.iso2;
  option.textContent = `${country.name} (+${country.dialCode})`;
  selectBox.append(option);
}

function profileModified(e) { 
  e.preventDefault(); 
  
  var country = document.getElementById('callingCodeForMyProfile').value;
  
  var selectOption = document.querySelector(`option[value='${country}']`);
  var CountryCode = selectOption.textContent.split(' ').pop().match(/\d+/g).join('');


  const formEditProfile = {
    user: {
      firstName: document.getElementById("editFirstNameForAdmin").value ? document.getElementById("editFirstNameForAdmin").value : undefined,
      lastName: document.getElementById("editLastNameForAdmin").value ? document.getElementById("editLastNameForAdmin").value : undefined,
      countryCallingCode: `+${CountryCode}` ? `+${CountryCode}` : undefined,
      mobileNumber: document.getElementById("editMobileNumbeForAdmin").value ? document.getElementById("editMobileNumbeForAdmin").value : undefined,
      email: document.getElementById("editEmailForAdmin").value ? document.getElementById("editEmailForAdmin").value : undefined,
      password: document.getElementById("newPassword").value ? document.getElementById("newPassword").value : undefined,
    },
    oldPassword: document.getElementById("editOldPassword").value ? document.getElementById("editOldPassword").value : undefined,
  };
  console.log(document.getElementById("editMobileNumbeForAdmin").value);
  console.log(formEditProfile); 
  console.log(JSON.stringify(formEditProfile)); 
  try {
    document.getElementById("gif").style.display ="block"
      fetch(`${domainName}/sts/user`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" , 'Authorization': token},
        body: JSON.stringify(formEditProfile)          
      })
        .then(response => response.json())
        .then((data) => {
          if (data.apiMessage && data.apiMessage.includes('no password to log you in')) {
            alert('There is no password to log you in. Please enter your password.');
          } else {
            console.log('Congrats, you updated the profile data successfully');
            setCookie('firstName', document.getElementById("editFirstNameForAdmin").value); 
            setCookie('lastName', document.getElementById("editLastNameForAdmin").value); 
          
            document.getElementById("callingCodeForEmployee").value = ""; 
            document.getElementById("editMobileNumbeForAdmin").value = ""; 
            document.getElementById("editEmailForAdmin").value = ""; 
            document.getElementById("editOldPassword").value = ""; 
            document.getElementById("newPassword").value = "";             
          }
          document.getElementById("gif").style.display = "none";
          responseAlert(data);
        })
        .catch((error) => {
          if (error.message.includes('400')) {
            alert('There was a bad request. Please check your input and try again.');
          } else {
            console.log('There was an error updating your profile. Please try again later.');
          }
          document.getElementById("gif").style.display = "none";
          responseAlert(error);
        });
    } catch (error) {
      console.log(error);
    }
} 

//////////////////////////////////////////////////////////////////////

var selectedOptions = [];

function getAllTabs() {
  var allTabs = document.querySelector('#rules');
  document.getElementById("gif").style.display ="block"
  fetch(`${domainName}/sts/role/tabs`, {
    method: 'GET',
    headers: {'Authorization': token},
  })
    .then(response => response.json())
    .then(data => {
      allTabs.innerHTML = "";
      const chooseOption = document.createElement('option');
      chooseOption.value = "-1";
      chooseOption.disabled = true;
      chooseOption.textContent = "Choose Rules";
      allTabs.appendChild(chooseOption);
      data.data.forEach(tabs => {
        const option = document.createElement('option');
        option.id = tabs._id;
        option.value = tabs._id;
        option.textContent = tabs.tabName;
        allTabs.appendChild(option);
      });
      document.getElementById("gif").style.display = "none";
    })
    .catch(error => {
      console.log(error);
      document.getElementById("gif").style.display = "none";
    }); 
}

getAllTabs();

document.getElementById("rules").addEventListener("change", function() {
  selectedOptions = Array.from(this.selectedOptions).map(option => option.value);
  console.log(selectedOptions);
});

document.getElementById("positionAdding").addEventListener("input", function() {
console.log(this.value);
});

document.getElementById("addPositionForm").addEventListener("submit", function (e) {
  e.preventDefault();
  if (!this.checkValidity()) {
    this.classList.add("was-validated");
    return;
  }

  const formData = {
    role: document.getElementById("positionAdding").value,
    tabs: selectedOptions,
  };

  if (formData.role && selectedOptions.length > 0) {
    try {
      document.getElementById("gif").style.display ="block"
      fetch(`${domainName}/sts/role`, {
        method: "POST",
        headers: { "Content-Type": "application/json" , 'Authorization': token},
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then((response) => {
          if (response.apiStatus == true) {
            console.log("Position added successfully");
            document.getElementById("positionAdding").value = "";
            document.getElementById("rules").selectedIndex = -1;

            getAllTabs();
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
    console.log("Role and/or tabs fields are empty. Please fill them.");
  }
});


//////////////////////////////////////////////////////////////////////


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


document.getElementById("addEmployeeForm").addEventListener("submit", function (e) {
e.preventDefault();
if (!this.checkValidity()) {
  this.classList.add("was-validated");
  return;
}

const formData = {
  firstName: document.getElementById("firstNameForEmployee").value,
  lastName: document.getElementById("lastNameForEmployee").value,
  mobileNumber: document.getElementById("mobileNumbeForEmployee").value,
  countryCallingCode: document.getElementById("callingCodeForEmployee").value,
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
        document.getElementById("position").selectedIndex = 0;
        
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
});
