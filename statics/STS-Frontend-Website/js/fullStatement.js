// document.getElementById('generate-pdf').addEventListener('click', function() {
//   // Get the HTML table element
//   var table = document.getElementById('my-table');
//   // Create a new jsPDF object
//   var pdf = new jsPDF();
//   // Generate the PDF with the table content
//   pdf.fromHTML(table, 15, 15, {
//   'width': 190
//   });
//   // pdf.autoTable({html: '#my-table'});
//   // Download the PDF file
//   pdf.save('table.pdf');
// });


// fetch('https://api.example.com/data', {method: 'GET'})
//   .then(response => response.json())
//   .then(data => {
//     data.forEach(item => {
//       const table = document.getElementById('table-fullStatement').getElementsByTagName('tbody')[0];
//       const priceAcademy = document.getElementById('priceAcademy');
//       const newRow = table.insertRow();
//       const FullNameCell = newRow.insertCell();
//       const CategoryNameCell = newRow.insertCell();
//       const EntryNameCell = newRow.insertCell();
//       const LeaderOfEntryCell = newRow.insertCell();
//       const DateOfEntryCell = newRow.insertCell();
      
//       // Set the values for each cell
//       priceAcademy.innerHTML = `Price Of Academy:  + ${item.priceAcademy} + $`;
//       FullNameCell.innerText = item.FullName;
//       CategoryNameCell.innerText = item.CategoryName;
//       EntryNameCell.innerText = item.EntryName;
//       LeaderOfEntryCell.innerText = item.LeaderOfEntry;
//       DateOfEntryCell.innerText = item.DateOfEntry;
//     })
//   });



// // const form = document.querySelector("form");
// var tableBody = document.querySelector("#table-body");
// var searchInput = document.querySelector("#search");
// // const firstnameInput = document.querySelector("#firstname");
// // const lastnameInput = document.querySelector("#lastname");
// // const dayInput = document.querySelector("#day");
// // const monthInput = document.querySelector("#month");
// // const yearInput = document.querySelector("#year");
// // const genderInput = document.querySelector("#gender");
// // const emailInput = document.querySelector("#email");
// // const mobileInput = document.querySelector("#mobile");
// // const categoryInput = document.querySelector("#category");
// // const submitBtn = document.querySelector("#submit");

// var data = [];

// // form.addEventListener("submit", (event) => {
// //     event.preventDefault();
// //     const firstname = firstnameInput.value;
// //     const lastname = lastnameInput.value;
// //     const day = dayInput.value;
// //     const month = monthInput.value;
// //     const year = yearInput.value;
// //     const gender = genderInput.value;
// //     const email = emailInput.value;
// //     const mobile = mobileInput.value;
// //     const category = categoryInput.value;

// //     if (!firstname || !lastname || !day || !month || !year || !gender || !email || !mobile || !category) {
// //         alert("please, enter your data ...");
// //         return;
// //     }

// //     const person = { firstname, lastname, day, month, year, gender, email, mobile, category };
// //     if (submitBtn.textContent === "Update") {
// //         const rowIndex = submitBtn.dataset.rowIndex;
// //         data[rowIndex] = person;
// //         renderTable(data);
// //         submitBtn.textContent = "Submit";
// //         } else {
// //         data.push(person);
// //         renderRow(person, data.length - 1);
// //         }
// //         form.reset();
// // });

// // tableBody.addEventListener("click", (event) => {
// //     if (event.target.classList.contains("edit-btn")) {
// //     const rowIndex = event.target.dataset.rowIndex;
// //     const person = data[rowIndex];

// //     firstnameInput.value = person.firstname;
// //     lastnameInput.value = person.lastname;
// //     dayInput.value = person.day;
// //     monthInput.value = person.month;
// //     yearInput.value = person.year;
// //     genderInput.value = person.gender;
// //     emailInput.value = person.email;
// //     mobileInput.value = person.mobile;
// //     categoryInput.value = person.category;

// //     submitBtn.textContent = "Update";
// //     submitBtn.dataset.rowIndex = rowIndex;

// //     } else if (event.target.classList.contains("delete-btn")) {
// //     const rowIndex = event.target.dataset.rowIndex;
// //     data.splice(rowIndex, 1);
// //     event.target.parentNode.parentNode.remove();
// //     }
// // });

// searchInput.addEventListener("input", () => {
//     const query = searchInput.value.toLowerCase();
//     const filteredData = data.filter((item) => {
//     return (
//         item.FullName.toLowerCase().includes(query) ||
//         item.CategoryName.toLowerCase().includes(query) ||
//         item.EntryName.toLowerCase().includes(query) ||
//         item.LeaderOfEntry.toLowerCase().includes(query) ||
//         item.DateOfEntry.toLowerCase().includes(query) 
//     );
//     });
//     renderTable(filteredData);
// });

// function renderTable(dataArray) {
//     tableBody.innerHTML = "";
//     dataArray.forEach((item) => {
//     renderRow(item);
//     });
// }

// function renderRow(item) {
//     const newRow = tableBody.insertRow();
//     const FullNameCell = newRow.insertCell();
//     const CategoryNameCell = newRow.insertCell();
//     const EntryNameCell = newRow.insertCell();
//     const LeaderOfEntryCell = newRow.insertCell();
//     const DateOfEntryCell = newRow.insertCell();

//     FullNameCell.innerHTML = item.FullName;
//     CategoryNameCell.innerHTML = item.CategoryName;
//     EntryNameCell.innerHTML = item.EntryName;
//     LeaderOfEntryCell.innerHTML = item.LeaderOfEntry;
//     DateOfEntryCell.innerHTML = item.DateOfEntry;
// }




function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
}

var headers = new Headers(); 
var token = getCookie("token");
headers.append('Authorization', token); 
headers.append('Content-Type', "application/json");

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

var fullStatement;

function getfullStatement() {
  var fullStatementContainer = document.getElementById("table-body-fullStatement");
  var id = getCookie("subscriptionId");

  fetch(`${domainName}/sts/entry/fullstatment/${id}`, {
    method: 'GET',
    headers: headers
  })
    .then(response => response.json())
    .then(data => {
      fullStatement = data.data;
      fullStatementContainer.innerHTML = "";
      fullStatement.forEach(fullStatement=> {
        const element = document.createElement('tr');
        element.innerHTML = `
            <td>${fullStatement.firstName} ${fullStatement.lastName}</td>
            <td>${fullStatement.category}</td>
            <td>${fullStatement.entryName}</td>
            <td>${fullStatement.entryFees}</td>
        `;
        element.setAttribute('id', `fullStatement-${fullStatement._id}`);
        fullStatementContainer.appendChild(element);
      });
    })
    .catch(error => console.log(error));
}

getfullStatement();

document.getElementById("search").addEventListener("input", handleSearch);

function handleSearch() {
  var searchQuery = document.getElementById("search").value.toLowerCase();
  var rows = document.querySelectorAll("#table-body-fullStatement tr");

  rows.forEach(function (row) {
    var cells = row.getElementsByTagName("td");
    var shouldShowRow = false;

    Array.from(cells).forEach(function (cell) {
      if (cell.textContent.toLowerCase().includes(searchQuery)) {
        shouldShowRow = true;
      }
    });

    if (shouldShowRow) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}


changeTheme(themesCharctaristic[localStorage.getItem('theme')]);