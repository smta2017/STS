
function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
}

var headers = new Headers(); 
var token = getCookie("token");
headers.append('Authorization', token); 
headers.append('Content-Type', "application/json");

// document.getElementById('generate-pdf').addEventListener('click', function() {
//   // Get the HTML table element
//   var table = document.getElementById('compatators-table');

//   // Create a new jsPDF object
//   var pdf = new jsPDF();

//   // Check if autoTable function is available
//   if (typeof pdf.autoTable === 'function') {
//     // Set the desired styles for the PDF
//     var pdfStyles = {
//       headerColor: [41, 128, 185], // Header color (RGB format)
//       fontColor: [255, 255, 255], // Font color (RGB format)
//       lineColor: [230, 230, 230], // Line separator color (RGB format)
//       fontSize: 12, // Font size
//       fontStyle: 'bold', // Font style ('normal', 'bold', 'italic', 'bolditalic')
//       padding: 8 // Padding between cells
//     };

//     // Generate the PDF with the table content
//     pdf.autoTable({
//       html: table,
//       startY: 20, // Y position of the table
//       styles: pdfStyles,
//       headStyles: { fillColor: pdfStyles.headerColor, textColor: pdfStyles.fontColor },
//       bodyStyles: { textColor: pdfStyles.fontColor },
//       alternateRowStyles: { fillColor: pdfStyles.lineColor }
//     });

//     // Download the PDF file
//     pdf.save('Compatators Table.pdf');
//   } else {
//     console.error('autoTable function is not available. Make sure jspdf.plugin.autotable.min.js is included.');
//   }
// });

function generatePDF() {
  // Get the HTML table element
  var table = document.getElementById('compatators-table');

  // Open a new window for the print preview
  var win = window.open('', '_blank');

  // Create a new document in the new window
  win.document.write('<html><head><title>Compatators Table</title></head><body>');
  win.document.write('<style>table { border-collapse: collapse; } th, td { border: 2px solid black; padding: 8px; }</style>');
  win.document.write('<h1>Compatators Table</h1>');
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


function calculateAge(dateString) {
  var birthday = new Date(dateString);
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}


var competitorsData;
  var color ;
  var colorCode = localStorage.getItem("theme");

function getCompetitorsData() {
  var competitorsContainer = document.getElementById("table-body-competitors");
  var id = getCookie("subscriptionId");
  var theme = `${domainName}/sts/competitor/${id}`

  if(colorCode == "theme821919"){
      color = "dancer"
  }else if (colorCode == "theme104b28"){
    color = "musician"
  }else if (colorCode == "theme17547f"){
    color = "singer"
  }else if (colorCode == "themeNaN0f16"){
    color = ""
  }
  fetch(`${theme}/${color}`, {
    method: 'GET',
    headers: headers
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
              <i class="edit-btn fa-solid fa-pen-to-square" style="color: #3e843e;cursor: pointer;" data-bs-toggle="modal" data-bs-target="#AddCompatator" onclick="editCompetitor('${competitor._id}')"></i>
              <i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" onclick="deleteCompetitor('${competitor._id}')"></i>
            </td>
        `;
        element.setAttribute('id', `competitor-${competitor._id}`);
        competitorsContainer.appendChild(element);
      });
    })
    .catch(error => console.log(error));
}

getCompetitorsData();

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
  var qualifierSubscription = localStorage.getItem('competition');
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


document.getElementById('search').addEventListener('input', handleSearch);

function handleSearch() {
  var searchQuery = document.getElementById('search').value.toLowerCase();
  var rows = document.querySelectorAll('#table-body-competitors tr');

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