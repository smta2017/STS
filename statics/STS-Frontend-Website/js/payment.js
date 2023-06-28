function generatePDF() {
    // Get the HTML table element
    var table = document.getElementById('table-totalPayment');
  
    // Open a new window for the print preview
    var win = window.open('', '_blank');
  
    // Create a new document in the new window
    win.document.write('<html><head><title>Payments Table</title></head><body>');
    win.document.write('<style>table { border-collapse: collapse; } th, td { border: 2px solid black; padding: 8px; }</style>');
    win.document.write('<h1>Payments Table</h1>');
    win.document.write(table.outerHTML); // Write the table HTML to the new document
    win.document.write('</body></html>');
  
    // Close the document
    win.document.close();
  
    // Wait for the document to fully load before printing
    win.onload = function() {
      // Print the document
      win.print();
      // Close the print preview window after printing
      // win.close();
    };
}
  

var paymentsData;

function getPaymentData() {
  var row1 = document.getElementById("row1");
  var row2 = document.getElementById("row2");
  var row3 = document.getElementById("row3");
  var row4 = document.getElementById("row4");
  var row5 = document.getElementById("row5");
  var id = getCookie("subscriptionId");
  document.getElementById("gif").style.display = "block";
  fetch(`${domainName}/sts/subscription/payments/${id}`  , {
    method: "GET",
    headers: { Authorization: token },
  })
    .then((response) => response.json())
    .then((data) => {
      paymentsData = data.data;
      row1.cells[1].innerText = paymentsData.adminstrationFeesDetails.total;
      row2.cells[1].innerText = paymentsData.memberShipFeesDetails.total;
      row3.cells[1].innerText = paymentsData.totalEntriesFees;
      row4.cells[1].innerText = paymentsData.totalFees;
      document.querySelector('#amount').value=paymentsData.totalFees;
      row5.cells[1].innerText = "Paid";
      if(row5.cells[1].innerText == "Paid"){
        row5.cells[1].classList.add("bg-success");
      }else{
        row5.cells[1].classList.add("bg-danger");
      }
      document.getElementById("totalPaymentAcademy").innerHTML = `Total payment for this competition: ${paymentsData.totalFees}`;
      document.getElementById("gif").style.display = "none";
    })
    .catch((error) => {
      console.log(error);
      document.getElementById("gif").style.display = "none";
    });
}

getPaymentData();

function previewImage(event) {
    const input = event.target;
    const imgPreview = document.getElementById("imgPreview");
     if (input.files && input.files[0]) {
        const reader = new FileReader();
         reader.onload = function (e) {
            imgPreview.src = e.target.result;
            imgPreview.style.display = "block";
        };
         reader.readAsDataURL(input.files[0]);
    } else {
        imgPreview.src = "";
        imgPreview.style.display = "none";
    }
}

async function creatDropIn(e) {// Step two: create a dropin instance using that container (or a string
    //   that functions as a query selector such as '#dropin-container')
    e.preventDefault()
    let authorization
    await fetch(`${domainName}/sts/payment/clienttoken`, {
         method: "GET",
     }).then(response=>response.json()).then(response=>{
         authorization=response
     })
     
     console.log(authorization)
    
    const form = document.getElementById('payment-form');

    braintree.dropin.create({
    authorization,
    container: '#dropin-container'
    }).then((dropinInstance) => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        dropinInstance.requestPaymentMethod().then((payload) => {
        // Step four: when the user is ready to complete their
        //   transaction, use the dropinInstance to get a payment
        //   method nonce for the user's selected payment method, then add
        //   it a the hidden field before submitting the complete form to
        //   a server-side integration
        document.getElementById('nonce').value = payload.nonce;
        form.submit();
        }).catch((error) => { throw error; });
    });
    }).catch((error) => {
    // handle errors
    });

}