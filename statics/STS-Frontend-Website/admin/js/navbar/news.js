// document.getElementById("formNews").onsubmit = function (e) {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('title', document.getElementById("TitleForNews").value);
//     formData.append('description', document.getElementById("descrebtionForNews").value);
//     formData.append('paragraph', document.getElementById("paragraphForNews").value);
//     formData.append('photo', document.getElementById("uploadImgForNews").files[0]);

//     try {
//         fetch('http://localhost:5000/sts/news', {
//             method: 'POST',
//             body: formData,
//         })
//             .then(response => {
//                 if (response.ok) {
//                     console.log("Data saved successfully");
//                     document.getElementById("TitleForNews").value = "";
//                     document.getElementById("descrebtionForNews").value = "";
//                     document.getElementById("paragraphForNews").value = "";
//                     document.getElementById("uploadImgForNews").files[0] ="";
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

var newsData;
function getNewsData() {
    var newsContainer = document.getElementById("Addnews");
    fetch(`${domainName}/sts/news/all`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
        .then(response => response.json())
        .then(data => {
            newsData = data.data;
            newsContainer.innerHTML = "";
            newsData.forEach((showNews, index) => {
                const colors = ['blue', 'red', 'green', 'yellow']; 
                const color = colors[index % colors.length]; 
                const element = document.createElement('div');
                element.innerHTML = `
                    <article class="postcard light ${color}" id="showNews_${showNews._id}">
                        <a class="postcard__img_link" href="#">
                            <img class="postcard__img" src="${domainName}/${showNews.photo}" alt="Image Title" />
                        </a>
                        <div class="postcard__text t-dark">
                            <h1 class="postcard__title ${color}"><a href="#">${showNews.title}</a></h1>
                            <div class="postcard__subtitle small"></div>
                            <div class="postcard__bar"></div>
                            <div class="postcard__preview-txt">${showNews.description}</div>
                            <ul class="postcard__tagbox">
                                <li class="tag__item play ${color}">
                                    <a onclick="showNewsDetails('${showNews._id}')"><i class="fas fa-play mr-2"></i> &nbsp;&nbsp; Know More</a>
                                </li>
                            </ul>
                            <div class="col-12 text-end">
                                <div class="btn_group">
                                    <button class="btn btn-success" id="add-row" onclick="editNews('${showNews._id}')">
                                        <i class="edit-btn fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button class="btn btn-danger" id="remove-row" onclick="deleteNews('${showNews._id}')">
                                        <i class="delete-btn fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                            </div> 
                        </div>
                    </article>
                `;
                newsContainer.appendChild(element);
            });
        })
        .catch(error => console.log(error));
}

getNewsData();

function editNews(id) {

    var myNews = newsData.find(newss => { return newss._id == id })
    console.log(myNews)
    document.getElementById("newsId").value = myNews._id;
    document.getElementById("TitleForNews").value = myNews.title ;
    document.getElementById("descrebtionForNews").value = myNews.description;
    document.getElementById("paragraphForNews").value = myNews.paragraph;
    document.getElementById("uploadImgForNews").value = myNews.photo;
}

function changeNews(e) {
    e.preventDefault();
    let id = document.getElementById("newsId").value;
    const formData = new FormData();
    formData.append('title', document.getElementById("TitleForNews").value);
    formData.append('description', document.getElementById("descrebtionForNews").value);
    formData.append('paragraph', document.getElementById("paragraphForNews").value);
    formData.append('photo', document.getElementById("uploadImgForNews").files[0]);
    if (id) {
        try {
            fetch(`${domainName}/sts/news/${id}`, {
                method: 'PUT',
                body: formData,
            })
                .then(response => {                    
                    if (response) {
                        console.log("congrats, you updated news data successfully");
                        document.getElementById("newsId").value = "";
                        document.getElementById("TitleForNews").value = "";
                        document.getElementById("descrebtionForNews").value = "";
                        document.getElementById("paragraphForNews").value = "";
                        document.getElementById("uploadImgForNews").value = "";
                        document.getElementById("imgPreview").style.display = "none";
                        getNewsData();
                    } else {
                        throw new Error('Request failed.');
                    }
                })
                .catch(error => console.log(error));
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            fetch(`${domainName}/sts/news`, {
                method: 'POST',
                body: formData,
            })
                .then(response => {
                    if (response) {
                        console.log("Data saved successfully");
                        document.getElementById("TitleForNews").value = "";
                        document.getElementById("descrebtionForNews").value = "";
                        document.getElementById("paragraphForNews").value = "";
                        document.getElementById("uploadImgForNews").value = "";
                        document.getElementById("imgPreview").style.display = "none";
                        getNewsData(); 
                    } else { 
                        throw new Error('Request failed.loka'); 
                    } 
                }) 
                .catch(error => console.log(error)); 
        } catch (error) { 
            console.log(error); 
        } 
    } 
} 

function deleteNews(id) {
    if (id) {
        try {
            fetch(`${domainName}/sts/news/${id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        console.log("News data deleted successfully");
                        getNewsData();
                    } else {
                        throw new Error('Request failed.');
                    }
                })
                .catch(error => console.log(error));
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("No news ID provided");
    }
}


function getNewsDetails(id) {
    if (id) {
        const newsD = newsData.find(newss => { return newss._id == id });
        if (newsD) {
            window.location.hash = "#knowMore";
            const newsContainer = document.getElementById("content");
            newsContainer.innerHTML = "";
            const element = document.createElement('div');
            element.innerHTML = `
                            <div class="profile-page mb-3" id="news_${newsD._id}">
                                <div class="page-header" data-parallax="true" style="background-image:url('images/339914637_169095876036285_1735365296112837238_n.jpg');"></div>
                                    <div class="main main-raised">
                                        <div class="profile-content">
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col-12 ml-auto mr-auto">
                                                        <div class="profile">
                                                            <div class="avatar">
                                                                <img src="http://localhost:5000/STS-Frontend-Website/images/WhatsApp_Image_2023-05-14_at_14.34.50-removebg-preview.png" alt="Circle Image" class="img-raised rounded-circle img-fluid">
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