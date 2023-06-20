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
      // win.print();
      // Close the print preview window after printing
      // win.close();
    };
}
  
document.getElementById('generate-pdf').addEventListener('click', generatePDF);
  
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
                <td>
                    <i class="edit-btn fa-solid fa-pen-to-square" style="color: #3e843e;cursor: pointer;" data-bs-toggle="modal" data-bs-target="#AddTeacher" onclick="editTeacher('${teacher._id}')"></i>
                    <i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" onclick="deleteTeacher('${teacher._id}')"></i>
                </td>
            `;
            element.setAttribute('id', `teacher-${teacher._id}`);
            teachersContainer.appendChild(element);
            });
    })
    .catch(error => console.log(error));
    document.getElementById("gif").style.display ="none"
}

getTeachersData();

function editTeacher(id) {
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
    // Get the form values
    var qualifierSubscription = getCookie('subscriptionId');
    var firstName = document.getElementById('firstnameU').value;
    var lastName = document.getElementById('lastnameU').value;
    var mobileNumber = document.getElementById('mobileNumberU').value;
    var dateOfBirth = document.getElementById('dateOfBirthU').value;
    var callingCode = document.getElementById('callingCodeU').value;
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
            .then(response => {  
            if (response.ok) {
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
            })
                .catch(function (error) {
                    console.log('Error:', error);
                });
                document.getElementById("gif").style.display ="none"
            } else {
                // New teacher, send POST request
                document.getElementById("gif").style.display ="block"
                fetch(`${domainName}/sts/teacher`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" , 'Authorization': token},
                    body: JSON.stringify(formData)
                })
                .then(function (response) {
                    responseAlert(response);
                    if (response.ok) {
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
                })
                .catch(function (error) {
                    console.log('Error:', error);
                });
                document.getElementById("gif").style.display ="none"
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
                    if (response.ok) {
                        console.log("Teacher data deleted successfully");
                        getTeachersData();
                    } else {
                        console.log("response");
                        throw new Error('Request failed.');
                    }
                })
                .catch(error => console.error(error));
                document.getElementById("gif").style.display ="none"
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


changeTheme(themesCharctaristic[localStorage.getItem('theme')]);