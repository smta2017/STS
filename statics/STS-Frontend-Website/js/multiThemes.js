function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
}
var UserName = getCookie('schoolName');
var welcome = document.getElementById("UserName");
welcome.innerHTML =  `Welcome ${UserName}`;

var cardRed = document.querySelector('#cardRed');
var cardGreen = document.querySelector('#cardGreen');
var cardBlue = document.querySelector('#cardBlue');
var cardBlack = document.querySelector('#cardBlack');

var header = document.querySelector('#header');
var footer = document.querySelector('#footer');

var title = document.querySelector('.title');
var subtitle = document.querySelector('.subtitle');
var headImg = document.querySelector('#headImg');

var Dtitle = document.querySelector('.Dtitle');
var Dbtn = document.querySelector('.Dbtn');
var Dimg = document.querySelector('.Dimg');

var Mtitle = document.querySelector('.Mtitle');
var Mbtn = document.querySelector('.Mbtn');
var Mimg = document.querySelector('.Mimg');

var Stitle = document.querySelector('.Stitle');
var Sbtn = document.querySelector('.Sbtn');
var Simg = document.querySelector('.Simg');

var compatatorsName = document.querySelector('#compatatorsName');
var categoryLabel = document.querySelector('#labelCategory');

var teachersName = document.querySelector('#teachersName');
var fullStatementName = document.querySelector('#fullStatement');
var summaryStatementName = document.querySelector('#summaryStatement');


var compatators = document.createElement("select");
compatators.id = "category";
// compatators.disabled = true;
compatators.name = "category";
compatators.value = "category";
compatators.className = "form-select";
compatators.ariaLabel = "category";
compatators.required = true;
var option1 = document.createElement("option");
option1.value = "-1";
option1.text = "Category";
option1.hidden = true;
compatators.add(option1);
var option2 = document.createElement("option");
option2.value = "dancer";
option2.name = "dancer";
option2.text = "dancer";
compatators.add(option2);
var option3 = document.createElement("option");
option3.value = "singer";
option3.name = "singer";
option3.text = "singer";
compatators.add(option3);
var option4 = document.createElement("option");
option4.value = "musician";
option4.name = "musician";
option4.text = "musician";
compatators.add(option4);

if (categoryLabel) {
  var select = categoryLabel.parentNode;
  select.insertBefore(compatators, categoryLabel.nextSibling);
}

function categorySelect(theme){
  option2.hidden = false;
  option3.hidden = false;
  option4.hidden = false;
  if(theme === 'theme821919' ){
    compatators.value = "dancer";
    compatators.name = "dancer";
    compatators.disabled = true;
    option2.selected = true;
    option3.hidden = true;
    option4.hidden = true;
  } else if (theme === 'theme104b28' ){
    compatators.value = "musician";
    compatators.name = "musician";
    compatators.disabled = true;
    option2.hidden = true;
    option3.hidden = true;
    option4.selected = true;
  } else if (theme === 'theme17547f' ){
    compatators.value = "singer";
    compatators.name = "singer";
    compatators.disabled = true;
    option2.hidden = true;
    option3.selected = true;
    option4.hidden = true;
  } else {
    if (compatators.options.length < 5) {
      compatators.value="category";
      compatators.disabled = false;
      option1.selected = true;
      var option5 = document.createElement("option");
      option5.value = "dancer";
      option5.name = "dancer";
      option5.text = "dancer";
      var option6 = document.createElement("option");
      option6.value = "singer";
      option6.name = "singer";
      option6.text = "singer";
      var option7 = document.createElement("option");
      option7.value = "musician";
      option7.name = "musician";
      option7.text = "musician";
    }
  }
}


// var webComponent = [
//   document.querySelector('.socialMediaF').style,
//   document.querySelector('.socialMediaY').style,
//   document.querySelector('.socialMediaI').style,
// ]

