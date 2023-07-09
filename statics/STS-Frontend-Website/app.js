const domainName = "https://dashboard.render.com";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const renderhomeBeforeLogin = Handlebars.compile(document.getElementById("homeBeforeLogin-template").innerHTML);
const renderHome = Handlebars.compile(document.getElementById("home-template").innerHTML);
const renderInfo = Handlebars.compile(document.getElementById("info-template").innerHTML);
const renderShop = Handlebars.compile(document.getElementById("shop-template").innerHTML);
const renderContact = Handlebars.compile(document.getElementById("contact-template").innerHTML);
const renderSignup = Handlebars.compile(document.getElementById("signup-template").innerHTML);
const renderLogin = Handlebars.compile(document.getElementById("login-template").innerHTML);
const renderChoiceCompetition = Handlebars.compile(document.getElementById("choiceCompetition-template").innerHTML);
const renderhomeAfterLogin = Handlebars.compile(document.getElementById("homeAfterLogin-template").innerHTML);
const renderCompetitions = Handlebars.compile(document.getElementById("competitions-template").innerHTML);
const renderCompatators = Handlebars.compile(document.getElementById("compatators-template").innerHTML);
const renderEntries = Handlebars.compile(document.getElementById("entries-template").innerHTML);
const renderTeachers = Handlebars.compile(document.getElementById("teachers-template").innerHTML);
const renderFullStatement = Handlebars.compile(document.getElementById("fullStatement-template").innerHTML);
const renderSummaryStatement = Handlebars.compile(document.getElementById("summaryStatement-template").innerHTML);
const renderFullSchadual = Handlebars.compile(document.getElementById("fullSchadual-template").innerHTML);
const rendercAcademySchadual = Handlebars.compile(document.getElementById("academySchadual-template").innerHTML);
const renderPayment = Handlebars.compile(document.getElementById("payment-template").innerHTML);
const renderFullResult = Handlebars.compile(document.getElementById("fullResult-template").innerHTML);
const renderAcademyResult = Handlebars.compile(document.getElementById("academyResult-template").innerHTML);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// ADMIN ////////////////////////////////
///////////////////////////////////////////////////

const renderNavbar = Handlebars.compile(document.getElementById("navbar-template").innerHTML);
const renderAddingPositionA = Handlebars.compile(document.getElementById("addingPositionA-template").innerHTML);
const renderAddingEmployeeA = Handlebars.compile(document.getElementById("addingEmployeeA-template").innerHTML);
const renderCompetitionsA = Handlebars.compile(document.getElementById("competitionsA-template").innerHTML);
const renderNewsA = Handlebars.compile(document.getElementById("newsA-template").innerHTML);
const renderSponsersA = Handlebars.compile(document.getElementById("sponsersA-template").innerHTML);
const renderCountriesA = Handlebars.compile(document.getElementById("countriesA-template").innerHTML);
const renderProductsA = Handlebars.compile(document.getElementById("productsA-template").innerHTML);
const renderMessagesA = Handlebars.compile(document.getElementById("messagesA-template").innerHTML);
const renderAdventisersA = Handlebars.compile(document.getElementById("adventisersA-template").innerHTML);

///////////////////////////////////////

const renderSidebar = Handlebars.compile(document.getElementById("sidebar1-template").innerHTML);

const renderSchool = Handlebars.compile(document.getElementById("school-template").innerHTML);
const renderCompatatorsA = Handlebars.compile(document.getElementById("compatatorsA-template").innerHTML);
const renderEntersA = Handlebars.compile(document.getElementById("entersA-template").innerHTML);
const renderPaymentA = Handlebars.compile(document.getElementById("paymentA-template").innerHTML);

///////////////////////////////////////

const renderSidebar2 = Handlebars.compile(document.getElementById("sidebar2-template").innerHTML);

const renderCompatatorsAS = Handlebars.compile(document.getElementById("compatatorsAS-template").innerHTML);
const renderTeachersAS = Handlebars.compile(document.getElementById("teachersAS-template").innerHTML);
const renderEntriesAS = Handlebars.compile(document.getElementById("entriesAS-template").innerHTML);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// RULERS ////////////////////////////////

