// SCHOOL //

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
}

// function setCookie(name, value) {
//     document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; path=/';
// }


var schoolsData;

function getSchoolsData() {
    var schoolsContainer = document.getElementById("table-body-schools");
    const competitionId = getCookie("competition")
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/subscription/${competitionId}`, {
        method: 'GET',
        headers: {'Authorization': token},
    })
        .then(response => response.json())
        .then(data => {
            schoolsData = data.data;
            schoolsContainer.innerHTML = "";
            schoolsData.forEach(competitor=> {
                const element = document.createElement('tr');
                element.innerHTML = `
                    <td>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" style="cursor:pointer" viewBox="0 0 16 16" >
                            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" id="${competitor._id}_${competitor.academy._id}" onclick="compatatorsAS(event)"/>
                        </svg>
                    </td>
                    <td>${competitor.academy.academyDetails.schoolName}</td>
                    <td>${competitor.academy.firstName} ${competitor.academy.lastName}</td>
                    <td>${competitor.academy.email}</td>
                    <td>${competitor.academy.academyDetails.country.countryName}</td>
                    <td>${competitor.academy.academyDetails.schoolLocation.street}</td>
                `;
                element.setAttribute('id', `competitor-${competitor._id}`);
                schoolsContainer.appendChild(element);
            });
            document.getElementById("gif").style.display = "none";
        })
        .catch(error => {
            console.log(error);
            document.getElementById("gif").style.display = "none";
          }); 
}
                
getSchoolsData();

                    
function compatatorsAS(e){
    setCookie("subscriptionId" ,e.target.id.split("_")[0])
    setCookie("schoolID" , e.target.id.split("_")[1])
    window.location.hash = "#compatatorsAS"
}


function handleSearch() {
    var searchQuery = document.getElementById('search').value.toLowerCase();
    var rows = document.querySelectorAll('#table-body-schools tr');
  
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
// SCHOOL //