var themesCharctaristic = {
  theme821919: {
    element: document.querySelector('#cardRed'),
    bgColor: '#821919',
    socialMediaColor: '#821919',
    titleText: "DANCE IS THE HIDDEN LANGUAGE OF THE SOUL.",
    subtitleText: "Let's dance!",
    headImgSrc: `${domainName}/STS-Frontend-Website/images/WhatsApp Image 2023-05-21 at 21.28.01.jpeg`,
    compatatorsNameText: "Dancers List",
    fullStatementNameText: "Full Statement for Dancers",
    summaryStatementNameText: "Summary Statement for Dancers"
  },
  theme104b28: {
    element: document.querySelector('#cardGreen'),
    bgColor: '#104b28',
    socialMediaColor: '#104b28',
    titleText: "ART ISN'T WHAT YOU SEE, BUT WHAT YOU MAKE OTHERS SEE.",
    subtitleText: "Let's Music!",
    headImgSrc: `${domainName}/STS-Frontend-Website/images/WhatsApp Image 2023-05-21 at 21.27.53.jpeg`,
    compatatorsNameText: "Musicans List",
    fullStatementNameText: "Full Statement for Musicans",
    summaryStatementNameText: "Summary Statement for Musicans"
  },
  theme17547f: {
    element: document.querySelector('#cardBlue'),
    bgColor: '#17547f',
    socialMediaColor: '#17547f',
    titleText: "MUSIC IN THE SOUL CAN BE HEARD BY THE UNIVERSE.",
    subtitleText: "Let's Sing!",
    headImgSrc: `${domainName}/STS-Frontend-Website/images/WhatsApp Image 2023-05-21 at 21.28.08.jpeg`,
    compatatorsNameText: "Singers List",
    fullStatementNameText: "Full Statement for Singers",
    summaryStatementNameText: "Summary Statement for Singers"
  },
  theme110f16: {
    element: document.querySelector('#cardBlack'),
    bgColor: '#110f16',
    socialMediaColor: '#110f16',
    titleText: "SPECIAL TALENT STARS. DANCERS, SINGERS AND MUSICIANS",
    subtitleText: "Let's share with us!",
    headImgSrc: `${domainName}/STS-Frontend-Website/images/WhatsApp_Image_2023-05-14_at_14.34.50-removebg-preview.png`,
    compatatorsNameText: "List of all Compatators",
    fullStatementNameText: "Full Statement",
    summaryStatementNameText: "Summary Statement"
  }
}

var myCards = document.querySelectorAll(".colorCard");


function changeTheme(themeObj) {
  if (header) header.style.backgroundColor = themeObj.bgColor;
  if (footer) footer.style.backgroundColor = themeObj.bgColor;

  // webComponent.forEach((component) => {
  //   if (component) component.color = themeObj.bgColor;
  // });

  myCards.forEach((component) => {
    if (component && component.parentElement)
      component.parentElement.style.display = "block";
  });

  if (title) title.textContent = themeObj.titleText;
  if (subtitle) subtitle.textContent = themeObj.subtitleText;
  if (headImg) headImg.src = themeObj.headImgSrc;
  if (compatatorsName) compatatorsName.textContent = themeObj.compatatorsNameText;
  if (fullStatementName) fullStatementName.textContent = themeObj.fullStatementNameText;
  if (summaryStatementName) summaryStatementName.textContent = themeObj.summaryStatementNameText;
  if (themeObj.element && themeObj.element.parentElement)
    themeObj.element.parentElement.style.display = "none";

    const hash = window.location.hash;

    if(hash=="#compatators" || hash=="" ){
    getCompetitorsData("theme" + themeObj.bgColor.substring(1));
    }  
    if(hash=="#entries"){
      getEntriesData("theme" + themeObj.bgColor.substring(1));
      }
    // getCompetitorsData("theme" + themeObj.bgColor.substring(1));
    // getEntriesData("theme" + themeObj.bgColor.substring(1));

}

var theme ;
myCards.forEach(card => {
  card.addEventListener('click', function() {
    // window.location.reload();
    theme = this.style.backgroundColor;
    
    localStorage.setItem('theme', 'theme' + convertRgb(theme));
    // console.log(convertRgb(theme));
    changeTheme(themesCharctaristic['theme' + convertRgb(theme)]);
    categorySelect('theme' + convertRgb(theme));
  })
})


