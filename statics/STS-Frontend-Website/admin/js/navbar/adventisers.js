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


var carouselItemCount = 0;
var adventisersData;

function getAdventisersData() {
    var adventisersContainer = document.getElementById("Addadventisers");
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/advertising/all`, {
        method: 'GET',
        headers: {'Authorization': token},
    })
        .then(response => response.json())
        .then(data => {
            adventisersData = data.data;
            adventisersContainer.innerHTML = "";
            data.data.forEach((adventisers, index) => {
                const element = document.createElement('div');
                element.innerHTML = `
                    <div class="carousel-inner" id="adventisers_${adventisers._id}">
                        <div class="carousel-item ${index === 0 ? 'active' : ''}" style="background-image: url('${domainName}/${adventisers.photo}')">
                            <div class="carousel-caption">
                                <h5 class="text-dark">${adventisers.title}</h5>
                                <p>${adventisers.description}</p>
                                <button class="btn btn-success" id="add-row" onclick="editAdventisers('${adventisers._id}')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="edit-btn bi bi-pen-fill" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                    </svg>
                                </button>
                                <a onclick="showAdventisersDetails('${adventisers._id}')" class="btn btn-warning btn-lg action-button login" type="button">Know More</a>
                                <button class="btn btn-danger" id="remove-row" onclick="deleteAdventisers('${adventisers._id}')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                adventisersContainer.appendChild(element);

                // Add a new button for each carousel item
                const indicatorsContainer = document.querySelector('.carousel-indicators');
                const button = document.createElement('button');
                button.setAttribute('type', 'button');
                button.setAttribute('data-bs-target', '#carouselExampleCaptions');
                button.setAttribute('data-bs-slide-to', carouselItemCount);
                button.setAttribute('aria-label', `Slide ${carouselItemCount + 1}`);
                if (carouselItemCount === 0) {
                    button.classList.add('active');
                    button.setAttribute('aria-current', 'true');
                }
                indicatorsContainer.appendChild(button);

                carouselItemCount++;
            });
            document.getElementById("gif").style.display = "none";
        })
        .catch(error => {
            console.log(error);
            document.getElementById("gif").style.display = "none";
          }); 

}

getAdventisersData();

function editAdventisers(id) {
    goToTop();
    document.getElementById("addToEdit").innerHTML = "Update";
    var myAdventisers = adventisersData.find(adventiserss => { return adventiserss._id == id })
   
    document.getElementById("adventisersId").value = myAdventisers._id;
    document.getElementById("TitleAdventiser").value = myAdventisers.title ;
    document.getElementById("descrebtionAdventiser").value = myAdventisers.description;
    document.getElementById("paragraphAdventiser").value = myAdventisers.paragraph;
    document.querySelector('#imgPreview').src = myAdventisers.photo
    document.querySelector('#imgPreview').style.display = 'block'
}

function changeAdventisers(e) {
    e.preventDefault();
    let id = document.getElementById("adventisersId").value;

    const imageData = document.querySelector('#uploadImgForAdventiser').files[0]
    const formData = new FormData();
    formData.append('title', document.getElementById("TitleAdventiser").value);
    formData.append('description', document.getElementById("descrebtionAdventiser").value);
    formData.append('paragraph', document.getElementById("paragraphAdventiser").value);
    if(document.querySelector("#uploadImgForAdventiser").files[0]){formData.append('photo', imageData)};

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${domainName}/sts/advertising/${id}` : `${domainName}/sts/advertising`;

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
                    console.log(id ? "congrats, you updated advertising data successfully" : "Data saved successfully");
                    document.getElementById("adventisersId").value = "";
                    document.getElementById("TitleAdventiser").value = "";
                    document.getElementById("descrebtionAdventiser").value = "";
                    document.getElementById("paragraphAdventiser").value = "";
                    document.getElementById("uploadImgForAdventiser").value = "";
                    document.getElementById("imgPreview").style.display = "none";
                    goToAdd();
                    getAdventisersData();
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


function deleteAdventisers(id) {
    if (id) {
        try {
            document.getElementById("gif").style.display ="block"
            fetch(`${domainName}/sts/advertising/${id}`, {
                method: 'DELETE',
                headers: {'Authorization': token},
            })
                .then(response => {
                    if (response.status == 200) {
                        console.log("Advertising data deleted successfully");
                        
                        // // Find the index of the deleted item
                        // const deletedItemIndex = adventisersData.findIndex(adventiserss => adventiserss._id == id);

                        // // Remove the corresponding indicator button
                        // if (deletedItemIndex >= 0) {
                        //     const indicatorsContainer = document.querySelector('.carousel-indicators');
                        //     indicatorsContainer.removeChild(indicatorsContainer.children[deletedItemIndex]);
                        //     carouselItemCount--;
                        // }

                        // // Update the remaining indicator buttons
                        // for (let i = deletedItemIndex; i < carouselItemCount; i++) {
                        //     const button = indicatorsContainer.children[i];
                        //     button.setAttribute('data-bs-slide-to', i);
                        //     button.setAttribute('aria-label', `Slide ${i + 1}`);
                        // }

                        getAdventisersData();
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
        console.log("No advertising ID provided");
    }
}


function showAdventisersDetails(id) {
    if (id) {
        const adventisersD = adventisersData.find(adventiserss => { return adventiserss._id == id });
        if (adventisersD) {
            const adventisersContainer = document.getElementById("content");
            adventisersContainer.innerHTML = "";
            const element = document.createElement('div');
            element.innerHTML = `
                            <div class="profile-page mb-3" id="news_${adventisersD._id}">
                                <div class="page-header" data-parallax="true" style="background-image:url('${domainName}/STS-Frontend-Website/images/339914637_169095876036285_1735365296112837238_n.jpg');"></div>
                                    <div class="main main-raised">
                                        <div class="profile-content">
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col-12 ml-auto mr-auto">
                                                        <div class="profile">
                                                            <div class="avatar">
                                                                <img src='${domainName}/STS-Frontend-Website/images/WhatsApp_Image_2023-05-14_at_14.34.50-removebg-preview.png' alt="Circle Image" class="img-raised rounded-circle img-fluid">
                                                            </div>
                                                            <div class="name">
                                                                <h3 class="title text-dark" id="title">${adventisersD.title}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                    
                                                <div class="description text-center">
                                                    <p id="paragraph">${adventisersD.paragraph}</p>
                                                </div>
                                
                                                <div class="gallery " id="imgContent">
                                                    <div class="col-10 text-center mx-auto">
                                                        <img id="photo" src="${domainName}/${adventisersD.photo}" class="rounded col-12 col-md-4">  					
                                                    </div>
                                                </div>
                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    `;
                adventisersContainer.appendChild(element);
        } else {
            console.log("No news item found with the provided ID.");
        }
    } else {
        console.log("No news ID provided.");
    }
}


function clearData(){
    goToAdd();
    document.getElementById("adventisersId").value = '';
    document.querySelector('#imgPreview').src = '';
    document.querySelector('#imgPreview').style.display = 'none'
}