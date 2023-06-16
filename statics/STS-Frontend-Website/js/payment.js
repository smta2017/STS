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
    

var row ;
var i ;
fetch('https://api.example.com/data', {method: 'GET'})
    .then(response => response.json())
    .then(data => {
    data.forEach(item => {
        const table = document.getElementById('table-totalPayment').getElementsByTagName('tbody')[0];
        for(i = 0 ; table.rows.length; i++){
            row = table.rows[i];
        }
        var TAFcell = row.insertCell(-1);
        var TMFcell = row.insertCell(-1);
        var TEcell = row.insertCell(-1);
        var TFcell = row.insertCell(-1);
        var TCcell = row.insertCell(-1);
        var TPcell = row.insertCell(-1);
        var PScell = row.insertCell(-1);

        // Set the values for each cell
        TAFcell.innerHTML = `${item.TAFcell} + $`;
        TMFcell.innerHTML = `${item.TMFcell} + $`;
        TEcell.innerHTML = `${item.TEcell} + $`;
        TFcell.innerHTML = `${item.TFcell} + $`;
        TCcell.innerHTML = `${item.TCcell} + $`;
        TPcell.innerHTML = `${item.TPcell} + $`;
        PScell.innerHTML = `<div class="bg-success p-2">Paid</div>
                            <div class="bg-danger p-2">Not Paid</div>`;
    
    })
});



// const form = document.querySelector("form");
var tableHead = document.querySelector("#table-head");
var searchInput = document.querySelector("#search");
// const firstnameInput = document.querySelector("#firstname");
// const lastnameInput = document.querySelector("#lastname");
// const dayInput = document.querySelector("#day");
// const monthInput = document.querySelector("#month");
// const yearInput = document.querySelector("#year");
// const genderInput = document.querySelector("#gender");
// const emailInput = document.querySelector("#email");
// const mobileInput = document.querySelector("#mobile");
// const categoryInput = document.querySelector("#category");
// const submitBtn = document.querySelector("#submit");

var data = [];

// form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const firstname = firstnameInput.value;
//     const lastname = lastnameInput.value;
//     const day = dayInput.value;
//     const month = monthInput.value;
//     const year = yearInput.value;
//     const gender = genderInput.value;
//     const email = emailInput.value;
//     const mobile = mobileInput.value;
//     const category = categoryInput.value;

//     if (!firstname || !lastname || !day || !month || !year || !gender || !email || !mobile || !category) {
//         alert("please, enter your data ...");
//         return;
//     }

//     const person = { firstname, lastname, day, month, year, gender, email, mobile, category };
//     if (submitBtn.textContent === "Update") {
//         const rowIndex = submitBtn.dataset.rowIndex;
//         data[rowIndex] = person;
//         renderTable(data);
//         submitBtn.textContent = "Submit";
//         } else {
//         data.push(person);
//         renderRow(person, data.length - 1);
//         }
//         form.reset();
// });

// tableBody.addEventListener("click", (event) => {
//     if (event.target.classList.contains("edit-btn")) {
//     const rowIndex = event.target.dataset.rowIndex;
//     const person = data[rowIndex];

//     firstnameInput.value = person.firstname;
//     lastnameInput.value = person.lastname;
//     dayInput.value = person.day;
//     monthInput.value = person.month;
//     yearInput.value = person.year;
//     genderInput.value = person.gender;
//     emailInput.value = person.email;
//     mobileInput.value = person.mobile;
//     categoryInput.value = person.category;

//     submitBtn.textContent = "Update";
//     submitBtn.dataset.rowIndex = rowIndex;

//     } else if (event.target.classList.contains("delete-btn")) {
//     const rowIndex = event.target.dataset.rowIndex;
//     data.splice(rowIndex, 1);
//     event.target.parentNode.parentNode.remove();
//     }
// });

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredData = data.filter((item) => {
    return (
        item.TAFcell.toLowerCase().includes(query) ||
        item.TMFcell.toLowerCase().includes(query) ||
        item.TEcell.toLowerCase().includes(query) ||
        item.TFcell.toLowerCase().includes(query) ||
        item.TCcell.toLowerCase().includes(query) ||
        item.TPcell.toLowerCase().includes(query) ||
        item.PScell.toLowerCase().includes(query) 
    );
    });
    renderTable(filteredData);
});

function renderTable(dataArray) {
    tableHead.innerHTML = "";
    dataArray.forEach((item) => {
    renderCol(item);
    });
}

function renderCol(item) {
    var TAFcell = row.insertCell(-1);
    var TMFcell = row.insertCell(-1);
    var TEcell = row.insertCell(-1);
    var TFcell = row.insertCell(-1);
    var TCcell = row.insertCell(-1);
    var TPcell = row.insertCell(-1);
    var PScell = row.insertCell(-1);

    // Set the values for each cell
    TAFcell.innerHTML = `${item.TAFcell} + $`;
    TMFcell.innerHTML = `${item.TMFcell} + $`;
    TEcell.innerHTML = `${item.TEcell} + $`;
    TFcell.innerHTML = `${item.TFcell} + $`;
    TCcell.innerHTML = `${item.TCcell} + $`;
    TPcell.innerHTML = `${item.TPcell} + $`;
    PScell.innerHTML = `<div class="btn btn-success p-2">Paid</div>
                        <div class="btn btn-danger p-2">Not Paid</div>`;

}

changeTheme(themesCharctaristic[localStorage.getItem('theme')]);