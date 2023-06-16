var headers = new Headers(); 
var token = getCookie("token");
headers.append('Authorization', token); 
headers.append('Content-Type', "application/json");

// var competitionsData;
// function showCompetitionsData() {
//     var competitionsContainer = document.getElementById("ShowCompetitionsR");
//     fetch(`${domainName}/sts/competition/forrefree`, {
//         method: 'GET',
//         headers: headers
//     })
//         .then(response => response.json())
//         .then(data => {
//             competitionsData = data.data;
//             competitionsContainer.innerHTML = "";
//             data.data.forEach(competitions => {
//                 const element = document.createElement('div');
//                 // element.className = "card mx-auto p-2 col-9 col-lg-4 col-md-6 col-sm-7 fw-bold text-light "
//                 // element.style.backgroundColor = "#ffffff00";
//                 // element.style.borderColor = "white";
//                 // element.id = `competitions_${competitions._id}`
//                 // element.innerHTML = `
//                 //     <img src="${domainName}/${competitions.poster}" class="card-img-top" alt="...">
//                 //     <div class="card-body">
//                 //         <a type="submit" value="Join Competition" id="joinCompetition"
//                 //             class="btn btn-success mb-4 w-100 w-sm-50 fs-5 fw-bold">Join Competition</a>
//                 //         <h1 style="height: 3px;" class="bg-body-secondary w-100 mb-5">${competitions.type} - ${competitions.year}</h1>
//                 //         <label class="card-title">Admission</label>
//                 //         <p class="fw-normal ms-3">${competitions.startSubscription} to ${competitions.endSubscription}</p>
//                 //         <label class="card-title">location display your show</label>
//                 //         <p class="fw-normal ms-3">${competitions.stage}</p>
//                 //         <label class="card-title">date display your show</label>
//                 //         <p class="fw-normal ms-3 mb-0">${competitions.date}</p>
//                 //     </div>
                
//                 // `;
//                 element.className = "cardcontainer my-3 col-12 col-md-6 col-lg-4"
//                 element.id = `competitions_${competitions._id}`
//                 element.innerHTML = `
//                     <div class="photo">
//                         <img src="${domainName}/${competitions.poster}">
//                     </div>

//                     <div class="footer">
//                         <a class="btn btn-warning" type="submit" value="Show Entries" id="showEntries" href="#showEntries">Show Entries</a>
//                     </div>

//                     <div class="content">
//                         <h3 class="txt4 mt-5">${competitions.type} - ${competitions.year}</h3>
//                         <div class="txt5">
//                         <h1 style="height: 3px;" class="bg-body-secondary w-100"></h1>
//                         <label class="card-title">Admission</label>
//                         <p class="fw-normal ms-3">${competitions.startSubscription} to ${competitions.endSubscription}</p>
//                         <label class="card-title">Location Display your Show</label>
//                         <p class="fw-normal ms-3">${competitions.stage}</p>
//                         <label class="card-title">Date Display your Show</label>
//                         <p class="fw-normal ms-3 mb-0">${competitions.date}</p>
//                     </div>
//                 `
//                 competitionsContainer.appendChild(element);
//             });
//         })
//         .catch(error => console.log(error));
// }

// showCompetitionsData();

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
  }
// localStorage.removeItem("entryDegree"); 
deleteCookie("entryDegree"); 



var competitionsData;

