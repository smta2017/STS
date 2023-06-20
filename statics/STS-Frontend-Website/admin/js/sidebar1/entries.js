// ENTRIES //

function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
} 



function getEntriesData() {
  var entriesContainer = document.getElementById("results_container-all");
  var id = getCookie("competition");

  document.getElementById("gif").style.display ="block"
  fetch(`${domainName}/sts/entry/allcompetition/${id}`, {
    method: 'GET',
    headers: {'Authorization': token},
  })
    .then(response => response.json())
    .then(data => {
      entriesData = data.data;
        entriesContainer.innerHTML = "";
        data.data.forEach(entry=> {
          // const competitorList = entry.competitors.map(competitor=>competitor._id)
          const element = document.createElement('section');
          element.id= "entersC";
          element.className= "pb-0 pt-0";
          let competitorsTable = `
              <div class="container">
                <div class="row">
                  <div class="panel my-4">
                    <div class="panel-heading">
                      <div class="row">
                        <div class="row">
                          <h4 class="title col-3" id="nameEntry">${entry.name} - ${entry.qualifierSubscription.academy.academyDetails.schoolName}</h4>
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

                        <tbody id="table-body-entriesC">`
                        entry.competitors.forEach(competitor=>{
                          competitorsTable+=`<tr><td>${competitor.firstName} ${competitor.lastName}</td><td>${competitor.category}</td></tr>`
                        })
                        competitorsTable+= ` </tbody>
                      </table>
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
    .catch(error => console.error(error));
    document.getElementById("gif").style.display ="none"
}

getEntriesData();


document.getElementById("uMusic").addEventListener("change", handleFiles, false);

function handleFiles(event) {
  var files = event.target.files;
  document.getElementById("audio").src = URL.createObjectURL(files[0]);
  document.getElementById("audioPlayer").load();
}

// ENTRIES //