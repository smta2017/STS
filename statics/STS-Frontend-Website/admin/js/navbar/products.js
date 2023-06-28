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

var countries=[]
var allCountries=[]
async function getAllCountries() {
    countries = await fetch(`${domainName}/sts/country/all`, {
        method: 'GET',
        headers: { 'Authorization': token },
    }).then(data => data.json())
    countries = countries.data
    allCountries = allCountries.concat(countries)
    return countries
}


getAllCountries().then(
    countries => {
        var allCountry = document.querySelector('.selectCountry');
        allCountry.innerHTML = "";
        const chooseOption = document.createElement('option');
        chooseOption.value = "-1";
        chooseOption.disabled = true;
        chooseOption.selected = true;
        chooseOption.textContent = "Select Country";
        allCountry.appendChild(chooseOption);
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country._id;
            option.textContent = country.countryName;
            allCountry.appendChild(option);
        });

        allCountry.addEventListener('change', handelListOfRemainingCountries)
    }
).then(getAllCountriesToShowShop);

function toggleButtonVisibility() {
    const priceInputs = [...document.querySelectorAll('.productPrice'), ...document.querySelectorAll('.selectCountry')]
    if (priceInputs.find(input => (input.value < 0 || input.value == '')) || countries.length < 1) {
        document.querySelector(".btn.btn-dark").style.display = 'none'
    } else {
        document.querySelector(".btn.btn-dark").style.display = 'block'
    }
}
function handelListOfRemainingCountries() {
    let hiddenInput = this.parentElement.parentElement.querySelector('input[type=hidden]')
    console.log(hiddenInput.value)
    let hiddenObjectKeys
    if (hiddenInput.value != '') {
        hiddenObjectKeys = hiddenInput.value.split('_')
        countries.push({ _id: hiddenObjectKeys[0], countryName: hiddenObjectKeys[1] })
    }
    const i = countries.findIndex(country => country._id == this.value)
    const selectedCountry = countries[i]
    if (i >= 0) { countries.splice(i, 1) }

    document.querySelectorAll('.selectCountry').forEach(select => {
        if (select != this) {
            for (var i = 0; i < select.length; i++) {
                if (select.options[i].value == this.value)
                    select.remove(i);
            }
            if (hiddenObjectKeys) {
                const option = document.createElement('option')
                option.setAttribute('value', hiddenObjectKeys[0])
                option.innerHTML = hiddenObjectKeys[1]
                select.appendChild(option)
            }
        }
    })
    hiddenInput.value = selectedCountry._id + '_' + selectedCountry.countryName
}
async function generateInput() {
    const parentDiv = document.getElementById('container');
    const div = document.createElement('div');
    const selectDiv = document.createElement('div');
    const inputDiv = document.createElement('div');
    const buttonDiv = document.createElement('div');
    const select = document.createElement('select');
    const input = document.createElement('input');
    const button = document.createElement('button');
    const hiddenInput = document.createElement('input');
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
        option.value = country._id;
        option.textContent = country.countryName;
        select.appendChild(option);
    });

    select.className = "form-select border border-warning fs-5 selectCountry";
    select.addEventListener('change', handelListOfRemainingCountries)
    select.addEventListener('change', toggleButtonVisibility)
    selectDiv.appendChild(select);
    selectDiv.className = "col-6";

    input.className = "form-control rounded-3 border border-warning p-2 fs-5 productPrice";
    input.name = "productPrice";
    input.type = 'number';
    input.placeholder = "Product Price";
    input.addEventListener('change', toggleButtonVisibility)
    inputDiv.appendChild(input);
    inputDiv.className = "col-4";

    button.innerHTML = '-';
    button.className = "btn btn-dark";
    button.addEventListener('click', removeInput);
    buttonDiv.appendChild(button);
    buttonDiv.className = "col-2";

    hiddenInput.type = 'hidden'


    div.appendChild(selectDiv);
    div.appendChild(inputDiv);
    div.appendChild(buttonDiv);
    div.appendChild(hiddenInput);
    div.className = "row my-3 price_object added_object";

    parentDiv.appendChild(div);


    document.querySelector(".btn.btn-dark").style.display = 'none'
    return div
}

