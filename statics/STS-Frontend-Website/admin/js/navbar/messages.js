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
      console.log(messageData)
      messageContainer.innerHTML = "";
      messageData.forEach(message=> {
        const element = document.createElement('tr');
        element.className = "text-light"
        element.innerHTML = `
            <td>${message.owner.firstName} ${message.owner.lastName}</td>
            <td>${message.owner.email}</td>
            <td>${message.message}</td>
            <td>
              <i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" onclick="deleteCompetitor('${message._id}')"></i>
            </td>
        `;
        // element.setAttribute('id', `competitor-${competitor._id}`);
        messageContainer.appendChild(element);
      });
    })
    .catch(error =>  console.log('Error:', error) );
    document.getElementById("gif").style.display ="none"


}else{
  var messageContainer = document.getElementById("table-body-messages");

    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/message/all`, {
        method: 'get',
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
                <i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" onclick="deleteCompetitor('${message._id}')"></i>
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
              <i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" onclick="deleteCompetitor('${message._id}')"></i>
            </td>
        `;
        messageContainer.appendChild(element);

        }

      });
    })
    .catch(error =>  console.log('Error:', error) );
    document.getElementById("gif").style.display ="none"

}

}

checkboxToFilter()

function deleteCompetitor(id){
  console.log(id)
  if(id){
    fetch(`${domainName}/sts/message/${id}`, {
      method: 'DELETE',
      headers: {'Authorization': token},
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.apiMessage)
    checkboxToFilter()
  })
  .catch(error =>  console.log('Error:', error) );

  }
}