function previewImage(event) {
    const input = event.target;
    const imgPreview = document.getElementById("imgPreview");
     if (input.files && input.files[0]) {
        const reader = new FileReader();
         reader.onload = function (e) {
            imgPreview.src = e.target.result;
            imgPreview.style.display = "block";
        };
         reader.readAsDataURL(input.files[0]);
    } else {
        imgPreview.src = "";
        imgPreview.style.display = "none";
    }
}



var selectedOptionsCountry = "";

function getAllCountries() {
    var allCountry = document.querySelector('#countries');

    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/country/all`, {
    method: 'GET',
    headers: {'Authorization': token},
    })
    .then(response => response.json())
    .then(data => {
        allCountry.innerHTML = "";
        const chooseOption = document.createElement('option');
        chooseOption.value = "-1";
        chooseOption.disabled = true;
        chooseOption.selected = true;
        chooseOption.textContent = "Select Country";
        allCountry.appendChild(chooseOption);
        data.data.forEach(countries => {
        const option = document.createElement('option');
        option.id = countries._id;
        option.value = countries._id;
        option.textContent = countries.countryName;
        allCountry.appendChild(option);
        });
        document.getElementById("gif").style.display = "none";
    })
    .catch(error => {
        console.log(error);
        document.getElementById("gif").style.display = "none";
      }); 
}

document.getElementById("selectType").onchange = function() {
    const selectedOption = this.value;
    const countriesSelect = document.getElementById("countries");
    const labelCountry = document.getElementById("labelCountry");
  
    if (selectedOption === "final") {
        labelCountry.style.display = "none";
        countriesSelect.style.display = "none";
    } else {
        labelCountry.style.display = "block";
        countriesSelect.style.display = "block";
        getAllCountries();
    }
};

var competitionsData;

function getCompetitionsData() {
    var competitionsContainer = document.getElementById("Addcompetitions");
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/competition/all`, {
        method: 'GET',
        headers: {'Authorization': token},
    })
        .then(response => response.json())
        .then(data => {
            competitionsData = data.data;
            competitionsContainer.innerHTML = "";
            data.data.forEach(competitions => {
                const element = document.createElement('div');
                element.className = " rounded-3 col-11 col-sm-12 col-lg-6 text-light pt-2 bg-dark mb-2 mx-auto"
                element.id = `competitions_${competitions._id}`

                const startSubscription = `${competitions.startSubscription}`.split("T")[0];
                const endSubscription = `${competitions.endSubscription}`.split("T")[0];
                const date = `${competitions.date}`.split("T")[0];

                element.innerHTML = `
                <div class="photo ">
                    <img src="${domainName}/${competitions.poster}" class="w-100">
                </div>

                <div class="footer">
                    <a class="btn btn-warning w-100 text-dark" id="${competitions.type} - ${competitions.year}" onclick="goToSchool(event)" >Show Competition Details</a>
                </div>

                <h3 class="text-center pt-3 bg-dark">${competitions.type} - ${competitions.year}</h3>
                <div class="content row ">
                    <div class="col-6  ">
                        
                        <h6 class="card-title fw-bold text-light">Admission</h6>
                        <p class="ms-2">${startSubscription} to ${endSubscription}</p>
                        <h6 class="card-title fw-bold text-light">Location Display your Show</h6>
                        <p class="ms-2">${competitions.stage}</p>
                        <h6 class="card-title fw-bold text-light">Date Display your Show</h6>
                        <p class="ms-2">${date}</p>


                        <div class="btn_group ms-3 mb-3 col-12">
                        <button class="btn btn-success me-3" id="add-row"
                            onclick="editCompetitions('${competitions._id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="edit-btn bi bi-pen-fill" viewBox="0 0 16 16" s>
                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                            </svg>
                        </button>
                        <button class="btn btn-danger" id="remove-row"
                            onclick="deleteCompetitions('${competitions._id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>
                    </div>


                    </div>
                    <div class="col-6 ">
                        <form class="col-12 text-start" onsubmit="opentoregisteration(event)">
                            <input type="hidden" value="${competitions._id}">
                            <div class="form-group mb-2">
                                <input class="me-3" type="checkbox" name="stopSubscription"
                                    id="stopSubscription_${competitions._id}">
                                <label for="stopSubscription_${competitions._id}" class="fw-bold text-light">Stop Subscription</label>
                            </div>
                            <div class="form-group mb-2">
                                <input class="me-3" type="checkbox" name="showSchedule"
                                    id="showSchedule_${competitions._id}">
                                <label for="showSchedule_${competitions._id}" class="fw-bold text-light">Show Schedule</label>
                            </div>
                            <div class="form-group mb-2">
                                <input class="me-3" type="checkbox" name="showResults"
                                    id="showResults_${competitions._id}">
                                <label for="showResults_${competitions._id}" class="fw-bold text-light">Show Results</label>
                            </div>
                            <div class="form-group mb-2">
                                <input class="me-3" type="checkbox" name="enableRefree"
                                    id="enableRefree_${competitions._id}">
                                <label for="enableRefree_${competitions._id}" class="fw-bold text-light">Enable Refree</label>
                            </div>
                            <div class="form-group mb-2">
                                <input class="me-3" type="checkbox" name="finished" id="finished_${competitions._id}">
                                <label for="finished_${competitions._id}" class="fw-bold text-light">Finished</label>
                            </div>
                            <div class="form-group mt-4">
                                <input type="submit" class="form-control btn btn-primary" id="submitForm-${competitions._id}">
                            </div>
                        </form>
                    </div>
                </div>
                `;   
                competitionsContainer.appendChild(element);

                // document.querySelector(`#stopSubscription_${competitions._id}`).checked ;
                if(competitions.stopSubscription){
                    document.querySelector(`#stopSubscription_${competitions._id}`).setAttribute("checked",true);
                }
                // else{
                //     document.querySelector(`#stopSubscription_${competitions._id}`).setAttribute("checked",false);
                //     console.log(`not ok-${competitions.type} - ${competitions.year}`)
                // }
                if(competitions.showSchedule){
                    document.querySelector(`#showSchedule_${competitions._id}`).setAttribute("checked","true");
                }
                if(competitions.showResults){
                    document.querySelector(`#showResults_${competitions._id}`).setAttribute("checked","true");
                }
                if(competitions.enableRefree){
                    document.querySelector(`#enableRefree_${competitions._id}`).setAttribute("checked","true");
                }
                if(competitions.finished){
                    document.querySelector(`#finished_${competitions._id}`).setAttribute("checked","true");
                }

                
            });
            document.getElementById("gif").style.display = "none";
        })
        .catch(error => {
            console.log(error);
            document.getElementById("gif").style.display = "none";
          }); 
        }

