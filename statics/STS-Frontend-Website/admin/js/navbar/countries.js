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
                        <div class="col-12 col-md-4">
                            <h4 class="title" id="messages">${data.countryName}</h4>
                        </div>
                        <div class="col-12 col-md-4 text-center">
                                <div class="btn_group">
                                    <input type="text" class="form-control" id="search" placeholder="Search" spellcheck="false" data-ms-editor="true" fdprocessedid="3x5nnf">
                                    <button class="btn btn-default" title="Pdf" fdprocessedid="vmxwvs" id="generate-pdf"><i class="fa fa-file-pdf"></i></button>
                                </div>
                        </div>
                        <div class="col-12 col-md-4 text-end">
                            <div class="btn_group">
                                <button  onclick="editCountry('${data._id}')" class="btn btn-light" id="add-row" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <i class="edit-btn fa-solid fa-pen-to-square" style="color: #3e843e;" ></i>
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
                                <td id="soloDancerFees">${data.soloDancerFees}</td>
                            </tr>
                            <tr>
                                <td>Duo Or Trio Dancer Fees</td>
                                <td id="duoOrTrioDanceFees">${data.duoOrTrioDanceFees}</td>
                            </tr>
                            <tr>
                                <td>Group Dancer Fees</td>
                                <td id="groupDanceFees">${data.groupDanceFees}</td>
                            </tr>
                            <tr>
                                <td>Solo Singer Fees</td>
                                <td id="soloSingerFees">${data.soloSingerFees}</td>
                            </tr>
                            <tr>
                                <td>duo Or Trio Singer Fees</td>
                                <td id="duoOrTrioSingingFees">${data.duoOrTrioSingingFees}</td>
                            </tr>
                            <tr>
                                <td>Group Singer Fees</td>
                                <td id="groupSingingFees">${data.groupSingingFees}</td>
                            </tr>
                            <tr>
                                <td>Solo Musician Fees</td>
                                <td id="soloMusicianFees">${data.soloMusicianFees}</td>
                            </tr>
                            <tr>
                                <td>Duo Or Trio Musician Fees</td>
                                <td id="duoOrTrioMusicFees">${data.duoOrTrioMusicFees}</td>
                            </tr>
                            <tr>
                                <td>Group Musician Fees</td>
                                <td id="groupMusicFees">${data.groupMusicFees}</td>
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
        })
        .catch(error => console.log(error));
        document.getElementById("gif").style.display ="none"
}
getData()


function editCountry(id) {
    var myCountry = countryData.find(country => { return country._id == id })
    document.getElementById("countryName").value =myCountry.countryName ;
    document.getElementById("countryId").value = myCountry._id;
    document.getElementById("ADMINISTRATIVE-FEE").value = myCountry.adminstrationFees;
    document.getElementById("MEMBERSHIP-FEE").value = myCountry.membershipFees;
    document.getElementById("soloDance").value = myCountry.soloDancerFees;
    document.getElementById("duo-Trio-Dance").value = myCountry.duoOrTrioDanceFees;
    document.getElementById("danceGroup").value = myCountry.groupDanceFees;
    document.getElementById("soloSinger").value = myCountry.soloSingerFees;
    document.getElementById("duo-Trio-Singer").value = myCountry.duoOrTrioSingingFees;
    document.getElementById("singerGroup").value = myCountry.groupSingingFees;
    document.getElementById("soloMusician").value = myCountry.soloMusicianFees;
    document.getElementById("duo-Trio-Musician").value = myCountry.duoOrTrioMusicFees;
    document.getElementById("musicianGroup").value = myCountry.groupMusicFees;
}

function changeFeesForCountry(e) {
    e.preventDefault();
    let id = document.getElementById("countryId").value;
    var dataForUpdate = {
        countryName: document.getElementById("countryName").value,
        adminstrationFees: document.getElementById("ADMINISTRATIVE-FEE").value,
        membershipFees: document.getElementById("MEMBERSHIP-FEE").value,
        soloDancerFees: document.getElementById("soloDance").value,
        duoOrTrioDanceFees: document.getElementById("duo-Trio-Dance").value,
        groupDanceFees: document.getElementById("danceGroup").value,
        soloSingerFees: document.getElementById("soloSinger").value,
        duoOrTrioSingingFees: document.getElementById("duo-Trio-Singer").value,
        groupSingingFees: document.getElementById("singerGroup").value,
        soloMusicianFees: document.getElementById("soloMusician").value,
        duoOrTrioMusicFees: document.getElementById("duo-Trio-Musician").value,
        groupMusicFees: document.getElementById("musicianGroup").value,
    }
    var stringifyDataForUpdate = JSON.stringify(dataForUpdate)
    try {
        document.getElementById("gif").style.display ="block"
        fetch(`${domainName}/sts/country/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" , 'Authorization': token},
            body: stringifyDataForUpdate
        })
            .then(response => {
                if (response.ok) {
                    console.log("Data saved successfully");
                } else {
                    throw new Error('Request failed.');
                }
                getData()
            })
            .catch(error => console.error(error));
            document.getElementById("gif").style.display ="none"
    } catch (error) {
        console.log(error);
    }
}
