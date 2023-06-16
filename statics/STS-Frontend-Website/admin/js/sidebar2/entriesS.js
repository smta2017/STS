// ENTRIES //

function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
}

var headers = new Headers(); 
var token = getCookie("token");
headers.append('Authorization', token); 
// headers.append('Content-Type', "application/json");

var patch = new Headers(); 
token = getCookie('token'); 
patch.append('Authorization', token); 
patch.append('Content-Type', "application/json-patch+json");

// function getEntriesData() {
//   var entriesContainer = document.getElementById("results_container-school");
//   var id = getCookie("subscriptionId");

// fetch(`${domainName}/sts/entry/${id}`, {
//   method: 'GET',
//   headers: headers
// })
//   .then(response => response.json())
//   .then(data => {
//     debugger
//     console.log(data.data)
//     entriesData = data.data;
//       entriesContainer.innerHTML = "";
//       console.log(entriesData);

//       entriesData.forEach((entry) => {

//         console.log(entry);
//         const element = document.createElement('section');
//         element.id= "entersU";
//         element.className= "pb-5";
//         element.innerHTML = `<div class="bg-danger>
//         kdfjgskjhgkfhj</div>`

//         // element.innerHTML = `
//         //     <div class="container">
//         //       <div class="row bg-danger">
//         //         <div class="panel my-4">
//         //           <div class="panel-heading">
//         //             <div class="row">
//         //               <div class="row bg-danger">
//         //                 <h4 class="title col-3 bg-danger" id="nameEntry">${entry.name}</h4>
//         //                 <div class="col-5 text-center">
//         //                   <div class="btn_group">
//         //                     <button class="btn btn-light" id="add-row" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Degree</button>
//         //                   </div>
//         //                 </div>
//         //                 <div class="title col-4 text-end">
//         //                   <i class="edit-btn fa-solid fa-pen-to-square" style="color: #3e843e;cursor: pointer;" data-bs-toggle="modal" data-bs-target="#AddCompatator" onclick="editEntry('${entry._id}')"></i>
//         //                   <i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" onclick="deleteEntry('${entry._id}')"></i>
//         //                   <button class="btn btn-default" title="Pdf" fdprocessedid="vmxwvs" id="generate-pdf"><i class="fa fa-file-pdf"></i></button>
//         //                 </div>
//         //               </div>
//         //               <div class="row mt-2">
//         //                 <div class="col-12 text-center">
//         //                   <div class="btn_group">
//         //                     <audio src="${domainName}/${entry.music}" id="audioPlayer1" controls>
//         //                       <source id="audio_${entry._id}"/>
//         //                     </audio>
//         //                   </div>
//         //                 </div>
//         //               </div>
//         //             </div>
//         //           </div> 
//         //           <div class="panel-body table-responsive">
//         //             <table class="table" id="table-entries">
//         //               <thead>
//         //                 <tr>
//         //                   <th>Compatator Name</th>
//         //                   <th>Category Name</th>
//         //                 </tr>
//         //               </thead>

//         //               <tbody id="table-body-entriesU">
//         //                 ${entry.competitors.firstName.map((competitor, index) => `
//         //                     <tr>
//         //                       <td class="col-6">${competitor}</td>
//         //                       <td class="col-6">${entry.competitors.category[index]}</td>
//         //                     </tr>
//         //                   `).join('')}
//         //               </tbody>
//         //             </table>
//         //           </div>
//         //         </div>
//         //       </div>
//         //     </div> 



//         //     <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//         //   <div class="modal-dialog">
//         //     <div class="modal-content">
//         //       <div class="modal-header">
//         //         <h5 class="modal-title text-dark" id="exampleModalLabel">Add Degree</h5>
//         //         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//         //       </div>
//         //       <div class="modal-body">
//         //         <form class="row g-3" id="form_${entry._id}" onsubmit="addDegreeForEntry(event)">
//         //           <div class="col-12 col-md-4"> 
//         //             <label for="degreeRuler1_${entry._id}">Degree Ruler 1:</label> 
//         //             <input type="number" class="form-control" id="degreeRuler1_${entry._id}" placeholder="Degree Ruler 1" min="1" max="30">
//         //           </div> 
//         //           <div class="col-12 col-md-4"> 
//         //             <label for="degreeRuler2_${entry._id}">Degree Ruler 2:</label> 
//         //             <input type="number" class="form-control" id="degreeRuler2_${entry._id}" placeholder="Degree Ruler 2" min="1" max="30">
//         //           </div> 
//         //           <div class="col-12 col-md-4">  
//         //             <label for="degreeRuler3_${entry._id}">Degree Ruler 3:</label> 
//         //             <input type="number" class="form-control" id="degreeRuler3_${entry._id}" placeholder="Degree Ruler 3" min="1" max="30">
//         //           </div> 
//         //           <div class="col-12 col-md-6">  
//         //             <label for="degreeRuler_${entry._id}">Degree Ruler:</label> 
//         //             <input type="number" class="form-control" id="degreeRuler_${entry._id}" placeholder="Degree Ruler" min="1" max="10">
//         //           </div>
//         //           <div class="col-12 col-md-6"> 
//         //             <label for="showDate_${entry._id}">Show Date:</label> 
//         //             <input type="datetime-local" class="form-control" id="showDate_${entry._id}" placeholder="Show Date">
//         //           </div> 
//         //           <div class="row mx-auto my-3">
//         //             <button type="submit" id="submit" data-bs-dismiss="modal" class="btn btn-dark col-6">Add</button>
//         //             <button type="button" class="close-popup btn btn-dark col-6" data-bs-dismiss="modal">Close</button>
//         //           </div>
//         //         </form>
//         //       </div>
//         //     </div>
//         //   </div>
//         // </div>
//         //   `;
//       element.setAttribute('id', `entry-${entry._id}`);
//       entriesContainer.appendChild(element);        
//     });
//   })
//   .catch(error => console.error(error));
// }

