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


var sponsersData;
function getSponsersData() {
    var sponsorContainer = document.getElementById("Addsponsers");
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/sponsor/all`, {
        method: 'GET',
        headers: {'Authorization': token},
    })
        .then(response => response.json())
        .then(data => {
            sponsersData = data.data;
            sponsorContainer.innerHTML = "";
            data.data.forEach(sponsors => {
                const element = document.createElement('div');
                element.innerHTML = `
                    <div class="profile-page mb-3" id="sponsors_${sponsors._id}">
                            <div class="main main-raised">
                                <div class="profile-content">
                                    <div style="margin-top: 5rem!important;">
                                        <div class="col-12 text-end">
                                            <div class="btn_group me-4">
                                                <button class="btn btn-success mt-2" id="add-row" onclick="editSponsers('${sponsors._id}')">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="edit-btn bi bi-pen-fill" viewBox="0 0 16 16" s>
                                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                                    </svg>
                                                </button>
                                                <button class="btn btn-danger mt-2" id="remove-row" onclick="deleteSponsers('${sponsors._id}')">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" viewBox="0 0 16 16">
                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div> 
                                        <div class="row">
                                            <div class="col-12 ml-auto mr-auto">
                                                <div class="profile">
                                                    <div>
                                                        <h3 class="title text-dark">${sponsors.title}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                
                                        <div class="description text-center">
                                            <p>${sponsors.paragraph}</p>
                                        </div>
                        
                                        <div class="gallery " id="imgContent">
                                            <div class="col-10 text-center mx-auto">
                                                <img src="${domainName}/${sponsors.photo}" class="rounded col-12 col-md-4">  					
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                sponsorContainer.appendChild(element);
            });
            document.getElementById("gif").style.display = "none";
        })
        .catch(error => {
            console.log(error);
            document.getElementById("gif").style.display = "none";
          }); 
}

getSponsersData();

function editSponsers(id) {
    goToTop();
    document.getElementById("addToEdit").innerHTML = "Update";
    var mySponsers = sponsersData.find(Sponserss => { return Sponserss._id == id })
    document.getElementById("sponsersId").value = mySponsers._id;
    document.getElementById("titleSponser").value = mySponsers.title ;
    document.getElementById("paragraphSponser").value = mySponsers.paragraph;
    document.querySelector('#imgPreview').src = mySponsers.photo
    document.querySelector('#imgPreview').style.display = 'block'
}

function changeSponsers(e) {
    e.preventDefault();
    let id = document.getElementById("sponsersId").value;

    const imageData = document.querySelector('#uploadImgSponser').files[0]
    const formData = new FormData();
    formData.append('title', document.getElementById("titleSponser").value);
    formData.append('paragraph', document.getElementById("paragraphSponser").value);
    if(document.querySelector("#uploadImgSponser").files[0]){formData.append('photo', imageData)};

    if (id) {
        try {
            document.getElementById("gif").style.display ="block"
            fetch(`${domainName}/sts/sponsor/${id}`, {
                method: 'PUT',
                headers: {'Authorization': token},
                body: formData,
            }).then(response => response.json())
                .then(response => {
                    if (response.apiStatus == true) {
                        console.log("congrats, you updated sponsors data successfully");
                        document.getElementById("sponsersId").value = "";
                        document.getElementById("titleSponser").value = "";
                        document.getElementById("paragraphSponser").value = "";
                        document.getElementById("uploadImgSponser").value = "";
                        document.getElementById("imgPreview").style.display = "none";
                        goToAdd();
                        getSponsersData();
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
    } else {
        try {
            document.getElementById("gif").style.display ="block"
            fetch(`${domainName}/sts/sponsor`, {
                method: 'POST',
                headers: {'Authorization': token},
                body: formData,
            }).then(response => response.json())
                .then(response => {
                    if (response.apiStatus == true) {
                        console.log("Data saved successfully");
                        document.getElementById("titleSponser").value = "";
                        document.getElementById("paragraphSponser").value = "";
                        document.getElementById("uploadImgSponser").value = "";
                        document.getElementById("imgPreview").style.display = "none";
                        getSponsersData(); 
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
} 


function deleteSponsers(id) {
    if (id) {
        try {
            document.getElementById("gif").style.display ="block"
            fetch(`${domainName}/sts/sponsor/${id}`, {
                method: 'DELETE',
                headers: {'Authorization': token},
            })
                .then(response => {
                    if (response.status == 200) {
                        console.log("Sponsors data deleted successfully");
                        getSponsersData();
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
        console.log("No sponsors ID provided");
    }
}


function clearData(){
    goToAdd();
    document.getElementById("sponsersId").value = '';
    document.querySelector('#imgPreview').src = '';
    document.querySelector('#imgPreview').style.display = 'none'
}