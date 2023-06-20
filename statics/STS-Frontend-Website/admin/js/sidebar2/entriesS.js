// ENTRIES //

function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
}


function getEntriesData() {
  var entriesContainer = document.getElementById("results_container-school");
  var id = getCookie("subscriptionId");

  document.getElementById("gif").style.display ="block"
  fetch(`${domainName}/sts/entry/${id}`, {
    method: 'GET',
    headers: {'Authorization': token},
  })
    .then(response => response.json())
    .then(data => {
      entriesData = data.data;
      entriesContainer.innerHTML = "";
      data.data.forEach(entry=> {
          const competitorList=entry.competitors.map(competitor=>competitor._id)
          const element = document.createElement('section');
          element.id= "entersS";
          element.className= "pb-1";
          let competitorsTable = `
            <div class="container">
              <div class="m-0 row">
                <div class="panel my-4">
                  <div class="panel-heading">
                    <div class="row">
                      <div class="row">
                        <h4 class="title col-12 col-lg-6 text-md-center" id="nameEntry">${entry.name}</h4>
                        <div class="btn_group col-12 col-lg-6 text-md-center">
                          <audio src="${domainName}/${entry.music}" id="audioPlayer1" controls>
                            <source id="audio_${entry._id}"/>
                          </audio>
                        </div>
                        <div class="col-12 row pb-2"> 
                        
                            <div class="btn_group col-12 col-sm-6 text-sm-start text-center">
                              <button class="btn btn-light" data-bs-toggle="modal" data-bs-target="#AddCompatatorToEntry" onclick='getCompetitorsName("${entry._id}","${competitorList}")'>Add Compatators</button>
                            </div>

                            <div class="title col-12 col-sm-6 text-sm-end text-center">
                              <i class="edit-btn fa-solid fa-pen-to-square" style="color: #3e843e;cursor: pointer;" data-bs-toggle="modal" data-bs-target="#AddCompatator" onclick="editEntry('${entry._id}')"></i>
                              <i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" onclick="deleteEntry('${entry._id}')"></i>
                              <!--<button class="btn btn-default" title="Pdf" fdprocessedid="vmxwvs" ><i class="fa fa-file-pdf"></i></button>-->
                              <button class="btn btn-light" id="add-row" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showDgreeForRefree('${entry._id}')">Add Degree</button>
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
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody id="table-body-entriesS">`
                          entry.competitors.forEach(competitor=>{
                            competitorsTable+=`<tr><td>${competitor.firstName} ${competitor.lastName}</td><td>${competitor.category}</td><td><i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" onclick="deleteCompatator('${competitor._id}','${entry._id}')"></i></td></tr>`
                          })
                          competitorsTable+= ` </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div> 

            <div class="modal modal-dialog-scrollable fade" id="AddCompatatorToEntry" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title text-dark" id="exampleModalLabel">Add Compatators to Entry</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form id="add-CompatatorsToEntry-form" class="row g-3" return false;">
                      <div class="col-12"> 
                        <label >Add Compatators Names to Entry:</label> 
                        <div id="name_list">
                          <!-- Names will be added here --> 
                          
                        </div> 
                      </div> 
                      <div class="row ms-5 mx-auto my-2">
                        <button type="button" class="close-popup btn btn-dark col-6" data-bs-dismiss="modal">Close</button>
                      </div>
                    </form>
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
                        <label for="degreeRuler1">Degree Ruler 1:</label> 
                        <input type="number" class="form-control" id="degreeRuler1" placeholder="Degree Ruler 1" min="1" max="30">
                      </div> 
                      <div class="col-12 col-md-4"> 
                        <label for="degreeRuler2">Degree Ruler 2:</label> 
                        <input type="number" class="form-control" id="degreeRuler2" placeholder="Degree Ruler 2" min="1" max="30">
                      </div> 
                      <div class="col-12 col-md-4">  
                        <label for="degreeRuler3">Degree Ruler 3:</label> 
                        <input type="number" class="form-control" id="degreeRuler3" placeholder="Degree Ruler 3" min="1" max="30">
                      </div> 
                      <div class="col-12 col-md-6">  
                        <label for="degreeRuler">Degree Ruler:</label> 
                        <input type="number" class="form-control" id="degreeRuler" placeholder="Degree Ruler" min="1" max="10">
                      </div>
                      <div class="col-12 col-md-6"> 
                        <label for="showDate">Show Date:</label> 
                        <input type="datetime-local" class="form-control" id="showDate" placeholder="Show Date">
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
        element.innerHTML+= competitorsTable
        element.setAttribute('id', `entry-${entry._id}`);
        entriesContainer.appendChild(element);    
        document.getElementById("gif").style.display ="none"    
      });
    })
    .catch(error => console.log(error));
    document.getElementById("gif").style.display ="none"
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
  var entry = entriesData.find(entry => entry._id == id);
  // console.log(entry._id);
  document.getElementById("entriesId").value = id;
  document.getElementById('entryname').value = entry.name;
  document.getElementById('uMusic').value = entry.music;
}

function changeEntry(e) {
  e.preventDefault(); // Prevent the default form submission

  var entriesId = document.getElementById('entriesId').value;

  // Get the form values
  const formData = new FormData();
  formData.append('qualifierSubscription', getCookie('subscriptionId'));
  formData.append('name', document.getElementById("entryname").value);
  formData.append('music', document.getElementById("uMusic").files[0] ? document.getElementById("uMusic").files[0] : '');

  if (entriesId) {
    // Existing competitor, send PUT request
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/entry/${entriesId}`, {
      method: 'PUT',
      headers: {'Authorization': token},
      body: formData
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        console.log(formData)
        if (response.apiStatus == true) {
          console.log("your entry updated sucssefully")
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
      document.getElementById("gif").style.display ="none"
  } else {
    // New competitor, send POST request
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/entry`, {
      method: 'POST',
      headers: {'Authorization': token},
      body: formData
    })
      .then(response => {
        if (response.ok) {
          console.log("your entry added sucssefully")
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
      document.getElementById("gif").style.display ="none"
  }
}

function deleteEntry(id) {
  if (id) {
    try {
      document.getElementById("gif").style.display ="block"
      fetch(`${domainName}/sts/entry/${id}`, {
        method: 'DELETE',
        headers: {'Authorization': token},
      })
        .then(response => {
          if (response.ok) {
            getEntriesData();
          } else {
            throw new Error('Request failed.');
          }
        })
        .catch(error => console.error(error));
        document.getElementById("gif").style.display ="none"
    } catch (error) {
      console.log(error);
    }
  } else {
  }
}

function getCompetitorsName(entriesID, competitors) {
  // var entriesID = document.getElementById('entriesId').value;
  console.log(typeof competitors)
  competitors=competitors.split(',')
  console.log(competitors)
    // competitors=competitors.map(competitor=>competitor._id)
  var id = getCookie("subscriptionId");


  var competitorsContainer = document.getElementById("name_list");

  headers.append('Content-Type', "application/json");

  // Existing competitor, send PUT request
  document.getElementById("gif").style.display ="block"
  fetch(`${domainName}/sts/competitor/${id}`, {
    method: 'GET',
    headers: {'Authorization': token},
  })
    .then(response => response.json())
    .then(data => {
      let competitorsData = data.data;
      console.log(competitorsData)
      console.log(competitors)
      competitorsData = competitorsData.filter(comp => !competitors.includes(comp._id))
      console.log(competitorsData)
      competitorsContainer.innerHTML = "";
      competitorsData.forEach(competitor => {
        const element = document.createElement('table');
        element.innerHTML = `
          <tr class="text-dark">
            <td class="col-7">${competitor.firstName} ${competitor.lastName}</td>
            <td class="col-3">${competitor.category}</td>
            <td class="col-2">
              <i class="add-compatator fa-solid fa-user-plus" id="${competitor._id}" style="color: #3e843e;cursor: pointer;" data-bs-dismiss="modal" onclick="add_editCompatatorsToEntry('${competitor._id}','${entriesID}')"></i>
            </td>
          </tr>
        `;
        element.setAttribute('id', `competitor-${competitor._id}`);
        competitorsContainer.appendChild(element);
      });
    })
    .catch(error => console.log(error));
    document.getElementById("gif").style.display ="none"
}


function add_editCompatatorsToEntry(compatatorID, entriesID) {
  // var competitors_Category = document.getElementById("table-body-entriesU");
  document.getElementById("gif").style.display ="block"
  fetch(`${domainName}/sts/entry/${entriesID}/${compatatorID}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" , 'Authorization': token},
  })
    .then(response => response.json())
    .then(response => {
      if (response.apiStatus === true) {

        const existingRow = document.getElementById(response.data._id);
        if (existingRow) {
          // Update existing row
          const firstCell = existingRow.querySelector('.competitor-cell');
          const secondCell = existingRow.querySelector('.category-cell');

          // Update competitor cell
          firstCell.innerHTML = "";
          response.data.competitors.forEach((competitor) => {
            firstCell.innerHTML += `<span>${competitor}</span>`;
          });

          // Update category cell
          secondCell.innerHTML = "";
          response.data.competitorsCategories.forEach((category) => {
            secondCell.innerHTML += `<span>${category}</span>`;
          });
        } else {
          // Create new row
          const element = document.createElement('tr');
          element.id = response.data._id;
          element.innerHTML = `
            <td class="competitor-cell">
              ${response.data.competitors.map(competitor => `<span>${competitor}</span>`).join('')}
            </td>
            <td class="category-cell">
              ${response.data.competitorsCategories.map(category => `<span>${category}</span>`).join('')}
            </td>
            <td>
              <i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" onclick="deleteCompatator('${compatatorID}','${entriesID}')"></i>
            </td>
          `;

          // competitors_Category.appendChild(element);
        }

        getEntriesData();
      } else {
        console.log('Error:', response.apiMessage);
        // Display an error message to the user indicating the duplication
        alert(response.apiMessage);
      }
    })
    .catch(function (error) {
      console.log('Error:', error);
    });
    document.getElementById("gif").style.display ="none"

}


function deleteCompatator(compatatorID,entriesID) {
  try {
    fetch(`${domainName}/sts/entry/${entriesID}/${compatatorID}`, {
      method: 'DELETE',
      headers: {'Authorization': token},
    })
      .then(response => {
        if (response.ok) {
          getEntriesData();
        } else {
          throw new Error('Request failed.');
        }
      })
      .catch(error => console.error(error));
  } catch (error) {
    console.log(error);
  }
}

function showDgreeForRefree(id) {
  headers.append("Content-Type", "application/json");
  var subscriptionID = getCookie("subscriptionId");

  fetch(`${domainName}/sts/entry/${subscriptionID}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" , 'Authorization': token}
  })
    .then(response => response.json())
    .then((data) => {
      document.getElementById("degreeRuler1").value = data.data.qualifierRefree1
      document.getElementById("degreeRuler2").value = data.data.qualifierRefree2
      document.getElementById("degreeRuler3").value = data.data.qualifierRefree3
      document.getElementById("degreeRuler").value = data.data.qualifierLast10Present
      document.getElementById("showDate").value = data.data.qualifierShowDate
    })
    .catch( error => console.log("Error:", error) );

}


function addDegreeForEntry(e) {
  e.preventDefault(); // Prevent the default form submission

  headers.append('Content-Type', "application/json");
  var subscriptionID = getCookie('subscriptionId');
  var competitionID =  e.target.id.split("_")[1];

  var formData = {
      ShowDate: document.getElementById(`showDate`).value,
      Refree1: document.getElementById(`degreeRuler1`).value,
      Refree2: document.getElementById(`degreeRuler2`).value,
      Refree3: document.getElementById(`degreeRuler3`).value,
      Last10Present: document.getElementById(`degreeRuler`).value,
    };
    console.log(JSON.stringify(formData))
    console.log(formData)
    fetch(`${domainName}/sts/entry/${subscriptionID}/${competitionID}`, {
        method: 'PATCH',
        headers:{ "Content-Type": "application/json" , 'Authorization': token},

        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(response => {  
      if (response.apiStatus == true) {
        console.log("your entry updated sucssefully")
        getEntriesData();
      }else {
        console.log('Error:', response.status);
      }
    })
    .catch( error => console.log('Error:', error));

  }
  
// ENTRIES //