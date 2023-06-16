var newsData;
function showNewsData() {
  var showNewsContainer = document.getElementById("showNews");
  document.getElementById("gif").style.display ="block"

  fetch(`${domainName}/sts/news/all`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      newsData = data.data;
      showNewsContainer.innerHTML = "";
      data.data.forEach((showNews, index) => {
        const colors = ["blue", "red", "green", "yellow"];
        const color = colors[index % colors.length];
        const element = document.createElement("div");
        element.innerHTML = `
                    <article ${
                      index % 2 !== 0
                        ? 'style="flex-direction: row-reverse;"'
                        : ""
                    } class="postcard light ${color}" id="showNews_${
          showNews._id
        }">
                        <a class="postcard__img_link" href="#">
                            <img class="postcard__img" src="${domainName}/${
          showNews.photo
        }" alt="Image Title" />
                        </a>
                        <div class="postcard__text t-dark">
                            <h1 class="postcard__title ${color}">${
          showNews.title
        }</h1>
                            <div class="postcard__subtitle small"></div>
                            <div class="postcard__bar"></div>
                            <div class="postcard__preview-txt">${
                              showNews.description
                            }</div>
                            <ul class="postcard__tagbox">
                                <li class="tag__item play ${color}">
                                    <a href="#news" onclick="showNewsDetails('${
                                      showNews._id
                                    }')"><i class="fas fa-play mr-2"></i> &nbsp;&nbsp; Know More</a>
                                </li>
                            </ul>
                        </div>
                    </article>
                `;
        showNewsContainer.appendChild(element);
      });
    })
    .catch((error) => console.log(error));
    document.getElementById("gif").style.display ="none"
}

showNewsData();

function showNewsDetails(id) {
  if (id) {
    const showNewsD = newsData.find((newss) => {
      return newss._id == id;
    });
    if (showNewsD) {
      // window.location.hash = "#knowMore";
      const showNewsContainer = document.getElementById("content");
      showNewsContainer.innerHTML = "";
      const element = document.createElement("div");
      element.innerHTML = `
                            <div class="profile-page" id="news_${showNewsD._id}">
                                <div class="page-header" data-parallax="true" style="background-image:url('images/339914637_169095876036285_1735365296112837238_n.jpg');"></div>
                                    <div class="main main-raised">
                                        <div class="profile-content">
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col-12 mx-auto text-canter">
                                                    
                                                        <div class="profile p-0">
                                                            <div class="avatar pb-1">
                                                                <img src="http://localhost:5000/STS-Frontend-Website/images/WhatsApp_Image_2023-05-14_at_14.34.50-removebg-preview.png" alt="Circle Image" class="img-raised rounded-circle img-fluid">
                                                            </div>
                                                        </div>

                                                        <div class="gallery my-0 p-0" id="imgContent">
                                                            <div class="col-6 text-center mx-auto">
                                                                <img id="photo" src="${domainName}/${showNewsD.photo}" class="rounded col-12 col-md-4">  					
                                                            </div>
                                                        </div>


                                                            <div class="name">
                                                                <h3 class="title text-dark" id="title">${showNewsD.title}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                    
                                                <div class="description text-center">
                                                    <p id="paragraph">${showNewsD.paragraph}</p>
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
