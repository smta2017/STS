function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
}

function generatePDF(tableElement, entryName) {
  // Get the table inside the tableElement
  var table = tableElement.querySelector('.table');

  // Open a new window for the print preview
  var win = window.open('', '_blank');

  // Create a new document in the new window
  win.document.write('<html><head><title>Entry Table - (' + entryName + ')</title></head><body>');
  win.document.write('<style>table { border-collapse: collapse; } th, td { border: 2px solid black; padding: 8px; }</style>');
  win.document.write('<h1>Entry Table - (' + entryName + ')</h1>');

  // Write the table to the new document
  win.document.write('<div class="table-container">');
  win.document.write(table.outerHTML);
  win.document.write('</div>');

  win.document.write('</body></html>');

  // Close the document
  win.document.close();

  // Wait for the document to fully load before printing
  win.onload = function() {
    // Print the document
    win.print();
    // Close the print preview window after printing
    // win.close();
  };
}

function previewAudio(event) {
  const input = event.target;
  const audioPreview = document.getElementById("audioPreview");
  if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
          audioPreview.src = e.target.result;
          audioPreview.style.display = "block";
      };
      reader.readAsDataURL(input.files[0]);
  } else {
      audioPreview.src = "";
      audioPreview.style.display = "none";
  }
}

function previewVideo(event) {
  const input = event.target;
  const audioPreview = document.getElementById("audioPreview");
  if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        audioPreview.src = e.target.result;
        audioPreview.style.display = "block";
      };
      reader.readAsDataURL(input.files[0]);
  } else {
    audioPreview.src = "";
    audioPreview.style.display = "none";
  }
}

var stylesMessages;
function previewMessage(event){
  stylesMessages={
    'Solo Classical': 'be aware that this style is for Singing competitors only',
    'Duo Classical': 'be aware that this style is for Music and Singing competitors only',
    'Concerto Classical': 'be aware that this style is for music competitors only',
    'Chamber_ensemble Classical': 'be aware that this style is for music competitors only',
    'Orchestra Classical': 'be aware that this style is for Music and Singing competitors only',
    'Solo Jazz': 'be aware that this style is for music competitors only',
    'Duo Jazz': 'be aware that this style is for music competitors only',
    'Concerto Jazz': 'be aware that this style is for music competitors only',
    Chamber_music_Jazz: 'be aware that this style is for music competitors only',
    'Solo Pop': 'be aware that this style is for Singing competitors only',
    'Duo Pop': 'be aware that this style is for music and Singing competitors only',
    'Concerto Pop': 'be aware that this style is for music competitors only',
    Chamber_music_Pop: 'be aware that this style is for music competitors only',
    'Solo Traditional Music': 'be aware that this style is for music competitors only',
    'Duo Traditional Music': 'be aware that this style is for music competitors only',
    'Concerto Traditional Music': 'be aware that this style is for music competitors only',
    'Chamber Traditional Music': 'be aware that this style is for music competitors only',
    'Solo Rock': 'be aware that this style is for Singing competitors only',
    'Duo Rock': 'be aware that this style is for music and Singing competitors only',
    'Mini_group Rock': 'be aware that this style is for music and Singing competitors only',
    'Large_group Rock': 'be aware that this style is for music and Singing competitors only',
    'Mini_group Pop': 'be aware that this style is for Music and Singing competitors only',
    'Large_group Pop': 'be aware that this style is for Music and Singing competitors only',
    'choir Classical': 'be aware that this style is for Music and Singing competitors only',
    'Solo Opera': 'be aware that this style is for Singing competitors only',
    'Duo Opera': 'be aware that this style is for Singing competitors only',
    'choir Opera': 'be aware that this style is for Singing competitors only',
    'Orchestra Opera': 'be aware that this style is for Singing competitors only',
    'Solo Blues OR Jazz': 'be aware that this style is for Singing competitors only',
    'Duo Blues OR Jazz': 'be aware that this style is for Music and Singing competitors only',
    'Mini_group Blues OR Jazz': 'be aware that this style is for Music and Singing competitors only',
    'Large_group Blues OR Jazz': 'be aware that this style is for Music and Singing competitors only',
    'Solo Soul': 'be aware that this style is for Singing competitors only',
    'Duo Soul': 'be aware that this style is for Music and Singing competitors only',
    'Mini_group Soul': 'be aware that this style is for Music and Singing competitors only',
    'Large_group Soul': 'be aware that this style is for Music and Singing competitors only',
    'Solo Rap': 'be aware that this style is for Singing competitors only',
    'Duo Rap': 'be aware that this style is for Music and Singing competitors only',
    'Mini_group Rap': 'be aware that this style is for Music and Singing competitors only',
    'Large_group Rap': 'be aware that this style is for Music and Singing competitors only',
    'Mini_group A Cappella': 'be aware that this style is for Singing competitors only',
    'Large_group A Cappella': 'be aware that this style is for Singing competitors only',
    'Classical Neoclassical Repertoire Any other ballet style': 'be aware that this style is for Dance competitors who are younger than 10 years old only',  
    'Classical Neoclassical Any other ballet style': 'be aware that this style is for only one Dance competitor who his age start from 10 years old ',       
    'Classical Neoclassical Any other ballet style(pointe shoes)': 'be aware that this style is for only one Dance competitor who his age start from 10 and less than 14 years old ',
    Reportoire: 'be aware that this style is for only one Dance competitor who his age start from 10 and less than 14 years old ',
    'Reportoire(pointe shoes allowed)': 'be aware that this style is for only Dance competitors who his age start from  14 years old ',
    'National & flokore': 'be aware that this style is for Dance competitors ',
    Lyrical: 'be aware that this style is for Dance competitors who their ages start from  10 years old ',
    Contemporary: 'be aware that this style is for Dance competitors who their ages start from  10 years old ',
    'Show Dance': 'be aware that this style is for Dance competitors who their ages start from  10 years old ',
    Jazz: 'be aware that this style is for Dance competitors who their ages start from  10 years old ',
    'Street Dance': 'be aware that this style is for Dance competitors who their ages start from  10 years old ',
    Commercial: 'be aware that this style is for solo show or group of more than 6 Dance competitors ,this competitor or competitors ages start from  10 years old ',
    Arco: 'be aware that this style is for Dance competitors ',
    Tap: 'be aware that this style is for Dance competitors ',
    'Lyrical and Contemporary': 'be aware that this style is for Dance competitors who are younger than 10 years old only',
    'Jazz and Show Dance': 'be aware that this style is for Dance competitors who are younger than 10 years old only',
    'Street Dance & Commercial': 'be aware that this style is for Dance competitors who are younger than 10 years old only',
    'Song and Dance': 'be aware that this style is for Dance competitors ',
    'Mini_group Classical': 'be aware that this style is for Music and Singing competitors only',
    'Large_group Classical': 'be aware that this style is for Music and Singing competitors only',
    'Musical Dance Show': 'be aware that this style is for Music and Singing competitors only',
    'shared entry': 'be aware that this style should have competitors from all sections'
  }
  var messageSpan = document.createElement("span");
  messageSpan.className = "text-center fw-bold";
  messageSpan.textContent = stylesMessages[event.target.value];
  document.getElementById("divMessages").innerHTML = '';
  document.getElementById("divMessages").appendChild(messageSpan);
}

