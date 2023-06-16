// document.getElementById("formAdventisers").onsubmit = function (e) {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('title', document.getElementById("TitleAdventiser").value);
//     formData.append('description', document.getElementById("descrebtionAdventiser").value);
//     formData.append('paragraph', document.getElementById("paragraphAdventiser").value);
//     formData.append('photo', document.getElementById("uploadImgForAdventiser").files[0]);

//     try {
//         fetch('http://localhost:5000/sts/advertising', {
//             method: 'POST',
//             body: formData,
//         })
//             .then(response => {
//                 if (response.ok) {
//                     console.log("Data saved successfully");
//                     document.getElementById("TitleAdventiser").value = "";
//                     document.getElementById("descrebtionAdventiser").value = "";
//                     document.getElementById("paragraphAdventiser").value = "";
//                     document.getElementById("uploadImgForAdventiser").files[0] ="";
//                 } else {
//                     throw new Error('Request failed.');
//                 }
//             })
//             .catch(error => console.error(error));
//     } catch (error) {
//         console.log(error);
//     }
// }
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
    fetch(`${domainName}/sts/advertising/all`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
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
                                    <i class="edit-btn fa-solid fa-pen-to-square"></i>
                                </button>
                                <a onclick="showAdventisersDetails('${adventisers._id}')" class="btn btn-warning btn-lg action-button login" type="button" >
                                    Know More<i class="fa fa-long-arrow-right ml-2"></i>
                                </a>
                                <button class="btn btn-danger" id="remove-row" onclick="deleteAdventisers('${adventisers._id}')">
                                    <i class="delete-btn fa-solid fa-trash-can"></i>
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
        })
        .catch(error => console.log(error));
}

getAdventisersData();

function editAdventisers(id) {
    var myAdventisers = adventisersData.find(adventiserss => { return adventiserss._id == id })
    console.log(myAdventisers)
    document.getElementById("adventisersId").value = myAdventisers._id;
    document.getElementById("TitleAdventiser").value = myAdventisers.title ;
    document.getElementById("descrebtionAdventiser").value = myAdventisers.description;
    document.getElementById("paragraphAdventiser").value = myAdventisers.paragraph;
    document.getElementById("uploadImgForAdventiser").value = myAdventisers.photo;
}

function changeAdventisers(e) {
    e.preventDefault();
    let id = document.getElementById("adventisersId").value;
    const formData = new FormData();
    formData.append('title', document.getElementById("TitleAdventiser").value);
    formData.append('description', document.getElementById("descrebtionAdventiser").value);
    formData.append('paragraph', document.getElementById("paragraphAdventiser").value);
    formData.append('photo', document.getElementById("uploadImgForAdventiser").files[0]);

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${domainName}/sts/advertising/${id}` : `${domainName}/sts/advertising`;

    try {
        fetch(url, {
            method: method,
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    console.log(id ? "congrats, you updated advertising data successfully" : "Data saved successfully");
                    document.getElementById("adventisersId").value = "";
                    document.getElementById("TitleAdventiser").value = "";
                    document.getElementById("descrebtionAdventiser").value = "";
                    document.getElementById("paragraphAdventiser").value = "";
                    document.getElementById("uploadImgForAdventiser").value = "";
                    document.getElementById("imgPreview").style.display = "none";
                    getAdventisersData();
                } else {
                    throw new Error('Request failed.');
                }
            })
            .catch(error => console.error(error));
    } catch (error) {
        console.log(error);
    }
}


function deleteAdventisers(id) {
    if (id) {
        try {
            fetch(`${domainName}/sts/advertising/${id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
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
                })
                .catch(error => console.error(error));
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
                                <div class="page-header" data-parallax="true" style="background-image:url('${domainName}/images/339914637_169095876036285_1735365296112837238_n.jpg');"></div>
                                    <div class="main main-raised">
                                        <div class="profile-content">
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col-12 ml-auto mr-auto">
                                                        <div class="profile">
                                                            <div class="avatar">
                                                                <img src='${domainName}/images/WhatsApp_Image_2023-05-14_at_14.34.50-removebg-preview.png' alt="Circle Image" class="img-raised rounded-circle img-fluid">
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