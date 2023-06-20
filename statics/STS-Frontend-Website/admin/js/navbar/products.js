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

let counter = 1;

function getAllCountries() {
    var allCountry = document.querySelector('#selectCountry');
    fetch(`${domainName}/sts/country/all`, {
        method: 'GET',
        headers: {'Authorization': token},
    })
        .then(response => response.json())
        .then(data => {
            allCountry.innerHTML = "";
            const chooseOption = document.createElement('option');
            chooseOption.value = "-1";
            chooseOption.disabled = true;
            chooseOption.selected = true;
            chooseOption.textContent = "Select Country";
            allCountry.appendChild(chooseOption);
            data.data.forEach(countries => {
                const option = document.createElement('option');
                option.id = countries._id;
                option.value = countries._id;
                option.textContent = countries.countryName;
                allCountry.appendChild(option);
            });
            document.getElementById("gif").style.display = "none";
        })
        .catch(error => console.log(error));
}

getAllCountries();

function toggleButtonVisibility() {
    const productPriceInput = document.getElementById("ProductPrice");
    const selectCountryInput = document.getElementById("selectCountry");
    const addButton = document.querySelector(".btn.btn-dark");
    addButton.style.display = productPriceInput.value != "" && selectCountryInput.value != "" && selectCountryInput.value != -1 ? "block" : "none";
}

async function generateInput() {
    var countries ;
    // debugger;
    await fetch(`${domainName}/sts/country/all`, {
        method: 'GET',
        headers: {'Authorization': token},
    })
    .then(response => response.json())
    .then(data => {
        countries = data.data
    })
    .catch(error => console.log(error));

    console.log(countries)

const parentDiv = document.getElementById('container');
const div = document.createElement('div');
const selectDiv = document.createElement('div');
const inputDiv = document.createElement('div');
const buttonDiv = document.createElement('div');
const select = document.createElement('select');
const input = document.createElement('input');
const button = document.createElement('button');

div.id = 'inputDiv' + counter;
div.className = "row my-3";
selectDiv.className = "col-6";
selectDiv.appendChild(select);

inputDiv.className = "col-4";
inputDiv.appendChild(input);

buttonDiv.className = "col-2";
buttonDiv.appendChild(button);

select.className = "form-select border border-warning fs-5 country";
select.id = "selectCountry" + counter;

input.className = "form-control rounded-3 border border-warning p-2 fs-5";
input.name = "ProductPrice";
input.type = 'number';
input.id = "ProductPrice" + counter;
input.placeholder = "Product Price";

button.innerHTML = '-';
button.className = "btn btn-dark";
button.addEventListener('click', removeInput);

div.appendChild(selectDiv);
div.appendChild(inputDiv);
div.appendChild(buttonDiv);

parentDiv.appendChild(div);

  // Set country options and selected country
select.innerHTML = "";
const chooseOption = document.createElement('option');
chooseOption.value = "-1";
chooseOption.disabled = true;
chooseOption.selected = true;
chooseOption.textContent = "Select Country";
select.appendChild(chooseOption);

countries.forEach(country => {
    const option = document.createElement('option');
    option.id = country._id;
    option.value = country._id;
    option.textContent = country.countryName;
    select.appendChild(option);
});

counter++;
getAllCountries();

}

function removeInput() {
    const divToRemove = this.parentNode.parentNode;
    divToRemove.parentNode.removeChild(divToRemove);
}

///////////////////////////////////////////////////////////////
function getAllCountriesToShowShop() {
    var allCountry = document.querySelector('#selectCountryShowShop');
    document.getElementById("gif").style.display = "block";
    fetch(`${domainName}/sts/country/all`, {
        method: 'GET',
        headers: {'Authorization': token},
    })
        .then(response => response.json())
        .then(data => {
            allCountry.innerHTML = "";
            const chooseOption = document.createElement('option');
            chooseOption.value = "-1";
            chooseOption.disabled = true;
            chooseOption.selected = true;
            chooseOption.textContent = "Select Country";
            allCountry.appendChild(chooseOption);
            data.data.forEach(countries => {
                const option = document.createElement('option');
                option.id = countries._id;
                option.value = countries._id;
                option.textContent = countries.countryName;
                allCountry.appendChild(option);
            });
            document.getElementById("gif").style.display = "none";
        })
        .catch(error => console.log(error));
}

getAllCountriesToShowShop();

