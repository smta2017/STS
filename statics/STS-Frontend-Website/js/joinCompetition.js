function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
  }

var selectedOptionsCompetition = "";

function getAllCompetition() {
    var allCompetition = document.querySelector('#joinCompetitionName');
    try {
        document.getElementById("gif").style.display ="block"
        fetch(`${domainName}/sts/competition/opentoregisteration`, {
            method: 'GET',
            headers: {'Authorization': token},
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
            });
            document.getElementById("gif").style.display = "none";
        })
        .catch(error => {
            console.log(error);
            document.getElementById("gif").style.display = "none";
          });
    } catch (error) {
        console.log(error);
    }
}

getAllCompetition();

function getAllJoinedCompetition() {
    var allJoinedCompetition = document.querySelector('#joinedCompetitionName');
    try {
        document.getElementById("gif").style.display ="block"
        fetch(`${domainName}/sts/subscription`, {
            method: 'GET',
            headers: {'Authorization': token},
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
                button.onclick = function () { goToHome(competitions.competition._id,competitions._id,competitions.competition.type,competitions.competition.stopSubscription,competitions.competition.showSchedule,competitions.competition.showResults,competitions.competition.finished,competitions.paid) };
                allJoinedCompetition.appendChild(button);
            });
            document.getElementById("gif").style.display = "none";
        })
        .catch(error => {
            console.log(error);
            document.getElementById("gif").style.display = "none";
          });
    } catch (error) {
        console.log(error);
    }
}

getAllJoinedCompetition();


var competitionsData;
function showCompetitionsData() {
    var competitionsContainer = document.getElementById("Showcompetitions");
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/competition/opentoregisteration`, {
        method: 'GET',
        headers: {'Authorization': token},
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
                            <h6 class="card-title fw-bold text-light">Admission</h6>
                            <p class="ms-2">${startSubscription} to ${endSubscription}</p>
                            <h6 class="card-title fw-bold text-light">Location Display your Show</h6>
                            <p class="ms-2">${competitions.stage}</p>
                            <h6 class="card-title fw-bold text-light">Date Display your Show</h6>
                            <p class="ms-2">${date}</p>
                        </div>
                    </div>
                `;
                competitionsContainer.appendChild(element);
            });
            document.getElementById("gif").style.display = "none";
        })
        .catch(error => {
            console.log(error);
            document.getElementById("gif").style.display = "none";
          });
}

showCompetitionsData();

// function setCookie(name, value) {
//     document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; path=/';
//   }

function joinCompetitions(e) {
    e.preventDefault();
    let id = e.target.id; // Extract competition ID from event target's ID
    console.log(id);
    try {
        document.getElementById("gif").style.display ="block"
        fetch(`${domainName}/sts/subscription/${id}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" , 'Authorization': token},
        })
        .then(response => response.json())
        .then(data => {
            competitionJoin = data.data;
            console.log("joined successfully");
            setCookie("subscriptionId", competitionJoin._id);
            setCookie("competition", competitionJoin.competition._id);
            setCookie("type", competitionJoin.competition.type);
            setCookie("stopSubscription", competitionJoin.competition.stopSubscription);
            setCookie("showSchedule", competitionJoin.competition.showSchedule);
            setCookie("showResults", competitionJoin.competition.showResults);
            setCookie("finished", competitionJoin.competition.finished);
            setCookie("paid", competitionJoin.paid);
            window.location.hash = "";
            window.location.reload();
            document.getElementById("gif").style.display = "none";
            responseAlert(data);
        })
        .catch(error => {
            console.log(error);
            document.getElementById("gif").style.display = "none";
            responseAlert(error);
        });
    } catch (error) {
        console.log(error);
    }
}

function goToHome(competitionID,subscriptionID,type,stopSubscription,showSchedule,showResults,finished,paid) {
    setCookie("competition", competitionID);
    setCookie("subscriptionId", subscriptionID);
    setCookie("type", type);
    setCookie("stopSubscription", stopSubscription);
    setCookie("showSchedule", showSchedule);
    setCookie("showResults", showResults);
    setCookie("finished", finished);
    setCookie('paid', paid);
    window.location.hash = "";
    window.location.reload();
}