// getEntriesData();



// ${comp.map((firstName, index) => `
// <tr>
//   <td class="col-6">${firstName}</td>
//   <td class="col-6">${category[index]}</td>
// </tr>
// `).join('')}


function getEntriesData() {
  var entriesContainer = document.getElementById("results_container-school");
  var id = getCookie("subscriptionId");

  fetch(`${domainName}/sts/entry/${id}`, {
    method: 'GET',
    headers: headers
  })
    .then(response => response.json())
    .then(data => {
      entriesData = data.data;
      entriesContainer.innerHTML = "";
      data.data.forEach(entry=> {
        entry.competitors.forEach((comp)=>{
          console.log(entry.name)
          console.log(entry.competitors)

        // console.log(entry.competitors.firstName)
        // console.log(entry.competitors[0]);
          const element = document.createElement('section');
          element.id= "entersU";
          element.className= "pb-5";
          element.innerHTML = `
            <div class="container">
              <div class="row ">
                <div class="panel my-4">
                  <div class="panel-heading">
                    <div class="row">
                      <div class="row ">
                        <h4 class="title col-3 " id="nameEntry">${entry.name}</h4>
                        <div class="col-5 text-center">
                          <div class="btn_group">
                            <button class="btn btn-light" id="add-row" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Degree</button>
                          </div>
                        </div>
                        <div class="title col-4 text-end">
                          <i class="edit-btn fa-solid fa-pen-to-square" style="color: #3e843e;cursor: pointer;" data-bs-toggle="modal" data-bs-target="#AddCompatator" onclick="editEntry('${entry._id}')"></i>
                          <i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" onclick="deleteEntry('${entry._id}')"></i>
                          <button class="btn btn-default" title="Pdf" fdprocessedid="vmxwvs" id="generate-pdf"><i class="fa fa-file-pdf"></i></button>
                        </div>
                      </div>
                      <div class="row mt-2">
                        <div class="col-12 text-center">
                          <div class="btn_group">
                            <audio src="${domainName}/${entry.music}" id="audioPlayer1" controls>
                              <source id="audio_${entry._id}"/>
                            </audio>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> 
                  <div class="panel-body table-responsive">
                    <table class="table" id="table-entries">
                      <thead>
                        <tr>
                          <th>Compatator Name</th>
                          <th>Category Name</th>
                        </tr>
                      </thead>

                      <tbody id="table-body-entriesU">

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div> 



            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-dark" id="exampleModalLabel">Add Degree</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form class="row g-3" id="form_${entry._id}" onsubmit="addDegreeForEntry(event)">
                  <div class="col-12 col-md-4"> 
                    <label for="degreeRuler1_${entry._id}">Degree Ruler 1:</label> 
                    <input type="number" class="form-control" id="degreeRuler1_${entry._id}" placeholder="Degree Ruler 1" min="1" max="30">
                  </div> 
                  <div class="col-12 col-md-4"> 
                    <label for="degreeRuler2_${entry._id}">Degree Ruler 2:</label> 
                    <input type="number" class="form-control" id="degreeRuler2_${entry._id}" placeholder="Degree Ruler 2" min="1" max="30">
                  </div> 
                  <div class="col-12 col-md-4">  
                    <label for="degreeRuler3_${entry._id}">Degree Ruler 3:</label> 
                    <input type="number" class="form-control" id="degreeRuler3_${entry._id}" placeholder="Degree Ruler 3" min="1" max="30">
                  </div> 
                  <div class="col-12 col-md-6">  
                    <label for="degreeRuler_${entry._id}">Degree Ruler:</label> 
                    <input type="number" class="form-control" id="degreeRuler_${entry._id}" placeholder="Degree Ruler" min="1" max="10">
                  </div>
                  <div class="col-12 col-md-6"> 
                    <label for="showDate_${entry._id}">Show Date:</label> 
                    <input type="datetime-local" class="form-control" id="showDate_${entry._id}" placeholder="Show Date">
                  </div> 
                  <div class="row mx-auto my-3">
                    <button type="submit" id="submit" data-bs-dismiss="modal" class="btn btn-dark col-6">Add</button>
                    <button type="button" class="close-popup btn btn-dark col-6" data-bs-dismiss="modal">Close</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
            `;
          element.setAttribute('id', `entry-${entry._id}`);
      })
        entriesContainer.appendChild(element);        
      });
    })
    .catch(error => console.log(error));
}

