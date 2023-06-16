
document.getElementById('generate-pdf').addEventListener('click', function() {
    // Get the HTML table element
    var table = document.getElementById('teachers-table');
    // Create a new jsPDF object
    var pdf = new jsPDF();
    // Generate the PDF with the table content
    pdf.fromHTML(table, 15, 15, {
    'width': 190
    });
    // pdf.autoTable({html: '#my-table'});
    // Download the PDF file
    pdf.save('Teachers Table.pdf');
});


var form = document.querySelector("#add-teachers-form");
var tableBody = document.querySelector("#table-body-teachers");
var searchInput = document.querySelector("#search");
var firstnameInput = document.querySelector("#firstname");
var lastnameInput = document.querySelector("#lastname");
var positionInput = document.querySelector("#position");
var emailInput = document.querySelector("#email");
var mobileInput = document.querySelector("#mobile");
var submitBtn = document.querySelector("#submit");

var data = [];

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const firstname = firstnameInput.value;
    const lastname = lastnameInput.value;
    const position = positionInput.value;
    const email = emailInput.value;
    const mobile = mobileInput.value;

    if (!firstname || !lastname || !position || !email || !mobile) {
        alert("Please enter all the required data.");
        return;
    }

    const person = { firstname, lastname, position, email, mobile };
    
    if (submitBtn.textContent === "Update") {
        const rowIndex = submitBtn.dataset.rowIndex;
        updatePerson(person, rowIndex);
    } else {
        addPerson(person);
    }
    form.reset();
});


function addPerson(person) {
    fetch("/your-backend-endpoint", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            data.push(person);
            renderRow(person, data.length - 1);
        } else {
            alert("Failed to add person. Please try again.");
        }
    })
    .catch(error => {
        alert("An error occurred. Please try again.");
        console.error(error);
    });
}

function updatePerson(person, rowIndex) {
    fetch(`/your-backend-endpoint/${rowIndex}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            data[rowIndex] = person;
            renderTable(data);
            submitBtn.textContent = "Submit";
            submitBtn.removeAttribute("data-row-index");
        } else {
            alert("Failed to update person. Please try again.");
        }
    })
    .catch(error => {
        alert("An error occurred. Please try again.");
        console.error(error);
    });
}

function deletePerson(rowIndex) {
    fetch(`/your-backend-endpoint/${rowIndex}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            data.splice(rowIndex, 1);
            renderTable(data);
        } else {
            alert("Failed to delete person. Please try again.");
        }
    })
    .catch(error => {
        alert("An error occurred. Please try again.");
        console.error(error);
    });
}

tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-btn")) {
        const rowIndex = event.target.dataset.rowIndex;
        const person = data[rowIndex];
        
        firstnameInput.value = person.firstname;
        lastnameInput.value = person.lastname;
        positionInput.value = person.position;
        emailInput.value = person.email;
        mobileInput.value = person.mobile;
    
        submitBtn.textContent = "Update";
        submitBtn.dataset.rowIndex = rowIndex;

    } else if (event.target.classList.contains("delete-btn")) {
        const rowIndex = event.target.dataset.rowIndex;
        deletePerson(rowIndex);
    }
});

renderTable(data);

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredData = data.filter((person) => {
    return (
        person.firstname.toLowerCase().includes(query) ||
        person.lastname.toLowerCase().includes(query) ||
        person.position.toLowerCase().includes(query) ||
        person.email.toLowerCase().includes(query) ||
        person.mobile.toString().includes(query)
    );
    });
    renderTable(filteredData);
});

function renderTable(dataArray) {
    tableBody.innerHTML = "";
    dataArray.forEach((person, rowIndex) => {
    renderRow(person, rowIndex);
    });
}

function renderRow(person, rowIndex) {
    const newRow = tableBody.insertRow();
    const firstnameCell = newRow.insertCell();
    const lastnameCell = newRow.insertCell();
    const positionCell = newRow.insertCell();
    const emailCell = newRow.insertCell();
    const mobileCell = newRow.insertCell();
    const actionCell = newRow.insertCell();

    firstnameCell.innerHTML = person.firstname;
    lastnameCell.innerHTML = person.lastname;
    positionCell.innerHTML = person.position;
    emailCell.innerHTML = person.email;
    mobileCell.innerHTML = person.mobile;
    actionCell.innerHTML = `<i class="edit-btn fa-solid fa-pen-to-square" style="color: #3e843e;cursor: pointer;" data-row-index="${rowIndex}" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                            <i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" data-row-index="${rowIndex}"></i>`;
}