var sponsersTitle;

function getSponsersTitles() {
    var sponsorTitles = document.querySelector('.dropdown-menu')
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/sponsor/all`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            sponsersTitle = data.data;
            sponsorTitles.innerHTML = "";
            data.data.forEach(sponsorsT => {
                const list = document.createElement('li');
                list.style.cursor = "pointer";
                const anchor = document.createElement('a');
                anchor.href = "#sponsor";
                anchor.classList.add('dropdown-item');
                anchor.id = sponsorsT._id;
                anchor.onclick = function() {
                    showSponsersDetails(sponsorsT._id);
                };
                anchor.textContent = sponsorsT.title;
                list.appendChild(anchor);
                sponsorTitles.appendChild(list);
            });
            document.getElementById("gif").style.display = "none";
        })
        .catch(error => {
            console.log(error);
            document.getElementById("gif").style.display = "none";
          });   
}

getSponsersTitles();


function showSponsersDetails(id) {
    if (id) {
        const sponsersD = sponsersTitle.find(Sponserss => { return Sponserss._id == id });
        if (sponsersD) {
            const sponsersContainer = document.getElementById("content");
            sponsersContainer.innerHTML = "";
            const element = document.createElement('div');
            element.id = `sponser_${sponsersD._id}`;
            element.className = "profile-page";
            element.innerHTML = `
            
            <div class="page-header" data-parallax="true" style="background-image:url('${domainName}/STS-Frontend-Website/images/339914637_169095876036285_1735365296112837238_n.jpg');"></div>
                <div class="main main-raised">
                <div class="profile-content">
                <div class="container">
                            <div class="row">
                                <div class="col-12 mx-auto text-canter">

                                                    <div class="profile p-0">
                                                        <div class="avatar">
                                                            <img src='${domainName}/STS-Frontend-Website/images/WhatsApp_Image_2023-05-14_at_14.34.50-removebg-preview.png' alt="Circle Image" class="img-raised rounded-circle img-fluid">
                                                        </div>
                                                    </div>

                                                    <div class="gallery my-0 p-0" id="imgContent">
                                                        <div class="col-10 text-center mx-auto">
                                                            <img id="photo" src="${domainName}/${sponsersD.photo}" class="rounded col-12 col-md-4 mb-2">  					
                                                        </div>
                                                    </div>
                                                                            
                                                    <div class="name">
                                                        <h3 class="title text-dark text-center mt-2" id="title">${sponsersD.title}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="description text-center">
                                            <p class="m-0 pb-5 text-dark px-2 px-md-0" id="paragraph">${sponsersD.paragraph}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
            sponsersContainer.appendChild(element);
            console.log("5")


        } else {
            console.log("No sponsors item found with the provided ID.");
        }
    } else {
        console.log("No sponsors ID provided.");
    }
}