function removeInput() {
    const divToRemove = this.parentNode.parentNode;
    const hiddenValue = this.parentElement.parentElement.querySelector('input[type=hidden]').value
    let hiddenObjectKeys
    if (hiddenValue != '') {
        hiddenObjectKeys = hiddenValue.split('_')
        countries.push({ _id: hiddenObjectKeys[0], countryName: hiddenObjectKeys[1] })
    }
    document.querySelectorAll('.selectCountry').forEach(select => {
        if (select != this.parentNode.parentNode.querySelector('select')) {
            for (var i = 0; i < select.length; i++) {
                if (select.options[i].value == this.value)
                    select.remove(i);
            }
            if (hiddenObjectKeys) {
                const option = document.createElement('option')
                option.setAttribute('value', hiddenObjectKeys[0])
                option.innerHTML = hiddenObjectKeys[1]
                select.appendChild(option)
            }
        }
    })
    divToRemove.parentNode.removeChild(divToRemove);
    toggleButtonVisibility()
}

///////////////////////////////////////////////////////////////
function getAllCountriesToShowShop() {
    var allCountry = document.querySelector('#selectCountryShowShop');
    allCountry.innerHTML = "";
    const chooseOption = document.createElement('option');
    chooseOption.value = "-1";
    chooseOption.disabled = true;
    chooseOption.selected = true;
    chooseOption.textContent = "Select Country";
    allCountry.appendChild(chooseOption);
    allCountries.forEach(countries => {
        const option = document.createElement('option');
        option.value = countries._id;
        option.textContent = countries.countryName;
        allCountry.appendChild(option);
    });
   
}


