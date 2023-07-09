function editProfile() { 
    document.getElementById("editFirstNameForAcademy").value = getCookie('firstName'); 
    document.getElementById("editLastNameForAcademy").value = getCookie('lastName'); 

} 
 
// function setCookie(name, value) {
//   document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; path=/';
// }

var selectBox = document.getElementById('callingCodeForAcademy');
var countries = window.intlTelInputGlobals.getCountryData();
for (var country of countries) {
  const option = document.createElement('option');
  option.value = country.iso2;
  option.textContent = `${country.name} (+${country.dialCode})`;
  selectBox.append(option);
}

function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
}

function profileModified(e) { 
    e.preventDefault(); 
    
    var country = document.getElementById('callingCodeForAcademy').value;
  
    var selectOption = document.querySelector(`option[value='${country}']`);
    var CountryCode = selectOption.textContent.split(' ').pop().match(/\d+/g).join('');
  
    const formEditProfile = {
        academy: {
            schoolLocation: {
                // blockNum: document.getElementById("buldingNumber").value ? document.getElementById("buldingNumber").value : undefined,
                street: document.getElementById("Address").value ? document.getElementById("Address").value : undefined,
                cityOrTown: document.getElementById("City").value ? document.getElementById("City").value : undefined,
                provinceOrState: document.getElementById("State").value ? document.getElementById("State").value : undefined,
                postalCode: document.getElementById("Postal").value ? document.getElementById("Postal").value : undefined,
            },
            schoolName: document.getElementById("schoolName").value ? document.getElementById("schoolName").value : undefined,
        },
        user: {
            firstName: document.getElementById("editFirstNameForAcademy").value ? document.getElementById("editFirstNameForAcademy").value : undefined,
            lastName: document.getElementById("editLastNameForAcademy").value ? document.getElementById("editLastNameForAcademy").value : undefined,
            countryCallingCode: `+${CountryCode}` ? `+${CountryCode}` : undefined,
            mobileNumber: document.getElementById("editMobileNumbeForAcademy").value ? document.getElementById("editMobileNumbeForAcademy").value : undefined,
            email: document.getElementById("editEmailForAcademy").value ? document.getElementById("editEmailForAcademy").value : undefined,
            password: document.getElementById("newPasswordForUsre").value ? document.getElementById("newPasswordForUsre").value : undefined,
        },
        oldPassword: document.getElementById("editOldPasswordForUser").value ? document.getElementById("editOldPasswordForUser").value : undefined,
    };
    // console.log(document.getElementById("editMobileNumbeForAcademy").value);
    // console.log(formEditProfile); 
    // console.log(JSON.stringify(formEditProfile)); 
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
            
              console.log('Congrats, your profile updated successfully');

            setCookie('firstName', document.getElementById("editFirstNameForAcademy").value); 
            setCookie('lastName', document.getElementById("editLastNameForAcademy").value); 
            
              document.getElementById("callingCodeForAcademy").value = ""; 
              document.getElementById("editMobileNumbeForAcademy").value = ""; 
              document.getElementById("editEmailForAcademy").value = ""; 
              document.getElementById("editOldPasswordForUser").value = ""; 
              document.getElementById("newPasswordForUsre").value = "";  
              // document.getElementById("buldingNumber").value = "";  
              document.getElementById("Address").value = "";  
              document.getElementById("City").value = "";   
              document.getElementById("State").value = "";   
              document.getElementById("Postal").value = "";  
              document.getElementById("schoolName").value = "";  
            }
            document.getElementById("gif").style.display ="none"
            responseAlert(data);
          })
          .catch((error) => {
            if (error.message.includes('400')) {
              alert('There was a bad request. Please check your input and try again.');
            } else {
              console.log(error);
            }
            document.getElementById("gif").style.display ="none"
            responseAlert(error);
          });
      } catch (error) {
        console.log(error);
      }
}