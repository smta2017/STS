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
    var row6 = document.getElementById("row6");
    var row7 = document.getElementById("row7");
  var id = getCookie("subscriptionId");
  document.getElementById("gif").style.display = "block";
  fetch(`${domainName}/sts/subscription/payments/${id}`  , {
    method: "GET",
    headers: { 'Authorization': token },
  })
    .then((response) => response.json())
    .then((data) => {
      paymentsData = data.data;
      row1.cells[1].innerText = paymentsData.adminstrationFeesDetails.total;
      row2.cells[1].innerText = paymentsData.memberShipFeesDetails.total;
      row3.cells[1].innerText = paymentsData.totalEntriesFees;
      row4.cells[1].innerText = paymentsData.totalFees;

      let totalCredit = paymentsData.totalCredit;
      let keys = Object.keys(totalCredit);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        row5.cells[1].innerText += totalCredit[key] + " " + key;
        if (i !== keys.length - 1) {
          row5.cells[1].innerText += " & ";
        }
      }

      row6.cells[1].innerText = paymentsData.remaining;

      if(paymentsData.paid == true){
        row7.cells[1].innerText = "Paid";
        row7.cells[1].classList.add("bg-success");
      }else{
        row7.cells[1].innerText = "Not Paid";
        row7.cells[1].classList.add("bg-danger");
      }
      document.querySelector('#amount').value = paymentsData.remaining;
      document.querySelector('#payment-form').action+='/'+getCookie('subscriptionId')
      // console.log(document.querySelector('#payment-form').action)
   
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

function uploadReciptBank(e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append('photo', document.querySelector('#uploadImgForbankReceipt').files[0]);

  var id = getCookie("subscriptionId");
  try {
      document.getElementById("gif").style.display ="block"
      fetch(`${domainName}/sts/payment/bankreceipt/${id}`, {
          method: "POST",
          headers: {'Authorization': token},
          body: formData,
      })
      .then(response => response.json())
          .then(response => {
              if (response.apiStatus == true) {
                  console.log("Data saved successfully");
                  document.getElementById("uploadImgForbankReceipt").value = "";
                  document.getElementById("imgPreview").style.display = "none";
                  getPaymentData();
              } else {
                  throw new Error('Request failed.');
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
}


async function creatDropIn(e) {// Step two: create a dropin instance using that container (or a string
    //   that functions as a query selector such as '#dropin-container')
   const checkoutBody={}
    e.preventDefault()
    let authorization
    await fetch(`${domainName}/sts/payment/clienttoken`, {
         method: "GET",
     }).then(response=>response.json()).then(response=>{
         authorization=response
     })
     
     console.log(authorization)
    
 
braintree.client.create({
  authorization
}).then(function (clientInstance) {
  // Creation of any other components...

  return braintree.dataCollector.create({
    client: clientInstance
  }).then(function (dataCollectorInstance) {
    // At this point, you should access the dataCollectorInstance.deviceData value and provide it
    // to your server, e.g. by injecting it into your form as a hidden input.
     checkoutBody.deviceData=dataCollectorInstance.deviceData
  });
}).catch(function (err) {
  // Handle error in creation of components
    console.log('Error:', err);
    responseAlert(err);
});
    

console.log(deviceData)
    braintree.dropin.create({
    authorization,
    paypal:{flow:'checkout',amount:document.querySelector('#amount').value.substring(0,document.querySelector('#amount').value.length-4),currency:document.querySelector('#amount').value.substring(document.querySelector('#amount').value.length-3)},
    container: '#dropin-container'
    }).then((dropinInstance) => {
      document.querySelector('#payment-form').querySelector('input[type=submit]').removeAttribute('disabled')
    document.querySelector('#payment-form').addEventListener('submit',(event) => {
        event.preventDefault();
        dropinInstance.requestPaymentMethod().then(async (payload) => {
          console.log(payload)
          checkoutBody.paymentMethodNonce= payload.nonce;
          checkoutBody.amount=document.querySelector('#amount').value.substring(0,document.querySelector('#amount').value.length-4)
        
        document.getElementById("gif").style.display = "block";
        await fetch(event.target.action, {
          method: 'POST',
          body: JSON.stringify(checkoutBody),
          headers:{ "Content-Type": "application/json" , 'Authorization': token}
      })
        }).then(response => {  
          if (response.apiStatus == true) {
              console.log('Payment Sent');
            } else {
              console.log('Error:', response.status);
            }
            document.getElementById("gif").style.display ="none"
            responseAlert(response);
          })
            .catch((error) => { throw error; });
    });
    }).catch((error) => {
    // handle errors
        console.log('Error:', error);
        document.getElementById("gif").style.display ="none"
        responseAlert(error);
    });

}

function getPaymentLogs() {
  // Create the table element
   var table = document.createElement('table');
   // Create the table header
   var thead = document.createElement('thead');
   var tr = document.createElement('tr');
   // Create the table header cells
   var th1 = document.createElement('th');
   th1.textContent = 'Amount Paid';
   th1.className = "bg-secondary text-light";
   var th2 = document.createElement('th');
   th2.textContent = 'Currency';
   th2.className = "bg-secondary text-light";
   var th3 = document.createElement('th');
   th3.textContent = 'Acceptance';
   th3.className = "bg-secondary text-light";
   var th4 = document.createElement('th');
   th4.textContent = 'Paid Date';
   th4.className = "bg-secondary text-light";
   var th5 = document.createElement('th');
   th5.textContent = 'Paid Way';
   th5.className = "bg-secondary text-light";
   var th6 = document.createElement('th');
   th6.textContent = 'Recipt Payment';
   th6.className = "bg-secondary text-light";
   var th7 = document.createElement('th');
   th7.textContent = 'Message';
   th7.className = "bg-secondary text-light";
   // Append the table header cells to the table row
   tr.appendChild(th1);
   tr.appendChild(th2);
   tr.appendChild(th3);
   tr.appendChild(th4);
   tr.appendChild(th5);
   tr.appendChild(th6);
   tr.appendChild(th7);
   // Append the table row to the table header
   thead.appendChild(tr);
   // Append the table header to the table
   table.appendChild(thead);
   // Create the table body
   var tbody = document.createElement('tbody');

   var id = getCookie("subscriptionId");
   // Fetch data from the backend
   document.getElementById("gif").style.display ="block"
   fetch(`${domainName}/sts/payment/${id}` , {
       method: "GET",
       headers: { 'Authorization': token },
   })
       .then((response) => response.json())
       .then((data) => {
           paymentsLogs = data.data;
           // Loop through the data and create table rows
           paymentsLogs.forEach(function(data) {
          if(data.paymentWay == "bankReceipt"){
            var tr = document.createElement('tr');
             // Create the table data cells
            var td1 = document.createElement('td');
            if (!data.amount && !data.currency) {
              td1.textContent = '';
            } else {
              td1.textContent = data.amount;
            }
            var td2 = document.createElement('td');
            if (!data.amount && !data.currency) {
                td2.textContent = '';
            } else {
                td2.textContent = data.currency;
            }
            var td3 = document.createElement('td');
            // Create a div to show the accepted or refused value
            var div = document.createElement('div');
            if (!data.amount && !data.currency && !data.bankReceiptPaymentData.rejectionReason) {
              div.textContent = 'Pending';
              div.className= 'bg-warning';
              td3.appendChild(div);
            } else if(data.bankReceiptPaymentData.rejectionReason){
                div.textContent = 'Refused';
                div.className= 'bg-danger';
                td3.appendChild(div);
            }else if(data.amount && data.currency && !data.bankReceiptPaymentData.rejectionReason){
              div.textContent = 'Accepted';
              div.className= 'bg-success';
              td3.appendChild(div);
            }

            var td4 = document.createElement('td');
            td4.textContent = data.date;

             var td5 = document.createElement('td');
             td5.textContent = data.paymentWay;

             var td6 = document.createElement('td');
             var img = document.createElement('img');
             img.src = `${domainName}/${data.bankReceiptPaymentData.photo}`;
             img.style.cursor = "pointer";
             img.className = "w-100";
             img.onclick = function() { showImagePreview(`${domainName}/${data.bankReceiptPaymentData.photo}`); }; 
             td6.appendChild(img);

             var td7 = document.createElement('td');
             if(!data.amount && !data.currency && data.bankReceiptPaymentData.rejectionReason){
               td7.textContent = data.bankReceiptPaymentData.rejectionReason;
             }else if(data.amount && data.currency && !data.bankReceiptPaymentData.rejectionReason) {
              td7.textContent = '';
             }

              // Append the table data cells to the table row
              tr.appendChild(td1);
              tr.appendChild(td2);
              tr.appendChild(td3);
              tr.appendChild(td4);
              tr.appendChild(td5);
              tr.appendChild(td6);
              tr.appendChild(td7);

           }else{
            //  th3.style.display = 'none';
            //  th5.style.display = 'none';
            //  th6.style.display = 'none';
            //  th7.style.display = 'none';
              var tr = document.createElement('tr');
              var td1 = document.createElement('td');
              td1.textContent = data.amount;

              var td2 = document.createElement('td');
              td2.textContent = data.currency;

              var td3 = document.createElement('td');
              var div = document.createElement('div');
              div.textContent = 'Accepted';
              div.className= 'bg-success';
              td3.appendChild(div);

              var td4 = document.createElement('td');
              td4.textContent = data.date;
             var td5 = document.createElement('td');
             td5.textContent = data.paymentWay;
             var td6 = document.createElement('td');
             td6.textContent = '';
             var td7 = document.createElement('td');
             td7.textContent = ''

             // Append the table data cells to the table row
             tr.appendChild(td1);
             tr.appendChild(td2);
             tr.appendChild(td3);
             tr.appendChild(td4);
             tr.appendChild(td5);
             tr.appendChild(td6);
             tr.appendChild(td7);
           }

             // Append the form to the table body
             tbody.appendChild(tr);

             // Append the table body to the table
             table.appendChild(tbody);
           });
         document.getElementById("gif").style.display = "none";
       })
       .catch(function(error) {
           console.log('Error:', error);
           document.getElementById("gif").style.display = "none";
       });

   var tableResponsive = document.getElementById("table-responsive");
   // Append the table to the document body
   tableResponsive.appendChild(table); 
}

getPaymentLogs();

function showImagePreview(imageUrl) {
  // Create a new image element
  var previewImage = new Image();
  previewImage.src = imageUrl;

  // Create a modal container to display the enlarged image
  var modal = document.createElement("div");
  modal.classList.add("image-preview-modal");

  // Create a close button
  var closeButton = document.createElement("span");
  closeButton.classList.add("close-button");
  closeButton.innerHTML = "×";
  closeButton.onclick = function() {
    document.body.removeChild(modal);
  };

  // Append the image and close button to the modal container
  modal.appendChild(previewImage);
  modal.appendChild(closeButton);

  // Create a download button container
  // var downloadContainer = document.createElement("div");
  // downloadContainer.classList.add("download-container");

  // // Create a download button
  // var downloadButton = document.createElement("button");
  // downloadButton.classList.add("download-button");
  // downloadButton.innerHTML = "Download Image";
  // downloadButton.onclick = function() {
  //   var a = document.createElement("a");
  //   a.href = imageUrl;
  //   a.download = "ReceiptPayments.jpg";
  //   a.click();
  // };

  // // Append the download button to the download container
  // downloadContainer.appendChild(downloadButton);

  // Append the download container after the modal container
  // previewImage.insertAdjacentElement("afterend", downloadContainer);

  // Append the modal container to the body
  document.body.appendChild(modal);
}