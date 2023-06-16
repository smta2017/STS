// document.addEventListener("DOMContentLoaded", function() {
//     var sidebar = document.querySelector("#sidebar");
//     var dismiss = document.querySelector("#dismiss");
//     var overlay = document.querySelector(".overlay");
//     var sidebarCollapse = document.querySelector("#sidebarCollapse");
//     sidebar.classList.add("mCustomScrollbar");
//     sidebar.classList.add("minimal");
//     dismiss.addEventListener("click", function() {
//         sidebar.classList.remove("active");
//         overlay.classList.remove("active");
//     });
//     overlay.addEventListener("click", function() {
//         sidebar.classList.remove("active");
//         overlay.classList.remove("active");
//     });
//     sidebarCollapse.addEventListener("click", function() {
//         sidebar.classList.add("active");
//         overlay.classList.add("active");
//         var inCollapses = document.querySelectorAll(".collapse.in");
//         inCollapses.forEach(function(inCollapse) {
//         inCollapse.classList.toggle("in");
//         var expandedA = inCollapse.parentNode.querySelector(
//             'a[aria-expanded="true"]'
//         );
//         expandedA.setAttribute("aria-expanded", "false");
//         });
//     });
// });


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

var headers = new Headers(); 
var token = getCookie("token");
headers.append('Authorization', token); 
headers.append('Content-Type', "application/json");


function editProfile() { 
    document.getElementById("editFirstNameForAdmin").value = getCookie('firstName'); 
    document.getElementById("editLastNameForAdmin").value = getCookie('lastName'); 
} 
 
function profileModified(e) { 
    e.preventDefault(); 
    
    const formEditProfile = {
      user: {
        firstName: document.getElementById("editFirstNameForAdmin").value ? document.getElementById("editFirstNameForAdmin").value : undefined,
        lastName: document.getElementById("editLastNameForAdmin").value ? document.getElementById("editLastNameForAdmin").value : undefined,
        countryCallingCode: document.getElementById("callingCodeForEmployee").value ? document.getElementById("callingCodeForEmployee").value : undefined,
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
        fetch(`${domainName}/sts/user`, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(formEditProfile)          
        })
          .then(response => response.json())
          .then((data) => {
            console.log(response.json());
            console.log(data);
            if (data.apiMessage && data.apiMessage.includes('no password to log you in')) {
              alert('There is no password to log you in. Please enter your password.');
            } else {
              // console.log('Congrats, you updated the profile data successfully');
              setCookie('firstName', document.getElementById("editFirstNameForAdmin").value); 
              setCookie('lastName', document.getElementById("editLastNameForAdmin").value); 
            
              document.getElementById("callingCodeForEmployee").value = ""; 
              document.getElementById("editMobileNumbeForAdmin").value = ""; 
              document.getElementById("editEmailForAdmin").value = ""; 
              document.getElementById("editOldPassword").value = ""; 
              document.getElementById("newPassword").value = "";             
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

      
    // try { 
    //     fetch('http://localhost:5000/sts/user', { 
    //         method: 'PUT', 
    //         body: formData, 
    //         headers: headers 
    //     })
    //     .then(response => { 
    //         if (!response.ok) { 
    //             throw new Error('Request failed.'); 
    //         } 
    //         return response.json(); 
    //     }).then(data => { 
    //         console.log("congrats, you updated his profile data successfully"); 
 
    //         // const fullName =  ${fn} + " " + ${ln} ; 
    //         document.getElementById("callingCodeForEmployee").value = ""; 
    //         document.getElementById("editMobileNumbeForAdmin").value = ""; 
    //         document.getElementById("editEmailForAdmin").value = ""; 
    //         document.getElementById("editOldPassword").value = ""; 
    //         document.getElementById("newPassword").value = ""; 
    //     }).catch(error => { 
    //         console.error(error); 
    //         alert("There was an error updating your profile. Please make sure you entered the correct password and try again."); 
    //     }); 
    // } catch (error) { 
    //     console.log(error); 
    // } 
} 

//////////////////////////////////////////////////////////////////////

var selectedOptions = [];

function getAllTabs() {
  var allTabs = document.querySelector('#rules');
  fetch(`${domainName}/sts/role/tabs`, {
    method: 'GET',
    headers: { "Content-Type": "application/json" }
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
    })
    .catch(error => console.log(error));
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

  console.log(formData);
  console.log(JSON.stringify(formData));
  if (formData.role && selectedOptions.length > 0) {
    console.log("1");
    try {
      console.log("2");
      fetch(`${domainName}/sts/role`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      .then((response) => {
          if (response.ok) {
            console.log("Position added successfully");
            document.getElementById("positionAdding").value = "";
            document.getElementById("rules").selectedIndex = -1;

            getAllTabs();
          } else {
            throw new Error("Request failed.");
          }
        })
        .catch((error) => console.error(error));
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
fetch(`${domainName}/sts/role/all`, {
  method: 'GET',
  headers: { "Content-Type": "application/json" }
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
  })
  .catch(error => console.log(error));
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

  console.log(formData);
  console.log(JSON.stringify(formData));

  if (formData.firstName && formData.lastName && formData.countryCallingCode && formData.mobileNumber && formData.email && selectedOptionsRole.length > 0) {
    console.log("1");

    try {
      console.log("2");
      fetch(`${domainName}/sts/user/employee`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      .then((response) => {
        if (response.ok) {
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
      })
      .catch((error) => console.error(error));
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Your fields are empty. Please fill them.");
  }
});