function getCompetitionsData() {
    var competitionsContainer = document.getElementById("ShowCompetitionsR");
    fetch(`${domainName}/sts/competition/forrefree`, {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then(data => {
            competitionsData = data.data;
            competitionsContainer.innerHTML = "";
            data.data.forEach(competitions => {
                const element = document.createElement('div');
                element.className = "rounded-3 col-12 col-md-6 col-lg-4 text-light pt-2 bg-dark mb-2 mx-auto"
                element.id = `competitions_${competitions._id}`;

                const startSubscription = `${competitions.startSubscription}`.split("T")[0];
                const endSubscription = `${competitions.endSubscription}`.split("T")[0];
                const date = `${competitions.date}`.split("T")[0];

                element.innerHTML = `
                    <div class="photo">
                        <img src="${domainName}/${competitions.poster}" class="w-100">
                    </div>

                    <div class="footer">
                        <a href="#showEntries" class="btn btn-warning w-100 text-dark" id="${competitions._id}" onclick="storeID('${competitions._id}','${competitions.type}','${competitions.year}')" >Go Entry to Put Degree</a>
                    </div>

                    <h3 class="text-center pt-3 bg-dark">${competitions.type} - ${competitions.year}</h3>
                    <div class="content">
                        <div class="text-center">
                            <label class="card-title fw-bold text-light">Admission</label>
                            <p class="ms-2">${startSubscription} to ${endSubscription}</p>
                            <label class="card-title fw-bold text-light">Location Display your Show</label>
                            <p class="ms-2">${competitions.stage}</p>
                            <label class="card-title fw-bold text-light">Date Display your Show</label>
                            <p class="ms-2">${date}</p>
                        </div>
                    </div>
                `;   
                competitionsContainer.appendChild(element);
            });
        })
        .catch(error => console.log(error));
}

getCompetitionsData();

function setCookie(name, value) {
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; path=/';
  }

function storeID(id,type,year) {
    setCookie("entryDegree" , id)
    setCookie("type" , type)
    setCookie("year" , year)
}

// var entriesData;
// function showEntriesData(id) {
//     var entriesContainer = document.getElementById("content");
//     console.log(id);
    
//     fetch(`${domainName}/sts/entry/completeresult/${id}`, {
//         method: 'GET',
//         headers: headers
//     })
//         .then(response => response.json())
//         .then(data => {
//             entriesData = data.data;
//             entriesContainer.innerHTML = "";
//             data.data.forEach(entry => {
//                 const element = document.createElement('section');
//                 element.id = "entriesR"
//                 element.innerHTML = `
//                     <div class="container mx-auto">
//                     <h1 class="text-dark">All Entries</h1>
//                     <div class="row" id="ShowEntriesR">
//                         <div class="container">
//                         <h1 id="competionName" class="text-center text-dark">Competion1</h1>
//                         <div class="row">
//                             <div class="panel my-4">
//                                 <div class="panel-heading">
//                                     <div class="row">
//                                         <div class="col-12 col-lg-6">
//                                             <h4 class="title" id="messages">Entry List</h4>
//                                         </div>
//                                         <div class="col-12 col-lg-6 text-center">
//                                             <div class="btn_group">
//                                                 <input type="text" class="form-control" id="search" placeholder="Search" spellcheck="false" data-ms-editor="true" fdprocessedid="3x5nnf">
//                                                 <button class="btn btn-default" title="Pdf" fdprocessedid="vmxwvs" id="generate-pdf"><i class="fa fa-file-pdf"></i></button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>  
//                                 <div class="panel-body table-responsive">
//                                     <table class="table" id="table-entries">
//                                         <thead>
//                                             <tr>
//                                                 <th>Compatator Name</th>
//                                                 <th>Category Name</th>
//                                                 <th>Set Degree</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody id="table-body-entries">
//                                             <td>${entry.name}</td>
//                                             <td>${entry.qualifierSubscription.academy.academyDetails}</td>
//                                             <td>
//                                                 <form class="col-12 col-lg-6 text-center" id="show-entry-form">
//                                                     <div class="btn_group">
//                                                         <input type="number" class="form-control" id="degreeEntry" placeholder="Degree Entry" min="1" max="30">
//                                                         <input type="submit" class="form-control" id="submit">
//                                                     </div>
//                                                 </form>
//                                             </td>
//                                         </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     </div>
//                 `;
//                 entriesContainer.appendChild(element);
//             });
//         })
//         .catch(error => console.log(error));
// }

// // showEntriesData();