// COMPATATORS //

function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
} 

function calculateAge(dateString) {
  var birthday = new Date(dateString);
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}


var competitorsData;

function getCompetitorsData() {
    const type = getCookie("type");
    const year = getCookie("year");
    document.getElementById("competionName").innerHTML = `${type}-${year}`;

    var competitorsContainer = document.getElementById("table-body-compatatorsA");
    var id = getCookie("competition");
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/competitor/allcompetition/${id}`, {
      method: 'GET',
      headers: {'Authorization': token},
    })
      .then(response => response.json())
      .then(data => {
        competitorsData = data.data;
        competitorsContainer.innerHTML = "";
        competitorsData.forEach(competitor=> {
          const element = document.createElement('tr');
          // const age = calculateAge(`${competitor.dateOfBirth}`)
          const date = `${competitor.dateOfBirth}`.split("T")[0];
          element.innerHTML = `
              <td>${competitor.firstName}</td>
              <td>${competitor.lastName}</td>
              <td>${competitor.qualifierSubscription.academy.academyDetails.schoolName}</td>
              <td>${competitor.category}</td>
              <td>${date}</td>
              <td>${competitor.gender}</td>
              <td>${competitor.email}</td>
              <td>${competitor.mobileNumber}</td>
              
          `;
          element.setAttribute('id', `competitor-${competitor._id}`);
          if (getCookie('type') === "final"){
            if (competitor.passedQualifiers === true){
              element.style.backgroundColor = "#198754";
            }
          }
          competitorsContainer.appendChild(element);
        });
        document.getElementById("gif").style.display = "none";
    })
    .catch(error => {
      console.log(error);
      document.getElementById("gif").style.display = "none";
    }); 
}
  
getCompetitorsData();


function handleSearch() {
  var searchQuery = document.getElementById('search').value.toLowerCase();
  var rows = document.querySelectorAll('#table-body-compatatorsA tr');

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
// COMPATATORS //