if (getCookie('stopSubscription') == "false" && getCookie('type') == "qualifier" && getCookie('paid') === "false") {

  const formAddEntry = document.getElementById("parentFormEntry");  
  if (formAddEntry.innerHTML == "") {
    const div = document.createElement('div');
    div.innerHTML = `  
    <div class="container col-11 m-3 mx-auto" style="box-shadow: 0 3px 10px black;">
      <h1 class="text-dark">Add Entry</h1>
      <form id="form" class=" mx-auto row g-3" onsubmit="changeEntry(event);" enctype="multipart/form-data">
        <input type="hidden" name="" id="entriesId">
        <div class="col-12">
          <label for="entryname">Entry Name:</label>
          <input type="text" id="entryname" name="entryname" class="form-control" required>
        </div>
        <div class="col-12">
              <label for="choosen_styles" class="form-label">Entry Style</label>
              <input class="form-control" onchange="previewMessage(event);"list="styles" id="choosen_style" placeholder="Type to search for your entry suitable style" required>
              <datalist id="styles">
                <option value="shared entry" title="be aware that this style should have competitors from all sections">for all Dance and Music and Singing</option>
                <option value="Musical Dance Show" title="be aware that this style is for Music and Singing competitors only">for Dance and Music only</option>
                <option value="Song and Dance" title="be aware that this style is for Dance competitors ">for Dance and singing</option>
                <option value="Classical Neoclassical Repertoire Any other ballet style" title="be aware that this style is for Dance competitors who are younger than 10 years old only">for Dance only</option>
                <option value="Classical Neoclassical Any other ballet style" title="be aware that this style is for only one Dance competitor who his age start from 10 years old ">for Dance only</option>
                <option value="Classical Neoclassical Any other ballet style(pointe shoes)" title="be aware that this style is for only one Dance competitor who his age start from 10 and less than 14 years old ">for Dance only</option>
                <option value="Reportoire" title="be aware that this style is for only one Dance competitor who his age start from 10 and less than 14 years old ">for Dance only</option>
                <option value="Reportoire(pointe shoes allowed)" title="be aware that this style is for only Dance competitors who his age start from  14 years old ">for Dance only</option>
                <option value="National &amp; flokore" title="be aware that this style is for Dance competitors ">for Dance only</option>
                <option value="Lyrical" title="be aware that this style is for Dance competitors who their ages start from  10 years old ">for Dance only</option>
                <option value="Contemporary" title="be aware that this style is for Dance competitors who their ages start from  10 years old ">for Dance only</option>
                <option value="Show Dance" title="be aware that this style is for Dance competitors who their ages start from  10 years old ">for Dance only</option>
                <option value="Jazz" title="be aware that this style is for Dance competitors who their ages start from  10 years old ">for Dance only</option>
                <option value="Street Dance" title="be aware that this style is for Dance competitors who their ages start from  10 years old ">for Dance only</option>
                <option value="Commercial" title="be aware that this style is for solo show or group of more than 6 Dance competitors ,this competitor or competitors ages start from  10 years old ">for Dance only</option>
                <option value="Arco" title="be aware that this style is for Dance competitors ">for Dance only</option>
                <option value="Tap" title="be aware that this style is for Dance competitors ">for Dance only</option>
                <option value="Lyrical and Contemporary" title="be aware that this style is for Dance competitors who are younger than 10 years old only">for Dance only</option>
                <option value="Jazz and Show Dance" title="be aware that this style is for Dance competitors who are younger than 10 years old only">for Dance only</option>
                <option value="Street Dance &amp; Commercial" title="be aware that this style is for Dance competitors who are younger than 10 years old only">for Dance only</option>
                <option value="Duo Soul" title="be aware that this style is for Music and Singing competitors only">for Music and Singing  only</option>
                <option value="Duo Rock" title="be aware that this style is for music and Singing competitors only">for Music and Singing only</option>
                <option value="Mini_group Rock" title="be aware that this style is for music and Singing competitors only">for Music and Singing only</option>
                <option value="Large_group Rock" title="be aware that this style is for music and Singing competitors only">for Music and Singing only</option>
                <option value="Duo Pop" title="be aware that this style is for music and Singing competitors only">for Music and Singing only</option>
                <option value="Mini_group Pop" title="be aware that this style is for Music and Singing competitors only">for Music and Singing only</option>
                <option value="Large_group Pop" title="be aware that this style is for Music and Singing competitors only">for Music and Singing only</option>
                <option value="Duo Classical" title="be aware that this style is for Music and Singing competitors only">for Music and Singing only</option>
                <option value="Mini_group Classical" title="be aware that this style is for Music and Singing competitors only">for Music and Singing only</option>
                <option value="Large_group Classical" title="be aware that this style is for Music and Singing competitors only">for Music and Singing only</option>
                <option value="choir Classical" title="be aware that this style is for Music and Singing competitors only">for Music and Singing only</option>
                <option value="Orchestra Classical" title="be aware that this style is for Music and Singing competitors only">for Music and Singing only</option>
                <option value="Duo Blues OR Jazz" title="be aware that this style is for Music and Singing competitors only">for Music and Singing only</option>
                <option value="Mini_group Blues OR Jazz" title="be aware that this style is for Music and Singing competitors only">for Music and Singing only</option>
                <option value="Large_group Blues OR Jazz" title="be aware that this style is for Music and Singing competitors only">for Music and Singing only</option>
                <option value="Mini_group Soul" title="be aware that this style is for Music and Singing competitors only">for Music and Singing only</option>
                <option value="Large_group Soul" title="be aware that this style is for Music and Singing competitors only">for Music and Singing only</option>
                <option value="Duo Rap" title="be aware that this style is for Music and Singing competitors only">for Music and Singing only</option>
                <option value="Mini_group Rap" title="be aware that this style is for Music and Singing competitors only">for Music and Singing only</option>
                <option value="Large_group Rap" title="be aware that this style is for Music and Singing competitors only">for Music and Singing only</option>
                <option value="Solo Classical" title="be aware that this style is for music competitors only">for music only</option>
                <option value="Duo Classical" title="be aware that this style is for music competitors only">for music only</option>
                <option value="Concerto Classical" title="be aware that this style is for music competitors only">for music only</option>
                <option value="Chamber_ensemble Classical" title="be aware that this style is for music competitors only">for music only</option>
                <option value="Orchestra Classical" title="be aware that this style is for music competitors only">for music only</option>
                <option value="Solo Jazz" title="be aware that this style is for music competitors only">for music only</option>
                <option value="Duo Jazz" title="be aware that this style is for music competitors only">for music only</option>
                <option value="Concerto Jazz" title="be aware that this style is for music competitors only">for music only</option>
                <option value="Chamber_music_Jazz" title="be aware that this style is for music competitors only">for music only</option>
                <option value="Solo Pop" title="be aware that this style is for music competitors only">for music only</option>
                <option value="Duo Pop" title="be aware that this style is for music competitors only">for music only</option>
                <option value="Concerto Pop" title="be aware that this style is for music competitors only">for music only</option>
                <option value="Chamber_music_Pop" title="be aware that this style is for music competitors only">for music only</option>
                <option value="Solo Traditional Music" title="be aware that this style is for music competitors only">for music only</option>
                <option value="Duo Traditional Music" title="be aware that this style is for music competitors only">for music only</option>
                <option value="Concerto Traditional Music" title="be aware that this style is for music competitors only">for music only</option>
                <option value="Chamber Traditional Music" title="be aware that this style is for music competitors only">for music only</option>
                <option value="Solo Rock" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Duo Rock" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Mini_group Rock" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Large_group Rock" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Solo Pop" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Duo Pop" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Mini_group Pop" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Large_group Pop" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Solo Classical" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Duo Classical" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="choir Classical" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Orchestra Classical" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Solo Opera" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Duo Opera" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="choir Opera" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Orchestra Opera" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Solo Blues OR Jazz" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Duo Blues OR Jazz" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Mini_group Blues OR Jazz" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Large_group Blues OR Jazz" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Solo Soul" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Duo Soul" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Mini_group Soul" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Large_group Soul" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Solo Rap" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Duo Rap" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Mini_group Rap" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Large_group Rap" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Mini_group A Cappella" title="be aware that this style is for Singing competitors only">for Singing only</option>
                <option value="Large_group A Cappella" title="be aware that this style is for Singing competitors only">for Singing only</option>
              </datalist>
              <div id="divMessages"></div>
            </div>
        <div class="col-11 row">
          <div class="col-12 col-md-6">
            ${getCookie('isOtherCountry') == "true" ? `<label for="uMusic">Upload Video:</label><input type="file" accept="video/mp4,video/mpeg,video/webm" id="uMusic" name="uMusic" aria-label="uMusic" class="form-control" onchange="previewVideo(event)"></input>` : `<label for="uMusic">Upload Music:</label><input type="file" accept="audio/mpeg,audio/webm" id="uMusic" name="uMusic" aria-label="uMusic" class="form-control" onchange="previewAudio(event)">`}
          </div>
          <div class="col-12 col-md-6 mt-2">
            ${getCookie('isOtherCountry') == "true" ? `<video id="audioPreview" controls><source src="" id="audio" /></video>` : `<audio id="audioPreview" controls><source src="" id="audio" /></audio>`}
          </div>
          <small class="text-dark text-center">you can only upload these extentions for audio .mp3, .weba</small>
        </div>
        <div class="row mx-auto my-3">
          <input type="reset" value="Clear to Add New Data" class="btn btn-danger col-6" onclick="clearData()">
          <button type="submit" id="addToEdit" data-bs-dismiss="modal" class="btn btn-dark col-6">Add</button>
        </div>
      </form>
    </div>`
      ;
  formAddEntry.appendChild(div);
  }
}

