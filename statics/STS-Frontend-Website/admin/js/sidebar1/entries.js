// ENTRIES //

function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
} 

var headers = new Headers(); 
var token = getCookie("token");
headers.append('Authorization', token); 
// headers.append('Content-Type', "application/json");


function getEntriesData() {
  var entriesContainer = document.getElementById("results_container");
var id = getCookie("competition");

fetch(`${domainName}/sts/entry/allcompetition/${id}`, {
  method: 'GET',
  headers: headers
})
  .then(response => response.json())
  .then(data => {
    console.log(data)
    entriesData = data.data;
      entriesContainer.innerHTML = "";
      data.data.forEach(entry=> {
        console.log(entry.competitors);
        const element = document.createElement('section');
        element.id= "entersU";
        element.className= "pb-5";
        element.innerHTML = `
            <div class="container">
              <div class="row">
                <div class="panel my-4">
                  <div class="panel-heading">
                    <div class="row">
                      <div class="row">
                        <h4 class="title col-3" id="nameEntry">${entry.name}</h4>
                        <div class="col-6 text-center">
                          <div class="btn_group">
                            <audio src="${domainName}/${entry.music}" id="audioPlayer1" controls>
                              <source id="audio_${entry._id}"/>
                            </audio>
                          </div>
                        </div>
                        <div class="title col-2 text-end">
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
                        </tr>
                      </thead>

                      <tbody id="table-body-entriesU">
                      ${entry.competitors.map((competitor, index) => `
                          <tr>
                            <td class="col-6">${competitor}</td>
                            <td class="col-6">${entry.competitorsCategories[index]}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div> 
          `;
      element.setAttribute('id', `entry-${entry._id}`);
      entriesContainer.appendChild(element);        
    });
  })
  .catch(error => console.error(error));
}

getEntriesData();


document.getElementById("uMusic").addEventListener("change", handleFiles, false);

function handleFiles(event) {
  console.log(event.target.files[0]);
  
  var files = event.target.files;
  document.getElementById("audio").src = URL.createObjectURL(files[0]);
  document.getElementById("audioPlayer").load();

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

// ENTRIES //