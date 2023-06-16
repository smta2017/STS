var headers = new Headers(); 
token = getCookie('token'); 
headers.append('Authorization', token); 
headers.append('Content-Type', "application/json");

var patch = new Headers(); 
token = getCookie('token'); 
patch.append('Authorization', token); 
patch.append('Content-Type', "application/json-patch+json");

var entryDegreeID = getCookie("entryDegree"); 
var type = getCookie("type"); 
var year = getCookie("year"); 
// console.log(entryDegreeID);
var entriesData;
function showEntriesData(entryDegreeID) {
    var entriesContainer = document.getElementById("table-body-entries");
    
    fetch(`${domainName}/sts/entry/completeresult/${entryDegreeID}`, {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then(data => {
            entriesData = data.data;
            entriesContainer.innerHTML = "";
            data.data.forEach(entry => {
                document.getElementById("namecompatator").innerHTML = `Entry List for ${type} - ${year}`
                const element = document.createElement('tr');
                element.id = entry._id
                element.innerHTML = `
                    <td id="entryNameSearch">${entry.name}</td>
                    <td>${entry.qualifierSubscription.academy.academyDetails}</td>
                    <td>
                        <form class="text-center" id="form_${entry._id}" onsubmit="addDegreeForEntry(event)">
                            <div class="btn_group row">
                                <div class="col-6">
                                    <input type="number" class="form-control" id="degreeEntry_${entry._id}" placeholder="Degree Entry" min="1" max="30">
                                </div>
                                <div class="col-6">
                                    <input type="submit" class="form-control" id="submit">
                                </div>
                            </div>
                        </form>
                    </td>
                `;
                entriesContainer.appendChild(element);
            });
        })
        .catch(error => console.log(error));
}

showEntriesData(entryDegreeID);

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
        degree: document.getElementById(`degreeEntry_${competitionID}`).value,
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

            showEntriesData(entryDegreeID);
           
          } else {
            console.log('Error:', response.status);
          }
        })
        .catch(function (error) {
          console.log('Error:', error);
        });
}


document.getElementById('search').addEventListener('input', handleSearch);

function handleSearch() {
  var searchQuery = document.getElementById('search').value.toLowerCase();
  var rows = document.querySelectorAll('#table-body-entries tr');

  rows.forEach(function (row) {
    var entryName = row.querySelector('#entryNameSearch').textContent.toLowerCase();
    var shouldShowRow = entryName.includes(searchQuery);

    if (shouldShowRow) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}