const renderNavbarR = Handlebars.compile(document.getElementById("navbarR-template").innerHTML);
const renderCompetitionsR = Handlebars.compile(document.getElementById("competitionsR-template").innerHTML);
const renderEntriesR = Handlebars.compile(document.getElementById("entriesR-template").innerHTML);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function renderContent(content, tagId) {
  const contentDiv = document.getElementById(tagId);
  contentDiv.innerHTML = content;
}
function load_js(path) {
  var script = document.createElement("script");
  script.src = `${domainName}/STS-Frontend-Website/${path}`;
  document.querySelector('#body').appendChild(script);
}
function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
}
function changeHashing(event) {
  event.preventDefault();
  window.location.hash = this.getAttribute("href");
}
function setCookie(name, value) {
    const expires=getCookie('expirationDate')?getCookie('expirationDate'):''
  document.cookie = name + "=" + value + ";" + expires ;
}
function HandleNavigation() {
  var token = getCookie("token");
  const competition = getCookie("subscriptionId");
  const admin = getCookie("admin");
  const ruler = getCookie("ruler");
  if (token) {
    if (admin) {
      renderContent(renderNavbar(), "body");
      load_js("admin/js/navbar.js");
      load_js("js/logout.js");
      handleNavigationAdmin1();
      if (["#addingPosition"].includes(window.location.hash)) {
        renderContent(renderAddingPositionA(), "content");
        load_js("admin/js/navbar/addingPosition.js");
      }
      if (["#addingEmployee"].includes(window.location.hash)) {
        renderContent(renderAddingEmployeeA(), "content");
        load_js("admin/js/navbar/addingEmployee.js");
      }
    } else if (ruler) {
      renderContent(renderNavbarR(), "body");
      load_js("admin/js/navbarR.js");
      load_js("js/logout.js");
      handleNavigationRuler();
    } else {
      if (competition) {
        renderContent(renderhomeAfterLogin(), "body");

        if (window.location.hash == "") {
          localStorage.setItem("theme", "theme110f16");
        }
        load_js("js/multiThemes.js");
        load_js("js/competitions.js");
        load_js('js/editProfileAcademy.js');
        load_js("js/logout.js");
        load_js("js/contactUs.js");
        handleNavigationAfter();
      } else {
        renderContent(renderChoiceCompetition(), "body");
        load_js("js/joinCompetition.js");
        load_js("js/logout.js");
      }
    }
  } else {
    const h = document.querySelector('#content') ? document.querySelector('#content').innerHTML : ''
    if (!["#news", "#sponsor", "#advertising"].includes(window.location.hash) || h == '') {
      renderContent(renderhomeBeforeLogin(), "body");
    }
    handleNavigationBefore();
  }
}

function handleNavigationBefore() {
  const hash = window.location.hash;
  load_js('js/sponsors.js');
  switch (hash) {
    case "#sliderNews":
      renderContent(renderHome(), "content");
      load_js('js/advertisers.js');
      load_js('js/news.js');
      break;
    case "#info":
      renderContent(renderInfo(), "content");
      break;
    case "#shop":
      renderContent(renderShop(), "content");
      load_js("js/products.js");
      break;
    case "#contact":
      renderContent(renderContact(), "content");
      load_js("js/contactUs.js");
      break;
    case "#signup":
      renderContent(renderSignup(), "content");
      load_js("js/signUp.js");
      break;
    case "#login":
      renderContent(renderLogin(), "content");
      load_js("js/login.js");
      break;
    case "#sponsor":
      if (document.querySelector('#content') && document.querySelector('#content').innerHTML == '') {
        renderContent(renderHome(), "content");
        // load_js("js/sponsors.js");
        load_js("js/advertisers.js");
        load_js("js/news.js");
      }
      break;
    case "#advertising":
      if (document.querySelector('#content').innerHTML == '') {
        renderContent(renderHome(), "content");
        // load_js("js/sponsors.js");
        load_js("js/advertisers.js");
        load_js("js/news.js");
      }
      break;
    case "#news":
      if (document.querySelector('#content').innerHTML == '') {
        renderContent(renderHome(), "content");
        // load_js("js/sponsors.js");
        load_js("js/advertisers.js");
        load_js("js/news.js");
      }
      break;
    default:
      renderContent(renderHome(), "content");
      load_js("js/advertisers.js");
      load_js("js/news.js");
      break;
  }
}

