function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
}
  
function generatePDF() {
    // Get the HTML table element
    var table = document.getElementById('academyResult-table');
  
    // Open a new window for the print preview
    var win = window.open('', '_blank');
  
    // Create a new document in the new window
    win.document.write('<html><head><title>Academy Result Table</title></head><body>');
    win.document.write('<style>table { border-collapse: collapse; } th, td { border: 2px solid black; padding: 8px; }</style>');
    win.document.write('<h1>Academy Result Table</h1>');
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


var academyResultData;

function getAcademyResultData() {
    var academyResultContainer = document.getElementById("table-body-academyResult");
    var id = getCookie('subscriptionId');
    var type = getCookie('type');
    document.getElementById("gif").style.display ="block"

    fetch(`${domainName}/sts/entry/myresult/${id}`, {
        method: "GET",
        headers: {'Authorization': token},
    })
        .then((response) => response.json())
        .then((data) => {
            academyResultData = data.data;
            academyResultContainer.innerHTML = "";
            academyResultData.forEach(academyResult => {
                const element = document.createElement("tr");
                element.innerHTML = `
                    <td>${academyResult.name}</td>
                    <td>${academyResult[type + "TotalDegree"]} %</td>
                    <td class="passed">${academyResult[type + "TotalDegree"] >= 70 ? "Passed" : "Failed"}</td>
                `;
                element.setAttribute("id", `academyResult-${academyResult._id}`);

                if (academyResult[type + "TotalDegree"] >= 70) {
                    element.style.backgroundColor = "#198754";
                }
                academyResultContainer.appendChild(element);
            });
            document.getElementById("gif").style.display = "none";
          })
          .catch(error => {
            console.log(error);
            document.getElementById("gif").style.display = "none";
          });
}

getAcademyResultData();

function handleSearch() {
    var searchQuery = document.getElementById("search").value.toLowerCase();
    var rows = document.querySelectorAll("#table-body-academyResult tr");
  
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