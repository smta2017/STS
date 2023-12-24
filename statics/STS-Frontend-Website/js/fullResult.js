function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
}
  

var fullResultData;

function getFullResultData() {
    var fullResultContainer = document.getElementById("table-body-fullResult");
    var id = getCookie('competition');
    var type = getCookie('type');
    document.getElementById("gif").style.display ="block"

    fetch(`${domainName}/sts/entry/completeresult/${id}`, {
        method: "GET",
        headers: {'Authorization': token},
    })
        .then((response) => response.json())
        .then((data) => {
            fullResultData = data.data;
            fullResultContainer.innerHTML = "";
            fullResultData.forEach(fullResult => {
                const element = document.createElement("tr");
                element.innerHTML = `
                    <td>${fullResult.qualifierSubscription.academy.academyDetails.schoolName}</td>
                    <td>${fullResult.name}</td>
                    <td>${fullResult[type + "TotalDegree"]} %</td>
                    <td>${fullResult[type + "TotalDegree"] >= 70 ? "Passed" : "Failed"}</td>
                `;
                element.setAttribute("id", `fullResult-${fullResult._id}`);

                if (fullResult[type + "TotalDegree"] >= 70) {
                    element.style.backgroundColor = "#198754";
                }

                fullResultContainer.appendChild(element);
            });
            document.getElementById("gif").style.display ="none"
        })
        .catch(function (error) {
            console.log('Error:', error);
            document.getElementById("gif").style.display ="none"
          });
}

getFullResultData();

function handleSearch() {
    var searchQuery = document.getElementById("search").value.toLowerCase();
    var rows = document.querySelectorAll("#table-body-fullResult tr");
  
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