getEntriesData();


document.getElementById("uMusic").addEventListener("change", handleFiles, false);

function handleFiles(event) {
  console.log(event.target.files[0]);
  
  var files = event.target.files;
  document.getElementById("audio").src = URL.createObjectURL(files[0]);
  document.getElementById("audioPlayer").load();

}

function editEntry(id) {
  console.log(id);
  console.log("edit");
  var entry = entriesData.find(entry => entry._id == id);
  console.log(entry);
  // console.log(entry._id);
  document.getElementById("entriesId").value = id;
  document.getElementById('entryname').value = entry.name;
  document.getElementById('uMusic').value = entry.music;
}

function changeEntry(e) {
  e.preventDefault(); // Prevent the default form submission

  var entriesId = document.getElementById('entriesId').value;
  console.log(entriesId);

  // Get the form values
  const formData = new FormData();
  formData.append('qualifierSubscription', getCookie('competition'));
  formData.append('name', document.getElementById("entryname").value);
  formData.append('music', document.getElementById("uMusic").files[0]);

  if (entriesId) {
    // Existing competitor, send PUT request
    fetch(`${domainName}/sts/entry/${entriesId}`, {
      method: 'PUT',
      headers: headers,
      body: formData
    })
      .then(response => response.json())
      .then(response => {  
        console.log(response);
        console.log(response.data.result._id);
        if (response.apiStatus == true ) {
          console.log('Entry updated successfully');

          document.getElementById('entriesId').value = '';
          document.getElementById('entryname').value = '';
          document.getElementById('uMusic').value = '';

          getEntriesData();
        } else {
          console.log('Error:', response.status);
        }
      })
      .catch(function (error) {
        console.log('Error:', error);
      });
  } else {
    // New competitor, send POST request
    fetch(`${domainName}/sts/entry`, {
      method: 'POST',
      headers: headers,
      body: formData
    })
      .then(response => {  
        console.log(response);
        if (response.ok) {
          console.log(response);
          console.log('Entry added successfully');

          document.getElementById('entriesId').value = '';
          document.getElementById('entryname').value = '';
          document.getElementById('uMusic').value = '';

          // getEntriesData();

          response.json().then(data => {
            const newEntryId = data.data.entry._id;
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
              <td>${formData.get('name')}</td>
              <td>
                <audio id="audioPlayer_${newEntryId}" controls>
                  <source src="" id="audio_${newEntryId}"/>
                </audio>
              </td>
              <td>
                <i class="edit-btn fa-solid fa-pen-to-square" style="color: #3e843e;cursor: pointer;" data-bs-toggle="modal" data-bs-target="#AddCompatator" onclick="editEntry('${newEntryId}')"></i>
                <i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" onclick="deleteEntry('${newEntryId}')"></i>
              </td>
            `;
            newRow.setAttribute('id', `entry-${newEntryId}`);
            document.getElementById("table-body-entries").appendChild(newRow);

            const audioPlayer = document.getElementById(`audioPlayer_${newEntryId}`);
            audioPlayer.src = URL.createObjectURL(formData.get('music'));
            // audioPlayer.onloadeddata = function() {
            //   audioPlayer.play();
            // };

            const playButton = audioPlayer.parentElement.querySelector('.play-btn');
            playButton.addEventListener('click', function() {
              audioPlayer.play();
            });
          });
        } else {
          console.log('Error:', response.status);
        }
      })
      .catch(function (error) {
        console.log('Error:', error);
      });
  }
}

function deleteEntry(id) {
    if (id) {
        try {
            fetch(`${domainName}/sts/entry/${id}`, {
                method: 'DELETE',
                headers: headers
            })
                .then(response => {
                    if (response.ok) {
                        console.log("Entry data deleted successfully");
                        getEntriesData();
                    } else {
                        throw new Error('Request failed.');
                    }
                })
                .catch(error => console.error(error));
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("No Competitors ID provided");
    }
}

// function getCompetitorsName(entriesID,competitors) {
//   // e.preventDefault(); // Prevent the default form submission

//   // var entriesID = document.getElementById('entriesId').value;
//   console.log(competitors);  console.log(entriesID); 

//   // console.log(id); 

//   var competitorsContainer = document.getElementById("name_list");
 
//   headers.append('Content-Type', "application/json");

//   // Existing competitor, send PUT request
//   fetch(`${domainName}/sts/competitor/${id}`, {
//     method: 'GET',
//     headers: headers
//   })
//     .then(response => response.json())
//     .then(data => {
//       let competitorsData = data.data;
//       competitorsData=competitorsData.filter(comp=>!competitors.includes(comp._id))
//       competitorsContainer.innerHTML = "";
//       competitorsData.forEach(competitor=> {
//         console.log(competitor._id); 
//         const element = document.createElement('table');
//         element.innerHTML = `
//           <tr class="text-dark">
//             <td class="col-7">${competitor.firstName} ${competitor.lastName}</td>
//             <td class="col-3">${competitor.category}</td>
//           </tr>
//         `;
//         element.setAttribute('id', `competitor-${competitor._id}`);
//         competitorsContainer.appendChild(element);
//       });
//     })
// }


// function add_editCompatatorsToEntry(compatatorID, entriesID) {
//   console.log(compatatorID);
//   console.log(entriesID);
//   var competitors_Category = document.getElementById("table-body-entriesU");

//   fetch(`${domainName}/sts/entry/${entriesID}/${compatatorID}`, {
//     method: 'PUT',
//     headers: headers,
//   })
//     .then(response => response.json())
//     .then(response => {
//       console.log(response);
//       if (response.apiStatus === true) {
//         console.log('Entry updated successfully');
//         console.log(response.data.competitors);
//         console.log(response.data.competitorsCategories);

//         const existingRow = document.getElementById(response.data._id);
//         if (existingRow) {
//           // Update existing row
//           const firstCell = existingRow.querySelector('.competitor-cell');
//           const secondCell = existingRow.querySelector('.category-cell');

//           // Update competitor cell
//           firstCell.innerHTML = "";
//           response.data.competitors.forEach((competitor) => {
//             firstCell.innerHTML += `<span>${competitor}</span>`;
//           });

//           // Update category cell
//           secondCell.innerHTML = "";
//           response.data.competitorsCategories.forEach((category) => {
//             secondCell.innerHTML += `<span>${category}</span>`;
//           });
//         } else {
//           // Create new row
//           const element = document.createElement('tr');
//           element.id = response.data._id;
//           element.innerHTML = `
//             <td class="competitor-cell">
//               ${response.data.competitors.map(competitor => `<span>${competitor}</span>`).join('')}
//             </td>
//             <td class="category-cell">
//               ${response.data.competitorsCategories.map(category => `<span>${category}</span>`).join('')}
//             </td>
//           `;

//           competitors_Category.appendChild(element);
//         }

//         getEntriesData();
//       } else {
//         console.log('Error:', response.apiMessage);
//         // Display an error message to the user indicating the duplication
//         alert(response.apiMessage);
//       }
//     })
//     .catch(function (error) {
//       console.log('Error:', error);
//     });
// }



function addDegreeForEntry(e) {
  e.preventDefault(); // Prevent the default form submission
  console.log("start");
  // var entriesId = document.getElementById('degreeEntry').value;
  // console.log(entriesId);
  var subscriptionID = getCookie('subscriptionId');
  var competitionID =  e.target.id.split("_")[1];

  console.log(subscriptionID);
  console.log(competitionID);

  // Get the form values
  // const formData = new FormData();
  // formData.append('degree', document.getElementById("degreeEntry").value);

  var formData = {
      ShowDate: document.getElementById(`showDate_${competitionID}`).value,
      Refree1: document.getElementById(`degreeRuler1_${competitionID}`).value,
      Refree2: document.getElementById(`degreeRuler2_${competitionID}`).value,
      Refree3: document.getElementById(`degreeRuler3_${competitionID}`).value,
      Last10Present: document.getElementById(`degreeRuler_${competitionID}`).value,
      // degree: document.getElementById(`degreeEntry_${competitionID}`).value,
    };


    // New competitor, send POST request
  fetch(`${domainName}/sts/entry/${subscriptionID}/${competitionID}`, {
      method: 'PATCH',
      headers: patch,
      // body: JSON.stringify([
      //     {
      //        "op" : "replace",
      //         "path" : "degree",
      //         "value" : `document.getElementById('degreeEntry_${competitionID}').value` 
      //     }
      // ])
      body: JSON.stringify(formData)
  })
      .then(response => {  
        console.log(response);
        if (response.ok) {
          console.log(response);
          console.log('your data added successfully');

          // document.getElementById(competitionID).style.display = "none";

          getEntriesData();
         
        } else {
          console.log('Error:', response.status);
        }
      })
      .catch(function (error) {
        console.log('Error:', error);
      });
  }

// ENTRIES //