// MESSAGES //

function checkboxToFilter(){
let checkBox = document.getElementById("flexSwitchCheckDefault")

if(checkBox.checked){

  var messageContainer = document.getElementById("table-body-messages");

    document.getElementById("gif").style.display ="block";
    fetch(`${domainName}/sts/message/all`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" , 'Authorization': token , "onlyUsers" : "true"},
    })
    .then(response => response.json())
    .then(data => {
      messageData = data.data;
      messageContainer.innerHTML = "";
      messageData.forEach(message=> {
        const element = document.createElement('tr');
        element.className = "text-light"
        element.innerHTML = `
            <td>${message.owner.firstName} ${message.owner.lastName}</td>
            <td>${message.owner.email}</td>
            <td>${message.message}</td>
            <td>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" style="color: #c10b0b;cursor: pointer;" onclick="deleteCompetitor('${message._id}')" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
              </svg>
            </td>
        `;
        // element.setAttribute('id', `competitor-${competitor._id}`);
        messageContainer.appendChild(element);
      });
      document.getElementById("gif").style.display = "none";
    })
    .catch(error => {
      console.log(error);
      document.getElementById("gif").style.display = "none";
    }); 


}else{
  var messageContainer = document.getElementById("table-body-messages");

    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/message/all`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" , 'Authorization': token},
    })
    .then(response => response.json())
    .then(data => {
      messageData = data.data;
      messageContainer.innerHTML = "";
      messageData.forEach(message=> {
        if(message.owner){

          const element = document.createElement('tr');
          element.className = " text-light "
          element.innerHTML = `
              <td>${message.owner.firstName} ${message.owner.lastName}</td>
              <td>${message.owner.email}</td>
              <td>${message.message}</td>
              <td>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" style="color: #c10b0b;cursor: pointer;" onclick="deleteCompetitor('${message._id}')" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
              </td>
          `;
          messageContainer.appendChild(element);
      
        }else{

        const element = document.createElement('tr');
        element.className = " text-light "
        element.innerHTML = `
            <td>${message.firstName} ${message.lastName}</td>
            <td>${message.email}</td>
            <td>${message.message}</td>
            <td>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" style="color: #c10b0b;cursor: pointer;" onclick="deleteCompetitor('${message._id}')" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
              </svg>
            </td>
        `;
        messageContainer.appendChild(element);

        }

      });
      document.getElementById("gif").style.display = "none";
    })
    .catch(error => {
      console.log(error);
      document.getElementById("gif").style.display = "none";
    }); 

}

}

checkboxToFilter()

function deleteCompetitor(id){
  if(id){
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/message/${id}`, {
      method: 'DELETE',
      headers: {'Authorization': token},
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.apiMessage)
    checkboxToFilter()
    document.getElementById("gif").style.display = "none";
    responseAlert(data);
  })
  .catch(error => {
    console.log(error);
    document.getElementById("gif").style.display = "none";
    responseAlert(error);
  }); 

  }
}