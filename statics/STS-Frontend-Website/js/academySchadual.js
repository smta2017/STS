function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
}

function generatePDF() {
    // Get the HTML table element
    var table = document.getElementById('academySchadual-table');
  
    // Open a new window for the print preview
    var win = window.open('', '_blank');
  
    // Create a new document in the new window
    win.document.write('<html><head><title>Academy Schadual Table</title></head><body>');
    win.document.write('<style>table { border-collapse: collapse; } th, td { border: 2px solid black; padding: 8px; }</style>');
    win.document.write('<h1>Academy Schadual Table</h1>');
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

var academySchadualData;

function getacademySchadualData() {
    var academySchadualContainer = document.getElementById("table-body-academySchadual");
    var id = getCookie('subscriptionId');
    var type = getCookie('type');
    document.getElementById("gif").style.display ="block"

    fetch(`${domainName}/sts/entry/schedual/${id}`, {
        method: "GET",
        headers: {'Authorization': token},
    })
        .then((response) => response.json())
        .then((data) => {
            academySchadualData = data.data;
            academySchadualContainer.innerHTML = "";
            academySchadualData.forEach(academySchadual => {
                const element = document.createElement("tr");
                const date = `${academySchadual[type + "ShowDate"]}`.split("T")[0];
                const time = `${academySchadual[type + "ShowDate"]}`.split("T")[1].split("Z")[0];
                element.innerHTML = `
                    <td>${academySchadual.name}</td>
                    <td>${date} / ${time}</td>
                `;
                element.setAttribute("id", `academySchadual-${academySchadual._id}`);
                academySchadualContainer.appendChild(element);
            });
        document.getElementById("gif").style.display = "none";
    })
    .catch(error => {
      console.log(error);
      document.getElementById("gif").style.display = "none";
    });
}

getacademySchadualData();

function handleSearch() {
    var searchQuery = document.getElementById("search").value.toLowerCase();
    var rows = document.querySelectorAll("#table-body-academySchadual tr");
  
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

changeTheme(themesCharctaristic[localStorage.getItem("theme")]);