getCompetitionsData();


function opentoregisteration(e) {
    e.preventDefault();
      
    let id = e.target[0].value;
    console.log(id);
  
    const formDataRegisteration = {
      stopSubscription:  document.getElementById(`stopSubscription_${id}`).checked,
      showSchedule:  document.getElementById(`showSchedule_${id}`).checked,
      showResults:  document.getElementById(`showResults_${id}`).checked,
      enableRefree: document.getElementById(`enableRefree_${id}`).checked,
      finished:  document.getElementById(`finished_${id}`).checked
    };
    console.log(JSON.stringify(formDataRegisteration));
    try {
      document.getElementById("gif").style.display ="block"
      fetch(`${domainName}/sts/competition/${id}`, {
        method: 'PUT',
        headers: {'Authorization': token,"Content-Type": "application/json"},
        body: JSON.stringify(formDataRegisteration)
      })
      .then(response => response.json())
      .then(response => {
        if (response.apiStatus == true) {
          console.log("Congrats, you updated competition data successfully");
  
          getCompetitionsData();
          console.log( response.json())
        } else {
          throw new Error('Request failed.');
        }
        document.getElementById("gif").style.display = "none";
        responseAlert(response);
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
  

function editCompetitions(id) {
    var myCompetitions = competitionsData.find(competitions => { return competitions._id == id })
    document.getElementById("competitionsId").value = myCompetitions._id;
    document.getElementById("yearOfCompetition").value = myCompetitions.year;
    document.getElementById("selectType").value = myCompetitions.type;
    document.getElementById("countries").value = myCompetitions.country;
    document.getElementById("displayLocation").value = myCompetitions.stage;
    document.getElementById("displayTime").value = myCompetitions.date;
    document.getElementById("firsDay").value = myCompetitions.startSubscription;
    document.getElementById("lastDay").value = myCompetitions.endSubscription;
    document.querySelector('#imgPreview').src = myCompetitions.poster
    document.querySelector('#imgPreview').style.display = 'block'
}

function changeCompetitions(e) {
    e.preventDefault();

    let id = document.getElementById("competitionsId").value;

    const imageData = document.querySelector('#uploadImgForCompetition').files[0]
    const dateData = document.querySelector('#displayTime').value
    const startSubscriptionData = document.querySelector('#firsDay').value
    const endSubscriptionData = document.querySelector('#lastDay').value

    var formData = new FormData();
    formData.append('year', document.getElementById("yearOfCompetition").value);
    formData.append('type', document.getElementById("selectType").value);
    formData.append('stage', document.getElementById("displayLocation").value);
    if(document.querySelector("#displayTime").value){formData.append('date', dateData)};
    if(document.querySelector("#firsDay").value){formData.append('startSubscription', startSubscriptionData)};
    if(document.querySelector("#lastDay").value){formData.append('endSubscription', endSubscriptionData)};
    if(document.querySelector("#uploadImgForCompetition").files[0]){formData.append('poster', imageData)};

    if (document.getElementById("selectType").value === "qualifier") {
        const countryData = document.querySelector('#countries').value
        if(document.querySelector("#countries").value){formData.append('country', countryData)};
    }

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${domainName}/sts/competition/${id}` : `${domainName}/sts/competition`;
    try {
        document.getElementById("gif").style.display ="block"
        fetch(url, {
            method: method,
            headers: {'Authorization': token},
            body: formData,
        })
        .then(response => response.json())
            .then(response => {
                if (response.apiStatus == true) {
                    console.log(id ? "congrats, you updated competition data successfully" : "Data saved successfully");
                    document.getElementById("competitionsId").value = "";
                    document.getElementById("yearOfCompetition").value = "";
                    document.getElementById("selectType").value = "";
                    document.getElementById("countries").value = "";
                    document.getElementById("displayLocation").value = "";
                    document.getElementById("displayTime").value = "";
                    document.getElementById("firsDay").value = "";
                    document.getElementById("lastDay").value = "";
                    document.getElementById("uploadImgForCompetition").value = "";
                    document.getElementById("imgPreview").style.display = "none";

                    getCompetitionsData();
                } else {
                    throw new Error('Request failed.');
                }
                document.getElementById("gif").style.display = "none";
                responseAlert(response);
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

function deleteCompetitions(id) {
    if (id) {
        try {
            document.getElementById("gif").style.display ="block"
            fetch(`${domainName}/sts/competition/${id}`, {
                method: 'DELETE',
                headers: {'Authorization': token},
            })
                .then(response => {
                    if (response.status == 200) {
                        console.log("Competitions data deleted successfully");
                        getCompetitionsData();
                    } else {
                        throw new Error('Request failed.');
                    }
                    document.getElementById("gif").style.display = "none";
                    response.json().then(data => {
                        responseAlert(data);
                    });
                })
                .catch(error => {
                    console.log(error);
                    document.getElementById("gif").style.display = "none";
                    error.json().then(data => {
                        responseAlert(data);
                      });
                  }); 
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("No competitions ID provided");
    }
}

function goToSchool(e){
    window.location.hash="#school"
    const parntId = e.target.parentElement.parentElement.id;
    const afterSpliting = parntId.split("_")[1];
    setCookie('competition', afterSpliting);
}

function handleSearch() {
    var searchQuery = document.getElementById('search').value.toLowerCase();
    var competitionCards = document.querySelectorAll('#Addcompetitions>div');

    competitionCards.forEach(function (competitionCard) {
        var competitionInfo = competitionCard.textContent.toLowerCase();

        if (competitionInfo.includes(searchQuery)) {
            competitionCard.style.display = 'block';
        } else {
            competitionCard.style.display = 'none';
        }
    });
}


function clearData(){
    document.getElementById("competitionsId").value = '';
    document.querySelector('#imgPreview').src = '';
    document.querySelector('#imgPreview').style.display = 'none'
}
