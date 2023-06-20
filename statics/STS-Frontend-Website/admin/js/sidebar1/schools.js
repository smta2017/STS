// SCHOOL //

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
}

function setCookie(name, value) {
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; path=/';
}


var schoolsData;

function getSchoolsData() {
    console.log("data.data")

    var schoolsContainer = document.getElementById("table-body-schools");
    const competitionId = getCookie("competition")
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
                        <a id="${competitor._id}" name="${competitor.academy._id}" onclick="compatatorsAS(event)" class="text-light " style="cursor:pointer">
                            <i class="fas fa-home"></i>
                        </a>
                    </td>
                    <td>${competitor.academy.academyDetails.schoolName}</td>
                    <td>${competitor.academy.firstName} ${competitor.academy.lastName} </td>
                    <td>${competitor.academy.email}</td>
                    <td>${competitor.academy.academyDetails.country}</td>
                    <td>${competitor.academy.academyDetails.schoolLocation.street}</td>
                `;
                element.setAttribute('id', `competitor-${competitor._id}`);
                schoolsContainer.appendChild(element);
            });
        })
            .catch(error => alert(error));
}
                
getSchoolsData();

                    
function compatatorsAS(e){
    setCookie("subscriptionId" ,e.target.parentElement.id )
    setCookie("schoolID" , e.target.parentElement.name)
    window.location.hash = "#compatatorsAS"
}

// SCHOOL //