var entriesData;

var colorCode = localStorage.getItem("theme");

function getEntriesData(colorCode) {
// console.log(styles.sort(function(a, b){
//   let x = a.style.split(':')[0].trim().toLowerCase();
//   let y = b.style.split(':')[0].trim().toLowerCase();
//   if (x < y) {return -1;}
//   if (x > y) {return 1;}
//   return 0;
// }))
// styles.forEach(style=>{
//   const option=document.createElement('option')
//   option.innerHTML=style.style.split(':')[0].trim()
//   option.value=style.style.split(':')[1].trim()
//   option.title=style.massage
//   document.getElementById('styles').appendChild(option)
// })
// console.log( document.getElementById('styles').innerHTML)
  var color ;
  var entriesContainer = document.getElementById("results_container-user");
  var id = getCookie("subscriptionId");
  var theme =   `${domainName}/sts/entry/${id}`  

  if(colorCode == "theme821919"){
    color = "/dancer";
  }else if (colorCode == "theme104b28"){
    color = "/musician";
  }else if (colorCode == "theme17547f"){
    color = "/singer";
  }else if (colorCode == "theme110f16"){
    color = "";
  }

  document.getElementById("gif").style.display ="block"
  fetch(`${theme}${color}`  , {
    method: 'GET',
    headers: {'Authorization': token},
  })
    .then(response => response.json())
    .then(data => {
      entriesData = data.data;
      console.log(data.data);
      entriesContainer.innerHTML = "";
      data.data.forEach(entry => {
        const competitorList=entry.competitors.map(competitor=>competitor._id)
        const element = document.createElement('section');
        element.id = "entersU";
        element.className = "pb-5";
        let competitorsTable =   
            `<div class="container">
              <div class="row col-11 mx-auto">
                <div class="panel my-4">
                  <div class="panel-heading">
                    <div class="row">
                      <div class="row">
                        <h4 class="title col-12 col-lg-4 mx-auto" id="nameEntry">${entry.name} ${entry.classCode ? `- ${entry.classCode} Class Code` : ''}</h4>
                        <div class="col-12 col-lg-5 mx-auto text-center">
                          ${getCookie('isOtherCountry') == "true" ? `<video src="${domainName}/${entry.music}" id="audioPlayer1" controls><source src="" id="audio_${entry._id}" /></video>` : `<audio src="${domainName}/${entry.music}" id="audioPlayer1" controls><source id="audio_${entry._id}"/></audio>`}
                        </div>
                        ${getCookie('type') === "final" ? entry.passedQualifiers ?  `<h4 class="title col-12 col-lg-3 mx-auto bg-success rounded-5 text-center py-2 px-0">Qualified</h4>` : `<h4 class="title col-12 col-lg-3 mx-auto bg-danger rounded-5 text-center py-2">Not Qualified</h4>` : ''}
                        <div class="col-12 col-sm-8 mx-auto text-center addEntry">
                        </div>
                        <div class="title col-12 col-sm-4 mx-auto text-center edit_delete">
                        </div>
                      </div>
                    </div>
                  </div> 
                  <div class="panel-body table-responsive">
                    <table class="table" id="table-entries">
                      <thead>
                        <tr class="header">
                          <th>Compatator Name</th>
                          <th>Category Name</th>
                        </tr>
                      </thead>

                      <tbody id="table-body-entriesU"> 
                        ` 
                        entry.competitors.forEach(competitor=>{
                          competitorsTable+=`<tr><td>${competitor.firstName} ${competitor.lastName}</td><td>${competitor.category}</td></tr>`
                        })
                        competitorsTable+= ` 
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>


            <div class="modal fade" id="AddCompatatorToEntry_${entry._id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title text-dark" id="exampleModalLabel">Add Compatators to Entry</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form action="" id="addCompatatorsToEntryForm_${entry._id}" class="row g-3" onsubmit="add_editCompatatorsToEntry(event)">
                      <div class="col-12"> 
                        <h2>Add Compatators Names to Entry:</h2> 
                        <div id="nameList_${entry._id}_${competitorList}" class="nameList">
                          <!-- Names will be added here --> 
                          
                        </div> 
                      </div> 
                      <small class="text-center">To Clear Any One, Please Unchecked on it ...</small>
                      <div class="row mx-auto my-3">
                        <button type="submit" id="submit" data-bs-dismiss="modal" class="btn btn-dark col-6">Add</button>
                        <button type="button" class="close-popup btn btn-dark col-6" data-bs-dismiss="modal">Close</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>`
          ;
         
        element.innerHTML+= competitorsTable
        element.setAttribute('id',  `entry-${entry._id}`);
        entriesContainer.appendChild(element);

        if (getCookie('stopSubscription') == "false" && getCookie('type') == "qualifier" && getCookie('paid') === "false") {
              const divIcon = document.createElement('div');
              divIcon.innerHTML =   
                `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="edit-btn bi bi-pen-fill edit" viewBox="0 0 16 16" style="color: #3e843e;cursor: pointer;" data-bs-toggle="modal" data-bs-target="#AddCompatator" onclick="editEntry('${entry._id}');">
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" style="color: #c10b0b;cursor: pointer;" onclick="deleteEntry('${entry._id}')" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
               `;
                element.querySelector(".edit_delete").appendChild(divIcon);

            const addEntryButton = document.createElement('div');
            addEntryButton.innerHTML = `  
            <button class="btn btn-light" data-bs-toggle="modal" data-bs-target="#AddCompatatorToEntry_${entry._id}" onclick='getCompetitorsName("${entry._id}","${entry.style}","${competitorList}");'>Add Compatators</button>
            <button class="btn btn-default" title="Pdf" fdprocessedid="vmxwvs" id="generate-pdf" onclick="generatePDF(this.closest('.panel'), '${entry.name}')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
                <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"/>
                <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
              </svg>
            </button>
            `
            element.querySelector(".addEntry").appendChild(addEntryButton);
  
          element.querySelector(".header").innerHTML+=  `<th>Action</th>`;
          const tbody = element.querySelector("#table-body-entriesU");
          tbody.innerHTML = "";
          entry.competitors.forEach(competitor => {
            const row = document.createElement('tr');
            row.innerHTML =   `<td>${competitor.firstName} ${competitor.lastName}</td><td>${competitor.category}</td>`  ;
            const deleteButton = document.createElement('td');
            deleteButton.innerHTML =   `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" style="color: #c10b0b;cursor: pointer;" onclick="deleteCompatatorFromTable('${competitor._id}','${entry._id}');" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>
            ` ;
            row.appendChild(deleteButton);
            tbody.appendChild(row);
          });
        }
        
      });
      document.getElementById("gif").style.display ="none"
    })
    .catch(error => {
      console.log(error)
      document.getElementById("gif").style.display ="none"
    });
}
getEntriesData(colorCode);

