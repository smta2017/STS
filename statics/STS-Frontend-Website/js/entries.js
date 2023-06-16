
function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
}

var headers = new Headers();
var token = getCookie('token');
headers.append('Authorization', token);
// headers.append('Content-Type', "application/json");

document.getElementById('generate-pdf').addEventListener('click', function () {
  // Get the HTML table element
  var table = document.getElementById('entry-table');
  // Create a new jsPDF object
  var pdf = new jsPDF();

  // Set the desired styles for the PDF
  var pdfStyles = {
    headerColor: [41, 128, 185], // Header color (RGB format)
    fontColor: [255, 255, 255], // Font color (RGB format)
    lineColor: [230, 230, 230], // Line separator color (RGB format)
    fontSize: 12, // Font size
    fontStyle: 'bold', // Font style ('normal', 'bold', 'italic', 'bolditalic')
    padding: 8 // Padding between cells
  };

  // Generate the PDF with the table content
  pdf.autoTable({
    html: table,
    startY: 20, // Y position of the table
    styles: pdfStyles,
    headStyles: { fillColor: pdfStyles.headerColor, textColor: pdfStyles.fontColor },
    bodyStyles: { textColor: pdfStyles.fontColor },
    alternateRowStyles: { fillColor: pdfStyles.lineColor }
  });

  // Download the PDF file
  pdf.save('Entry Table.pdf');
});


var entriesData;

function getEntriesData() {
  var entriesContainer = document.getElementById("results_container-user");
  var id = getCookie("subscriptionId");

  fetch(`${domainName}/sts/entry/${id}`, {
    method: 'GET',
    headers: headers
  })
    .then(response => response.json())
    .then(data => {
      entriesData = data.data;
      entriesContainer.innerHTML = "";
      data.data.forEach(entry => {
        const competitorList=entry.competitors.map(competitor=>competitor._id)
        console.log(competitorList)
        const element = document.createElement('section');
        element.id = "entersU";
        element.className = "pb-5";
        let competitorsTable = `
            <div class="container">
              <div class="row">
                <div class="panel my-4">
                  <div class="panel-heading">
                    <div class="row">
                      <div class="row">
                        <h4 class="title col-3" id="nameEntry">${entry.name}</h4>
                        <div class="col-5 text-center">
                          <div class="btn_group">
                            <button class="btn btn-light"  data-bs-toggle="modal" data-bs-target="#AddCompatatorToEntry" onclick='getCompetitorsName("${entry._id}","${competitorList}")'>Add Compatators</button>
                          </div>
                        </div>
                        <div class="title col-4 text-end">
                          <i class="edit-btn fa-solid fa-pen-to-square" style="color: #3e843e;cursor: pointer;" data-bs-toggle="modal" data-bs-target="#AddCompatator" onclick="editEntry('${entry._id}')"></i>
                          <i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" onclick="deleteEntry('${entry._id}')"></i>
                          <button class="btn btn-default" title="Pdf" fdprocessedid="vmxwvs" ><i class="fa fa-file-pdf"></i></button>
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
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody id="table-body-entriesU">`
        entry.competitors.forEach(competitor=>{
          competitorsTable+=`<tr><td>${competitor.firstName}${competitor.lastName}</td><td>${competitor.category}</td><td><i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" onclick=></i></td></tr>`
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
      });
    })
    .catch(error => console.log(error));
}

getEntriesData();

document.getElementById("uMusic").addEventListener("change", handleFiles, false);

function handleFiles(event) {

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
        if (response.apiStatus == true) {
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
        if (response.ok) {

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
            playButton.addEventListener('click', function () {
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
  }
}


function getCompetitorsName(entriesID, competitors) {
  // e.preventDefault(); // Prevent the default form submission

  // var entriesID = document.getElementById('entriesId').value;
console.log(typeof competitors)
competitors=competitors.split(',')
console.log(competitors)
    // competitors=competitors.map(competitor=>competitor._id)
  var id = getCookie("subscriptionId");
  // console.log(id); 

  var competitorsContainer = document.getElementById("name_list");

  headers.append('Content-Type', "application/json");

  // Existing competitor, send PUT request
  fetch(`${domainName}/sts/competitor/${id}`, {
    method: 'GET',
    headers: headers
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
              <i class="add-compatator fa-solid fa-user-plus" id="${competitor._id}" style="color: #3e843e;cursor: pointer;" onclick="add_editCompatatorsToEntry('${competitor._id}','${entriesID}')"></i>
            </td>
          </tr>
        `;
        element.setAttribute('id', `competitor-${competitor._id}`);
        competitorsContainer.appendChild(element);
      });
    })
}


function add_editCompatatorsToEntry(compatatorID, entriesID) {
  // var competitors_Category = document.getElementById("table-body-entriesU");

  fetch(`${domainName}/sts/entry/${entriesID}/${compatatorID}`, {
    method: 'PUT',
    headers: headers,
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
              <i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" onclick="deleteEntry('${response.data._id}')"></i>
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
}




changeTheme(themesCharctaristic[localStorage.getItem('theme')]);

