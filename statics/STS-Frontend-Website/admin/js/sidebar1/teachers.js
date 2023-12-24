// TEACHERS //
var tableBody = document.querySelector("#table-body-teachers");
var searchInput = document.querySelector("#search");
var dataSchool = [];

fetch('https://fakestoreapi.com/products', {method: 'GET'})
    .then(response => response.json())
    .then(data => {
    data.forEach(item => {
        const table = document.getElementById('table-teachers').getElementsByTagName('tbody')[0];
        

        const newRow = table.insertRow();
        const firstnameCell = newRow.insertCell();
        const lastnameCell = newRow.insertCell();
        const schoolNameCell = newRow.insertCell();
        const positionCell = newRow.insertCell();
        const emailCell = newRow.insertCell();
        const mobileCell = newRow.insertCell();
        
        // Set the values for each cell
        firstnameCell.innerHTML = person.firstname;
        lastnameCell.innerHTML = person.lastname;
        schoolNameCell.innerText = item.schoolName;
        positionCell.innerHTML = person.position;
        emailCell.innerHTML = person.email;
        mobileCell.innerHTML = person.mobile;
    })
});  


searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredData = data.filter((item) => {
    return (
        item.schoolName.toLowerCase().includes(query) ||
        item.ownerName.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.country.toLowerCase().includes(query) ||
        item.address.toLowerCase().includes(query) 
    );
    });
    renderTable(filteredData);
});

function renderTable(dataArray) {
    tableBody.innerHTML = "";
    dataArray.forEach((item) => {
    renderRow(item);
    });
}

function renderRow(item) {
    const newRow = tableBody.insertRow();
    const firstnameCell = newRow.insertCell();
    const lastnameCell = newRow.insertCell();
    const schoolNameCell = newRow.insertCell();
    const positionCell = newRow.insertCell();
    const emailCell = newRow.insertCell();
    const mobileCell = newRow.insertCell();
    
    // Set the values for each cell
    firstnameCell.innerHTML = person.firstname;
    lastnameCell.innerHTML = person.lastname;
    schoolNameCell.innerText = item.schoolName;
    positionCell.innerHTML = person.position;
    emailCell.innerHTML = person.email;
    mobileCell.innerHTML = person.mobile;
}

// TEACHERS //