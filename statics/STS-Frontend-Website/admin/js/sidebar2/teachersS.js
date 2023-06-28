function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
}


function generatePDF() {
    // Get the HTML table element
    var table = document.getElementById('teachersA-table');
  
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
      // win.print();
      // Close the print preview window after printing
      // win.close();
    };
}
  
document.getElementById('generate-pdf').addEventListener('click', generatePDF);
  
var selectBox = document.getElementById('callingCodeA');
var countries = window.intlTelInputGlobals.getCountryData();
for (var country of countries) {
  const option = document.createElement('option');
  option.value = country.iso2;
  option.textContent = `${country.name} (+${country.dialCode})`;
  selectBox.append(option);
}

var teachersData;

function getTeachersAData() {
    var teachersContainer = document.getElementById("table-body-teachersA");
    var id = getCookie("schoolID");
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/teacher/${id}`, {
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
                <td>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="edit-btn bi bi-pen-fill" style="color: #3e843e;cursor: pointer;" data-bs-toggle="modal" data-bs-target="#AddTeacherA" onclick="editTeacherA('${teacher._id}')" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" style="color: #c10b0b;cursor: pointer;" onclick="deleteTeacherA('${teacher._id}')" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </td>
            `;
            element.setAttribute('id', `teacher-${teacher._id}`);
            teachersContainer.appendChild(element);
            });
            document.getElementById("gif").style.display = "none";
    })
    .catch(error => {
        console.log(error);
        document.getElementById("gif").style.display = "none";
      }); 
}

getTeachersAData();

function editTeacherA(id) {
    var teacher = teachersData.find(teacher => teacher._id == id);
  
    document.getElementById("teachersIdA").value = teacher._id;
    document.getElementById('firstnameA').value = teacher.firstName;
    document.getElementById('lastnameA').value = teacher.lastName;
    document.getElementById('dateOfBirthA').value = teacher.dateOfBirth.split("T")[0];
    document.getElementById('emailA').value = teacher.email;
    document.getElementById('callingCodeA').value = teacher.countryCallingCode;
    document.getElementById('mobileNumberA').value = teacher.mobileNumber.split('ar-EG:+20')[1];
}

function changeTeacherA(e) {
    e.preventDefault(); // Prevent the default form submission

    var teachersId = document.getElementById('teachersIdA').value;

    var country = document.getElementById('callingCodeA').value;
  
    var selectOption = document.querySelector(`option[value='${country}']`);
    var CountryCode = selectOption.textContent.split(' ').pop().match(/\d+/g).join('');

    
    // Create an object with the form data
    var formData = {
        qualifierSubscription: getCookie('subscriptionId'),
        firstName: document.getElementById('firstnameA').value,
        lastName: document.getElementById('lastnameA').value,
        mobileNumber: document.getElementById('mobileNumberA').value,
        dateOfBirth: document.getElementById('dateOfBirthA').value,
        countryCallingCode: `+${CountryCode}`,
        email: document.getElementById('emailA').value,
    };

    if (teachersId) {
        // Existing teacher, send PUT request
        document.getElementById("gif").style.display ="block"
        fetch(`${domainName}/sts/teacher/${teachersId}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" , 'Authorization': token},
            body: JSON.stringify(formData),
        }).then(response => response.json())
            .then(response => {  
                
            if (response.apiStatus == true) {
                console.log(JSON.stringify(formData))
                console.log(response)
                console.log('Teacher updated successfully');

                document.getElementById('teachersIdA').value = '';
                document.getElementById('firstnameA').value = '';
                document.getElementById('lastnameA').value = '';
                document.getElementById('dateOfBirthA').value = '';
                document.getElementById('emailA').value = '';
                document.getElementById('callingCodeA').value = '';
                document.getElementById('mobileNumberA').value = '';

                getTeachersAData();
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
                var id = getCookie("schoolID");
                fetch(`${domainName}/sts/teacher/${id}`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" , 'Authorization': token},
                    body: JSON.stringify(formData)
                }).then(response => response.json())
                .then(function (response) {
                    if (response.apiStatus == true) {
                        console.log(JSON.stringify(formData))
                        console.log(response)
                    console.log('Teacher added successfully');

                    document.getElementById('teachersIdA').value = '';
                    document.getElementById('firstnameA').value = '';
                    document.getElementById('lastnameA').value = '';
                    document.getElementById('dateOfBirthA').value = '';
                    document.getElementById('emailA').value = '';
                    document.getElementById('callingCodeA').value = '';
                    document.getElementById('mobileNumberA').value = '';

                    getTeachersAData();
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


function deleteTeacherA(id) {
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
                        getTeachersAData();
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

document.getElementById('search').addEventListener('input', handleSearch);

function handleSearch() {
  var searchQuery = document.getElementById('search').value.toLowerCase();
  var rows = document.querySelectorAll('#table-body-teachersA tr');

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
    document.getElementById("teachersIdA").value = '';
}