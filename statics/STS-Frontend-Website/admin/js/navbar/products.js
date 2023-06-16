var form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  sendDataToBackend();
}

function sendDataToBackend() {
    var productNameInput = document.querySelector("#ProductName");
    var priceInput = document.querySelector("#Price");
    var descriptionInput = document.querySelector("#productDiscrebtion");
    var imageInput = document.querySelector("#uploadImg");
  
    // Create an object with the form data
    var formData = {
      productName: productNameInput.value,
      price: priceInput.value,
      description: descriptionInput.value,
      image: imageInput.files[0], // Assuming only one file is selected
    };
  
    // Create a FormData object to send the file along with other form data
    var formDataToSend = new FormData();
    for (var key in formData) {
      formDataToSend.append(key, formData[key]);
    }
  
    // Send the form data to the backend using fetch
    fetch("YOUR_BACKEND_ENDPOINT", {
      method: "POST",
      body: formDataToSend,
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the backend if needed
        updatePageElements(data);
      })
      .catch(error => {
        console.error("Error sending data to backend:", error);
      });
}

function updatePageElements(data) {
    var titleElement = document.querySelector("#title");
    var priceElement = document.querySelector("#priseshop");
    var descriptionElement = document.querySelector("#descriptionshop");
    var imageElement = document.querySelector("#imgshop");

    // Update the elements with the received data
    titleElement.textContent = data.productName;
    priceElement.textContent = data.price;
    descriptionElement.textContent = data.description;
    imageElement.src = data.imageURL; // Assuming the backend returns the URL of the stored image
}
  