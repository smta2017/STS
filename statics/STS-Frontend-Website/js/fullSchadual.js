function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
}

var fullSchadualData;

function getfullSchadualData() {
    var fullSchadualContainer = document.getElementById("table-body-fullSchadual");
    var id = getCookie('competition');
    var type = getCookie('type');
    document.getElementById("gif").style.display ="block"

    fetch(`${domainName}/sts/entry/completeschedule/${id}`, {
        method: "GET",
        headers: {'Authorization': token},
    })
        .then((response) => response.json())
        .then((data) => {
            fullSchadualData = data.data;
            fullSchadualContainer.innerHTML = "";
            fullSchadualData.forEach(fullSchadual => {
                const element = document.createElement("tr");  
                const date = `${fullSchadual[type + "ShowDate"]}`.split("T")[0];
                const time = `${fullSchadual[type + "ShowDate"]}`.split("T")[1].split("Z")[0];
                element.innerHTML = `
                    <td>${fullSchadual.name}</td>
                    <td>${fullSchadual.qualifierSubscription.academy.academyDetails.schoolName}</td>
                    <td>${date} / ${time}</td>
                `;
                element.setAttribute("id", `fullSchadual-${fullSchadual._id}`);
                fullSchadualContainer.appendChild(element);
            });
            document.getElementById("gif").style.display ="none"
        })
        .catch(function (error) {
            console.log('Error:', error);
            document.getElementById("gif").style.display ="none"
          });
}

getfullSchadualData();

function handleSearch() {
    var searchQuery = document.getElementById("search").value.toLowerCase();
    var rows = document.querySelectorAll("#table-body-fullSchadual tr");
  
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