function handleNavigationAfter() {
  const hash = window.location.hash;
  if(document.querySelector('script[src="https://js.braintreegateway.com/web/dropin/1.38.1/js/dropin.min.js"]')){
    document.querySelector('script[src="https://js.braintreegateway.com/web/dropin/1.38.1/js/dropin.min.js"]').remove()
  }
  if(document.querySelector('script[src="https://js.braintreegateway.com/web/3.87.0/js/data-collector.min.js"]')){
    document.querySelector('script[src="https://js.braintreegateway.com/web/3.87.0/js/data-collector.min.js"]').remove()
  }
  if(document.querySelector('script[src="https://js.braintreegateway.com/web/3.87.0/js/client.min.js"]')){
    document.querySelector('script[src="https://js.braintreegateway.com/web/3.87.0/js/client.min.js"]').remove()
  }
  switch (hash) {
    case "#myProfile":
      // renderContent(renderCompetitions(),"content");
      load_js('js/editProfileAcademy.js');
      break;
    case "#compatators":
      renderContent(renderCompatators(), "content");
      load_js("js/compatators.js");
      // getCompetitorsData("theme" + themeObj.bgColor.substring(1));
    break
    case "#entries":
      renderContent(renderEntries(), "content");
      load_js("js/entries.js");
      break;
    case "#teachers":
      renderContent(renderTeachers(), "content");
      load_js("js/teachers.js");
      break;
    case "#fullStatement":
      renderContent(renderFullStatement(), "content");
      load_js("js/fullStatement.js");
      break;
    case "#summaryStatement":
      renderContent(renderSummaryStatement(), "content");
      load_js("js/summaryStatement.js");
      break;
    case "#fullSchadual":
      renderContent(renderFullSchadual(), "content");
      load_js("js/fullSchadual.js");
      break;
    case "#schadualBySchool":
      renderContent(rendercAcademySchadual(), "content");
      load_js("js/academySchadual.js");
      break;
    case "#payment":
      var script = document.createElement("script");
      script.src = `https://js.braintreegateway.com/web/dropin/1.38.1/js/dropin.min.js`;
      document.querySelector('head').appendChild(script);
      var script = document.createElement("script");
      script.src = `https://js.braintreegateway.com/web/3.87.0/js/client.min.js`;
      document.querySelector('head').appendChild(script);
      var script = document.createElement("script");
      script.src = `https://js.braintreegateway.com/web/3.87.0/js/data-collector.min.js`;
      document.querySelector('head').appendChild(script);
      renderContent(renderPayment(), "content");
      load_js("js/payment.js");
      break;
    case "#fullResults":
      renderContent(renderFullResult(), "content");
      load_js("js/fullResult.js");
      break;
    case "#academyResults":
      renderContent(renderAcademyResult(), "content");
      load_js("js/academyResult.js");
      break;
    default:
      renderContent(renderCompatators(), "content");
      load_js("js/compatators.js");
      break;
  }
}

///////////////////////////////////ADMIN//////////////////////////////////////

