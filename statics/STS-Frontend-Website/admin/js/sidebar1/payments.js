function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
} 
var clickedInput;
var paymentsData;

function getPaymentData() {
  const type = getCookie("type");
  const year = getCookie("year");
  document.getElementById("competionName").innerHTML = `${type}-${year}`;
  
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
    headers: { Authorization: token },
  })
    .then((response) => response.json())
    .then((data) => {
      paymentsData = data.data;

      document.getElementById("schoolName").innerHTML = `${paymentsData.academyName} Academy`;
      document.getElementById("schoolNumber").innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-inbound-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM15.854.146a.5.5 0 0 1 0 .708L11.707 5H14.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v2.793L15.146.146a.5.5 0 0 1 .708 0z"/>
        </svg> ${paymentsData.academyOwnerNumber}`;
      document.getElementById("schoolEmail").innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
        </svg> ${paymentsData.academyOwnerMail}`;

      if(paymentsData.needToHaveALook == true){
        var span = document.createElement('span');
        span.className = "position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle";
        span.innerHTML = `<span class="visually-hidden">New alerts</span>`;
        var btn = document.getElementById("paidWay")
        btn.appendChild(span);
      }

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
      // var element = document.querySelector(".btn-outline-success");
      if(paymentsData.paid == true){
        row7.cells[1].innerText = "Paid";
        row7.cells[1].classList.add("bg-success");
        // element.classList.remove("btn-outline-success");
        // element.classList.add("btn-success");
       }else{
        row7.cells[1].innerText = "Not Paid";
        row7.cells[1].classList.add("bg-danger");
        // element.classList.remove("btn-success");
        // element.classList.add("btn-outline-success");
      }

      document.getElementById("gif").style.display = "none";
    })
    .catch((error) => {
      console.log(error);
      document.getElementById("gif").style.display = "none";
    });
}

getPaymentData();

var paymentsLogs;