function editEntry(id) {
  const stylesMessages={
    undefined:'this entry does not have style yet',
    'Solo Classical': 'be aware that this style is for Singing competitors only',
    'Duo Classical': 'be aware that this style is for Music and Singing competitors only',
    'Concerto Classical': 'be aware that this style is for music competitors only',
    'Chamber_ensemble Classical': 'be aware that this style is for music competitors only',
    'Orchestra Classical': 'be aware that this style is for Music and Singing competitors only',
    'Solo Jazz': 'be aware that this style is for music competitors only',
    'Duo Jazz': 'be aware that this style is for music competitors only',
    'Concerto Jazz': 'be aware that this style is for music competitors only',
    Chamber_music_Jazz: 'be aware that this style is for music competitors only',
    'Solo Pop': 'be aware that this style is for Singing competitors only',
    'Duo Pop': 'be aware that this style is for music and Singing competitors only',
    'Concerto Pop': 'be aware that this style is for music competitors only',
    Chamber_music_Pop: 'be aware that this style is for music competitors only',
    'Solo Traditional Music': 'be aware that this style is for music competitors only',
    'Duo Traditional Music': 'be aware that this style is for music competitors only',
    'Concerto Traditional Music': 'be aware that this style is for music competitors only',
    'Chamber Traditional Music': 'be aware that this style is for music competitors only',
    'Solo Rock': 'be aware that this style is for Singing competitors only',
    'Duo Rock': 'be aware that this style is for music and Singing competitors only',
    'Mini_group Rock': 'be aware that this style is for music and Singing competitors only',
    'Large_group Rock': 'be aware that this style is for music and Singing competitors only',
    'Mini_group Pop': 'be aware that this style is for Music and Singing competitors only',
    'Large_group Pop': 'be aware that this style is for Music and Singing competitors only',
    'choir Classical': 'be aware that this style is for Music and Singing competitors only',
    'Solo Opera': 'be aware that this style is for Singing competitors only',
    'Duo Opera': 'be aware that this style is for Singing competitors only',
    'choir Opera': 'be aware that this style is for Singing competitors only',
    'Orchestra Opera': 'be aware that this style is for Singing competitors only',
    'Solo Blues OR Jazz': 'be aware that this style is for Singing competitors only',
    'Duo Blues OR Jazz': 'be aware that this style is for Music and Singing competitors only',
    'Mini_group Blues OR Jazz': 'be aware that this style is for Music and Singing competitors only',
    'Large_group Blues OR Jazz': 'be aware that this style is for Music and Singing competitors only',
    'Solo Soul': 'be aware that this style is for Singing competitors only',
    'Duo Soul': 'be aware that this style is for Music and Singing competitors only',
    'Mini_group Soul': 'be aware that this style is for Music and Singing competitors only',
    'Large_group Soul': 'be aware that this style is for Music and Singing competitors only',
    'Solo Rap': 'be aware that this style is for Singing competitors only',
    'Duo Rap': 'be aware that this style is for Music and Singing competitors only',
    'Mini_group Rap': 'be aware that this style is for Music and Singing competitors only',
    'Large_group Rap': 'be aware that this style is for Music and Singing competitors only',
    'Mini_group A Cappella': 'be aware that this style is for Singing competitors only',
    'Large_group A Cappella': 'be aware that this style is for Singing competitors only',
    'Classical Neoclassical Repertoire Any other ballet style': 'be aware that this style is for Dance competitors who are younger than 10 years old only',  
    'Classical Neoclassical Any other ballet style': 'be aware that this style is for only one Dance competitor who his age start from 10 years old ',       
    'Classical Neoclassical Any other ballet style(pointe shoes)': 'be aware that this style is for only one Dance competitor who his age start from 10 and less than 14 years old ',
    Reportoire: 'be aware that this style is for only one Dance competitor who his age start from 10 and less than 14 years old ',
    'Reportoire(pointe shoes allowed)': 'be aware that this style is for only Dance competitors who his age start from  14 years old ',
    'National & flokore': 'be aware that this style is for Dance competitors ',
    Lyrical: 'be aware that this style is for Dance competitors who their ages start from  10 years old ',
    Contemporary: 'be aware that this style is for Dance competitors who their ages start from  10 years old ',
    'Show Dance': 'be aware that this style is for Dance competitors who their ages start from  10 years old ',
    Jazz: 'be aware that this style is for Dance competitors who their ages start from  10 years old ',
    'Street Dance': 'be aware that this style is for Dance competitors who their ages start from  10 years old ',
    Commercial: 'be aware that this style is for solo show or group of more than 6 Dance competitors ,this competitor or competitors ages start from  10 years old ',
    Arco: 'be aware that this style is for Dance competitors ',
    Tap: 'be aware that this style is for Dance competitors ',
    'Lyrical and Contemporary': 'be aware that this style is for Dance competitors who are younger than 10 years old only',
    'Jazz and Show Dance': 'be aware that this style is for Dance competitors who are younger than 10 years old only',
    'Street Dance & Commercial': 'be aware that this style is for Dance competitors who are younger than 10 years old only',
    'Song and Dance': 'be aware that this style is for Dance competitors ',
    'Mini_group Classical': 'be aware that this style is for Music and Singing competitors only',
    'Large_group Classical': 'be aware that this style is for Music and Singing competitors only',
    'Musical Dance Show': 'be aware that this style is for Music and Singing competitors only',
    'shared entry': 'be aware that this style should have competitors from all sections'
  }
  goToTop();
  document.getElementById("addToEdit").value = "Update";
  var entry = entriesData.find(entry => entry._id == id);
  var messageSpan = document.createElement("span");
  messageSpan.className = "text-center fw-bold";
  messageSpan.textContent = stylesMessages[entry.style];
  document.getElementById("divMessages").innerHTML = '';
  document.getElementById("divMessages").appendChild(messageSpan);
  document.getElementById('choosen_style').value=entry.style?entry.style:''
  document.getElementById("entriesId").value = id;
  document.getElementById('entryname').value = entry.name;
  document.querySelector('#audioPreview').src = entry.music;
  document.querySelector('#audioPreview').style.display = 'block'
}

