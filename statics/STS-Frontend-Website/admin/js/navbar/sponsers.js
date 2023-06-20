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
                                                <button class="btn btn-success" id="add-row" onclick="editSponsers('${sponsors._id}')">
                                                    <i class="edit-btn fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <button class="btn btn-danger" id="remove-row" onclick="deleteSponsers('${sponsors._id}')">
                                                    <i class="delete-btn fa-solid fa-trash-can"></i>
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
        })
        .catch(error => console.log(error));
}

getSponsersData();

function editSponsers(id) {
    var mySponsers = sponsersData.find(Sponserss => { return Sponserss._id == id })
    document.getElementById("sponsersId").value = mySponsers._id;
    document.getElementById("titleSponser").value = mySponsers.title ;
    document.getElementById("paragraphSponser").value = mySponsers.paragraph;
    document.getElementById("uploadImgSponser").value = mySponsers.photo;
}

function changeSponsers(e) {
    e.preventDefault();
    let id = document.getElementById("sponsersId").value;
    const formData = new FormData();
    formData.append('title', document.getElementById("titleSponser").value);
    formData.append('paragraph', document.getElementById("paragraphSponser").value);
    formData.append('photo', document.getElementById("uploadImgSponser").files[0]);
    if (id) {
        try {
            fetch(`${domainName}/sts/sponsor/${id}`, {
                method: 'PUT',
                headers: {'Authorization': token},
                body: formData,
            })
                .then(response => {
                    if (response.ok) {
                        console.log("congrats, you updated sponsors data successfully");
                        document.getElementById("sponsersId").value = "";
                        document.getElementById("titleSponser").value = "";
                        document.getElementById("paragraphSponser").value = "";
                        document.getElementById("uploadImgSponser").value = "";
                        document.getElementById("imgPreview").style.display = "none";
                        getSponsersData();
                    } else {
                        throw new Error('Request failed.');
                    }
                })
                .catch(error => console.error(error));
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            fetch(`${domainName}/sts/sponsor`, {
                method: 'POST',
                headers: {'Authorization': token},
                body: formData,
            })
                .then(response => {
                    if (response.ok) {
                        console.log("Data saved successfully");
                        document.getElementById("titleSponser").value = "";
                        document.getElementById("paragraphSponser").value = "";
                        document.getElementById("uploadImgSponser").value = "";
                        document.getElementById("imgPreview").style.display = "none";
                        getSponsersData(); 
                    } else { 
                        throw new Error('Request failed.'); 
                    } 
                }) 
                .catch(error => console.error(error)); 
        } catch (error) { 
            console.log(error); 
        } 
    } 
} 


function deleteSponsers(id) {
    if (id) {
        try {
            fetch(`${domainName}/sts/sponsor/${id}`, {
                method: 'DELETE',
                headers: {'Authorization': token},
            })
                .then(response => {
                    if (response.ok) {
                        console.log("Sponsors data deleted successfully");
                        getSponsersData();
                    } else {
                        throw new Error('Request failed.');
                    }
                })
                .catch(error => console.error(error));
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("No sponsors ID provided");
    }
}
