var headers = new Headers();
var token = localStorage.getItem("token");
headers.append("Authorization", token);
headers.append("Content-Type", "application/json");

changeTheme(themesCharctaristic[localStorage.getItem("theme")]);
var fullSchadualData;

function getfullSchadualData() {
    var fullSchadualContainer = document.getElementById("fullSchadual-table");
    var id = localStorage.getItem("competition");
    // var theme = `${domainName}/sts/entry/completeschedule/${id}`;

    fetch(`${domainName}/sts/entry/completeschedule/${id}`, {
        method: "GET",
        headers: headers,
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            fullSchadualData = data.data;
            fullSchadualContainer.innerHTML = "";
            fullSchadualData.forEach((fullSchadual) => {
                const element = document.createElement("tr");
                element.innerHTML = `
              <td>${fullSchadual.apiStatus}</td>
              <td>${fullSchadual.apiStatus}</td>
              <td>${fullSchadual.apiStatus}</td>
          `;
                element.setAttribute("id", `fullSchadual-${fullSchadual._id}`);
                fullSchadualContainer.appendChild(element);
            });
        })
        .catch((error) => console.log(error));
}

getfullSchadualData();