function changeEntry(e) {
  e.preventDefault(); // Prevent the default form submission

  var entriesId = document.getElementById('entriesId').value;
  var otherCountry = getCookie("isOtherCountry");
  console.log(otherCountry)
  // Get the form values
  const audioData = document.querySelector('#uMusic').files[0]
  const formData = new FormData();
  formData.append('qualifierSubscription', getCookie('subscriptionId'));
  formData.append('name', document.getElementById("entryname").value);
  formData.append('style', document.getElementById("choosen_style").value);
  if(document.querySelector("#uMusic").files[0]){formData.append('music', audioData)};


  if (entriesId) {
    // Existing competitor, send PUT request
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/entry/${entriesId}`, {
      method: 'PUT',
      headers: {'Authorization': token , 'otherCountry': otherCountry},
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
          document.getElementById("choosen_style").value = '';
          document.getElementById("divMessages").innerHTML = '';
          document.getElementById('uMusic').value = '';
          document.getElementById("audioPreview").style.display = "none";
          goToAdd();

          getEntriesData(localStorage.getItem("theme"));
        } else {
          console.log('Error:', response.status);
        }
        document.getElementById("gif").style.display ="none"
        responseAlert(response);
      })
      .catch(function (error) {
        console.log('Error:', error);
        document.getElementById("gif").style.display ="none"
        responseAlert(error);
      });
  } else {
    // New competitor, send POST request
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/entry`, {
      method: 'POST',
      headers: {'Authorization': token , 'otherCountry': otherCountry},
      body: formData
    })
    .then(response => response.json())
      .then(response => {
        if (response.apiStatus == true) {
          console.log("your entry added sucssefully")
          document.getElementById('entriesId').value = '';
          document.getElementById('entryname').value = '';
          document.getElementById('uMusic').value = '';
          document.getElementById("choosen_style").value = '';
          document.getElementById("divMessages").innerHTML = '';
          document.getElementById("audioPreview").style.display = "none";

          getEntriesData(localStorage.getItem("theme"));
        } else {
          console.log('Error:', response.status);
        }
        document.getElementById("gif").style.display ="none"
        responseAlert(response);
      })
      .catch(function (error) {
        console.log('Error:', error);
        document.getElementById("gif").style.display ="none"
        responseAlert(error);
      });
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
          if (response.status == 200) {
            getEntriesData(localStorage.getItem("theme"));
          } else {
            throw new Error('Request failed.');
          }
          document.getElementById("gif").style.display ="none"
          response.json().then(data => {
            responseAlert(data);
        });
        })
        .catch(function (error) {
          console.log('Error:', error);
          document.getElementById("gif").style.display ="none"
          error.json().then(data => {
            responseAlert(data);
        });
        });
    } catch (error) {
      console.log(error);
    }
  } 
}


