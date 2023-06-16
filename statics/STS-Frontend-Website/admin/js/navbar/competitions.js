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
    fetch(`${domainName}/sts/country/all`, {
    method: 'GET',
    headers: { "Content-Type": "application/json" }
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
    })
    .catch(error => console.log(error));
}

getAllCountries();


var competitionsData;

function getCompetitionsData() {
    var competitionsContainer = document.getElementById("Addcompetitions");
    fetch(`${domainName}/sts/competition/all`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
        .then(response => response.json())
        .then(data => {
            competitionsData = data.data;
            competitionsContainer.innerHTML = "";
            data.data.forEach(competitions => {
                const element = document.createElement('div');
                element.className = " rounded-3 col-11 col-sm-12 col-lg-6 text-light pt-2 bg-dark mb-2 mx-auto "
                element.id = `competitions_${competitions._id}`

                const startSubscription = `${competitions.startSubscription}`.split("T")[0];
                const endSubscription = `${competitions.endSubscription}`.split("T")[0];
                const date = `${competitions.date}`.split("T")[0];

                element.innerHTML = `
                <div class="photo ">
                    <img src="${domainName}/${competitions.poster}" class="w-100">
                </div>

                <div class="footer">
                    <a class="btn btn-warning w-100 text-dark" id="school" onclick="goToSchool(event)" >Show Competition Details</a>
                </div>

                <h3 class="text-center pt-3 bg-dark">${competitions.type} - ${competitions.year}</h3>
                <div class="content row ">
                    <div class="col-6  ">
                        
                        <label class="card-title fw-bold text-light">Admission</label>
                        <p class="ms-2">${startSubscription} to ${endSubscription}</p>
                        <label class="card-title fw-bold text-light">Location Display your Show</label>
                        <p class="ms-2">${competitions.stage}</p>
                        <label class="card-title fw-bold text-light">Date Display your Show</label>
                        <p class="ms-2">${date}</p>


                        <div class="btn_group ms-3 mb-3 col-12">
                        <button class="btn btn-success me-3" id="add-row"
                            onclick="editCompetitions('${competitions._id}')">
                            <i class="edit-btn fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="btn btn-danger" id="remove-row"
                            onclick="deleteCompetitions('${competitions._id}')">
                            <i class="delete-btn fa-solid fa-trash-can"></i>
                        </button>
                    </div>


                    </div>
                    <div class="col-6 ">
                        <form class="col-12 text-start" onsubmit="opentoregisteration(event)">
                            <input type="hidden" value="${competitions._id}">
                            <div class="form-group mb-2">
                                <input class="me-3" type="checkbox" name="stopSubscription"
                                    id="stopSubscription_${competitions._id}">
                                <label for="stopSubscription" class="fw-bold text-light">Stop Subscription</label>
                            </div>
                            <div class="form-group mb-2">
                                <input class="me-3" type="checkbox" name="showSchedule"
                                    id="showSchedule_${competitions._id}">
                                <label for="showSchedule" class="fw-bold text-light">Show Schedule</label>
                            </div>
                            <div class="form-group mb-2">
                                <input class="me-3" type="checkbox" name="showResults"
                                    id="showResults_${competitions._id}">
                                <label for="showResults" class="fw-bold text-light">Show Results</label>
                            </div>
                            <div class="form-group mb-2">
                                <input class="me-3" type="checkbox" name="enableRefree"
                                    id="enableRefree_${competitions._id}">
                                <label for="enableRefree" class="fw-bold text-light">Enable Refree</label>
                            </div>
                            <div class="form-group mb-2">
                                <input class="me-3" type="checkbox" name="finished" id="finished_${competitions._id}">
                                <label for="finished" class="fw-bold text-light">Finished</label>
                            </div>
                            <div class="form-group mt-4">
                                <input type="submit" class="form-control btn btn-primary" id="submitForm">
                            </div>
                        </form>
                    </div>
                </div>
                `;   
                competitionsContainer.appendChild(element);

                if(`${competitions.stopSubscription}` == "true"){
                    document.querySelector(`#stopSubscription_${competitions._id}`).setAttribute("checked","true");
                }
                if(`${competitions.showSchedule}` == "true"){
                    document.querySelector(`#showSchedule_${competitions._id}`).setAttribute("checked","true");
                }
                if(`${competitions.showResults}` == "true"){
                    document.querySelector(`#showResults_${competitions._id}`).setAttribute("checked","true");
                }
                if(`${competitions.enableRefree}` == "true"){
                    document.querySelector(`#enableRefree_${competitions._id}`).setAttribute("checked","true");
                }
                if(`${competitions.finished}` == "true"){
                    document.querySelector(`#finished_${competitions._id}`).setAttribute("checked","true");
                }
                
            });
        })
        .catch(error => console.log(error));
}

getCompetitionsData();


// function submitForm(id) {
//     // event.preventDefault();

//     const form = document.getElementById("opentoregisteration");
//     // const id = document.getElementById("opentoregisterationID").value;

//     const formData = new FormData(form);
//     const checkboxFields = ["stopSubscription", "showSchedule", "showResults", "enableRefree", "finished"];

//     checkboxFields.forEach(field => {
//         const checkbox = document.getElementById(field);
//         formData.append(field, checkbox.checked);
//     });

//     fetch(`http://localhost:5000/sts/competition/${id}`, {
//         method: 'PUT' ,
//         body: formData,
//     })
//         .then(response => {
//             if (response.ok) {
//                 console.log("Congratulations! You updated competition data successfully.");
//                 form.reset();
//                 getCompetitionsData();
//             } else {
//                 throw new Error('Request failed.');
//             }
//         })
//         .catch(error => console.log(error));
// }

// var registerationData;
// function editOpentoregisteration(id) {
//     var myRegisteration = registerationData.find(registeration => { return registeration._id == id })
//     console.log(myRegisteration)
//     document.getElementById("opentoregisteration").value = myRegisteration._id;
//     document.getElementById("stopSubscription").value = myRegisteration.stopSubscription ;
//     document.getElementById("showSchedule").value = myRegisteration.showSchedule;
//     document.getElementById("showResults").value = myRegisteration.showResults;
//     document.getElementById("enableRefree").value = myRegisteration.enableRefree;
//     document.getElementById("finished").value = myRegisteration.finished;
// }

function opentoregisteration(e) {
    e.preventDefault();
    
    let id = e.target[0].value;
    console.log(id);

    formDataRegisteration = {
        stopSubscription:  document.getElementById(`stopSubscription_${id}`).checked,
        showSchedule:  document.getElementById(`showSchedule_${id}`).checked,
        showResults:  document.getElementById(`showResults_${id}`).checked,
        enableRefree: document.getElementById(`enableRefree_${id}`).checked,
        finished:  document.getElementById(`finished_${id}`).checked
    }

    try {
        fetch(`${domainName}/sts/competition/${id}`, {
            method: 'PUT',
            body: JSON.stringify(formDataRegisteration),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => {
                if (response.ok) {
                    console.log("Data Changed Successfully");

                    getCompetitionsData();
                } else {
                    throw new Error('Request failed.');
                }
            })
            .catch(error => console.error(error));
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
    document.getElementById("uploadImgForCompetition").value = myCompetitions.poster;
}

function changeCompetitions(e) {
    e.preventDefault();

    let id = document.getElementById("competitionsId").value;
    const formData = new FormData();
    formData.append('year', document.getElementById("yearOfCompetition").value);
    formData.append('type', document.getElementById("selectType").value);
    formData.append('country', document.getElementById("countries").value);
    formData.append('stage', document.getElementById("displayLocation").value);
    formData.append('date', document.getElementById("displayTime").value);
    formData.append('startSubscription', document.getElementById("firsDay").value);
    formData.append('endSubscription', document.getElementById("lastDay").value);
    formData.append('poster', document.getElementById("uploadImgForCompetition").files[0]);

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${domainName}/sts/competition/${id}` : `${domainName}/sts/competition`;
    try {
        fetch(url, {
            method: method,
            body: formData,
        })
            .then(response => {
                if (response.ok) {
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
            })
            .catch(error => console.log(error));
    } catch (error) {
        console.log(error);
    }
}

function deleteCompetitions(id) {
    if (id) {
        try {
            fetch(`${domainName}/sts/competition/${id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        console.log("Competitions data deleted successfully");
                        getCompetitionsData();
                    } else {
                        throw new Error('Request failed.');
                    }
                })
                .catch(error => console.error(error));
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("No competitions ID provided");
    }
}

function setCookie(name, value) {
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; path=/';
  }

function goToSchool(e){
    // e.preventDefault
    window.location.hash="#school"
    const parntId = e.target.parentElement.parentElement.id;
    const afterSpliting = parntId.split("_")[1];
    setCookie('competition', afterSpliting);
}

