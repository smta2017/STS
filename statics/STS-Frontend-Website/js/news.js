var newsData;

function showNewsData() {
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
              // Three Talent News
              if(newsItem.type == "1"){
                element.innerHTML = `
                  <article ${index % 2 !== 0 ? 'style="flex-direction: row-reverse;"': "" } class="postcard light ${color}" id="newsItem_${newsItem._id}">
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
                          <a href="#news" onclick="showNewsDetails('${newsItem._id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                        </svg> &nbsp;&nbsp; Know More</a>
                        </li>
                      </ul>
                    </div>
                  </article>
                  <hr class="hr">
                `;
                AddnewsThreeTalent.appendChild(element);
              }
              //Latest News
              if(newsItem.type == "2"){
                element.innerHTML = `
                  <article ${index % 2 !== 0 ? 'style="flex-direction: row-reverse;"': "" } class="postcard light ${color}" id="newsItem_${newsItem._id}">
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
                          <a href="#news" onclick="showNewsDetails('${newsItem._id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                        </svg> &nbsp;&nbsp; Know More</a>
                        </li>
                      </ul>
                    </div>
                  </article>
                  <hr class="hr">
                `;
                AddnewsLatestNews.appendChild(element);
              }
              //Theaters of the World
              if(newsItem.type == "3"){
                element.innerHTML = `
                  <article ${index % 2 !== 0 ? 'style="flex-direction: row-reverse;"': "" } class="postcard light ${color}" id="newsItem_${newsItem._id}">
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
                          <a href="#news" onclick="showNewsDetails('${newsItem._id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                        </svg> &nbsp;&nbsp; Know More</a>
                        </li>
                      </ul>
                    </div>
                  </article>
                  <hr class="hr">
                `;
                AddnewsTheatersoftheworld.appendChild(element);
              }
              //Countries Participating
              if(newsItem.type == "4"){
                element.innerHTML = `
                  <article ${index % 2 !== 0 ? 'style="flex-direction: row-reverse;"': "" } class="postcard light ${color}" id="newsItem_${newsItem._id}">
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
                          <a href="#news" onclick="showNewsDetails('${newsItem._id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                        </svg> &nbsp;&nbsp; Know More</a>
                        </li>
                      </ul> 
                    </div>
                  </article>
                  <hr class="hr">
                `;
                AddnewsCountriesParticipating.appendChild(element);
              }
              //Rules of the Competition
              if(newsItem.type == "5"){
                element.innerHTML = `
                  <article ${index % 2 !== 0 ? 'style="flex-direction: row-reverse;"': "" } class="postcard light ${color}" id="newsItem_${newsItem._id}">
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
                          <a href="#news" onclick="showNewsDetails('${newsItem._id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                        </svg> &nbsp;&nbsp; Know More</a>
                        </li>
                      </ul> 
                    </div>
                  </article>
                  <hr class="hr">
                `;
                Addnewsrulesofthecompetition.appendChild(element);
              }
              //Finals Predictions
              if(newsItem.type == "6"){
                element.innerHTML = `
                  <article ${index % 2 !== 0 ? 'style="flex-direction: row-reverse;"': "" } class="postcard light ${color}" id="newsItem_${newsItem._id}">
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
                          <a href="#news" onclick="showNewsDetails('${newsItem._id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                        </svg> &nbsp;&nbsp; Know More</a>
                        </li>
                      </ul>
                    </div>
                  </article>
                  <hr class="hr">
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

showNewsData();

function title_line() {
  if (AddnewsThreeTalent.innerHTML !== "") {
      let title = `<div class="text-center display-4 my-3 text-light">Three Talent News</div>` ;
      AddnewsThreeTalent.insertAdjacentHTML('afterbegin', title);
      // document.getElementById("newsAThreeTalent").insertAdjacentHTML('afterend', '<hr class="hr-added">');
  }
  if (AddnewsLatestNews.innerHTML !== "") {
      let title = `<div class="text-center display-4 my-3 text-light">Latest News</div>`  ;
      AddnewsLatestNews.insertAdjacentHTML('afterbegin', title);
      // document.getElementById("newsALatestNews").insertAdjacentHTML('afterend', '<hr class="hr-added">');
  }
  if (AddnewsTheatersoftheworld.innerHTML !== "") {
      let title = `<div class="text-center display-4 my-3 text-light">Theaters of the World News</div>`  ;
      AddnewsTheatersoftheworld.insertAdjacentHTML('afterbegin', title);
      // document.getElementById("newsATheatersoftheworld").insertAdjacentHTML('afterend', '<hr class="hr-added">');
  }
  if (AddnewsCountriesParticipating.innerHTML !== "") {
      let title = `<div class="text-center display-4 my-3 text-light">Countries Participating News</div>` ;
      AddnewsCountriesParticipating.insertAdjacentHTML('afterbegin', title);
      // document.getElementById("newsACountriesParticipating").insertAdjacentHTML('afterend', '<hr class="hr-added">');
  }
  if (Addnewsrulesofthecompetition.innerHTML !== "") {
      let title = `<div class="text-center display-4 my-3 text-light">Rules of the Competition News</div>`  ;
      Addnewsrulesofthecompetition.insertAdjacentHTML('afterbegin', title);
      // document.getElementById("newsArulesofthecompetition").insertAdjacentHTML('afterend', '<hr class="hr-added">');
  }
  if (AddnewsFinalsPredictions.innerHTML !== "") {
      let title = `<div class="text-center display-4 my-3 text-light">Finals Predictions News</div>`  ;
      AddnewsFinalsPredictions.insertAdjacentHTML('afterbegin', title);
  }
}


function showNewsDetails(id) {
  if (id) {
    const showNewsD = newsData.find((newss) => {return newss._id == id});
    if (showNewsD) {
      // window.location.hash = "#knowMore";
      const showNewsContainer = document.getElementById("content");
      showNewsContainer.innerHTML = "";
      const element = document.createElement("div");
      element.innerHTML = `
                            <div class="profile-page" id="news_${showNewsD._id}">
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
                                                            <div class="col-6 text-center mx-auto">
                                                                <img id="photo" src="${domainName}/${showNewsD.photo}" class="rounded col-12 col-md-4 mb-2">  					
                                                            </div>
                                                        </div>

                                                            <div class="name">
                                                                <h3 class="title text-dark text-center mt-2" id="title">${showNewsD.title}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                    
                                                <div class="description text-center">
                                                    <p class="m-0 pb-5 text-dark px-2 px-md-0" id="paragraph">${showNewsD.paragraph}</p>
                                                </div>
                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    `;
      showNewsContainer.appendChild(element);
    } else {
      console.log("No news item found with the provided ID.");
    }
  } else {
    console.log("No news ID provided.");
  }
}
