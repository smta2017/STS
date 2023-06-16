// MESSAGES //
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


var tableBody = document.querySelector("#table-body-messages");
var searchInput = document.querySelector("#search");
var data = [];

fetch('https://fakestoreapi.com/products', {method: 'GET'})
    .then(response => response.json())
    .then(data => {
    data.forEach(item => {
        const table = document.getElementById('table-messages').getElementsByTagName('tbody')[0];
        
        const newRow = table.insertRow();
        const fullnameCell = newRow.insertCell();
        const emailCell = newRow.insertCell();
        const messageCell = newRow.insertCell();
        const actionCell = newRow.insertCell();
        
        // Set the values for each cell
        fullnameCell.innerHTML = item.firstname + item.lastname;
        emailCell.innerHTML = item.email;
        messageCell.innerHTML = item.message;
        actionCell.innerHTML = `<i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" data-row-index="${rowIndex}"></i>`;;

    })
});  

// Function to delete a row
function deleteRow(rowIndex) {
    // Get the item corresponding to the row index
    var item = data[rowIndex];
  
    // Make a request to delete the item from the backend
    fetch('YOUR_DELETE_ENDPOINT', {
      method: 'DELETE',
      // Include any necessary headers or authentication tokens
      // body: JSON.stringify(item)
    })
      .then(response => {
        if (response.ok) {
          // If the deletion was successful, remove the row from the frontend table
          tableBody.deleteRow(rowIndex);
          data.splice(rowIndex, 1); // Remove the corresponding data entry from the 'data' array
        } else {
          // Handle the case where the deletion failed
          console.error('Failed to delete item.');
        }
      })
      .catch(error => {
        // Handle any network or other errors
        console.error('Error deleting item:', error);
      });
}

// Event delegation to handle delete button clicks
tableBody.addEventListener("click", function(event) {
    var target = event.target;
    if (target.classList.contains("delete-btn")) {
      // Get the row index from the data-row-index attribute
      var rowIndex = parseInt(target.getAttribute("data-row-index"));
      deleteRow(rowIndex);
    }
});


// Add event listener to the search input field
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredData = data.filter((item) => {
        return (
            item.firstname.toLowerCase().includes(query) ||
            item.lastname.toLowerCase().includes(query) ||
            item.email.toLowerCase().includes(query) ||
            item.message.toLowerCase().includes(query)
        );
    });
    renderTable(filteredData);
});

// Function to render the table based on the provided data array
function renderTable(dataArray) {
    tableBody.innerHTML = "";
    dataArray.forEach((item, index) => {
        renderRow(item, index);
    });
}
// Function to render a single row in the table
function renderRow(item, index) {
    const newRow = tableBody.insertRow();
    const fullnameCell = newRow.insertCell();
    const emailCell = newRow.insertCell();
    const messageCell = newRow.insertCell();
    const actionCell = newRow.insertCell();

    // Set the values for each cell
    fullnameCell.innerHTML = item.firstname + item.lastname;
    emailCell.innerHTML = item.email;
    messageCell.innerHTML = item.message;
    actionCell.innerHTML = `<i class="delete-btn fa-solid fa-trash-can" style="color: #c10b0b;cursor: pointer;" data-row-index="${index}"></i>`;
}

// MESSAGES //