var headers = new Headers();
var token = getCookie('token');
headers.append('Authorization', token);

function getAllCountries() {
    var allCountry = document.querySelector('#selectCountryToShop');
    document.getElementById("gif").style.display = "block";
    fetch(`${domainName}/sts/country/all`, {
        method: 'GET',
        headers: headers
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

var productsData;
function getProductsData(event) {
    var id = event.target.value;
    var productContainer = document.getElementById("AddProducts");
    console.log(id);
    fetch(`${domainName}/sts/product/${id}`, {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then(data => {
            productsData = data.data;
            productContainer.innerHTML = "";
            data.data.forEach(products => {
                const element = document.createElement('div');
                element.className = "col-12 col-md-6 col-lg-3"
                element.innerHTML = `
                    <div class="card h-100 shadow-sm bg-dark" id="products_${products._id}"> 
                      <img src="${domainName}/${products.photo}" class="card-img-top" alt="...">
                        <div class="label-top shadow-sm text-center mx-auto" id="titleshop">${products.name}</div>
                      <div class="card-body">
                        <div class="clearfix mb-3 d-flex justify-content-center">
                          <span class="float-start badge rounded-pill bg-success" id="priseshop">${products.prices[0].price}</span>
                        </div>
                      </div>
                    </div>
                `;
                productContainer.appendChild(element);
            });
        })
        .catch(error => console.log(error));
}

var allCountry = document.querySelector('#selectCountryToShop');
allCountry.addEventListener('change', getProductsData);
