function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
}

// function setCookie(name, value) {
//     document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; path=/';
// }

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
            document.getElementById("gif").style.display ="none"
        })
        .catch(function (error) {
            console.log('Error:', error);
            document.getElementById("gif").style.display ="none"
        });
    } catch (error) {
        console.log(error);
    }
}

function goToHome(competitionID,subscriptionID,type,stopSubscription,showSchedule,showResults,finished,paid) {
    setCookie("competition", competitionID);
    // setCookie("subscriptionId", subscriptionID);
    const sub_date=new Date()
    sub_date.setTime(sub_date.getTime() + (60*60*1000))
    const expires=getCookie('expirationDate')?getCookie('expirationDate'):"expires=" +sub_date.toUTCString()
    document.cookie = "subscriptionId=" + subscriptionID+ ";"+ expires ;
    setCookie("type", type);
    setCookie("stopSubscription", stopSubscription);
    setCookie("showSchedule", showSchedule);
    setCookie("showResults", showResults);
    setCookie("finished", finished);
    setCookie('paid', paid);
    window.location.hash = "#compatators";
    window.location.reload();
}

getAllJoinedCompetition();


