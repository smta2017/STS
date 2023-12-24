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


var newsData;
function getNewsData() {
    var AddnewsThreeTalent = document.getElementById("AddnewsThreeTalent");
    var AddnewsLatestNews = document.getElementById("AddnewsLatestNews");
    var AddnewsTheatersoftheworld = document.getElementById("AddnewsTheatersoftheworld");
    var AddnewsCountriesParticipating = document.getElementById("AddnewsCountriesParticipating");
    var Addnewsrulesofthecompetition = document.getElementById("Addnewsrulesofthecompetition");
    var AddnewsFinalsPredictions = document.getElementById("AddnewsFinalsPredictions");
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/news/all`, {
        method: 'GET',
        headers: {'Authorization': token},
    })
        .then(response => response.json())
        .then(data => {
            newsData = data.data;
            AddnewsThreeTalent.innerHTML = "";
            AddnewsLatestNews.innerHTML = "";
            AddnewsTheatersoftheworld.innerHTML = "";
            AddnewsCountriesParticipating.innerHTML = "";
            Addnewsrulesofthecompetition.innerHTML = "";
            AddnewsFinalsPredictions.innerHTML = "";

            newsData.forEach((newsItem, index) => {
                const colors = ['blue', 'red', 'green', 'yellow']; 
                const color = colors[index % colors.length]; 
                const element = document.createElement('div');
                const hr = document.createElement('hr');
                // Three Talent News
                if(newsItem.type == "1"){
                        element.innerHTML = `
                            <article class="postcard light ${color}" id="newsItem_${newsItem._id}">
                                <a class="postcard__img_link" href="#">
                                    <img class="postcard__img" src="${domainName}/${newsItem.photo}" alt="Image Title" />
                                </a>
                                <div class="postcard__text t-dark">
                                    <h1 class="postcard__title ${color}"><a href="#">${newsItem.title}</a></h1>
                                    <div class="postcard__subtitle small"></div>
                                    <div class="postcard__bar"></div>
                                    <div class="postcard__preview-txt">${newsItem.description}</div>
                                    <ul class="postcard__tagbox">
                                        <li class="tag__item play ${color}">
                                            <a onclick="newsItemDetails('${newsItem._id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                                        </svg> &nbsp;&nbsp; Know More</a>
                                        </li>
                                    </ul>
                                    <div class="col-12 text-end">
                                        <div class="btn_group">
                                            <button class="btn btn-success" id="add-row" onclick="editNews('${newsItem._id}')">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="edit-btn bi bi-pen-fill" viewBox="0 0 16 16" s>
                                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                                </svg>
                                            </button>
                                            <button class="btn btn-danger" id="remove-row" onclick="deleteNews('${newsItem._id}')">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div> 
                                </div>
                            </article>
                        `;
                        AddnewsThreeTalent.appendChild(element);
                }
                //Latest News
                if(newsItem.type == "2"){
                        element.innerHTML = `
                            <article class="postcard dark ${color}" id="newsItem_${newsItem._id}">
                                <a class="postcard__img_link" href="#">
                                    <img class="postcard__img" src="${domainName}/${newsItem.photo}" alt="Image Title" />
                                </a>
                                <div class="postcard__text t-light">
                                    <h1 class="postcard__title ${color}"><a href="#">${newsItem.title}</a></h1>
                                    <div class="postcard__subtitle small"></div>
                                    <div class="postcard__bar"></div>
                                    <div class="postcard__preview-txt">${newsItem.description}</div>
                                    <ul class="postcard__tagbox">
                                        <li class="tag__item play ${color}">
                                            <a onclick="newsItemDetails('${newsItem._id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                                        </svg> &nbsp;&nbsp; Know More</a>
                                        </li>
                                    </ul>
                                    <div class="col-12 text-end">
                                        <div class="btn_group">
                                            <button class="btn btn-success" id="add-row" onclick="editNews('${newsItem._id}')">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="edit-btn bi bi-pen-fill" viewBox="0 0 16 16" s>
                                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                                </svg>
                                            </button>
                                            <button class="btn btn-danger" id="remove-row" onclick="deleteNews('${newsItem._id}')">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div> 
                                </div>
                            </article>
                        `;
                        AddnewsLatestNews.appendChild(element);
                }
                //Theaters of the World
                if(newsItem.type == "3"){
                        element.innerHTML = `
                            <article class="postcard light ${color}" id="newsItem_${newsItem._id}">
                                <a class="postcard__img_link" href="#">
                                    <img class="postcard__img" src="${domainName}/${newsItem.photo}" alt="Image Title" />
                                </a>
                                <div class="postcard__text t-dark">
                                    <h1 class="postcard__title ${color}"><a href="#">${newsItem.title}</a></h1>
                                    <div class="postcard__subtitle small"></div>
                                    <div class="postcard__bar"></div>
                                    <div class="postcard__preview-txt">${newsItem.description}</div>
                                    <ul class="postcard__tagbox">
                                        <li class="tag__item play ${color}">
                                            <a onclick="newsItemDetails('${newsItem._id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                                        </svg> &nbsp;&nbsp; Know More</a>
                                        </li>
                                    </ul>
                                    <div class="col-12 text-end">
                                        <div class="btn_group">
                                            <button class="btn btn-success" id="add-row" onclick="editNews('${newsItem._id}')">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="edit-btn bi bi-pen-fill" viewBox="0 0 16 16" s>
                                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                                </svg>
                                            </button>
                                            <button class="btn btn-danger" id="remove-row" onclick="deleteNews('${newsItem._id}')">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div> 
                                </div>
                            </article>
                        `;
                        AddnewsTheatersoftheworld.appendChild(element);
                }
                //Countries Participating
                if(newsItem.type == "4"){
                        element.innerHTML = `
                            <article class="postcard dark ${color}" id="newsItem_${newsItem._id}">
                                <a class="postcard__img_link" href="#">
                                    <img class="postcard__img" src="${domainName}/${newsItem.photo}" alt="Image Title" />
                                </a>
                                <div class="postcard__text t-light">
                                    <h1 class="postcard__title ${color}"><a href="#">${newsItem.title}</a></h1>
                                    <div class="postcard__subtitle small"></div>
                                    <div class="postcard__bar"></div>
                                    <div class="postcard__preview-txt">${newsItem.description}</div>
                                    <ul class="postcard__tagbox">
                                        <li class="tag__item play ${color}">
                                            <a onclick="newsItemDetails('${newsItem._id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                                        </svg> &nbsp;&nbsp; Know More</a>
                                        </li>
                                    </ul>
                                    <div class="col-12 text-end">
                                        <div class="btn_group">
                                            <button class="btn btn-success" id="add-row" onclick="editNews('${newsItem._id}')">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="edit-btn bi bi-pen-fill" viewBox="0 0 16 16" s>
                                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                                </svg>
                                            </button>
                                            <button class="btn btn-danger" id="remove-row" onclick="deleteNews('${newsItem._id}')">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div> 
                                </div>
                            </article>
                        `;
                        AddnewsCountriesParticipating.appendChild(element);
                }
                //Rules of the Competition
                if(newsItem.type == "5"){
                        element.innerHTML = `
                            <article class="postcard light ${color}" id="newsItem_${newsItem._id}">
                                <a class="postcard__img_link" href="#">
                                    <img class="postcard__img" src="${domainName}/${newsItem.photo}" alt="Image Title" />
                                </a>
                                <div class="postcard__text t-dark">
                                    <h1 class="postcard__title ${color}"><a href="#">${newsItem.title}</a></h1>
                                    <div class="postcard__subtitle small"></div>
                                    <div class="postcard__bar"></div>
                                    <div class="postcard__preview-txt">${newsItem.description}</div>
                                    <ul class="postcard__tagbox">
                                        <li class="tag__item play ${color}">
                                            <a onclick="newsItemDetails('${newsItem._id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                                        </svg> &nbsp;&nbsp; Know More</a>
                                        </li>
                                    </ul>
                                    <div class="col-12 text-end">
                                        <div class="btn_group">
                                            <button class="btn btn-success" id="add-row" onclick="editNews('${newsItem._id}')">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="edit-btn bi bi-pen-fill" viewBox="0 0 16 16" s>
                                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                                </svg>
                                            </button>
                                            <button class="btn btn-danger" id="remove-row" onclick="deleteNews('${newsItem._id}')">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div> 
                                </div>
                            </article>
                        `;
                        Addnewsrulesofthecompetition.appendChild(element);
                }
                //Finals Predictions
                if(newsItem.type == "6"){
                        element.innerHTML = `
                            <article class="postcard dark ${color}" id="newsItem_${newsItem._id}">
                                <a class="postcard__img_link" href="#">
                                    <img class="postcard__img" src="${domainName}/${newsItem.photo}" alt="Image Title" />
                                </a>
                                <div class="postcard__text t-light">
                                    <h1 class="postcard__title ${color}"><a href="#">${newsItem.title}</a></h1>
                                    <div class="postcard__subtitle small"></div>
                                    <div class="postcard__bar"></div>
                                    <div class="postcard__preview-txt">${newsItem.description}</div>
                                    <ul class="postcard__tagbox">
                                        <li class="tag__item play ${color}">
                                            <a onclick="newsItemDetails('${newsItem._id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                                        </svg> &nbsp;&nbsp; Know More</a>
                                        </li>
                                    </ul>
                                    <div class="col-12 text-end">
                                        <div class="btn_group">
                                            <button class="btn btn-success" id="add-row" onclick="editNews('${newsItem._id}')">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="edit-btn bi bi-pen-fill" viewBox="0 0 16 16" s>
                                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                                </svg>
                                            </button>
                                            <button class="btn btn-danger" id="remove-row" onclick="deleteNews('${newsItem._id}')">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div> 
                                </div>
                            </article>
                        `;
                        AddnewsFinalsPredictions.appendChild(element);
                }
            });
            title_line();
            document.getElementById("gif").style.display = "none";
        })
        .catch(error => {
            console.log(error);
            document.getElementById("gif").style.display = "none";
          }); 
}

getNewsData();

function editNews(id) {
    goToTop();
    document.getElementById("addToEdit").innerHTML = "Update";
    var myNews = newsData.find(newss => { return newss._id == id })
    document.getElementById("newsId").value = myNews._id;
    document.getElementById("typeNews").value = myNews.type;
    document.getElementById("TitleForNews").value = myNews.title;
    document.getElementById("descrebtionForNews").value = myNews.description;
    document.getElementById("paragraphForNews").value = myNews.paragraph;
    document.querySelector('#imgPreview').src = myNews.photo
    document.querySelector('#imgPreview').style.display = 'block'
}

function changeNews(e) {
    e.preventDefault();
    let id = document.getElementById("newsId").value;

    const imageData = document.querySelector('#uploadImgForNews').files[0]
    const formData = new FormData();
    formData.append('type', document.getElementById("typeNews").value);
    formData.append('title', document.getElementById("TitleForNews").value);
    formData.append('description', document.getElementById("descrebtionForNews").value);
    formData.append('paragraph', document.getElementById("paragraphForNews").value);
    if(document.querySelector("#uploadImgForNews").files[0]){formData.append('photo', imageData)};

    if (id) {
        try {
            document.getElementById("gif").style.display ="block"
            fetch(`${domainName}/sts/news/${id}`, {
                method: 'PUT',
                headers: {'Authorization': token},
                body: formData,
            })
            .then(response => response.json())
                .then(response => {                    
                    if (response.apiStatus == true) {
                        console.log("congrats, you updated news data successfully");
                        document.getElementById("newsId").value = "";
                        document.getElementById("typeNews").value = "";
                        document.getElementById("TitleForNews").value = "";
                        document.getElementById("descrebtionForNews").value = "";
                        document.getElementById("paragraphForNews").value = "";
                        document.getElementById("uploadImgForNews").value = "";
                        document.getElementById("imgPreview").style.display = "none";
                        goToAdd();
                        getNewsData();
                    } else {
                        throw new Error('Request failed.');
                    }
                    document.getElementById("gif").style.display = "none";
                    responseAlert(response);
                    window.location.reload();
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
            fetch(`${domainName}/sts/news`, {
                method: 'POST',
                body: formData,
                headers: {'Authorization': token},
            })
            .then(response => response.json())
            .then(response => {
                if (response.apiStatus == true) {
                        console.log("Data saved successfully");
                        document.getElementById("typeNews").value = "";
                        document.getElementById("TitleForNews").value = "";
                        document.getElementById("descrebtionForNews").value = "";
                        document.getElementById("paragraphForNews").value = "";
                        document.getElementById("uploadImgForNews").value = "";
                        document.getElementById("imgPreview").style.display = "none";
                        getNewsData(); 
                    } else { 
                        throw new Error('Request failed'); 
                    } 
                    document.getElementById("gif").style.display = "none";
                    responseAlert(response);
                    window.location.reload();
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

function deleteNews(id) {
    if (id) {
        try {
            document.getElementById("gif").style.display ="block"
            fetch(`${domainName}/sts/news/${id}`, {
                method: 'DELETE',
                headers: {'Authorization': token},
            })
                .then(response => {
                    if (response.status == 200) {
                        console.log("News data deleted successfully");
                        getNewsData();
                    } else {
                        throw new Error('Request failed.');
                    }
                    document.getElementById("gif").style.display = "none";
                    response.json().then(data => {
                        responseAlert(data);
                        window.location.reload();
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
        console.log("No news ID provided");
    }
}


function newsItemDetails(id) {
    if (id) {
        const newsD = newsData.find(newss => { return newss._id == id });
        if (newsD) {
            const newsContainer = document.getElementById("content");
            newsContainer.innerHTML = "";
            const element = document.createElement('div');
            element.innerHTML = `
                            <div class="profile-page mb-3" id="news_${newsD._id}">
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
                                                                <h3 class="title text-dark" id="title">${newsD.title}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                    
                                                <div class="description text-center">
                                                    <p id="paragraph">${newsD.paragraph}</p>
                                                </div>
                                
                                                <div class="gallery " id="imgContent">
                                                    <div class="col-10 text-center mx-auto">
                                                        <img id="photo" src="${domainName}/${newsD.photo}" class="rounded col-12 col-md-4">  					
                                                    </div>
                                                </div>
                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    `;
            newsContainer.appendChild(element);
        } else {
            console.log("No news item found with the provided ID.");
        }
    } else {
        console.log("No news ID provided.");
    }
}


function title_line() {
    if (AddnewsThreeTalent.innerHTML !== "" && !document.getElementById("newsAThreeTalent").nextElementSibling.classList.contains("hr-added")) {
        let title = `<div class="text-center display-4 my-3">Three Talent News</div>` ;
        AddnewsThreeTalent.insertAdjacentHTML('afterbegin', title);
        document.getElementById("newsAThreeTalent").insertAdjacentHTML('afterend', '<hr class="hr-added">');
    }
    if (AddnewsLatestNews.innerHTML !== "" && !document.getElementById("newsALatestNews").nextElementSibling.classList.contains("hr-added")) {
        let title = `<div class="text-center display-4 my-3">Latest News</div>`  ;
        AddnewsLatestNews.insertAdjacentHTML('afterbegin', title);
        document.getElementById("newsALatestNews").insertAdjacentHTML('afterend', '<hr class="hr-added">');
    }
    if (AddnewsTheatersoftheworld.innerHTML !== "" && !document.getElementById("newsATheatersoftheworld").nextElementSibling.classList.contains("hr-added")) {
        let title = `<div class="text-center display-4 my-3">Theaters of the World News</div>`  ;
        AddnewsTheatersoftheworld.insertAdjacentHTML('afterbegin', title);
        document.getElementById("newsATheatersoftheworld").insertAdjacentHTML('afterend', '<hr class="hr-added">');
    }
    if (AddnewsCountriesParticipating.innerHTML !== "" && !document.getElementById("newsACountriesParticipating").nextElementSibling.classList.contains("hr-added")) {
        let title = `<div class="text-center display-4 my-3">Countries Participating News</div>` ;
        AddnewsCountriesParticipating.insertAdjacentHTML('afterbegin', title);
        document.getElementById("newsACountriesParticipating").insertAdjacentHTML('afterend', '<hr class="hr-added">');
    }
    if (Addnewsrulesofthecompetition.innerHTML !== "" && !document.getElementById("newsArulesofthecompetition").nextElementSibling.classList.contains("hr-added")) {
        let title = `<div class="text-center display-4 my-3">Rules of the Competition News</div>`  ;
        Addnewsrulesofthecompetition.insertAdjacentHTML('afterbegin', title);
        document.getElementById("newsArulesofthecompetition").insertAdjacentHTML('afterend', '<hr class="hr-added">');
    }
    if (AddnewsFinalsPredictions.innerHTML !== "") {
        let title = `<div class="text-center display-4 my-3">Finals Predictions News</div>`  ;
        AddnewsFinalsPredictions.insertAdjacentHTML('afterbegin', title);
    }
}

function clearData(){
    goToAdd();
    document.getElementById("newsId").value = '';
    document.querySelector('#imgPreview').src = '';
    document.querySelector('#imgPreview').style.display = 'none'
}