function getCompetitorsName(entriesID,style, competitors) {
  const stylesMessages={
    undefined:'this entry does not have style yet',
    'Solo Classical': 'be aware that this style is for Singing competitors only',
    'Duo Classical': 'be aware that this style is for Music and Singing competitors only',
    'Concerto Classical': 'be aware that this style is for music competitors only',
    'Chamber_ensemble Classical': 'be aware that this style is for music competitors only',
    'Orchestra Classical': 'be aware that this style is for Music and Singing competitors only',
    'Solo Jazz': 'be aware that this style is for music competitors only',
    'Duo Jazz': 'be aware that this style is for music competitors only',
    'Concerto Jazz': 'be aware that this style is for music competitors only',
    Chamber_music_Jazz: 'be aware that this style is for music competitors only',
    'Solo Pop': 'be aware that this style is for Singing competitors only',
    'Duo Pop': 'be aware that this style is for music and Singing competitors only',
    'Concerto Pop': 'be aware that this style is for music competitors only',
    Chamber_music_Pop: 'be aware that this style is for music competitors only',
    'Solo Traditional Music': 'be aware that this style is for music competitors only',
    'Duo Traditional Music': 'be aware that this style is for music competitors only',
    'Concerto Traditional Music': 'be aware that this style is for music competitors only',
    'Chamber Traditional Music': 'be aware that this style is for music competitors only',
    'Solo Rock': 'be aware that this style is for Singing competitors only',
    'Duo Rock': 'be aware that this style is for music and Singing competitors only',
    'Mini_group Rock': 'be aware that this style is for music and Singing competitors only',
    'Large_group Rock': 'be aware that this style is for music and Singing competitors only',
    'Mini_group Pop': 'be aware that this style is for Music and Singing competitors only',
    'Large_group Pop': 'be aware that this style is for Music and Singing competitors only',
    'choir Classical': 'be aware that this style is for Music and Singing competitors only',
    'Solo Opera': 'be aware that this style is for Singing competitors only',
    'Duo Opera': 'be aware that this style is for Singing competitors only',
    'choir Opera': 'be aware that this style is for Singing competitors only',
    'Orchestra Opera': 'be aware that this style is for Singing competitors only',
    'Solo Blues OR Jazz': 'be aware that this style is for Singing competitors only',
    'Duo Blues OR Jazz': 'be aware that this style is for Music and Singing competitors only',
    'Mini_group Blues OR Jazz': 'be aware that this style is for Music and Singing competitors only',
    'Large_group Blues OR Jazz': 'be aware that this style is for Music and Singing competitors only',
    'Solo Soul': 'be aware that this style is for Singing competitors only',
    'Duo Soul': 'be aware that this style is for Music and Singing competitors only',
    'Mini_group Soul': 'be aware that this style is for Music and Singing competitors only',
    'Large_group Soul': 'be aware that this style is for Music and Singing competitors only',
    'Solo Rap': 'be aware that this style is for Singing competitors only',
    'Duo Rap': 'be aware that this style is for Music and Singing competitors only',
    'Mini_group Rap': 'be aware that this style is for Music and Singing competitors only',
    'Large_group Rap': 'be aware that this style is for Music and Singing competitors only',
    'Mini_group A Cappella': 'be aware that this style is for Singing competitors only',
    'Large_group A Cappella': 'be aware that this style is for Singing competitors only',
    'Classical Neoclassical Repertoire Any other ballet style': 'be aware that this style is for Dance competitors who are younger than 10 years old only',  
    'Classical Neoclassical Any other ballet style': 'be aware that this style is for only one Dance competitor who his age start from 10 years old ',       
    'Classical Neoclassical Any other ballet style(pointe shoes)': 'be aware that this style is for only one Dance competitor who his age start from 10 and less than 14 years old ',
    Reportoire: 'be aware that this style is for only one Dance competitor who his age start from 10 and less than 14 years old ',
    'Reportoire(pointe shoes allowed)': 'be aware that this style is for only Dance competitors who his age start from  14 years old ',
    'National & flokore': 'be aware that this style is for Dance competitors ',
    Lyrical: 'be aware that this style is for Dance competitors who their ages start from  10 years old ',
    Contemporary: 'be aware that this style is for Dance competitors who their ages start from  10 years old ',
    'Show Dance': 'be aware that this style is for Dance competitors who their ages start from  10 years old ',
    Jazz: 'be aware that this style is for Dance competitors who their ages start from  10 years old ',
    'Street Dance': 'be aware that this style is for Dance competitors who their ages start from  10 years old ',
    Commercial: 'be aware that this style is for solo show or group of more than 6 Dance competitors ,this competitor or competitors ages start from  10 years old ',
    Arco: 'be aware that this style is for Dance competitors ',
    Tap: 'be aware that this style is for Dance competitors ',
    'Lyrical and Contemporary': 'be aware that this style is for Dance competitors who are younger than 10 years old only',
    'Jazz and Show Dance': 'be aware that this style is for Dance competitors who are younger than 10 years old only',
    'Street Dance & Commercial': 'be aware that this style is for Dance competitors who are younger than 10 years old only',
    'Song and Dance': 'be aware that this style is for Dance competitors ',
    'Mini_group Classical': 'be aware that this style is for Music and Singing competitors only',
    'Large_group Classical': 'be aware that this style is for Music and Singing competitors only',
    'Musical Dance Show': 'be aware that this style is for Music and Singing competitors only',
    'shared entry': 'be aware that this style should have competitors from all sections'
  }
  competitors=competitors.split(',')
  var id = getCookie("subscriptionId");
  var competitorsContainer = document.getElementById(`nameList_${entriesID}_${competitors}`);

  // Existing competitor, send PUT request
  document.getElementById("gif").style.display ="block"
  fetch(`${domainName}/sts/competitor/${id}`, {
    method: 'GET',
    headers: {'Authorization': token},
  })
    .then(response => response.json())
    .then(data => {
      let competitorsData = data.data;
        // competitorsData = competitorsData.filter(comp => competitors.includes(comp._id));
        competitorsContainer.innerHTML = "";

        // Create left table
        const table = document.createElement('table');
        table.classList.add("text-dark");

        // // Create right table
        // const rightTable = document.createElement('table');
        // rightTable.classList.add("text-dark");

        // Loop through competitorsData
        competitorsData.forEach(competitor => {
          // Create table row
          const row = document.createElement('tr');

          // Create name cell
          const nameCell = document.createElement('td');
          nameCell.classList.add("col-7");
          nameCell.textContent =   `${competitor.firstName} ${competitor.lastName}`  ;
          row.appendChild(nameCell);

          // Create category cell
          const categoryCell = document.createElement('td');
          categoryCell.classList.add("col-3");
          categoryCell.textContent = competitor.category;
          row.appendChild(categoryCell);

          // Create checkbox cell
          const checkboxCell = document.createElement('td');
          checkboxCell.classList.add("col-2");
          const checkbox = document.createElement('input');
          checkbox.type = "checkbox";
          checkbox.name = "rememberMe";
          checkbox.classList.add("p-2");
          checkbox.id = competitor._id;
          checkboxCell.appendChild(checkbox);
          row.appendChild(checkboxCell);

          // Determine which table to append the row 
          if (competitors.includes(competitor._id)) {
            console.log(competitors)
            // console.log(competitorsData)
            // competitorsData = competitorsData.filter(comp => competitors.includes(comp._id));
            // console.log(competitorsData)
            checkbox.checked = true;
            table.appendChild(row);
            console.log("1")
            checkbox.addEventListener('change', () => {
              if (!checkbox.checked) {
                console.log("2")
                // table.appendChild(row);
              }
            });
          }else {
            // competitorsData = competitorsData.filter(comp => !competitors.includes(comp._id));
            table.appendChild(row);
          }
        });

        // Create div to contain both tables
        const divContainer = document.createElement('div');
        // const line = document.createElement('hr');
        divContainer.appendChild(table);
        // divContainer.appendChild(line);
        // divContainer.appendChild(rightTable);

        // Append the div to the desired container element
        competitorsContainer.appendChild(divContainer);
        var message = document.createElement("div");
        message.className = "fw-bold text-center";
        message.innerHTML = 'according to your choosen style ' + stylesMessages[style];
        competitorsContainer.appendChild(message);

      document.getElementById("gif").style.display ="none"
    })
    .catch(function (error) {
      console.log('Error:', error);
      document.getElementById("gif").style.display ="none"
    });
}


