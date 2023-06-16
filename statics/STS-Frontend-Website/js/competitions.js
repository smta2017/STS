function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
}

function setCookie(name, value) {
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; path=/';
}


var headers = new Headers(); 
var token = getCookie('token'); 
headers.append('Authorization', token); 
headers.append('Content-Type', "application/json");


function getAllJoinedCompetition() {
    var allJoinedCompetition = document.querySelector('#joinedCompetitionName');
    try {
        fetch(`${domainName}/sts/subscription`, {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(data => {
            allJoinedCompetition.innerHTML = "";
            data.data.forEach(competitions => {
                const button = document.createElement('button');
                button.className = "dropdown-item";
                button.id = competitions.competition._id;
                button.value = competitions._id;
                button.textContent =`${competitions.competition.type} - ${competitions.competition.year}`;
                button.onclick = function () { goToHome(competitions._id) };
                allJoinedCompetition.appendChild(button);
            });
        })
        .catch(error => console.log(error));
    } catch (error) {
        console.log(error);
    }
}

function goToHome(valueID) {
    setCookie("subscriptionId", valueID);
    window.location.hash = "#compatators";
    window.location.reload();
}

getAllJoinedCompetition();


