function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
}


function generatePDF() {
    // Get the HTML table element
    var table = document.getElementById('teachersU-table');
  
    // Open a new window for the print preview
    var win = window.open('', '_blank');
  
    // Create a new document in the new window
    win.document.write('<html><head><title>Teachers Table</title></head><body>');
    win.document.write('<style>table { border-collapse: collapse; } th, td { border: 2px solid black; padding: 8px; }</style>');
    win.document.write('<h1>Teachers Table</h1>');
    win.document.write(table.outerHTML); // Write the table HTML to the new document
    win.document.write('</body></html>');
  
    // Close the document
    win.document.close();
  
    // Wait for the document to fully load before printing
    win.onload = function() {
      // Print the document
      win.print();
      // Close the print preview window after printing
      // win.close();
    };
}
    
if (getCookie('stopSubscription') == "false" && getCookie('type') == "qualifier" && getCookie('paid') === "false") {
    var addTeachDiv = document.querySelector(".addTeach");
    const addTeachButton = document.createElement('div');
    addTeachDiv.innerHTML = "";
    addTeachButton.innerHTML = `
    <button class="btn btn-light" id="add-row" data-bs-toggle="modal" data-bs-target="#AddTeacher" onclick="goToAdd();">Add Teatcher</button>`
    addTeachDiv.appendChild(addTeachButton);


    const headerTable = document.getElementById("headerTable");
    let elementColumn = headerTable.querySelector('th:last-child');
    
    if (!elementColumn || elementColumn.innerHTML !== 'Action') {
        elementColumn = document.createElement('th');
        elementColumn.innerHTML = `Action`;
        const lastCol = headerTable.lastElementChild;
        lastCol.appendChild(elementColumn);
    }
}


var selectBox = document.getElementById('callingCodeU');
var countries = window.intlTelInputGlobals.getCountryData();
for (var country of countries) {
  const option = document.createElement('option');
  option.value = country.iso2;
  option.textContent = `${country.name} (+${country.dialCode})`;
  selectBox.append(option);
}

var teachersData;

function getTeachersData() {
    var teachersContainer = document.getElementById("table-body-teachersU");
    // var id = getCookie("subscriptionId");
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/teacher`, {
      method: 'GET',
      headers: {'Authorization': token},
    })
        .then(response => response.json())
        .then(data => {
            teachersData = data.data;
            teachersContainer.innerHTML = "";
            teachersData.forEach(teacher=> {
            const element = document.createElement('tr');
            const date = `${teacher.dateOfBirth}`.split("T")[0];
            element.innerHTML = `
                <td>${teacher.firstName} ${teacher.lastName}</td>
                <td>${date}</td>
                <td>${teacher.mobileNumber}</td>
                <td>${teacher.email}</td>
            `;
            element.setAttribute('id', `teacher-${teacher._id}`);
            teachersContainer.appendChild(element);

        if (getCookie('stopSubscription') == "false" && getCookie('type') == "qualifier" && getCookie('paid') === "false") {
            const elementIcon = document.createElement('td');
            elementIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="edit-btn bi bi-pen-fill edit" viewBox="0 0 16 16" style="color: #3e843e;cursor: pointer;" data-bs-toggle="modal" data-bs-target="#AddTeacher" onclick="editTeacher('${teacher._id}')">
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" style="color: #c10b0b;cursor: pointer;" onclick="deleteTeacher('${teacher._id}')" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
              `
            const lastRow = teachersContainer.lastElementChild;
            lastRow.appendChild(elementIcon);
        }
        });
        document.getElementById("gif").style.display ="none"
    })
    .catch(error => {
        console.log(error);
        document.getElementById("gif").style.display = "none";
      });  
}

getTeachersData();

