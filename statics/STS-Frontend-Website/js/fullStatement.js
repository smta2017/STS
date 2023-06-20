function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
}

function generatePDF() {
  // Get the HTML table element
  var table = document.getElementById('table-fullStatement');

  // Open a new window for the print preview
  var win = window.open('', '_blank');

  // Create a new document in the new window
  win.document.write('<html><head><title>Full Statement Table</title></head><body>');
  win.document.write('<style>table { border-collapse: collapse; } th, td { border: 2px solid black; padding: 8px; }</style>');
  win.document.write('<h1>Full Statement Table</h1>');
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
  document.getElementById("gif").style.display ="block"
  fetch(`${domainName}/sts/entry/fullstatment/${id}`, {
    method: 'GET',
    headers: {'Authorization': token},
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
    document.getElementById("gif").style.display ="none"
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