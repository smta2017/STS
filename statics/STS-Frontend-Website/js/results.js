var daySelect = document.getElementById("day");
var monthSelect = document.getElementById("month");
var yearSelect = document.getElementById("year");
// Generate days options
for (var i = 1; i <= 31; i++) {
var option = document.createElement("option");
option.value = i;
option.text = i;
daySelect.appendChild(option);
}
// Generate months options
var months = [
"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December"
];
for (var i = 0; i < months.length; i++) {
var option = document.createElement("option");
option.value = i + 1;
option.text = months[i];
monthSelect.appendChild(option);
}
// Generate years options
var currentYear = new Date().getFullYear();
for (var i = currentYear; i >= 1920; i--) {
var option = document.createElement("option");
option.value = i;
option.text = i;
yearSelect.appendChild(option);
}

document.getElementById('generate-pdf').addEventListener('click', function() {
// Get the HTML table element
var table = document.getElementById('my-table');
// Create a new jsPDF object
var pdf = new jsPDF();
// Generate the PDF with the table content
pdf.fromHTML(table, 15, 15, {
'width': 190
});
// pdf.autoTable({html: '#my-table'});
// Download the PDF file
pdf.save('table.pdf');
});

// document.getElementById("printTableButton").addEventListener("click", function() {
//   window.print();
// });


const form = document.querySelector("form");
const tableBody = document.querySelector("#table-body-results");
const searchInput = document.querySelector("#search");
const firstnameInput = document.querySelector("#firstname");
const lastnameInput = document.querySelector("#lastname");
const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const genderInput = document.querySelector("#gender");
const emailInput = document.querySelector("#email");
const mobileInput = document.querySelector("#mobile");
const categoryInput = document.querySelector("#category");
const submitBtn = document.querySelector("#submit");

let data = [];

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const firstname = firstnameInput.value;
    const lastname = lastnameInput.value;
    const day = dayInput.value;
    const month = monthInput.value;
    const year = yearInput.value;
    const gender = genderInput.value;
    const email = emailInput.value;
    const mobile = mobileInput.value;
    const category = categoryInput.value;

    if (!firstname || !lastname || !day || !month || !year || !gender || !email || !mobile || !category) {
        alert("please, enter your data ...");
        return;
    }

    const person = { firstname, lastname, day, month, year, gender, email, mobile, category };
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
    dayInput.value = person.day;
    monthInput.value = person.month;
    yearInput.value = person.year;
    genderInput.value = person.gender;
    emailInput.value = person.email;
    mobileInput.value = person.mobile;
    categoryInput.value = person.category;

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
        person.day.toLowerCase().includes(query) ||
        person.month.toLowerCase().includes(query) ||
        person.year.toLowerCase().includes(query) ||
        person.gender.toLowerCase().includes(query) ||
        person.email.toLowerCase().includes(query) ||
        person.mobile.toString().includes(query) ||
        person.category.toString().includes(query)
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
    const dayCell = newRow.insertCell();
    const monthCell = newRow.insertCell();
    const yearCell = newRow.insertCell();
    const genderCell = newRow.insertCell();
    const emailCell = newRow.insertCell();
    const mobileCell = newRow.insertCell();
    const categoryCell = newRow.insertCell();
    const actionCell = newRow.insertCell();

    firstnameCell.innerHTML = person.firstname;
    lastnameCell.innerHTML = person.lastname;
    dayCell.innerHTML = person.day;
    monthCell.innerHTML = person.month;
    yearCell.innerHTML = person.year;
    genderCell.innerHTML = person.gender;
    emailCell.innerHTML = person.email;
    mobileCell.innerHTML = person.mobile;
    categoryCell.innerHTML = person.category;
    actionCell.innerHTML = `<i class="edit-btn fa-solid fa-pen-to-square" style="color: #3e843e;cursor: pointer;" data-row-index="${index}" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                            <i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" data-row-index="${index}"></i>`;
}

changeTheme(themesCharctaristic[localStorage.getItem('theme')]);