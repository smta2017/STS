window.onload = function() {
    var checkAll = document.querySelector('.js-check-all');
    var checkboxes = document.querySelectorAll('th[scope="row"] input[type="checkbox"]');

    checkAll.addEventListener('click', function() {
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = checkAll.checked;
            if (checkAll.checked) {
                checkbox.closest('tr').classList.add('active');
            } else {
                checkbox.closest('tr').classList.remove('active');
            }
        });
    });

    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('click', function() {
            if (checkbox.closest('tr').classList.contains('active')) {
                checkbox.closest('tr').classList.remove('active');
            } else {
                checkbox.closest('tr').classList.add('active');
            }
        });
    });
};


function checkboxToFilter(){
    let checkBox = document.getElementById("flexSwitchCheckDefault")
    
    if(checkBox.checked){
      var messageContainer = document.getElementById("table-body-errorLogs");
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
                <th scope="row">
                  <label class="control control--checkbox">
                    <input type="checkbox"/>
                    <div class="control__indicator"></div>
                  </label>
                </th>
                <td>${message.owner._id}</td>
                <td>${message.owner.firstName} ${message.owner.lastName}</td>
                <td>
                    Web Designer
                    <small class="d-block">${message.message}</small>
                </td>
                <td>${message.owner.firstName}</td>
                <td>${message.owner.email}</td>
                <td>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" style="color: #c10b0b;cursor: pointer;" onclick="deleteMessage('${message._id}')" viewBox="0 0 16 16">
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
      var messageContainer = document.getElementById("table-body-errorLogs");
    
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
                <th scope="row">
                    <label class="control control--checkbox">
                        <input type="checkbox"/>
                        <div class="control__indicator"></div>
                    </label>
                </th>
                <td>${message.owner._id}</td>
                <td>${message.owner.firstName} ${message.owner.lastName}</td>
                <td>${message.message}</td>
                <td>${message.owner.firstName}</td>
                <td>${message.owner.email}</td>
                <td>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" style="color: #c10b0b;cursor: pointer;" onclick="deleteMessage('${message._id}')" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </td>
              `;
              messageContainer.appendChild(element);
          
            }else{
    
            const element = document.createElement('tr');
            element.className = " text-light "
            element.innerHTML = `
                <th scope="row">
                    <label class="control control--checkbox">
                    <input type="checkbox"/>
                    <div class="control__indicator"></div>
                    </label>
                </th>
                <td>${message.owner._id}</td>
                <td>${message.firstName} ${message.owner.lastName}</td>
                <td>${message.message}</td>
                <td>${message.owner.firstName}</td>
                <td>${message.owner.email}</td>
                <td>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" style="color: #c10b0b;cursor: pointer;" onclick="deleteMessage('${message._id}')" viewBox="0 0 16 16">
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
    
function deleteMessage(id){
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