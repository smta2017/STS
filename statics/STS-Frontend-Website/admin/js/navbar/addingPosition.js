var selectedOptions = [];

// Move the event listener outside the changePosition function
document.getElementById("rules").addEventListener("change", function () {
    selectedOptions = Array.from(this.selectedOptions).map(option => option.value);
    console.log(selectedOptions);
});

function getAllTabs() {
  var allTabs = document.querySelector('#rules');
  document.getElementById("gif").style.display ="block"
  fetch(`${domainName}/sts/role/tabs`, {
    method: 'GET',
    headers: {'Authorization': token},
  })
    .then(response => response.json())
    .then(data => {
      allTabs.innerHTML = "";
      const chooseOption = document.createElement('option');
      chooseOption.value = "-1";
      chooseOption.disabled = true;
      chooseOption.textContent = "Choose Tabs";
      allTabs.appendChild(chooseOption);
      data.data.forEach(tabs => {
        const option = document.createElement('option');
        option.id = tabs._id;
        option.value = tabs._id;
        option.textContent = tabs.tabName;
        allTabs.appendChild(option);
      });
      document.getElementById("gif").style.display = "none";
    })
    .catch(error => {
      console.log(error);
      document.getElementById("gif").style.display = "none";
    }); 
}

getAllTabs();

var allRolesData;
function getAllRoles() {
    var allRolesContainer = document.getElementById("GetAllRoles");
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/role/all`, {
        method: 'GET',
        headers: {'Authorization': token},
    })
        .then(response => response.json())
        .then(data => {
            allRolesData = data.data;
            allRolesContainer.innerHTML = "";
            allRolesData.forEach(role=> {
                const element = document.createElement('div');
                element.className = "col-12 col-sm-6 col-md-4 col-lg-3"
                element.innerHTML = `
                    <div class="card h-100 shadow-sm bg-dark" id="role_${role._id}"> 
                        <div class="label-top shadow-sm text-center mx-auto" id="titleshop">${role.role}</div>
                        <div class="card-body">
                            <div class="text-center" id="containerTabs_${role._id}">
                            </div>
                        </div>
                        <div class="btn_group mx-auto mb-2">
                            <button class="btn btn-success" id="add-row" onclick="editPosition('${role._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="edit-btn bi bi-pen-fill" viewBox="0 0 16 16" s>
                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                </svg>
                            </button>
                            <button class="btn btn-danger" id="remove-row" onclick="deletePosition('${role._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                `;
                const containerTabs = element.querySelector(`#containerTabs_${role._id}`);
                for (let i = 0; i < role.tabs.length; i++) {
                    const div = document.createElement('div');
                    div.textContent = role.tabs[i];
                    div.className = "badge rounded-pill bg-warning mb-1";
                    div.id = `tab_${i}`;
                    containerTabs.appendChild(div);
                }

                element.setAttribute('id', `role-${role._id}`);
                allRolesContainer.appendChild(element);
            });
            document.getElementById("gif").style.display = "none";
        })
        .catch(error => {
            console.log(error);
            document.getElementById("gif").style.display = "none";
          }); 
}
                
getAllRoles();


function editPosition(id) {
    goToTop();
    document.getElementById("addToEdit").innerHTML = "Update";
    var myRoles = allRolesData.find(roles => { return roles._id == id })
    document.getElementById("rolesId").value = myRoles._id;
    document.getElementById("positionAdding").value = myRoles.role;
    // document.getElementById("rules").value = myRoles.routes;
    // Clear all selections
    let select = document.getElementById("rules");
    for (let i = 0; i < select.options.length; i++) {
        select.options[i].selected = false;
    }

    // Set selected options
    for (let i = 0; i < myRoles.tabs.length; i++) {
        let optionVal = myRoles.tabs[i];
        let option = Array.from(select.options).find(opt => opt.value == optionVal);
        if (option) {
            option.selected = true;
        }
    }
}


function changePosition(e) {
    e.preventDefault();
    let id = document.getElementById("rolesId").value;

    const formData = {
        role: document.getElementById("positionAdding").value,
        tabs: selectedOptions,
        routes: []
    };

    if (id) {
        console.log(id);
        try {
            document.getElementById("gif").style.display ="block"
            fetch(`${domainName}/sts/role/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" , 'Authorization': token},
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then((response) => {
                if (response.apiStatus == true) {
                    console.log("Position Updated Successfully");
                    document.getElementById("positionAdding").value = "";
                    document.getElementById("rules").selectedIndex = -1;
                    goToAdd();
                    getAllRoles();
                } else {
                    throw new Error("Request failed.");
                }
                document.getElementById("gif").style.display = "none";
                responseAlert(response);
            })
                .catch(error => {
                    console.log(error);
                    document.getElementById("gif").style.display = "none";
                    responseAlert(error);
                }); 
        } catch (error) {
            console.log(error);
        }
    }else{
        if (formData.role && selectedOptions.length > 0) {
            try {
                document.getElementById("gif").style.display ="block"
                fetch(`${domainName}/sts/role`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" , 'Authorization': token},
                    body: JSON.stringify(formData)
                })
                    .then(response => response.json())
                    .then((response) => {
                        if (response.apiStatus == true) {
                            console.log("Position added successfully");
                            document.getElementById("positionAdding").value = "";
                            document.getElementById("rules").selectedIndex = -1;
                
                            getAllRoles();
                        } else {
                            throw new Error("Request failed.");
                        }
                        document.getElementById("gif").style.display = "none";
                        responseAlert(response);
                        })
                        .catch(error => {
                            console.log(error);
                            document.getElementById("gif").style.display = "none";
                            responseAlert(error);
                        }); 
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Role and/or tabs fields are empty. Please fill them.");
        }
    }
}

function deletePosition(id) {
    if (id) {
        try {
            document.getElementById("gif").style.display ="block"
            fetch(`${domainName}/sts/role/${id}`, {
                method: 'DELETE',
                headers: {'Authorization': token},
            })
                .then(response => {
                    if (response.status == 200) {
                        console.log("role data deleted successfully");
                        getAllRoles();
                    } else {
                        throw new Error('Request failed.');
                    }
                    document.getElementById("gif").style.display = "none";
                    response.json().then(data => {
                        responseAlert(data);
                    });
                })
                .catch(error => {
                    console.log(error);
                    document.getElementById("gif").style.display = "none";
                    error.json().then(data => {
                        responseAlert(data);
                      });
                  }); 
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("No role ID provided");
    }
}


function clearData(){
    goToAdd();
    document.getElementById("rolesId").value = '';
    document.getElementById('positionAdding').src = '';
    document.getElementById('rules').src = -1;
}