function getPaymentLogs() {
   // Create the table element
    var table = document.createElement('table');
    // Create the table header
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    // Create the table header cells
    var th1 = document.createElement('th');
    th1.textContent = 'Amount Paid'; //ok
    var th2 = document.createElement('th');
    th2.textContent = 'Currency'; //ok
    var th3 = document.createElement('th');
    th3.textContent = 'Acceptance';
    var th4 = document.createElement('th');
    th4.textContent = 'Paid Date';  //ok date tany
    var th5 = document.createElement('th');
    th5.textContent = 'Paid Way'; // ok
    var th6 = document.createElement('th');
    th6.textContent = 'Recipt Payment'; // ok replace with 
    var th7 = document.createElement('th');
    th7.textContent = 'Submit';
    var th8 = document.createElement('th');
    th8.textContent = 'Transaction ID';
    var th9 = document.createElement('th');
    th9.textContent = 'Online Payment Date';
    var th10 = document.createElement('th');
    th10.textContent = 'Payer Used Account';

    // Append the table header cells to the table row
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    tr.appendChild(th6);
    tr.appendChild(th7);
    tr.appendChild(th8);
    tr.appendChild(th9);
    tr.appendChild(th10);
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
              var form = document.createElement('form');
              form.onsubmit = showPaymentsLogsToAccept_NotAccept;
              form.id = data._id;
              // Create the table data cells
              var td1 = document.createElement('td');
              if (!data.amount && !data.currency) {
                // var form1 = document.createElement('form');
                // form1.onsubmit = showPaymentsLogsToAccept_NotAccept;
                // form1.id = data._id;
                var input1 = document.createElement('input');
                input1.type = 'number';
                input1.id = `amount_${data._id}`;
                input1.name = "amount";
                input1.placeholder = "Amount Paid";
                input1.className = "form-control";
                input1.min = "1";
                form.appendChild(input1);
                td1.appendChild(form);
              } else {
                  td1.textContent = data.amount;
              }
              var td2 = document.createElement('td');
              if (!data.amount && !data.currency) {
                // var form2 = document.createElement('form');
                // form2.onsubmit = showPaymentsLogsToAccept_NotAccept;
                // form2.id = data._id;
                var select = document.createElement('select');
                  select.id = `currency_${data._id}`;
                  select.name = "currency";
                  select.className = "form-select";
                  form.appendChild(select);
                  td2.appendChild(form);
                  getAllCurrencies(select);
              } else {
                  td2.textContent = data.currency;
              }
              var td3 = document.createElement('td');
              if (!data.amount && !data.currency && !data.bankReceiptPaymentData.rejectionReason) {
                // var form3 = document.createElement('form');
                // form3.onsubmit = showPaymentsLogsToAccept_NotAccept;
                // form3.id = data._id;
  
                const acceptSelect = document.createElement("select");
                acceptSelect.name = "decision";
                acceptSelect.id = `decision_${data._id}`;
                acceptSelect.required = true;
                acceptSelect.className = "form-select";

                const acceptOption = document.createElement("option");
                acceptOption.value = "accepted";
                acceptOption.text = "Accepted";
                acceptSelect.appendChild(acceptOption);

                const refuseOption = document.createElement("option");
                refuseOption.value = "refused";
                refuseOption.text = "Refused";
                acceptSelect.appendChild(refuseOption);
          
                const reasonTextarea = document.createElement("textarea");
                reasonTextarea.id = `message_${data._id}`;
                reasonTextarea.name = "message";
                reasonTextarea.style.display = "none";
                reasonTextarea.className = "form-control";
                // Add event listener to show the textarea when refused radio is clicked
                acceptSelect.addEventListener('change', function() {
                  if (acceptSelect.value === "refused") {
                    reasonTextarea.style.display = 'block';
                    input1.style.display = 'none';
                    select.style.display = 'none';
                  } else {
                    reasonTextarea.style.display = 'none';
                    input1.style.display = 'block';
                    select.style.display = 'block';
                  }
                });

                form.appendChild(acceptSelect);
                form.appendChild(reasonTextarea);
                td3.appendChild(form);
              } else {
                  // Create a div to show the accepted or refused value
                  var div = document.createElement('div');
                  if(!data.amount && !data.currency && !data.bankReceiptPaymentData.rejectionReason){
                    div.textContent = 'Pending';
                    td3.appendChild(div);
                  }
                  if(data.amount && data.currency){
                    div.textContent = 'Accepted';
                    div.className= 'bg-success';
                    td3.appendChild(div);
                  }
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
                td1.textContent = '';
                td2.textContent = '';
                var div = document.createElement('div');   
                div.textContent = 'Refused';
                div.className= 'bg-danger';
                td3.appendChild(div);
                th7.textContent = "Message"
                td7.textContent = data.bankReceiptPaymentData.rejectionReason;
              }else if(!data.amount && !data.currency) {
                // var form7 = document.createElement('form');
                // form7.onsubmit = showPaymentsLogsToAccept_NotAccept;
                // form7.id = data._id;
                var submitInput = document.createElement('input');
                submitInput.type = 'submit';
                submitInput.id = `submit_${data._id}`;
                submitInput.className = 'btn btn-dark';
                submitInput.type = 'Submit';
                form.appendChild(submitInput);
                td7.appendChild(form);

                var div = document.createElement('div');   
                div.textContent = 'Pending';
                div.className = 'bg-warning';
                td3.appendChild(div);
              }

              var td8 = document.createElement('td');
              td8.textContent = '';

              var td9 = document.createElement('td');
              td9.textContent = '';

              var td10 = document.createElement('td');
              td10.textContent = '';
            }else{
              th7.textContent = 'Message';
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
              td7.textContent = '';
              var td8 = document.createElement('td');
              td8.textContent = data.onlinePaymentData.transactionID;
              var td9 = document.createElement('td');
              td9.textContent = data.onlinePaymentData.createdAt;
              var td10 = document.createElement('td');
              td10.textContent = data.onlinePaymentData.payerUsedAccount;
            }
              
              // Append the table data cells to the table row
              tr.appendChild(td1);
              tr.appendChild(td2);
              tr.appendChild(td3);
              tr.appendChild(td4);
              tr.appendChild(td5);
              tr.appendChild(td6);
              tr.appendChild(td7);
              tr.appendChild(td8);
              tr.appendChild(td9);
              tr.appendChild(td10);

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
    tableResponsive.innerHTML = '';
    // Append the table to the document body
    tableResponsive.appendChild(table); 
    // window.location.reload();
}