function editTeacher(id) {
    document.getElementById("addToEdit").innerHTML = "Update";
    var teacher = teachersData.find(teacher => teacher._id == id);
  
    document.getElementById("teachersIdU").value = teacher._id;
    document.getElementById('firstnameU').value = teacher.firstName;
    document.getElementById('lastnameU').value = teacher.lastName;
    document.getElementById('dateOfBirthU').value = teacher.dateOfBirth.split("T")[0];
    document.getElementById('emailU').value = teacher.email;
    document.getElementById('callingCodeU').value = teacher.countryCallingCode;
    document.getElementById('mobileNumberU').value = teacher.mobileNumber.split('ar-EG:+20')[1];
}

function changeTeacher(e) {
    e.preventDefault(); // Prevent the default form submission

    var teachersId = document.getElementById('teachersIdU').value;
    
    var country = document.getElementById('callingCodeU').value;
  
    var selectOption = document.querySelector(`option[value='${country}']`);
    var CountryCode = selectOption.textContent.split(' ').pop().match(/\d+/g).join('');

    
    // Get the form values
    var qualifierSubscription = getCookie('subscriptionId');
    var firstName = document.getElementById('firstnameU').value;
    var lastName = document.getElementById('lastnameU').value;
    var mobileNumber = document.getElementById('mobileNumberU').value;
    var dateOfBirth = document.getElementById('dateOfBirthU').value;
    var callingCode =`+${CountryCode}`;
    var email = document.getElementById('emailU').value;

    // Create an object with the form data
    var formData = {
        qualifierSubscription: qualifierSubscription,
        firstName: firstName,
        lastName: lastName,
        mobileNumber: mobileNumber,
        dateOfBirth: dateOfBirth,
        countryCallingCode: callingCode,
        email: email,
    };

    if (teachersId) {
        // Existing teacher, send PUT request
        document.getElementById("gif").style.display ="block"
        fetch(`${domainName}/sts/teacher/${teachersId}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" , 'Authorization': token},
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
            .then(response => {  
            if (response.apiStatus == true) {
                console.log('Teacher updated successfully');

                document.getElementById('teachersIdU').value = '';
                document.getElementById('firstnameU').value = '';
                document.getElementById('lastnameU').value = '';
                document.getElementById('dateOfBirthU').value = '';
                document.getElementById('emailU').value = '';
                document.getElementById('callingCodeU').value = '';
                document.getElementById('mobileNumberU').value = '';

                getTeachersData();
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
                // New teacher, send POST request
                document.getElementById("gif").style.display ="block"
                fetch(`${domainName}/sts/teacher`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" , 'Authorization': token},
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(response => {
                    if (response.apiStatus == true) {
                        console.log('Teacher added successfully');

                        document.getElementById('teachersIdU').value = '';
                        document.getElementById('firstnameU').value = '';
                        document.getElementById('lastnameU').value = '';
                        document.getElementById('dateOfBirthU').value = '';
                        document.getElementById('emailU').value = '';
                        document.getElementById('callingCodeU').value = '';
                        document.getElementById('mobileNumberU').value = '';

                        getTeachersData();
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


function deleteTeacher(id) {
    console.log(id)
    if (id) {
        try {
            document.getElementById("gif").style.display ="block"
            fetch(`${domainName}/sts/teacher/${id}`, {
                method: 'DELETE',
                headers: {'Authorization': token},
            })
                .then(response => {
                    if (response.status == 200) {
                        console.log("Teacher data deleted successfully");
                        getTeachersData();
                    } else {
                        console.log("response");
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
        console.log("No Teachers ID provided");
    }
}

function handleSearch() {
  var searchQuery = document.getElementById('search').value.toLowerCase();
  var rows = document.querySelectorAll('#table-body-teachersU tr');

  rows.forEach(function (row) {
    var cells = row.getElementsByTagName('td');
    var shouldShowRow = false;

    Array.from(cells).forEach(function (cell) {
      if (cell.textContent.toLowerCase().includes(searchQuery)) {
        shouldShowRow = true;
      }
    });

    if (shouldShowRow) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function clearData(){
    goToAdd();
    document.getElementById("teachersIdU").value = '';
}

changeTheme(themesCharctaristic[localStorage.getItem('theme')]);