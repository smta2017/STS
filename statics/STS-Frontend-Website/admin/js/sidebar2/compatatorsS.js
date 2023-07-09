function calculateAge(dateString) {
    var birthday = new Date(dateString);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
  
var competitorsData;

function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
}

var selectBox = document.getElementById('callingCode');
var countries = window.intlTelInputGlobals.getCountryData();
for (var country of countries) {
  const option = document.createElement('option');
  option.value = country.iso2;
  option.textContent = `${country.name} (+${country.dialCode})`;
  selectBox.append(option);
}

function getCompetitorsData() {
  const schoolName = getCookie("schoolName");
  document.getElementById("schoolName").innerHTML = `${schoolName} Academy`;

  var competitorsContainer = document.getElementById("table-body-compatators");
  var id = getCookie("subscriptionId");
  document.getElementById("gif").style.display ="block"
  fetch(`${domainName}/sts/competitor/${id}`, {
    method: 'GET',
    headers: {'Authorization': token},
  })
    .then(response => response.json())
    .then(data => {
      competitorsData = data.data;
      competitorsContainer.innerHTML = "";
      competitorsData.forEach(competitor=> {
        const element = document.createElement('tr');
        const age = calculateAge(`${competitor.dateOfBirth}`)
        const date = `${competitor.dateOfBirth}`.split("T")[0];
        element.innerHTML = `
            <td>${competitor.firstName}</td>
            <td>${competitor.lastName}</td>
            <td>${date}</td>
            <td>${age}</td>
            <td>${competitor.gender}</td>
            <td>${competitor.email}</td>
            <td>${competitor.mobileNumber}</td>
            <td>${competitor.category}</td>
            <td>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="edit-btn bi bi-pen-fill" style="color: #3e843e;cursor: pointer;" data-bs-toggle="modal" data-bs-target="#AddCompatator" onclick="editCompetitor('${competitor._id}')" viewBox="0 0 16 16">
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" style="color: #c10b0b;cursor: pointer;" onclick="deleteCompetitor('${competitor._id}')" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
              </svg>
            </td>
        `;
        if (getCookie('type') === "final"){
          if (competitor.passedQualifiers === true){
            element.style.backgroundColor = "rgb(1 255 137 / 67%)";
          }
        }
        // element.setAttribute('id', `competitor-${competitor._id}`);
        competitorsContainer.appendChild(element);
    });
    document.getElementById("gif").style.display = "none";
    })
    .catch(error => {
      console.log(error);
      document.getElementById("gif").style.display = "none";
    }); 

}

getCompetitorsData();

function deleteCompetitor(id) {
    if (id) {
        try {
          document.getElementById("gif").style.display ="block"
            fetch(`${domainName}/sts/competitor/${id}`, {
                method: 'DELETE',
                headers: {'Authorization': token},
            })
                .then(response => {
                    if (response.status == 200) {
                        console.log("Competitor data deleted successfully");
                        getCompetitorsData();
                    } else {
                        throw new Error('Request failed.');
                    }
                    document.getElementById("gif").style.display = "none";
                    response.json().then(data => {
                      responseAlert(data);
                  });
                })
                .catch(error => {
                  console.log(error);
                  document.getElementById("gif").style.display = "none";
                  error.json().then(data => {
                    responseAlert(data);
                  });
                }); 
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("No Competitors ID provided");
    }
}


function editCompetitor(id) {
    goToTop();
    document.getElementById("addToEdit").innerHTML = "Update";
    var competitor = competitorsData.find(competitor => competitor._id == id);
  
    document.getElementById("compatatorsId").value = competitor._id;
    document.getElementById('firstname').value = competitor.firstName;
    document.getElementById('lastname').value = competitor.lastName;
    document.getElementById('dateOfBirth').value = competitor.dateOfBirth.split("T")[0];
    document.getElementById('gender').value = competitor.gender;
    document.getElementById('email').value = competitor.email;
    document.getElementById('callingCode').value = competitor.countryCallingCode;
    document.getElementById('mobileNumber').value = competitor.mobileNumber.split('ar-EG:+20')[1];
    document.getElementById('category').value = competitor.category;
}


function changeCompetitor(e) {
    e.preventDefault(); // Prevent the default form submission
  
    var compatatorsId = document.getElementById('compatatorsId').value;

    var country = document.getElementById('callingCode').value;
  
    var selectOption = document.querySelector(`option[value='${country}']`);
    var CountryCode = selectOption.textContent.split(' ').pop().match(/\d+/g).join('');

    // Get the form values
    var qualifierSubscription = getCookie('subscriptionId');
    var firstName = document.getElementById('firstname').value;
    var lastName = document.getElementById('lastname').value;
    var category = document.getElementById('category').value;
    var mobileNumber = document.getElementById('mobileNumber').value;
    var dateOfBirth = document.getElementById('dateOfBirth').value;
    var callingCode = `+${CountryCode}`;
    var email = document.getElementById('email').value;
    var gender = document.getElementById('gender').value;
  
    // Create an object with the form data
    var formData = {
      qualifierSubscription: qualifierSubscription,
      firstName: firstName,
      lastName: lastName,
      category: category,
      mobileNumber: mobileNumber,
      dateOfBirth: dateOfBirth,
      countryCallingCode: callingCode,
      email: email,
      gender: gender,
    };
  
  
    if (compatatorsId) {
      // Existing competitor, send PUT request
      document.getElementById("gif").style.display ="block"
      fetch(`${domainName}/sts/competitor/${compatatorsId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" , 'Authorization': token},
        body: JSON.stringify(formData),
      }).then(response => response.json())
      .then(response => {  
        if (response.apiStatus == true) {
            console.log('Competitor updated successfully');
  
            document.getElementById('compatatorsId').value = '';
            document.getElementById('firstname').value = '';
            document.getElementById('lastname').value = '';
            document.getElementById('dateOfBirth').value = '';
            document.getElementById('gender').value = '';
            document.getElementById('email').value = '';
            document.getElementById('callingCode').value = '';
            document.getElementById('mobileNumber').value = '';
            document.getElementById('category').value = '';
            goToAdd();
            getCompetitorsData();
          } else {
            console.log('Error:', response.status);
          }
          document.getElementById("gif").style.display = "none";
          responseAlert(response);
        })
        .catch(error => {
          console.log(error);
          document.getElementById("gif").style.display = "none";
          responseAlert(error);
        }); 

    } else {
      // New competitor, send POST request
      document.getElementById("gif").style.display ="block"
      fetch(`${domainName}/sts/competitor`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" , 'Authorization': token},
        body: JSON.stringify(formData)
       
      }).then(response => response.json())
        .then(function (response) {
          
  
          if (response.apiStatus == true) {
            console.log('Competitor added successfully');
  
            document.getElementById('compatatorsId').value = '';
            document.getElementById('firstname').value = '';
            document.getElementById('lastname').value = '';
            document.getElementById('dateOfBirth').value = '';
            document.getElementById('gender').value = '';
            document.getElementById('email').value = '';
            document.getElementById('callingCode').value = '';
            document.getElementById('mobileNumber').value = '';
            document.getElementById('category').value = '';
  
            getCompetitorsData();
            
          } else {
            console.log('Error:', response.status);
          }
          document.getElementById("gif").style.display = "none";
          responseAlert(response);
        })
        .catch(error => {
          console.log(error);
          document.getElementById("gif").style.display = "none";
          responseAlert(error);
        }); 
    }
}


function clearData(){
  goToAdd();
  document.getElementById("compatatorsId").value = '';
}