function handleNavigationAdmin1() {
  const hash = window.location.hash;

  // if
  // (hash === "#showCompetitionDetails") {
  //   handleNavigationAdmin2();
  // } else if (hash === "#schoolDetails") {
  //   handleNavigationAdmin3();
  // } else
  // {
  switch (hash) {
    // case "#logoback":
    //   renderContent(renderNavbar(),"body");
    //   load_js('admin/js/navbar.js');
    //   break;
    case "#competition":
      renderContent(renderCompetitionsA(), "content");
      load_js("admin/js/navbar/competitions.js");
      break;
    // case "#school":
    //   // handleNavigationAdmin2();
    //   break;
    case "#news":
      if (document.querySelector('#content').innerHTML == '') {
        renderContent(renderNewsA(), "content");
        load_js("admin/js/navbar/news.js");
      }
      break;
    case "#sponsor":
      if (document.querySelector('#content').innerHTML == '') {
        renderContent(renderSponsersA(), "content");
        load_js("admin/js/navbar/sponsers.js");
      }
      break;
    case "#country":
      renderContent(renderCountriesA(), "content");
      load_js("admin/js/navbar/countries.js");
      break;
    case "#prodect":
      renderContent(renderProductsA(), "content");
      load_js("admin/js/navbar/products.js");
      break;
    case "#messages":
      renderContent(renderMessagesA(), "content");
      load_js("admin/js/navbar/messages.js");
      break;
    case "#adventiser":
      if (document.querySelector('#content').innerHTML == '') {
        renderContent(renderAdventisersA(), "content");
        load_js("admin/js/navbar/adventisers.js");
      }
      break;
    case "#addAdmin":
      // renderContent(renderFullStatement(),"content");
      // load_js('js/fullStatement.js');
      break;
    case "#editProfile":
      // renderContent(renderSummaryStatement(),"content");
      // load_js('js/summaryStatement.js');
      break;
    // case "#showCompetitionDetails":
    //     handleNavigationAdmin2();
    //     break;
    // case "#schoolDetails":
    //     handleNavigationAdmin3();
    //     break;
    default:


      if (["#school", "#compatatorsA", "#entersA", "#paymentA"].includes(window.location.hash)) {
        handleNavigationAdmin2()
      } else if (["#compatatorsAS", "#teachersAS", "#entriesAS"].includes(window.location.hash)) {
        handleNavigationAdmin3()
      } else {
        renderContent(renderCompetitionsA(), "content");
        load_js("admin/js/navbar/competitions.js");
      }
      // load_js('admin/js/navbar.js');
      break;

  }
}
// }

function handleNavigationAdmin2() {
  const hash = window.location.hash;
  renderContent(renderSidebar(), "content");
  load_js("admin/js/sidebar1.js");
  switch (hash) {
    // case "#logoback":
    // renderContent(renderNavbar(),"body");
    // load_js('admin/js/navbar.js');
    // break;
    // case "#competition":
    //   renderContent(renderCompetitionsA(), "content");
    //   load_js("admin/js/navbar/competitions.js");
    //   break;
    case "#compatatorsAS":
      renderContent(renderSidebar2(), "content");
      load_js("admin/js/sidebar1.js");
      renderContent(renderCompatatorsAS(), "contentSchool");
      load_js("admin/js/sidebar2/compatatorsS.js");

      break;
    case "#school":
      renderContent(renderSchool(), "contentCompetition");
      load_js("admin/js/sidebar1/schools.js");
      break;
    case "#compatatorsA":
      renderContent(renderCompatatorsA(), "contentCompetition");
      load_js("admin/js/sidebar1/compatators.js");
      break;
    case "#entersA":
      renderContent(renderEntersA(), "contentCompetition");
      load_js("admin/js/sidebar1/entries.js");
      break;
    case "#paymentA":
      renderContent(renderPaymentA(), "contentCompetition");
      load_js("admin/js/sidebar1/payments.js");
      break;
    default:
      renderContent(renderSchool(), "contentCompetition");
      load_js("admin/js/sidebar1/schools.js");
      handleNavigationAdmin1()

      break;
  }

  // handleNavigationAdmin1();
}

function handleNavigationAdmin3() {


  const hash = window.location.hash;
  renderContent(renderSidebar2(), "content");
  load_js("admin/js/sidebar1.js");

  switch (hash) {
    // case "#schoolDetails":
    //   renderContent(renderSidebar2(),"body");
    //   load_js('admin/js/sidebar2.js');
    //   break;
    case "#compatatorsAS":
      renderContent(renderCompatatorsAS(), "contentSchool");
      load_js("admin/js/sidebar2/compatatorsS.js");
      break;
    case "#teachersAS":
      renderContent(renderTeachersAS(), "contentSchool");
      load_js("admin/js/sidebar2/teachersS.js");
      break;
    case "#entriesAS":
      renderContent(renderEntriesAS(), "contentSchool");
      load_js("admin/js/sidebar2/entriesS.js");
      break;
    default:
      renderContent(renderCompatatorsAS(), "contentSchool");
      load_js("admin/js/sidebar2/compatatorsS.js");
      handleNavigationAdmin1()
      handleNavigationAdmin2()
      break;
  }
}

