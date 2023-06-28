function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
}


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
    win.print();
    // Close the print preview window after printing
    // win.close();
  };
}

function calculateAge(dateString) {
  var birthday = new Date(dateString);
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

if (getCookie('stopSubscription') === "false" && getCookie('type') === "qualifier") {
  var addCompdiv = document.querySelector(".addComp");
  const addCompButton = document.createElement('div');
  addCompdiv.innerHTML = "";
  addCompButton.innerHTML = `
  <button class="btn btn-light add" id="add-row" data-bs-toggle="modal" data-bs-target="#AddCompatator">Add Compatator</button>`
  addCompdiv.appendChild(addCompButton);

  const headerTable = document.getElementById("headerTable");
  let elementColumn = headerTable.querySelector('th:last-child');
  
  if (!elementColumn || elementColumn.innerHTML !== 'Action') {
    elementColumn = document.createElement('th');
    elementColumn.innerHTML = `Action`;
    const lastCol = headerTable.lastElementChild;
    lastCol.appendChild(elementColumn);
  }
}


var selectBox = document.getElementById('callingCodeCompatators');
var countries = window.intlTelInputGlobals.getCountryData();
for (var country of countries) {
  const option = document.createElement('option');
  option.value = country.iso2;
  option.textContent = `${country.name} (+${country.dialCode})`;
  selectBox.append(option);
}

var competitorsData;

var colorCode = localStorage.getItem("theme");

function getCompetitorsData(colorCode){
  var color ;
  var competitorsContainer = document.getElementById("table-body-competitors");
  var id = getCookie("subscriptionId");
  var theme = `${domainName}/sts/competitor/${id}`
    if(colorCode == "theme821919"){
      color = "/dancer";
    }else if (colorCode == "theme104b28"){
      color = "/musician";
    }else if (colorCode == "theme17547f"){
      color = "/singer";
    }else if (colorCode == "theme110f16"){
      color = "";
    }
  document.getElementById("gif").style.display ="block";

  fetch(`${theme}${color}`, {
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
        `;
        element.setAttribute('id', `competitor-${competitor._id}`);
        competitorsContainer.appendChild(element);

          if (getCookie('stopSubscription') === "false" && getCookie('type') === "qualifier") {
            const elementIcon = document.createElement('td');
            elementIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="edit-btn bi bi-pen-fill edit" viewBox="0 0 16 16" style="color: #3e843e;cursor: pointer;" data-bs-toggle="modal" data-bs-target="#AddCompatator" onclick="editCompetitor('${competitor._id}')">
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" style="color: #c10b0b;cursor: pointer;" onclick="deleteCompetitor('${competitor._id}')" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
                `
            const lastRow = competitorsContainer.lastElementChild;
            lastRow.appendChild(elementIcon);
          }
      });
      document.getElementById("gif").style.display ="none"
    })
    .catch(error => {
      console.log(error)
      document.getElementById("gif").style.display ="none"
    });
}

getCompetitorsData(localStorage.getItem("theme"));

function editCompetitor(id) {
  var competitor = competitorsData.find(competitor => competitor._id == id);

  document.getElementById("compatatorsId").value = competitor._id;
  document.getElementById('firstnameCompatators').value = competitor.firstName;
  document.getElementById('lastnameCompatators').value = competitor.lastName;
  document.getElementById('dateOfBirthCompatators').value = competitor.dateOfBirth.split("T")[0];
  document.getElementById('genderCompatators').value = competitor.gender;
  document.getElementById('emailCompatators').value = competitor.email;
  document.getElementById('callingCodeCompatators').value = competitor.countryCallingCode;
  document.getElementById('mobileNumberCompatators').value = competitor.mobileNumber.split('ar-EG:+20')[1];
  document.getElementById('category').value = competitor.category;
}

function changeCompetitor(e) {
  e.preventDefault();

  var country = document.getElementById('callingCodeCompatators').value;
  
  var selectOption = document.querySelector(`option[value='${country}']`);
  var CountryCode = selectOption.textContent.split(' ').pop().match(/\d+/g).join('');

  var compatatorsId = document.getElementById('compatatorsId').value;

  var formData = {
    qualifierSubscription: getCookie('subscriptionId'),
    firstName: document.getElementById('firstnameCompatators').value,
    lastName: document.getElementById('lastnameCompatators').value,
    category: document.getElementById('category').value,
    mobileNumber: document.getElementById('mobileNumberCompatators').value,
    dateOfBirth: document.getElementById('dateOfBirthCompatators').value,
    countryCallingCode: `+${CountryCode}`,
    email: document.getElementById('emailCompatators').value,
    gender: document.getElementById('genderCompatators').value,
  };
  
  if (compatatorsId) {
    // Existing competitor, send PUT request
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/competitor/${compatatorsId}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" , 'Authorization': token},
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(response => {  
      if (response.apiStatus == true) {
          console.log('Competitor updated successfully');

          document.getElementById('compatatorsId').value = '';
          document.getElementById('firstnameCompatators').value = '';
          document.getElementById('lastnameCompatators').value = '';
          document.getElementById('dateOfBirthCompatators').value = '';
          document.getElementById('genderCompatators').value = '';
          document.getElementById('emailCompatators').value = '';
          document.getElementById('callingCodeCompatators').value = '';
          document.getElementById('mobileNumberCompatators').value = '';
          document.getElementById('category').value = '';
          getCompetitorsData(localStorage.getItem("theme"));
        } else {
          console.log('Error:', response.status);
        }
        document.getElementById("gif").style.display ="none"
        responseAlert(response);
      })
      .catch(function (error) {
        console.log('Error:', error);
        document.getElementById("gif").style.display ="none"
        responseAlert(error);
      });
      
  } else {
    // New competitor, send POST request]
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/competitor`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" , 'Authorization': token},
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(response => {
        if (response.apiStatus == true) {
          console.log('Competitor added successfully');

          document.getElementById('compatatorsId').value = '';
          document.getElementById('firstnameCompatators').value = '';
          document.getElementById('lastnameCompatators').value = '';
          document.getElementById('dateOfBirthCompatators').value = '';
          document.getElementById('genderCompatators').value = '';
          document.getElementById('emailCompatators').value = '';
          document.getElementById('callingCodeCompatators').value = '';
          document.getElementById('mobileNumberCompatators').value = '';
          document.getElementById('category').value = '';
          getCompetitorsData(localStorage.getItem("theme"));
        } else {
          console.log('Error:', response.status);
        }
        document.getElementById("gif").style.display ="none"
        responseAlert(response);
      })
      .catch(function (error) {
        console.log('Error:', error);
        document.getElementById("gif").style.display ="none"
        responseAlert(error);
      });
  }
}


function deleteCompetitor(id) {
    if (id) {
        try {
          document.getElementById("gif").style.display ="block"
            fetch(`${domainName}/sts/competitor/${id}`, {
                method: 'DELETE',
                headers: {'Authorization': token},
            })
                .then(response => {
                  console.log(response);
                  if (response.status == 200) {
                    console.log("Competitor data deleted successfully");
                    getCompetitorsData(localStorage.getItem("theme"));
                  } else {
                        throw new Error('Request failed.');
                    }
                    document.getElementById("gif").style.display ="none";
                    response.json().then(data => {
                      responseAlert(data);
                  });
                })
                .catch(function (error) {
                  console.log('Error:', error);
                  document.getElementById("gif").style.display ="none"
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

function clearData(){
  document.getElementById("compatatorsId").value = '';
}

changeTheme(themesCharctaristic[localStorage.getItem('theme')]);