function add_editCompatatorsToEntry(e) {
  e.preventDefault(); 
  var entriesID = e.target.id.split("_")[1];
  // var compatatorID = e.target.id.split("_")[2];
  // var competitors_Category = document.getElementById("table-body-entriesU");
  document.getElementById("gif").style.display ="block"
  // Get all checked checkboxes
  const checkedBoxes = document.querySelectorAll(`.nameList input[type="checkbox"]:checked`);
  const competitorIDs = Array.from(checkedBoxes).map(checkbox => checkbox.id);

  // Loop through the competitorIDs array and send a PUT request for each one
    fetch(`${domainName}/sts/entry/${entriesID}`, {
      method: 'PUT',
      headers: {"Content-Type": "application/json", 'Authorization': token},
      body: JSON.stringify({"competitors":competitorIDs}),
    })
      .then(response => response.json())
      .then(response => {
        if (response.apiStatus === true) {

          const existingRow = document.getElementById(response.data.result._id);
          if (existingRow) {
            // Update existing row
            const firstCell = existingRow.querySelector('.competitor-cell');
            const secondCell = existingRow.querySelector('.category-cell');

            // Update competitor cell
            firstCell.innerHTML = "";
            response.data.result.competitors.forEach((competitor) => {
              firstCell.innerHTML += `<span>${competitor}</span>`;
            });

            // Update category cell
            secondCell.innerHTML = "";
            response.data.result.competitorsCategories.forEach((category) => {
              secondCell.innerHTML += `<span>${category}</span>`;
            });
          } else {
            // Create new row
            const element = document.createElement('tr');
            element.id = response.data.result._id;
            element.innerHTML = `
              <td class="competitor-cell">
                ${response.data.result.competitors.map(competitor => `<span>${competitor}</span>`).join('')}
              </td>
              <td class="category-cell">
                ${response.data.result.competitorsCategories.map(category => `<span>${category}</span>`).join('')}
              </td>
              <td>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" style="color: #c10b0b;cursor: pointer;" onclick="deleteCompatatorFromTable('${entriesID}')" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
              </td>
            `;
            // competitors_Category.appendChild(element);
          }

          getEntriesData(localStorage.getItem("theme"));
        } else {
          console.log('Error:', response.apiMessage);
          // Display an error message to the user indicating the duplication
        }
        document.getElementById("gif").style.display ="none"
        responseAlert(response);
      })
      .catch(function (error) {
        console.log('Error:', error);
        document.getElementById("gif").style.display ="none"
        responseAlert(error);
      });
    

}


