function getCookie(name) {
  const cookieValue = document.cookie.match(
    "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
  );
  return cookieValue ? cookieValue.pop() : null;
}

var headers = new Headers();
var token = getCookie("token");
headers.append("Authorization", token);
headers.append("Content-Type", "application/json");

function generatePDF() {
  // Get the HTML table element
  var table = document.getElementById("compatators-table");

  // Open a new window for the print preview
  var win = window.open("", "_blank");

  // Create a new document in the new window
  win.document.write(
    "<html><head><title>Compatators Table</title></head><body>"
  );
  win.document.write(
    "<style>table { border-collapse: collapse; } th, td { border: 2px solid black; padding: 8px; }</style>"
  );
  win.document.write("<h1>Compatators Table</h1>");
  win.document.write(table.outerHTML); // Write the table HTML to the new document
  win.document.write("</body></html>");

  // Close the document
  win.document.close();

  // Wait for the document to summaryy load before printing
  win.onload = function () {
    // Print the document
    // win.print();
    // Close the print preview window after printing
    // win.close();
  };
}

document.getElementById("generate-pdf").addEventListener("click", generatePDF);

var summaryStatement;

function getsummaryStatement() {
  var summaryStatementContainer = document.getElementById(
    "table-body-summaryStatement"
  );
  var id = getCookie("subscriptionId");

  fetch(`${domainName}/sts/entry/mystatment/${id}`, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      summaryStatement = data.data;
      summaryStatementContainer.innerHTML = "";
      summaryStatement.forEach((summaryStatement) => {
        const element = document.createElement("tr");
        element.innerHTML = `
              <td>${summaryStatement.name}</td>
              <td>${summaryStatement.totalFees}</td>
          `;
        element.setAttribute("id", `summaryStatement-${summaryStatement._id}`);
        summaryStatementContainer.appendChild(element);
      });
    })
    .catch((error) => console.log(error));
}

getsummaryStatement();

document.getElementById("search").addEventListener("input", handleSearch);

function handleSearch() {
  var searchQuery = document.getElementById("search").value.toLowerCase();
  var rows = document.querySelectorAll("#table-body-summaryStatement tr");

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