///////////////////////////////////RULERS//////////////////////////////////////

function handleNavigationRuler() {
  const hash = window.location.hash;

  switch (hash) {
    case "#competition":
      renderContent(renderCompetitionsR(), "content");
      load_js("admin/js/rulers/compitetionsR.js");
      break;
    case "#showEntries":
      renderContent(renderEntriesR(), "content");
      load_js('admin/js/rulers/entriesR.js');
      // load_js("admin/js/rulers/compitetionsR.js");
      break;
    default:
      renderContent(renderCompetitionsR(), "content");
      load_js("admin/js/rulers/compitetionsR.js");
      break;
  }
}

window.addEventListener("load", HandleNavigation);
window.addEventListener("hashchange", HandleNavigation);


function responseAlert(response) {
  const existingAlerts = document.querySelectorAll('.alert');
  existingAlerts.forEach(alert => alert.remove());

  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert', 'alert-dismissible', 'fade', 'show', 'position-fixed', 'top-1', 'text-center');
  alertContainer.setAttribute('role', 'alert');
  alertContainer.style.maxWidth = '400px';
  alertContainer.style.borderRadius = '1rem';
  alertContainer.style.zIndex = '9999';
  alertContainer.style.top = '10%';
  alertContainer.style.left = '50%';
  alertContainer.style.transform = 'translate(-50%, -50%)';

  const alertMessage = document.createElement('div');
  alertMessage.classList.add('d-flex', 'align-items-center');
  alertMessage.innerHTML = response.apiMessage;

  if (response.apiStatus) {
    alertContainer.classList.add('alert-success');
    alertContainer.classList.remove('alert-danger');
    alertMessage.innerHTML = response.apiMessage;
  } else if (!response.apiStatus) {
    alertContainer.classList.add('alert-danger');
    alertContainer.classList.remove('alert-success');
    alertMessage.innerHTML = response.apiMessage;
  } else if (response.apiStatus === 500) {
    alertContainer.classList.add('alert-warning');
    alertMessage.textContent = 'Internal server error.';
  } else {
    alertContainer.classList.add('alert-info');
    alertMessage.textContent = 'Unknown response status.';
  }

  const closeButton = document.createElement('button');
  closeButton.setAttribute('type', 'button');
  closeButton.classList.add('btn-close');
  closeButton.setAttribute('data-bs-dismiss', 'alert');
  closeButton.setAttribute('aria-label', 'Close');

  alertContainer.appendChild(alertMessage);
  alertContainer.appendChild(closeButton);
  document.body.appendChild(alertContainer);

  // Add a timer to remove the alert after 10 seconds
  setTimeout(() => {
    alertContainer.remove();
  }, 6000);
}

function goToAdd(){
  document.getElementById("addToEdit").innerHTML = "Add";
}

function goToTop(){
  document.body.scrollTop = 160; //For Safari
  document.documentElement.scrollTop = 160; //For Chrome, FireFox, IE and Opera
}


// var scrollPositions = {};

// function recordThePosition(buttonId) {
//   // Record the position of the scroll when the button is pressed
//   window.addEventListener("scroll", function() {
//     scrollPositions[buttonId] = window.scrollY;
//   });
// }

// function goToTheSamePlace(buttonId) {
//   // Restore the position of the scroll when the user returns to the page
//   window.addEventListener("load", function() {
//     var scrollPosition = scrollPositions[buttonId];
//     if (scrollPosition !== undefined) {
//       window.scrollTo(0, scrollPosition);
//     }
//   });
// }
// function recordThePosition(){
//   // Record the position of the scroll when it happens
//   window.addEventListener("scroll", function() {
//     sessionStorage.setItem("scrollPosition", window.scrollY);
//   });
// }

// function goToTheSamePlase(){
//   // Restore the position of the scroll when the user returns to the page
//   window.addEventListener("load", function() {
//     var scrollPosition = sessionStorage.getItem("scrollPosition");
//     if (scrollPosition !== null) {
//       window.scrollTo(0, parseInt(scrollPosition));
//     }
//   });
// }

if (getCookie("token") == "" || getCookie("token") == "undefined") {alert("not excist");}

var token = getCookie("token");