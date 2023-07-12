// SCHOOL //

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
}

var schoolsData;
function getSchoolsData() {
    const type = getCookie("type");
    const year = getCookie("year");
    document.getElementById("competionName").innerHTML = `${type}-${year}`;

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
            data.data.forEach(competitor=> {
              console.log(data.data)
                const element = document.createElement('tr');
                const paidStatus = document.createElement('td');
                if(competitor.paid == true){
                  paidStatus.textContent = "Paid";
                  paidStatus.classList.add("bg-success", "text-white");
                }else{
                  paidStatus.textContent = "Not Paid";
                  paidStatus.classList.add("bg-danger", "text-white");
                }
                element.innerHTML = `
                    <td>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" style="cursor:pointer" viewBox="0 0 16 16">
                            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" id="${competitor._id}_${competitor.academy._id}-${competitor.academy.academyDetails.schoolName}" onclick="compatatorsAS(event)"/>
                        </svg>
                    </td>
                    <td>${competitor.academy.academyDetails.schoolName}</td>
                    <td>${competitor.academy.firstName} ${competitor.academy.lastName}</td>
                    <td>${competitor.academy.email}</td>
                    <td>${competitor.academy.academyDetails.country.countryName}</td>
                    <td>${competitor.academy.academyDetails.schoolLocation.street}</td>
                    <td>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0
                          M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z
                          M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z
                          M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" 
                          id="${competitor._id}_${competitor.academy._id}-${competitor.academy.academyDetails.schoolName}" 
                          onclick="paymentsAS(event)" style="cursor:pointer;"/>
                      </svg>
                    </td>
                `;
                element.appendChild(paidStatus);
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
    const schoolID = e.target.id.split("_")[1]
    setCookie("subscriptionId" ,e.target.id.split("_")[0])
    setCookie("schoolID" , schoolID.split("-")[0])
    setCookie('schoolName', e.target.id.split("-")[1])
    window.location.hash = "#compatatorsAS"
}


function paymentsAS(e){
    const schoolID = e.target.id.split("_")[1]
    setCookie("subscriptionId" ,e.target.id.split("_")[0])
    setCookie("schoolID" , schoolID.split("-")[0])
    setCookie('schoolName', e.target.id.split("-")[1])
    window.location.hash = "#paymentA"
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