// SCHOOL //
// document.getElementById('generate-pdf').addEventListener('click', function() {
//     // Get the HTML table element
//     var table = document.getElementById('table-schools');
//     // Create a new jsPDF object
//     var pdf = new jsPDF();
//     // Generate the PDF with the table content
//     pdf.fromHTML(table, 15, 15, {
//     'width': 190
//     });
//     // pdf.autoTable({html: '#my-table'});
//     // Download the PDF file
//     pdf.save('table.pdf');
// });

var tableBody = document.querySelector("#table-body-schools");
var searchInput = document.querySelector("#search");
var dataSchool = [];
// const ShowData = `<a href="#compatatorsAS" id="compatatorsAS" class="text-light">
//                         <i class="fas fa-home"></i>
//                     </a>`;
function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
  }

        var headers = new Headers(); 
        var token = getCookie('token'); 
        headers.append('Authorization', token); 
        headers.append('Content-Type', "application/json");


    var schoolsData;

    function getSchoolsData() {
        console.log("data.data")

    var schoolsContainer = document.getElementById("table-body-schools");
    const competitionId = getCookie("competition")
    fetch(`${domainName}/sts/subscription/${competitionId}`, {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        schoolsData = data.data;
        // console.log(schoolsData._id)

        schoolsContainer.innerHTML = "";
        schoolsData.forEach(competitor=> {
            const element = document.createElement('tr');
            element.innerHTML = `
                <td>
                    <a id="${competitor._id}" onclick="compatatorsAS(event)" class="text-light " >
                        <i class="fas fa-home"></i>
                    </a>
                </td>
                <td>${competitor.academy.academyDetails.schoolName}</td>
                <td>${competitor.academy.firstName} ${competitor.academy.lastName} </td>
                <td>${competitor.academy.email}</td>
                <td>${competitor.academy.academyDetails.country}</td>
                <td>${competitor.academy.academyDetails.schoolLocation.street}</td>
            `;
            // element.setAttribute('id', `competitor-${competitor._id}`);
            schoolsContainer.appendChild(element);
            console.log(competitor._id)
        });
        })
        .catch(error => alert(error));
    }
                    
    getSchoolsData();

    function setCookie(name, value) {
        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; path=/';
      }
                    
    function compatatorsAS(e){
        console.log(e.target.parentElement.id)
        setCookie("subscriptionId" ,e.target.parentElement.id )
        window.location.hash = "#compatatorsAS"
    }

   

































// fetch(`http://localhost:5000/sts/subscription/${competitionId}`, {method: 'GET' , headers: token })
//     .then(response => response.json())
//     .then(data => {
//     data.forEach(item => {
//         const table = document.getElementById('table-schools').getElementsByTagName('tbody')[0];
        












//         // const newRow = table.insertRow();         
//         // const showDataBTN = newRow.insertCell();
//         // const schoolNameCell = newRow.insertCell();
//         // const ownerNameCell = newRow.insertCell();
//         // const emailCell = newRow.insertCell();
//         // const countryCell = newRow.insertCell();
//         // const addressCell = newRow.insertCell();
        
//         // Set the values for each cell
//         // showDataBTN.innerHTML = ShowData;
//         // schoolNameCell.innerText = item.schoolName;
//         // ownerNameCell.innerText = item.ownerName;
//         // emailCell.innerText = item.email;
//         // countryCell.innerText = item.country;
//         // addressCell.innerText = item.address;
//     })
// });  


// searchInput.addEventListener("input", () => {
//     const query = searchInput.value.toLowerCase();
//     const filteredData = data.filter((item) => {
//     return (
//         item.schoolName.toLowerCase().includes(query) ||
//         item.ownerName.toLowerCase().includes(query) ||
//         item.email.toLowerCase().includes(query) ||
//         item.country.toLowerCase().includes(query) ||
//         item.address.toLowerCase().includes(query) 
//     );
//     });
//     renderTable(filteredData);
// });

// function renderTable(dataArray) {
//     tableBody.innerHTML = "";
//     dataArray.forEach((item) => {
//     renderRow(item);
//     });
// }

// function renderRow(item) {
//     const newRow = tableBody.insertRow();
//     const showDataBTN = newRow.insertCell();
//     const schoolNameCell = newRow.insertCell();
//     const ownerNameCell = newRow.insertCell();
//     const emailCell = newRow.insertCell();
//     const countryCell = newRow.insertCell();
//     const addressCell = newRow.insertCell();

//     showDataBTN.innerHTML = ShowData;
//     schoolNameCell.innerText = item.schoolName;
//     ownerNameCell.innerText = item.ownerName;
//     emailCell.innerText = item.email;
//     countryCell.innerText = item.country;
//     addressCell.innerText = item.address;
// }

// SCHOOL //