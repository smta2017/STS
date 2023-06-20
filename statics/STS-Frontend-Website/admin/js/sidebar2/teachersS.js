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
  
var teachersData;

function getTeachersAData() {
    var teachersContainer = document.getElementById("table-body-teachersA");
    var id = getCookie("schoolID");
    console.log(id);
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
                    <i class="edit-btn fa-solid fa-pen-to-square" style="color: #3e843e;cursor: pointer;" data-bs-toggle="modal" data-bs-target="#AddTeacherA" onclick="editTeacherA('${teacher._id}')"></i>
                    <i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" onclick="deleteTeacherA('${teacher._id}')"></i>
                </td>
            `;
            element.setAttribute('id', `teacher-${teacher._id}`);
            teachersContainer.appendChild(element);
            });
    })
    .catch(error => console.log(error));
    document.getElementById("gif").style.display ="none"
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

    // Create an object with the form data
    var formData = {
        qualifierSubscription: getCookie('subscriptionId'),
        firstName: document.getElementById('firstnameA').value,
        lastName: document.getElementById('lastnameA').value,
        mobileNumber: document.getElementById('mobileNumberA').value,
        dateOfBirth: document.getElementById('dateOfBirthA').value,
        countryCallingCode: document.getElementById('callingCodeA').value,
        email: document.getElementById('emailA').value,
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
            })
                .catch(function (error) {
                    console.log('Error:', error);
                });
                document.getElementById("gif").style.display ="none"
            } else {
                // New teacher, send POST request
                document.getElementById("gif").style.display ="block"
                var id = getCookie("schoolID");
                fetch(`${domainName}/sts/teacher/${id}`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" , 'Authorization': token},
                    body: JSON.stringify(formData)
                })
                .then(function (response) {
                    responseAlert(response);
                    
                    if (response.ok) {
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
                })
                .catch(function (error) {
                    console.log('Error:', error);
                });
                document.getElementById("gif").style.display ="none"
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
                    if (response.ok) {
                        console.log("Teacher data deleted successfully");
                        getTeachersAData();
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