var idContryForDelet ;
var productsData;
function getProductsData(event) {
    var id = event.target.value;
    var idContryForDelet = event.target.value;
    var productContainer = document.getElementById("AddProducts");
    fetch(`${domainName}/sts/product/${id}`, {
        method: 'GET',
        headers: {'Authorization': token},
    })
        .then(response => response.json())
        .then(data => {
            productsData = data.data;
            productContainer.innerHTML = "";
            data.data.forEach(products => {
                const element = document.createElement('div');
                element.className = "col-12 col-sm-6 col-md-4 col-lg-3"
                element.innerHTML = `
                    <div class="card h-100 shadow-sm bg-dark" id="products_${products._id}"> 
                      <img src="${domainName}/${products.photo}" class="card-img-top" alt="...">
                        <div class="label-top shadow-sm text-center mx-auto" id="titleshop">${products.name}</div>
                      <div class="card-body">
                        <div class="clearfix mb-3 d-flex justify-content-center">
                          <span class="float-start badge rounded-pill bg-success" id="priseshop">${products.prices[0].price}</span>
                        </div>
                      </div>
                      <div class="btn_group mx-auto my-2">
                        <button class="btn btn-success" id="add-row" onclick="editProducts('${products._id}')">
                            <i class="edit-btn fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="btn btn-danger" id="remove-row" onclick="deleteProducts('${products._id}')">
                            <i class="delete-btn fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                `;
                productContainer.appendChild(element);
            });
        })
        .catch(error => console.log(error));
}


var allCountryShow = document.querySelector('#selectCountryShowShop');
allCountryShow.addEventListener('change', getProductsData);

function editProducts(id) {
    var myProducts = productsData.find(Productss => { return Productss._id == id })
    document.getElementById("productsId").value = myProducts._id;
    document.querySelector('#ProductName').value = myProducts.name;

    // Update country elements
    const countryElements = document.querySelectorAll('.country');
    myProducts.prices.forEach((price, index) => {
        if (countryElements[index]) {
        countryElements[index].value = price.country;
        }
    });

    // Update product price elements
    const productPrices = document.querySelectorAll('[name="ProductPrice"]');
    myProducts.prices.forEach((price, index) => {
        if (productPrices[index]) {
        productPrices[index].value = price.price;
        }
    });

    document.getElementById("uploadImgProduct").value = myProducts.photo;
}

function changeProducts(e) {
  e.preventDefault();
  let id = document.getElementById("productsId").value;
  
  const productName = document.querySelector('#ProductName').value;
  const countryElements = document.querySelectorAll('.country');
  const productPrices = document.querySelectorAll('[name="ProductPrice"]');

  const countryData = Array.from(countryElements).map(element => ({
    countryId: element.value,
    countryName: element.selectedOptions[0].textContent
  }));

  const pricesData = Array.from(productPrices).map((element, index) => ({
    country: countryData[index].countryId,
    price: element.value
  }));

  const imageData = document.querySelector('#uploadImgProduct').files[0];

  const formData = new FormData();
  formData.append('name', productName);
  formData.append('prices', JSON.stringify(pricesData));
  formData.append('photo', imageData);
  console.log(JSON.stringify(pricesData));

  if (id) {
      try {
          fetch(`${domainName}/sts/product/${id}`, {
              method: 'PUT',
              headers: {'Authorization': token},
              body: formData,
          })
              .then(response => {
                  if (response.ok) {
                      console.log("congrats, you updated products data successfully");
                      document.getElementById("productsId").value = "";
                      document.getElementById("ProductName").value = "";
                      document.querySelectorAll('.country').value = "";
                      document.querySelectorAll('[name="ProductPrice"]').value = "";
                      document.getElementById("uploadImgProduct").value = "";
                      document.getElementById("imgPreview").style.display = "none";
                      getProductsData();
                  } else {
                      throw new Error('Request failed.');
                  }
              })
              .catch(error => console.error(error));
      } catch (error) {
          console.log(error);
      }
  } else {
      try {
          fetch(`${domainName}/sts/product`, {
              method: 'POST',
              headers: {'Authorization': token},
              body: formData,
          })
              .then(response => {
                  if (response.ok) {
                    console.log(response);
                      console.log("Product added successfully");
                      document.getElementById("ProductName").value = "";
                      document.querySelectorAll('.country').value = "";
                      document.querySelectorAll('[name="ProductPrice"]').value = "";
                      document.getElementById("uploadImgProduct").value = "";
                      document.getElementById("imgPreview").style.display = "none";
                      getProductsData(); 
                  } else { 
                      throw new Error('Request failed.'); 
                  } 
              }) 
              .catch(error => console.error(error)); 
      } catch (error) { 
          console.log(error); 
      } 
  } 
} 

function deleteProducts(id) {
  if (id) {
      try {
          fetch(`${domainName}/sts/product/${id}`, {
              method: 'DELETE',
              headers: {'Authorization': token},
          })
              .then(response => {
                  if (response.ok) {
                    debugger
                      console.log("Product data deleted successfully");
                      getProductsData(idContryForDelet);
                  } else {
                      throw new Error('Request failed.');
                  }
              })
              .catch(error => console.error(error));
      } catch (error) {
          console.log(error);
      }
  } else {
      console.log("No Products ID provided");
  }
}
