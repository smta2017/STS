
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
        alert("please, enter your data ...");
        return;
    }

    const person = { firstname, lastname, position, email, mobile };
    if (submitBtn.textContent === "Update") {
        const rowIndex = submitBtn.dataset.rowIndex;
        data[rowIndex] = person;
        renderTable(data);
        submitBtn.textContent = "Submit";
        } else {
        data.push(person);
        renderRow(person, data.length - 1);
        }
        form.reset();
});

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
    data.splice(rowIndex, 1);
    event.target.parentNode.parentNode.remove();
    }
});

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
    dataArray.forEach((person, index) => {
    renderRow(person, index);
    });
}

function renderRow(person, index) {
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
    actionCell.innerHTML = `<i class="edit-btn fa-solid fa-pen-to-square" style="color: #3e843e;cursor: pointer;" data-row-index="${index}" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                            <i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" data-row-index="${index}"></i>`;
}


changeTheme(themesCharctaristic[localStorage.getItem('theme')]);