function deleteCompatatorFromTable(compatatorID,entriesID) {
  try {
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/entry/${entriesID}/${compatatorID}`, {
      method: 'DELETE',
      headers: {'Authorization': token},
    })
      .then(response => {
        if (response.status == 200) {
          getEntriesData(localStorage.getItem("theme"));
        } else {
          throw new Error('Request failed.');
        }
        document.getElementById("gif").style.display ="none"
        response.json().then(data => {
          responseAlert(data);
        });
      })
      .catch(function (error) {
        console.log('Error:', error);
        document.getElementById("gif").style.display ="none"
        error.json().then(data => {
          responseAlert(data);
        });
      });
  } catch (error) {
    console.log(error);
  }
}

// <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="add-compatator bi bi-person-fill-add" id="${competitor._id}" style="color: #3e843e;cursor: pointer;" onclick="add_editCompatatorsToEntry('${competitor._id}','${entriesID}')" viewBox="0 0 16 16">
//                 <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
//                 <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
//               </svg>

function handleSearch() {
  var searchQuery = document.getElementById('search').value.toLowerCase();
  var entrySections = document.querySelectorAll('#results_container-user section');

  entrySections.forEach(function (entrySection) {
    var entryName = entrySection.querySelector('.title').textContent.toLowerCase();
    var rows = entrySection.querySelectorAll('#table-body-entriesU tr');
    var shouldShowEntry = false;

    rows.forEach(function (row) {
      var cells = row.getElementsByTagName('td');
      var shouldShowRow = false;

      Array.from(cells).forEach(function (cell) {
        if (cell.textContent.toLowerCase().includes(searchQuery)) {
          shouldShowRow = true;
          shouldShowEntry = true;
        }
      });

      // Show rows that match the search query within the entry name
      if (entryName.includes(searchQuery)) {
        shouldShowRow = true;
        shouldShowEntry = true;
      }

      if (shouldShowRow) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });

    if (shouldShowEntry) {
      entrySection.style.display = '';
    } else {
      entrySection.style.display = 'none';
    }
  });
}

function clearData(){
  goToAdd();
  document.getElementById("entriesId").value = '';
  document.getElementById("choosen_style").value = '';
  document.getElementById("divMessages").innerHTML = '';
  document.querySelector('#audioPreview').src = '';
  document.querySelector('#audioPreview').style.display = 'none'
}

changeTheme(themesCharctaristic[localStorage.getItem('theme')]);