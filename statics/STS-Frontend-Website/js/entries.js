function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
}

function generatePDF() {
  // Get all the HTML tables with the specified class name
  var tables = document.getElementsByClassName('results_table');

  // Open a new window for the print preview
  var win = window.open('', '_blank');

  // Create a new document in the new window
  win.document.write('<html><head><title>Entries Table</title></head><body>');
  win.document.write('<style>table { border-collapse: collapse; } th, td { border: 2px solid black; padding: 8px; }</style>');
  win.document.write('<h1>Entries Table</h1>');

  // Iterate over each table and write it to the new document
  for (var i = 0; i < tables.length; i++) {
    var table = tables[i];
    win.document.write('<div class="table-container">');
    win.document.write(table.outerHTML);
    win.document.write('</div>');
  }

  win.document.write('</body></html>');

  // Close the document
  win.document.close();

  // Wait for the document to fully load before printing
  win.onload = function() {
    // Print the document
    // win.print();
    // Close the print preview window after printing
    // win.close();
  };
}


document.getElementById('generate-pdf').addEventListener('click', generatePDF);



var entriesData;
var colorCode = localStorage.getItem("theme");

function getEntriesData(colorCode) {
  var color ;
  var entriesContainer = document.getElementById("results_container-user");
  var id = getCookie("subscriptionId");
  var theme = `${domainName}/sts/entry/${id}`

  if(colorCode == "theme821919"){
    color = "/dancer";
  }else if (colorCode == "theme104b28"){
    color = "/musician";
  }else if (colorCode == "theme17547f"){
    color = "/singer";
  }else if (colorCode == "theme110f16"){
    color = "";
  }

  
  // document.getElementById("gif").style.display ="block"
  fetch(`${theme}${color}`, {
    method: 'GET',
    headers: {'Authorization': token},
  })
    .then(response => response.json())
    .then(data => {
      entriesData = data.data;
      entriesContainer.innerHTML = "";
      data.data.forEach(entry => {
        const competitorList=entry.competitors.map(competitor=>competitor._id)
        const element = document.createElement('section');
        element.id = "entersU";
        element.className = "pb-5";
        let competitorsTable = `
            <div class="container">
              <div class="row col-11 mx-auto">
                <div class="panel my-4">
                  <div class="panel-heading">
                    <div class="row">
                      <div class="row">
                        <h4 class="title col-lg-3" id="nameEntry">${entry.name}</h4>
                        <div class="col-lg-4">
                          <audio src="${domainName}/${entry.music}" id="audioPlayer1" controls>
                            <source id="audio_${entry._id}"/>
                          </audio>
                        </div>
                        <div class="col-lg-3 col-6  text-center">
                          <div class="btn_group">
                            <button class="btn btn-light"  data-bs-toggle="modal" data-bs-target="#AddCompatatorToEntry" onclick='getCompetitorsName("${entry._id}","${competitorList}")'>Add Compatators</button>
                          </div>
                        </div>
                        <div class="title col-lg-2 col-6 text-end">
                          <i class="edit-btn fa-solid fa-pen-to-square" style="color: #3e843e;cursor: pointer;" data-bs-toggle="modal" data-bs-target="#AddCompatator" onclick="editEntry('${entry._id}')"></i>
                          <i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" onclick="deleteEntry('${entry._id}')"></i>
                          <button class="btn btn-default" title="Pdf" fdprocessedid="vmxwvs" id="generate-pdf"><i class="fa fa-file-pdf"></i></button>
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

                      <tbody id="table-body-entriesU">`
                        entry.competitors.forEach(competitor=>{
                          competitorsTable+=`<tr><td>${competitor.firstName} ${competitor.lastName}</td><td>${competitor.category}</td><td><i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" onclick="deleteCompatator('${competitor._id}','${entry._id}')"></i></td></tr>`
                        })
                        competitorsTable+= ` </tbody>
                    </table>
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
        `;
        element.innerHTML+= competitorsTable
        element.setAttribute('id', `entry-${entry._id}`);
        entriesContainer.appendChild(element);
        // document.getElementById("gif").style.display ="none"
      });
    })
    .catch(error => console.log(error));
    // document.getElementById("gif").style.display ="none"
}
getEntriesData(colorCode);

document.getElementById("uMusic").addEventListener("change", handleFiles, false);

function handleFiles(event) {
  var files = event.target.files;
  document.getElementById("audio").src = URL.createObjectURL(files[0]);
  document.getElementById("audioPlayer").load();
}

function editEntry(id) {
  var entry = entriesData.find(entry => entry._id == id);
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
  formData.append('music', document.getElementById("uMusic").files[0]);

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

          getEntriesData(colorCode);
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

          getEntriesData(colorCode);

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
            getEntriesData(colorCode);
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
  competitors=competitors.split(',')
  var id = getCookie("subscriptionId");

  var competitorsContainer = document.getElementById("name_list");

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

        getEntriesData(colorCode);
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
          getEntriesData(colorCode);
        } else {
          throw new Error('Request failed.');
        }
      })
      .catch(error => console.error(error));
  } catch (error) {
    console.log(error);
  }
}


changeTheme(themesCharctaristic[localStorage.getItem('theme')]);