function getAllCurrencies(selectElement) {
    document.getElementById("gif").style.display ="block"
    fetch( `${domainName}/sts/allcurrencies`  , {
        method: 'GET',
        headers: {'Authorization': token},
    })
    .then(response => response.json())
    .then(data => {
        selectElement.innerHTML = "";
        const chooseOption = document.createElement('option');
        chooseOption.value = "-1";
        chooseOption.disabled = true;
        chooseOption.selected = true;
        chooseOption.textContent = "Select Currency";
        selectElement.appendChild(chooseOption);
        for (let key in data) {
            const option = document.createElement('option');
            option.value = data[key]; // Set the value as the currency key
            option.textContent = data[key];
            selectElement.appendChild(option);
        }
        document.getElementById("gif").style.display = "none";
    })
    .catch(error => {
        console.log(error);
        document.getElementById("gif").style.display = "none";
    }); 
}


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
getPaymentLogs();

function showPaymentsLogsToAccept_NotAccept(event) {
    event.preventDefault();
    
    const form = event.target;

    const message = document.querySelector(`#message_${form.id}`);
    const amount = document.querySelector(`#amount_${form.id}`);
    const currency = document.querySelector(`#currency_${form.id}`);
    const decision = document.querySelector(`#decision_${form.id}`);

    let formData = {};

    formData['decision'] = decision.value;
    if(decision.value === "refused"){
        formData['message'] = message.value;
    };
    if(decision.value === "accepted"){
        formData['amount'] = amount.value;
        formData['currency'] = currency.value;
    };

    document.getElementById("gif").style.display = "block";
    fetch( `${domainName}/sts/payment/bankreceipt/${form.id}`  , {
      method: "PUT",
      headers: {"Content-Type": "application/json" ,'Authorization': token },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
          if (data.apiStatus == true) {
              console.log("Data saved successfully");
              getPaymentLogs();
          }else {
            console.log('Error:', data.status);
          }
          document.getElementById("gif").style.display = "none";
          responseAlert(data);
      })
      .catch((error) => {
        console.log(error);
        document.getElementById("gif").style.display = "none";
        responseAlert(error);
      });
}


function paid_NotPaid(event) {
  event.preventDefault();

  clickedInput = event.target;
  const paid = clickedInput.value;

  let formData = {};

  formData['paid'] = paid;
  var id = getCookie("subscriptionId");

  document.getElementById("gif").style.display = "block";
  // const togglePaidElement = document.getElementById("togglePaid");

  // if (togglePaidElement) {
  //   togglePaidElement.style.display = "none";
  // }

  fetch( `${domainName}/sts/subscription/payments/${id}`  , {
    method: "PUT",
    headers: {"Content-Type": "application/json" ,'Authorization': token },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
        if (data.apiStatus == true) {
          console.log("Data saved successfully");
          getPaymentData();
          window.location.reload();
        // var element = document.querySelector(".btn-outline-success");
        // element.classList.remove("btn-outline-success");
        // element.classList.add("btn-success");
        }else {
          console.log('Error:', data.status);
        }
        document.getElementById("gif").style.display = "none";
        responseAlert(data);
    })
    .catch((error) => {
      console.log(error);
      document.getElementById("gif").style.display = "none";
      responseAlert(error);
    });
}