function convertRgb(rgb) {
  // This will choose the correct separator, if there is a "," in your value it will use a comma, otherwise, a separator will not be used.
  var separator = rgb.indexOf(",") > -1 ? "," : " ";

  // This will convert "rgb(r,g,b)" into [r,g,b] so we can use the "+" to convert them back to numbers before using toString 
  rgb = rgb.substr(4).split(")")[0].split(separator);

  // Here we will convert the decimal values to hexadecimal using toString(16)
  var r = (+rgb[0]).toString(16),
  g = (+rgb[1]).toString(16),
  b = (+rgb[2]).toString(16);

  // console.log(r);
  // console.log(g);
  // console.log(b);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  // The return value is a concatenation of "#" plus the rgb values which will give you your hex
  return r + g + b;
}

if (getCookie('showSchedule') == "true"){
  const schadualNav = document.getElementById("schadualNav");
    const elementDiv = document.createElement('div');
    elementDiv.innerHTML = `
      <button class="nav-link dropdown-toggle mx-auto" role="button"
        aria-expanded="false" style="background-color:transparent ; border:none">
        Schadual
      </button>
      <ul class="dropdown-menu text-center">
        <li><a class="dropdown-item" href="#fullSchadual" id="fullSchadual">Full Schadual</a></li>
        <li><a class="dropdown-item" href="#schadualBySchool" id="schadualBySchool">My Schadual</a></li>
      </ul>
    `;
    schadualNav.appendChild(elementDiv);
}

if (getCookie('showResults') == "true"){
  // <li><a class="dropdown-item" href="#fullResults" id="fullResults">Full Results</a></li>
  const resultsNav = document.getElementById("resultsNav");
    const elementDiv = document.createElement('div');
    elementDiv.innerHTML = `
      <button class="nav-link dropdown-toggle mx-auto" role="button"
        aria-expanded="false" style="background-color:transparent ; border:none">
        Results
      </button>
      <ul class="dropdown-menu text-center">
        <li><a class="dropdown-item" href="#academyResults" id="academyResults">My Results</a></li>
      </ul>
    `;
    resultsNav.appendChild(elementDiv);
}

// Add event listeners for hover and click
document.getElementById("joinedCompetitionDropDown").addEventListener("mouseenter", function () {
  this.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "true");
  this.querySelector(".dropdown-menu").classList.add("show");
});

document.getElementById("joinedCompetitionDropDown").addEventListener("mouseleave", function () {
  this.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
  this.querySelector(".dropdown-menu").classList.remove("show");
});


// Add event listeners for hover and click
document.getElementById("statementDropDown").addEventListener("mouseenter", function () {
  this.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "true");
  this.querySelector(".dropdown-menu").classList.add("show");
});

document.getElementById("statementDropDown").addEventListener("mouseleave", function () {
  this.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
  this.querySelector(".dropdown-menu").classList.remove("show");
});


// Add event listeners for hover and click
document.getElementById("schadualNav").addEventListener("mouseenter", function () {
  this.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "true");
  this.querySelector(".dropdown-menu").classList.add("show");
});

document.getElementById("schadualNav").addEventListener("mouseleave", function () {
  this.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
  this.querySelector(".dropdown-menu").classList.remove("show");
});


// Add event listeners for hover and click
document.getElementById("resultsNav").addEventListener("mouseenter", function () {
  this.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "true");
  this.querySelector(".dropdown-menu").classList.add("show");
});

document.getElementById("resultsNav").addEventListener("mouseleave", function () {
  this.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
  this.querySelector(".dropdown-menu").classList.remove("show");
});

// Add event listeners for hover and click
document.getElementById("accountDown").addEventListener("mouseenter", function () {
  this.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "true");
  this.querySelector(".dropdown-menu").classList.add("show");
});

document.getElementById("accountDown").addEventListener("mouseleave", function () {
  this.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
  this.querySelector(".dropdown-menu").classList.remove("show");
});