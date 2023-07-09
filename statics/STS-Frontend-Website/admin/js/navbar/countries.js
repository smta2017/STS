function getAllCurrencies() {
    var allCurrency = document.querySelector('#selectCurrency');

    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/allcurrencies`, {
        method: 'GET',
        headers: {'Authorization': token},
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        allCurrency.innerHTML = "";
        const chooseOption = document.createElement('option');
        chooseOption.value = "-1";
        chooseOption.disabled = true;
        chooseOption.selected = true;
        chooseOption.textContent = "Select Currency";
        allCurrency.appendChild(chooseOption);
        for (let key in data) {
            const option = document.createElement('option');
            option.value = data[key];
            option.textContent = data[key];
            allCurrency.appendChild(option);
        }
        document.getElementById("gif").style.display = "none";
    })
    .catch(error => {
        console.log(error);
        document.getElementById("gif").style.display = "none";
    }); 
}

getAllCurrencies()

var countryData;

function getData() {
    var countrys = document.getElementById("countrys")
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/country/all`,
        {
            method: 'GET',
            headers: {'Authorization': token},
        })
        .then(response => response.json())
        .then(data => {
            countryData = data.data
            countrys.innerHTML = "";
            data.data.forEach(data => {
                const element = document.createElement('div');
                element.className = "col-12 col-md-6 col-lg-4"
                element.innerHTML = `
                    <div class="">
                        <div class="panel my-4">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-12 col-md-6">
                                        <h4 class="title" id="messages">${data.countryName}</h4>
                                    </div>
                                    <div class="col-12 col-md-6 text-end">
                                        <div class="btn_group">
                                            <button  onclick="editCountry('${data._id}')" class="btn btn-success" id="add-row" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="edit-btn bi bi-pen-fill" viewBox="0 0 16 16">
                                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                
                                </div>
                            </div> 
                            <div class="panel-body table-responsive">
                                <table class="table text-light" id="table-countries">
                                    <thead>
                                        <tr>
                                            <th>country Name</th>
                                            <th>Fees</th>
                                        </tr>
                                    </thead>

                                    <tbody id="table-body-countries">
                                        <tr>
                                            <td>Adminstration Fees</td>
                                            <td id="adminstrationFees">${data.adminstrationFees}</td>
                                        </tr>
                                        <tr>
                                            <td>Membership Fees</td>
                                            <td id="membershipFees">${data.membershipFees}</td>
                                        </tr>
                                        <tr>
                                            <td>Solo Dancer Fees</td>
                                            <td id="soloDancerFees">${data.solodancerFees}</td>
                                        </tr>
                                        <tr>
                                            <td>Duo Or Trio Dancer Fees</td>
                                            <td id="duoOrTrioDanceFees">${data.duoOrTriodancerFees}</td>
                                        </tr>
                                        <tr>
                                            <td>Group Dancer Fees</td>
                                            <td id="groupDanceFees">${data.groupdancerFees}</td>
                                        </tr>
                                        <tr>
                                            <td>Solo Singer Fees</td>
                                            <td id="soloSingerFees">${data.solosingerFees}</td>
                                        </tr>
                                        <tr>
                                            <td>duo Or Trio Singer Fees</td>
                                            <td id="duoOrTrioSingingFees">${data.duoOrTriosingerFees}</td>
                                        </tr>
                                        <tr>
                                            <td>Group Singer Fees</td>
                                            <td id="groupSingingFees">${data.groupsingerFees}</td>
                                        </tr>
                                        <tr>
                                            <td>Solo Musician Fees</td>
                                            <td id="soloMusicianFees">${data.solomusicianFees}</td>
                                        </tr>
                                        <tr>
                                            <td>Duo Or Trio Musician Fees</td>
                                            <td id="duoOrTrioMusicFees">${data.duoOrTriomusicianFees}</td>
                                        </tr>
                                        <tr>
                                            <td>Group Musician Fees</td>
                                            <td id="groupMusicFees">${data.groupmusicianFees}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `
                countrys.appendChild(element);
            }
            );
            document.getElementById("gif").style.display ="none"
        })
        .catch(error => {
            console.log(error);
            document.getElementById("gif").style.display = "none";
          }); 
}

