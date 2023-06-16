
function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
  }

var selectedOptionsCompetition = "";
var headers = new Headers(); 
var token = getCookie('token'); 
headers.append('Authorization', token); 
headers.append('Content-Type', "application/json");

function getAllCompetition() {
    var allCompetition = document.querySelector('#joinCompetitionName');
    try {
        fetch(`${domainName}/sts/competition/opentoregisteration`, {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(data => {
            allCompetition.innerHTML = "";
            data.data.forEach(competitions => {
                const button = document.createElement('button');
                button.className = "dropdown-item";
                button.id = competitions._id;
                button.value = competitions._id;
                const span = document.createElement('span');
                span.className = "pe-5 fs-5";
                span.textContent = `${competitions.type} - ${competitions.year}`;
                const anchor = document.createElement('a');
                anchor.className = "bg-success text-light rounded-1 p-1 btn";
                anchor.id = competitions._id;
                anchor.value = competitions._id;
                anchor.textContent = "Join";
                anchor.onclick = joinCompetitions;
                button.appendChild(span);
                button.appendChild(anchor);
                allCompetition.appendChild(button);

                console.log(competitions._id);
            });
        })
        .catch(error => console.log(error));
    } catch (error) {
        console.log(error);
    }
}

getAllCompetition();

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

getAllJoinedCompetition();


var competitionsData;
function showCompetitionsData() {
    var competitionsContainer = document.getElementById("Showcompetitions");
    fetch(`${domainName}/sts/competition/opentoregisteration`, {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then(data => {
            competitionsData = data.data;
            competitionsContainer.innerHTML = "";
            data.data.forEach(competitions => {
                const element = document.createElement('div');
                element.className = "card col-11 col-md-6 col-lg-4 bg-dark text-light pt-2 mx-auto"
                element.style.backgroundColor = "#ffffff00";
                element.style.borderColor = "white";
                element.id = `competitions_${competitions._id}`

                const startSubscription = `${competitions.startSubscription}`.split("T")[0];
                const endSubscription = `${competitions.endSubscription}`.split("T")[0];
                const date = `${competitions.date}`.split("T")[0];

                element.innerHTML = `
                <div class="photo">
                    <img src="${domainName}/${competitions.poster}" class="w-100">
                </div>

                <div class="footer">
                    <a class="btn btn-warning w-100 text-dark" id="${competitions._id}" 
                        onclick="joinCompetitions(event)">Join Competition</a>
                </div>

                <h3 class="text-center mt-3">${competitions.type} - ${competitions.year}</h3>
                <div class="content p-3 text-center">
                    <div>
                        <label class="card-title fw-bold text-light">Admission</label>
                        <p class="ms-2">${startSubscription} to ${endSubscription}</p>
                        <label class="card-title fw-bold text-light">Location Display your Show</label>
                        <p class="ms-2">${competitions.stage}</p>
                        <label class="card-title fw-bold text-light">Date Display your Show</label>
                        <p class="ms-2">${date}</p>
                    </div>
                </div>
                `;
                competitionsContainer.appendChild(element);
            });
        })
        .catch(error => console.log(error));
}

showCompetitionsData();

function setCookie(name, value) {
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; path=/';
  }

function joinCompetitions(e) {
    console.log("enter");
    e.preventDefault();
    console.log("join");
    let id = e.target.id; // Extract competition ID from event target's ID
    console.log(id);
    try {
        fetch(`${domainName}/sts/subscription/${id}`, {
            method: 'POST',
            headers: headers
        })
        .then(response => response.json())
        .then(data => {
            competitionJoin = data.data;
            console.log("joined successfully");
            setCookie("subscriptionId", competitionJoin._id);
            window.location.hash = "";
            window.location.reload();
            })
            .catch(error => console.error(error));
    } catch (error) {
        console.log(error);
    }
}

function goToHome(valueID) {
    setCookie("subscriptionId", valueID);
    window.location.hash = "";
    window.location.reload();
}