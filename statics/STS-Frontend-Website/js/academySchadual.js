function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
  }
  
var headers = new Headers(); 
var token = getCookie("token");
headers.append('Authorization', token); 
headers.append('Content-Type', "application/json");
  
changeTheme(themesCharctaristic[localStorage.getItem("theme")]);
var academySchadualData;

function getacademySchadualData() {
    var academySchadualContainer = document.getElementById("academySchadual-table");
    var id = getCookie('subscriptionId');
    // var theme = `${domainName}/sts/entry/schedual/${id}`;

    fetch(`${domainName}/sts/entry/schedual/${id}`, {
        method: "GET",
        headers: headers,
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            academySchadualData = data.data;
            academySchadualContainer.innerHTML = "";
            academySchadualData.forEach((academySchadual) => {
                const element = document.createElement("tr");
                element.innerHTML = `
              <td>${academySchadual.name}</td>
              <td>${academySchadual.qualifierSubscription.subscriptionDate}</td>
          `;
                element.setAttribute("id", `academySchadual-${academySchadual._id}`);
                academySchadualContainer.appendChild(element);
            });
        })
        .catch((error) => console.log(error));
}

getacademySchadualData();