getData()


function editCountry(id) {
    var myCountry = countryData.find(country => { return country._id == id })
    document.getElementById("countryName").value = myCountry.countryName ;
    document.getElementById("countryId").value = myCountry._id;
    document.getElementById("ADMINISTRATIVE-FEE").value = myCountry.adminstrationFees;
    document.getElementById("MEMBERSHIP-FEE").value = myCountry.membershipFees;
    document.getElementById("soloDance").value = myCountry.solodancerFees;
    document.getElementById("duo-Trio-Dance").value = myCountry.duoOrTriodancerFees;
    document.getElementById("danceGroup").value = myCountry.groupdancerFees;
    document.getElementById("soloSinger").value = myCountry.solosingerFees;
    document.getElementById("duo-Trio-Singer").value = myCountry.duoOrTriosingerFees;
    document.getElementById("singerGroup").value = myCountry.groupsingerFees;
    document.getElementById("soloMusician").value = myCountry.solomusicianFees;
    document.getElementById("duo-Trio-Musician").value = myCountry.duoOrTriomusicianFees;
    document.getElementById("musicianGroup").value = myCountry.groupmusicianFees;

    // Find the option element with the corresponding currency name and set its selected attribute to true
    var allCurrency = document.querySelector('#selectCurrency');
    var options = allCurrency.options;
    for (var i = 0; i < options.length; i++) {
        if (options[i].value === myCountry.currency) {
            options[i].selected = true;
            break;
        }
    }
}

function changeFeesForCountry(e) {
    e.preventDefault();
    let id = document.getElementById("countryId").value;

    var selectCurrencyElement = document.getElementById("selectCurrency");
    var currencyNameEn = selectCurrencyElement.options[selectCurrencyElement.selectedIndex].value;

    var dataForUpdate = {
        countryName: document.getElementById("countryName").value ?  document.getElementById("countryName").value : null ,
        currency: currencyNameEn ? currencyNameEn : null,
        adminstrationFees: document.getElementById("ADMINISTRATIVE-FEE").value ?  document.getElementById("ADMINISTRATIVE-FEE").value : null ,
        membershipFees: document.getElementById("MEMBERSHIP-FEE").value ?  document.getElementById("MEMBERSHIP-FEE").value : null ,
        solodancerFees: document.getElementById("soloDance").value ?  document.getElementById("soloDance").value : null ,
        duoOrTriodancerFees: document.getElementById("duo-Trio-Dance").value ?  document.getElementById("duo-Trio-Dance").value : null ,
        groupdancerFees: document.getElementById("danceGroup").value ?  document.getElementById("danceGroup").value : null ,
        solosingerFees: document.getElementById("soloSinger").value ?  document.getElementById("soloSinger").value : null ,
        duoOrTriosingerFees: document.getElementById("duo-Trio-Singer").value ?  document.getElementById("duo-Trio-Singer").value : null ,
        groupsingerFees: document.getElementById("singerGroup").value ?  document.getElementById("singerGroup").value : null ,
        solomusicianFees: document.getElementById("soloMusician").value ?  document.getElementById("soloMusician").value : null ,
        duoOrTriomusicianFees: document.getElementById("duo-Trio-Musician").value ?  document.getElementById("duo-Trio-Musician").value : null ,
        groupmusicianFees: document.getElementById("musicianGroup").value ?  document.getElementById("musicianGroup").value : null 
    }
    console.log(dataForUpdate)
    try {
        document.getElementById("gif").style.display ="block"
        fetch(`${domainName}/sts/country/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" , 'Authorization': token},
            body: JSON.stringify(dataForUpdate)
        })
        .then(response => response.json())
            .then(response => {
                // console.log(response.json())
                if (response.apiStatus == true) {
                    console.log("Data saved successfully");
                } else {
                    throw new Error('Request failed.');
                }
                getData()
                document.getElementById("gif").style.display ="none"
                responseAlert(response);
            })
            .catch(error => {
                console.error(error);
                document.getElementById("gif").style.display ="none"
                responseAlert(error);
            });
    } catch (error) {
        console.log(error);
    }
}
