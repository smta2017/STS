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


function getCompetitorsData() {
  var competitorsContainer = document.getElementById("table-body-compatators");
  var id = getCookie("subscriptionId");
  fetch(`${domainName}/sts/competitor/${id}`, {
    method: 'GET',
    headers: {'Authorization': token},
  })
    .then(response => response.json())
    .then(data => {
      competitorsData = data.data;
      console.log(competitorsData)
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
                <i class="edit-btn fa-solid fa-pen-to-square" style="color: #3e843e;cursor: pointer;" data-bs-toggle="modal" data-bs-target="#AddCompatator" onclick="editCompetitor('${competitor._id}')"></i>
                <i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" onclick="deleteCompetitor('${competitor._id}')"></i>
            </td>
        `;
        // element.setAttribute('id', `competitor-${competitor._id}`);
        competitorsContainer.appendChild(element);
    });
    })
    .catch(error => console.log(error));
}

getCompetitorsData();

function deleteCompetitor(id) {
    if (id) {
        try {
            fetch(`${domainName}/sts/competitor/${id}`, {
                method: 'DELETE',
                headers: {'Authorization': token},
            })
                .then(response => {
                    if (response.ok) {
                        console.log("Competitor data deleted successfully");
                        getCompetitorsData();
                    } else {
                        throw new Error('Request failed.');
                    }
                })
                .catch(error => console.error(error));
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("No Competitors ID provided");
    }
}


function editCompetitor(id) {
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
    // Get the form values
    var qualifierSubscription = getCookie('subscriptionId');
    var firstName = document.getElementById('firstname').value;
    var lastName = document.getElementById('lastname').value;
    var category = document.getElementById('category').value;
    var mobileNumber = document.getElementById('mobileNumber').value;
    var dateOfBirth = document.getElementById('dateOfBirth').value;
    var callingCode = document.getElementById('callingCode').value;
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
      fetch(`${domainName}/sts/competitor/${compatatorsId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" , 'Authorization': token},
        body: JSON.stringify(formData),
      })
      .then(response => {  
        if (response.ok) {
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
  
            getCompetitorsData();
          } else {
            console.log('Error:', response.status);
          }
        })
        .catch(function (error) {
          console.log('Error:', error);
        });
    } else {
      // New competitor, send POST request
      fetch(`${domainName}/sts/competitor`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" , 'Authorization': token},
        body: JSON.stringify(formData)
       
      })
        .then(function (response) {
          responseAlert(response);
  
          if (response.ok) {
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
        })
        .catch(function (error) {
          console.log('Error:', error);
        });
    }
}


