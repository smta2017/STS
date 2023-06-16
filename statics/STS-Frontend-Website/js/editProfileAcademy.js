function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
}

function setCookie(name, value) {
  document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; path=/';
}


var token; 
var headers = new Headers(); 
token = getCookie('token'); 
headers.append('Authorization', token); 
headers.append('Content-Type', "application/json");


function editProfile() { 
    document.getElementById("editFirstNameForAcademy").value = getCookie('firstName'); 
    console.log(getCookie('firstName')); 
    document.getElementById("editLastNameForAcademy").value = getCookie('lastName'); 
    console.log(getCookie('lastName')); 
    // document.getElementById("schoolName").value = localStorage.getItem('schoolName'); 
    // console.log(localStorage.getItem('schoolName')); 
    // document.getElementById("buldingNumber").value = localStorage.getItem('buldingNumber'); 
    // console.log(localStorage.getItem('buldingNumber')); 
    // document.getElementById("Address").value = localStorage.getItem('Address'); 
    // console.log(localStorage.getItem('Address')); 
    // document.getElementById("City").value = localStorage.getItem('City'); 
    // console.log(localStorage.getItem('City')); 
    // document.getElementById("State").value = localStorage.getItem('State'); 
    // console.log(localStorage.getItem('State')); 
    // document.getElementById("Postal").value = localStorage.getItem('Postal'); 
    // console.log(localStorage.getItem('Postal')); 
} 
 
function profileModified(e) { 
    e.preventDefault(); 
    
    const formEditProfile = {
        academy: {
            schoolLocation: {
                blockNum: document.getElementById("buldingNumber").value ? document.getElementById("buldingNumber").value : undefined,
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
            countryCallingCode: document.getElementById("callingCodeForAcademy").value ? document.getElementById("callingCodeForAcademy").value : undefined,
            mobileNumber: document.getElementById("editMobileNumbeForAcademy").value ? document.getElementById("editMobileNumbeForAcademy").value : undefined,
            email: document.getElementById("editEmailForAcademy").value ? document.getElementById("editEmailForAcademy").value : undefined,
            password: document.getElementById("newPasswordForUsre").value ? document.getElementById("newPasswordForUsre").value : undefined,
        },
        oldPassword: document.getElementById("editOldPasswordForUser").value ? document.getElementById("editOldPasswordForUser").value : undefined,
    };
    console.log(document.getElementById("editMobileNumbeForAcademy").value);
    console.log(formEditProfile); 
    console.log(JSON.stringify(formEditProfile)); 
    try {
        fetch(`${domainName}/sts/user`, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(formEditProfile)          
        })
          .then(response => response.json())
          .then((data) => {
            console.log(response.json());

            if (data.apiMessage && data.apiMessage.includes('no password to log you in')) {
              alert('There is no password to log you in. Please enter your password.');
            } else {
              // console.log('Congrats, your profile updated successfully');

              setCookie('firstName', document.getElementById("editFirstNameForAcademy").value); 
              setCookie('lastName', document.getElementById("editLastNameForAcademy").value); 
            
              document.getElementById("callingCodeForAcademy").value = ""; 
              document.getElementById("editMobileNumbeForAcademy").value = ""; 
              document.getElementById("editEmailForAcademy").value = ""; 
              document.getElementById("editOldPasswordForUser").value = ""; 
              document.getElementById("newPasswordForUsre").value = "";  
              document.getElementById("buldingNumber").value = "";  
              document.getElementById("Address").value = "";  
              document.getElementById("City").value = "";   
              document.getElementById("State").value = "";   
              document.getElementById("Postal").value = "";  
              document.getElementById("schoolName").value = "";  
            }
          })
          .catch((error) => {
            if (error.message.includes('400')) {
              alert('There was a bad request. Please check your input and try again.');
            } else {
              alert('There was an error updating your profile. Please try again later.');
            }
          });
      } catch (error) {
        console.log(error);
      }
} 