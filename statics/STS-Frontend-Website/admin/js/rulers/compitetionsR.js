function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
}
deleteCookie("entryDegree"); 


var competitionsData;

function getCompetitionsData() {
    var competitionsContainer = document.getElementById("ShowCompetitionsR");
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/competition/forrefree`, {
        method: 'GET',
        headers: {'Authorization': token},
    })
        .then(response => response.json())
        .then(data => {
            competitionsData = data.data;
            competitionsContainer.innerHTML = "";
            data.data.forEach(competitions => {
                const element = document.createElement('div');
                element.className = "rounded-3 col-12 col-md-6 col-lg-4 text-light pt-2 bg-dark mb-2 mx-auto"
                element.id = `competitions_${competitions._id}`;

                const startSubscription = `${competitions.startSubscription}`.split("T")[0];
                const endSubscription = `${competitions.endSubscription}`.split("T")[0];
                const date = `${competitions.date}`.split("T")[0];

                element.innerHTML = `
                    <div class="photo">
                        <img src="${domainName}/${competitions.poster}" class="w-100">
                    </div>

                    <div class="footer">
                        <a href="#showEntries" class="btn btn-warning w-100 text-dark" id="${competitions._id}" onclick="storeID('${competitions._id}','${competitions.type}','${competitions.year}')" >Go Entry to Put Degree</a>
                    </div>

                    <h3 class="text-center pt-3 bg-dark">${competitions.type} - ${competitions.year}</h3>
                    <div class="content">
                        <div class="text-center">
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

getCompetitionsData();

// function setCookie(name, value) {
//     document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; path=/';
//   }

function storeID(id,type,year) {
    setCookie("entryDegree" , id)
    setCookie("type" , type)
    setCookie("year" , year)
}