// document.getElementById('generate-pdf').addEventListener('click', function() {
//     // Get the HTML table element
//     var table = document.getElementById('compatators-table');
//     // Create a new jsPDF object
//     var pdf = new jsPDF();
//     // Generate the PDF with the table content
//     pdf.fromHTML(table, 15, 15, {
//     'width': 190
//     });
//     // pdf.autoTable({html: '#my-table'});
//     // Download the PDF file
//     pdf.save('Compatators Table.pdf');
// });
    

// function calculateAge(dateString) {
//     var birthday = new Date(dateString);
//     var ageDifMs = Date.now() - birthday.getTime();
//     var ageDate = new Date(ageDifMs);
//     return Math.abs(ageDate.getUTCFullYear() - 1970);
// }
    
    
    
// var form = document.querySelector("#add-compatators-form");
// var tableBody = document.querySelector("#table-body-compatators");
// var searchInput = document.querySelector("#search");
// var firstnameInput = document.querySelector("#firstname");
// var lastnameInput = document.querySelector("#lastname");
// var DOBInput = document.querySelector("#DOB");
// var genderInput = document.querySelector("#gender");
// var emailInput = document.querySelector("#email");
// var mobileInput = document.querySelector("#mobile");
// var categoryInput = document.querySelector("#category");
// var submitBtn = document.querySelector("#submit");

// var data = [];

// form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const firstname = firstnameInput.value;
//     const lastname = lastnameInput.value;
//     const DOB = DOBInput.value;
//     const gender = genderInput.value;
//     const email = emailInput.value;
//     const mobile = mobileInput.value;
//     const category = categoryInput.value;

//     const age = calculateAge(DOB);

//     if (!firstname || !lastname || !DOB || !gender || !email || !mobile || !category) {
//         alert("Please enter all the required data.");
//         return;
//     }

//     const person = { firstname, lastname, DOB, age, gender, email, mobile, category };

//     if (submitBtn.textContent === "Update") {
//         const rowIndex = submitBtn.dataset.rowIndex;
//         updatePerson(rowIndex, person);
//     } else {
//         addPerson(person);
//     }

//     form.reset();
// });

// function addPerson(person) {
//     fetch('/backend-endpoint', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(person)
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             data.push(person);
//             renderRow(person, data.length - 1);
//         } else {
//             alert("Failed to add person. Please try again.");
//         }
//     })
//     .catch(error => {
//         alert("An error occurred. Please try again.");
//         console.error(error);
//     });
// }

// function updatePerson(rowIndex, person) {
//     fetch(`/backend-endpoint/${rowIndex}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(person)
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             data[rowIndex] = person;
//             renderTable(data);
//             submitBtn.textContent = "Submit";
//             submitBtn.removeAttribute("data-row-index");
//         } else {
//             alert("Failed to update person. Please try again.");
//         }
//     })
//     .catch(error => {
//         alert("An error occurred. Please try again.");
//         console.error(error);
//     });
// }


// function deletePerson(rowIndex) {
//     fetch(`/backend-endpoint/${rowIndex}`, {
//         method: 'DELETE'
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             data.splice(rowIndex, 1);   //newRow.remove();
//             renderTable(data);
//         } else {
//             alert("Failed to delete person. Please try again.");
//         }
//     })
//     .catch(error => {
//         alert("An error occurred. Please try again.");
//         console.error(error);
//     });
// }

// tableBody.addEventListener("click", (event) => {
//     if (event.target.classList.contains("edit-btn")) {
//         const rowIndex = event.target.dataset.rowIndex;
//         const person = data[rowIndex];

//         firstnameInput.value = person.firstname;
//         lastnameInput.value = person.lastname;
//         DOBInput.value = person.DOB;
//         genderInput.value = person.gender;
//         emailInput.value = person.email;
//         mobileInput.value = person.mobile;
//         categoryInput.value = person.category;

//         submitBtn.textContent = "Update";
//         submitBtn.dataset.rowIndex = rowIndex;

//     } else if (event.target.classList.contains("delete-btn")) {
//         const rowIndex = event.target.dataset.rowIndex;
//         deletePerson(rowIndex);
//     }
// });

// renderTable(data);

// searchInput.addEventListener("input", () => {
//     const query = searchInput.value.toLowerCase();
    
//     const filteredData = data.filter((person) => {
//     return (
//         person.firstname.toLowerCase().includes(query) ||
//         person.lastname.toLowerCase().includes(query) ||
//         person.DOB.toLowerCase().includes(query) ||
//         person.age.toString().includes(query) ||
//         person.gender.toLowerCase().includes(query) ||
//         person.email.toLowerCase().includes(query) ||
//         person.mobile.toString().includes(query) ||
//         person.category.toString().includes(query)
//     );
//     });
//     renderTable(filteredData);
// });

// function renderTable(dataArray) {
//     tableBody.innerHTML = "";
//     dataArray.forEach((person, rowIndex) => {
//     renderRow(person, rowIndex);
//     });
// }

// function renderRow(person, rowIndex) {
//     const newRow = tableBody.insertRow();
//     const firstnameCell = newRow.insertCell();
//     const lastnameCell = newRow.insertCell();
//     const DOBCell = newRow.insertCell();
//     const ageCell = newRow.insertCell();
//     const genderCell = newRow.insertCell();
//     const emailCell = newRow.insertCell();
//     const mobileCell = newRow.insertCell();
//     const categoryCell = newRow.insertCell();
//     const actionCell = newRow.insertCell();

//     firstnameCell.innerHTML = person.firstname;
//     lastnameCell.innerHTML = person.lastname;
//     DOBCell.innerHTML = person.DOB;
//     ageCell.innerHTML = person.age;
//     genderCell.innerHTML = person.gender;
//     emailCell.innerHTML = person.email;
//     mobileCell.innerHTML = person.mobile;
//     categoryCell.innerHTML = person.category;
//     actionCell.innerHTML = `<i class="edit-btn fa-solid fa-pen-to-square" style="color: #3e843e;cursor: pointer;" data-row-index="${rowIndex}" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
//                             <i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" data-row-index="${rowIndex}"></i>`;
// }


console.log("3 padge")


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
    // headers: headers
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
        headers: headers,
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
        headers: headers,
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