var idContryForDelet;
var productsData;
document.querySelector('#selectCountryShowShop').addEventListener('change',function(){
    setCookie('shopCountry',this.value)
})
function getProductsData() {
    var id = getCookie('shopCountry')
    var productContainer = document.getElementById("AddProducts");
   if(id){ 
    document.getElementById("gif").style.display ="block"
    fetch(`${domainName}/sts/product/foradmin/${id}`, {
        method: 'GET',
        headers: { 'Authorization': token },
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
                      </div>
                      <div class="btn_group mx-auto mb-2">
                        <button class="btn btn-success" id="add-row" onclick="editProducts('${products._id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="edit-btn bi bi-pen-fill" viewBox="0 0 16 16" s>
                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                            </svg>
                        </button>
                        <button class="btn btn-danger" id="remove-row" onclick="deleteProducts('${products._id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="delete-btn bi bi-trash-fill delete" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>
                      </div>
                    </div>
                `;

                products.prices.forEach(price => {
                    const countryname = allCountries.find(country => country._id == price.country).countryName
                    element.querySelector('.card-body').innerHTML += `
                    <div class="clearfix mb-3 d-flex justify-content-center">
                    <span class="float-start badge rounded-pill bg-success" id="priseshop">in ${countryname}</span>
                            <span class="float-start badge rounded-pill bg-success" id="priseshop">${price.price}</span>
                            </div>`
                })
                productContainer.appendChild(element);
            });
            document.getElementById("gif").style.display = "none";
        })
        .catch(error => {
            console.log(error);
            document.getElementById("gif").style.display = "none";
          }); 

    }
}


var allCountryShow = document.querySelector('#selectCountryShowShop');
allCountryShow.addEventListener('change', getProductsData);

function editProducts(id) {
    var myProducts = productsData.find(Productss => { return Productss._id == id })
    document.getElementById("productsId").value = myProducts._id;
    document.querySelector('#ProductName').value = myProducts.name;
    countries = allCountries
    const thisProductCounries = myProducts.prices.map(price => price.country)
    countries = countries.filter(country => !thisProductCounries.includes(country._id))
    const countryAddedSections = [...document.getElementById('container').querySelectorAll('.added_object')]
    countryAddedSections.forEach(section => { section.remove() })

    let basicCountryselect = document.querySelector('.price_object select')
    basicCountryselect.innerHTML = "";
    const chooseOption = document.createElement('option');
    chooseOption.value = "-1";
    chooseOption.disabled = true;
    chooseOption.textContent = "Select Country";
    basicCountryselect.appendChild(chooseOption);

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country._id;
        option.textContent = country.countryName;
        basicCountryselect.appendChild(option);
    });
    const thisSelectSelectedOption = allCountries.find(country => country._id == myProducts.prices[0].country)
    const option = document.createElement('option');
    option.value = thisSelectSelectedOption._id;
    option.textContent = thisSelectSelectedOption.countryName;
    option.selected = true
    basicCountryselect.appendChild(option);
    document.querySelector('.price_object input[type=number]').value = myProducts.prices[0].price
    document.querySelector('.price_object input[type=hidden]').value = thisSelectSelectedOption._id + '_' + thisSelectSelectedOption.countryName
    // Update country elements
    myProducts.prices.forEach((price, i) => {
        if (i > 0) {
            const thisSelectSelectedOption = allCountries.find(country => country._id == price.country)
            const option = document.createElement('option');
            option.value = thisSelectSelectedOption._id;
            option.textContent = thisSelectSelectedOption.countryName;
            option.selected = true
            const myNewDiv = generateInput().then(
                div => {
                    div.querySelector('input[type=hidden]').value = thisSelectSelectedOption._id + '_' + thisSelectSelectedOption.countryName
                    div.querySelector('select').appendChild(option);
                    div.querySelector('input[type=number]').value = myProducts.prices[i].price
                }
            )

        }
    })
    document.querySelector('#imgPreview').src = myProducts.photo
    document.querySelector('#imgPreview').style.display = 'block'
    if (countries.length > 0) { document.querySelector(".btn.btn-dark").style.display = 'block' }
}

function changeProducts(e) {
    e.preventDefault();
    let id = document.getElementById("productsId").value;

    const productName = document.querySelector('#ProductName').value;
    const prices = [...document.querySelectorAll('.price_object')].map(section => {
        return { country: section.querySelector('select').value, price: section.querySelector('input[type=number').value }
    })

    const imageData = document.querySelector('#uploadImgProduct').files[0]

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('prices', JSON.stringify(prices));
    if(document.querySelector('#uploadImgProduct').files[0]){formData.append('photo', imageData)};

    if (id) {
        try {
            document.getElementById("gif").style.display ="block"
            fetch(`${domainName}/sts/product/${id}`, {
                method: 'PUT',
                headers: { 'Authorization': token },
                body: formData,
            }).then(response => response.json())
                .then(response => {
                    if (response.apiStatus == true) {
                        console.log("congrats, you updated products data successfully");
                        document.getElementById("productsId").value = "";
                        document.getElementById("ProductName").value = "";
                        document.getElementById("uploadImgProduct").value = "";
                        document.getElementById("imgPreview").style.display = "none";
                        document.querySelector('#selectCountry').value = -1;
                        document.querySelector('#ProductPrice').value = "";
                        document.querySelector('#hidden-value').value = "";
                        console.log([...document.querySelectorAll('.added_object')]);
                        [...document.querySelectorAll('.added_object')].forEach(section=>section.querySelector('.btn-dark').click())
                        getProductsData();
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
    } else {
        try {
            document.getElementById("gif").style.display ="block"
            fetch(`${domainName}/sts/product`, {
                method: 'POST',
                headers: { 'Authorization': token },
                body: formData,
            }).then(response => response.json())
                .then(response => {
                    if (response.apiStatus == true) {
                        console.log("congrats, you updated products data successfully");
                        document.getElementById("productsId").value = "";
                        document.getElementById("ProductName").value = "";
                        document.getElementById("uploadImgProduct").value = "";
                        document.getElementById("imgPreview").style.display = "none";
                        document.querySelector('#selectCountry').value = -1;
                        document.querySelector('#ProductPrice').value = "";
                        document.querySelector('#hidden-value').value = "";
                        console.log(document.querySelectorAll('.added_object'));
                        [...document.querySelectorAll('.added_object')].forEach(section=> section.querySelector('.btn-dark').click())

                        getProductsData();
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
}

function deleteProducts(id) {
    if (id) {
        try {
            document.getElementById("gif").style.display ="block"
            fetch(`${domainName}/sts/product/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': token },
            })
                .then(response => {
                    if (response.status == 200) {
                        console.log("Product data deleted successfully");
                        getProductsData();
                    } else {
                        throw new Error('Request failed.');
                    }
                    document.getElementById("gif").style.display = "none";
                    response.json().then(data => {
                        responseAlert(data);
                    });
                })
                .catch(error => {
                    console.log(error);
                    document.getElementById("gif").style.display = "none";
                    error.json().then(data => {
                        responseAlert(data);
                      });
                }); 
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("No Products ID provided");
    }
}


function clearData(){
    document.getElementById("productsId").value = '';
    document.querySelector('#imgPreview').src = '';
    document.querySelector('#imgPreview').style.display = 'none'
}