const domainName = "http://localhost:5000";

const homeBeforeLoginTemplate = document.getElementById(
  "homeBeforeLogin-template"
).innerHTML;
const homeTemplate = document.getElementById("home-template").innerHTML;
const infoTemplate = document.getElementById("info-template").innerHTML;
const shopTemplate = document.getElementById("shop-template").innerHTML;
const contactTemplate = document.getElementById("contact-template").innerHTML;
const signupTemplate = document.getElementById("signup-template").innerHTML;
const loginTemplate = document.getElementById("login-template").innerHTML;

const insideContentTemplate = document.getElementById(
  "insideContent-template"
).innerHTML;

const choiceCompetitionTemplate = document.getElementById(
  "choiceCompetition-template"
).innerHTML;

const homeAfterLoginTemplate = document.getElementById(
  "homeAfterLogin-template"
).innerHTML;
const competitionsTemplate = document.getElementById(
  "competitions-template"
).innerHTML;
const compatatorsTemplate = document.getElementById(
  "compatators-template"
).innerHTML;
const entriesTemplate = document.getElementById("entries-template").innerHTML;
const teachersTemplate = document.getElementById("teachers-template").innerHTML;
const fullStatementTemplate = document.getElementById(
  "fullStatement-template"
).innerHTML;
const summaryStatementTemplate = document.getElementById(
  "summaryStatement-template"
).innerHTML;
const fullSchadualTemplate = document.getElementById("fullSchadual-template").innerHTML;
const academySchadualTemplate = document.getElementById("academySchadual-template").innerHTML;
const paymentTemplate = document.getElementById("payment-template").innerHTML;
const resultsTemplate = document.getElementById("results-template").innerHTML;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const renderhomeBeforeLogin = Handlebars.compile(homeBeforeLoginTemplate);
const renderHome = Handlebars.compile(homeTemplate);
const renderInfo = Handlebars.compile(infoTemplate);
const renderShop = Handlebars.compile(shopTemplate);
const renderContact = Handlebars.compile(contactTemplate);
const renderSignup = Handlebars.compile(signupTemplate);
const renderLogin = Handlebars.compile(loginTemplate);

const renderInsideContent = Handlebars.compile(insideContentTemplate);

const renderChoiceCompetition = Handlebars.compile(choiceCompetitionTemplate);

const renderhomeAfterLogin = Handlebars.compile(homeAfterLoginTemplate);
const renderCompetitions = Handlebars.compile(competitionsTemplate);
const renderCompatators = Handlebars.compile(compatatorsTemplate);
const renderEntries = Handlebars.compile(entriesTemplate);
const renderTeachers = Handlebars.compile(teachersTemplate);
const renderFullStatement = Handlebars.compile(fullStatementTemplate);
const renderSummaryStatement = Handlebars.compile(summaryStatementTemplate);
const renderFullSchadual = Handlebars.compile(fullSchadualTemplate);
const rendercAcademySchadual = Handlebars.compile(academySchadualTemplate);
const renderPayment = Handlebars.compile(paymentTemplate);
const renderResults = Handlebars.compile(resultsTemplate);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// ADMIN ////////////////////////////////
const navbarTemplate = document.getElementById("navbar-template").innerHTML;

const competitionsATemplate = document.getElementById(
  "competitionsA-template"
).innerHTML;
const newsATemplate = document.getElementById("newsA-template").innerHTML;
const sponsersATemplate =
  document.getElementById("sponsersA-template").innerHTML;
const countriesATemplate = document.getElementById(
  "countriesA-template"
).innerHTML;
const productsATemplate =
  document.getElementById("productsA-template").innerHTML;
const messagesATemplate =
  document.getElementById("messagesA-template").innerHTML;
const adventisersATemplate = document.getElementById(
  "adventisersA-template"
).innerHTML;

///////////////////////////////////////////////////

const sidebarTemplate = document.getElementById("sidebar1-template").innerHTML;

const schoolTemplate = document.getElementById("school-template").innerHTML;
const compatatorsATemplate = document.getElementById(
  "compatatorsA-template"
).innerHTML;
const entersATemplate = document.getElementById("entersA-template").innerHTML;
const paymentATemplateA =
  document.getElementById("paymentA-template").innerHTML;

///////////////////////////////////////////////////

const sidebar2Template = document.getElementById("sidebar2-template").innerHTML;

const compatatorsASTemplate = document.getElementById(
  "compatatorsAS-template"
).innerHTML;
const teachersASTemplate = document.getElementById(
  "teachersAS-template"
).innerHTML;
const entriesASTemplate =
  document.getElementById("entriesAS-template").innerHTML;

///////////////////////////////////////

const renderNavbar = Handlebars.compile(navbarTemplate);

const renderCompetitionsA = Handlebars.compile(competitionsATemplate);
const renderNewsA = Handlebars.compile(newsATemplate);
const renderSponsersA = Handlebars.compile(sponsersATemplate);
const renderCountriesA = Handlebars.compile(countriesATemplate);
const renderProductsA = Handlebars.compile(productsATemplate);
const renderMessagesA = Handlebars.compile(messagesATemplate);
const renderAdventisersA = Handlebars.compile(adventisersATemplate);

///////////////////////////////////////

const renderSidebar = Handlebars.compile(sidebarTemplate);

const renderSchool = Handlebars.compile(schoolTemplate);
const renderCompatatorsA = Handlebars.compile(compatatorsATemplate);
const renderEntersA = Handlebars.compile(entersATemplate);
const renderPaymentA = Handlebars.compile(paymentATemplateA);

///////////////////////////////////////

const renderSidebar2 = Handlebars.compile(sidebar2Template);

const renderCompatatorsAS = Handlebars.compile(compatatorsASTemplate);
const renderTeachersAS = Handlebars.compile(teachersASTemplate);
const renderEntriesAS = Handlebars.compile(entriesASTemplate);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// RULERS ////////////////////////////////

const navbarRTemplate = document.getElementById("navbarR-template").innerHTML;
const competitionsRTemplate = document.getElementById(
  "competitionsR-template"
).innerHTML;
const entriesRTemplate = document.getElementById("entriesR-template").innerHTML;

const renderNavbarR = Handlebars.compile(navbarRTemplate);
const renderCompetitionsR = Handlebars.compile(competitionsRTemplate);
const renderEntriesR = Handlebars.compile(entriesRTemplate);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function renderContent(content, tagId) {
  const contentDiv = document.getElementById(tagId);
  contentDiv.innerHTML = content;
}

function load_js(path) {
  var script = document.createElement("script");
  script.src = `${domainName}/${path}`;
  document.body.appendChild(script);
}

function load_css(path) {
  var style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = `${domainName}/${path}`;
  document.head.appendChild(style);
}


function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
}

function HandleNavigation() {
  // const token = localStorage.getItem("token");
  // const competition = localStorage.getItem("subscriptionId");
  // const admin = localStorage.getItem("admin");
  // const ruler = localStorage.getItem("ruler");

  var token = getCookie("token");
const competition = getCookie("subscriptionId");
const admin = getCookie("admin");
const ruler = getCookie("ruler");



  if (token) {
    if (admin) {
      
      // debugger
      renderContent(renderNavbar(), "body");
      load_css("admin/css/navbar.css");
      load_js("admin/js/navbar.js");
      load_js("js/logOut.js");

      // window.addEventListener("load", handleNavigationAdmin1);
      // window.addEventListener("hashchange", handleNavigationAdmin1);

      const navLinks = document.querySelectorAll("nav a");
      navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          window.location.hash = this.getAttribute("href");
        });
      });

      handleNavigationAdmin1();

      if (window.location.hash == "#school") {
        // renderContent(renderSidebar(),"content");
        // console.log("comp");
        // load_css('admin/css/sidebar.css');
        // console.log("compcss");
        // load_js('admin/js/sidebar1.js');
        // console.log("compjs");

        // window.addEventListener("load", handleNavigationAdmin2);
        // window.addEventListener("hashchange", handleNavigationAdmin2);

        const navLinks = document.querySelectorAll("nav a");
        navLinks.forEach((link) => {
          link.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.hash = this.getAttribute("href");
          });
        });
        handleNavigationAdmin2();
        console.log("compend");
      }
      if (window.location.hash == "#compatatorsAS") {
        // debugger
        // renderContent(renderSidebar2(),"content");
        // console.log("comp");
        // load_css('admin/css/sidebar.css');
        // console.log("compcss");
        // load_js('admin/js/sidebar1.js');
        // console.log("compjs");

        // window.addEventListener("load", handleNavigationAdmin3);
        // window.addEventListener("hashchange", handleNavigationAdmin3);

        const navLinks = document.querySelectorAll("nav a");
        navLinks.forEach((link) => {
          link.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.hash = this.getAttribute("href");
          });
        });
        handleNavigationAdmin3();
        console.log("compend");
      }
    } else if (ruler) {
      renderContent(renderNavbarR(), "body");
      load_css("admin/css/navbar.css");
      load_js("admin/js/navbarR.js");
      load_js("js/logOut.js");

      // window.addEventListener("load", handleNavigationRuler);
      // window.addEventListener("hasher);change", handleNavigationRul

      const navLinks = document.querySelectorAll("nav a");
      navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          window.location.hash = this.getAttribute("href");
        });
      });

      handleNavigationRuler();
    } else {
      if (competition) {
        renderContent(renderhomeAfterLogin(), "body");

        if (window.location.hash == "") {
          localStorage.setItem("theme", "themeNaN0f16");
        }
        load_js("js/multiThemes.js");
        load_js("js/competitions.js");
        load_js('js/editProfileAcademy.js');
        load_js("js/logOut.js");

        // window.addEventListener("load", handleNavigationAfter);
        window.addEventListener("hashchange", handleNavigationAfter);

        const navLinks = document.querySelectorAll("nav a");
        navLinks.forEach((link) => {
          link.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.hash = this.getAttribute("href");
          });
        });

        handleNavigationAfter();
      } else {
        renderContent(renderChoiceCompetition(), "body");
        load_js("js/joinCompetition.js");
        load_js("js/logOut.js");
      }
    }
  } else {
    const h=document.querySelector('#content')?document.querySelector('#content').innerHTML:''
    // console.log(h)
    if (!["#news", "#sponsor", "#advertising"].includes(window.location.hash)||h=='') {
      renderContent(renderhomeBeforeLogin(), "body");
      load_js("js/sponsors.js");
      load_js("js/advertisers.js");
      load_js("js/news.js");
      load_css("css/insideContent.css");
    }

    // window.addEventListener("load", handleNavigationBefore);
    window.addEventListener("hashchange", handleNavigationBefore);

    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.hash = this.getAttribute("href");
      });
    });

    handleNavigationBefore();
  }
}

function handleNavigationBefore() {
  const hash = window.location.hash;
  switch (hash) {
    // case "#":
    //   renderContent(renderHome(),"content");
    //   load_js('js/beforeLogin.js');
    //   load_js('js/advertisers.js');
    //   load_js('js/news.js');
    //   load_css('css/insideContent.css');
    //   break;
    case "#sliderNews":
      renderContent(renderHome(), "content");
      // load_js('js/sponsors.js');
      // load_js('js/advertisers.js');
      // load_js('js/news.js');
      // load_css('css/insideContent.css');
      break;
    // case "#knowMoreSponsers":
    //   renderContent(renderInsideContent() ,"content");
    //   load_js('js/sponsors.js');
    //   break;
    // case "#knowMoreAdventisers":
    //   renderContent(renderInsideContent() ,"content");
    //   load_js('js/advertisers.js');
    //   break;
    // case "#knowMoreNews":
    //   renderContent(renderInsideContent() ,"content");
    //   load_js('js/news.js');
    //   break;
    case "#info":
      renderContent(renderInfo(), "content");
      break;
    case "#shop":
      renderContent(renderShop(), "content");
      break;
    case "#contact":
      renderContent(renderContact(), "content");
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
      if(document.querySelector('#content')&&document.querySelector('#content').innerHTML==''){
        renderContent(renderHome(), "content");
        load_js("js/sponsors.js");
        load_css("css/insideContent.css");
      }
      break;
    case "#advertising":
      if(document.querySelector('#content').innerHTML==''){
        renderContent(renderHome(), "content");
        load_js("js/advertisers.js");
        load_css("css/insideContent.css");
      }
      break;
    case "#news":
      if(document.querySelector('#content').innerHTML==''){
        renderContent(renderHome(), "content");
        load_js("js/news.js");
        load_css("css/insideContent.css");
      }
      break;
    default:
      renderContent(renderHome(), "content");
      load_js("js/news.js");
      load_css("css/insideContent.css");
      break;
  }
}

function handleNavigationAfter() {
  const hash = window.location.hash;

  switch (hash) {
    case "#myProfile":
      // renderContent(renderCompetitions(),"content");
        load_js('js/editProfileAcademy.js');
      // changeTheme(themeObj);
      break;
    // case "#logOut":
    //   load_js('js/logOut.js');
    //   break;
    case "#contactUs":
      renderContent(renderContact(), "content");
      // load_js('js/competitions.js');
      // changeTheme(themeObj);
      break;
    // case "#competitions":
    //   // renderContent(renderCompetitions(), "content");
    //   load_js("js/competitions.js");
    //   // changeTheme(themeObj);
    //   break;
    case "#compatators":
      renderContent(renderCompatators(), "content");
      load_js("js/compatators.js");
      // changeTheme(themeObj);
      break;
    case "#entries":
      renderContent(renderEntries(), "content");
      load_js("js/entries.js");
      // changeTheme(themeObj);
      break;
    case "#teachers":
      renderContent(renderTeachers(), "content");
      load_js("js/teachers.js");
      // changeTheme(themeObj);
      break;
    case "#fullStatement":
      renderContent(renderFullStatement(), "content");
      load_js("js/fullStatement.js");
      // changeTheme(themeObj);
      break;
    case "#summaryStatement":
      renderContent(renderSummaryStatement(), "content");
      load_js("js/summaryStatement.js");
      // changeTheme(themeObj);
      break;
      case "#fullSchadual":
      renderContent(renderFullSchadual(), "content");
      load_js("js/fullSchadual.js");
      // changeTheme(themeObj);
      break;
      case "#schadualBySchool":
      renderContent(rendercAcademySchadual(), "content");
      load_js("js/academySchadual.js");
      // changeTheme(themeObj);
      break;
    case "#payment":
      renderContent(renderPayment(), "content");
      load_js("js/payment.js");
      // changeTheme(themeObj);
      break;
    case "#results":
      renderContent(renderResults(), "content");
      load_js("js/results.js");
      // changeTheme(themeObj);
      break;
    default:
      renderContent(renderCompatators(), "content");
      load_js("js/competitions.js");
      load_js("js/compatators.js");
      break;
  }
}

///////////////////////////////////ADMIN//////////////////////////////////////

function handleNavigationAdmin1() {
  // debugger
  const hash = window.location.hash;
  // console.log("homeadmin");

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
    //   load_css('admin/css/navbar.css');
    //   load_js('admin/js/navbar.js');
    //   break;
    case "#competition":
      renderContent(renderCompetitionsA(), "content");
      // console.log("compadmin");
      load_js("admin/js/navbar/competitions.js");
      break;
    case "#school":
      // handleNavigationAdmin2();
      break;
    case "#news":
      if(document.querySelector('#content').innerHTML==''){
        renderContent(renderNewsA(), "content");
        load_js("admin/js/navbar/news.js");
        load_css("css/insideContent.css");
      }
      break;
    case "#sponser":
      if(document.querySelector('#content').innerHTML==''){
        renderContent(renderSponsersA(), "content");
        load_js("admin/js/navbar/sponsers.js");
        load_css("css/insideContent.css");
      }
      break;
    case "#country":
      renderContent(renderCountriesA(), "content");
      load_js("admin/js/navbar/countries.js");
      // changeTheme(themeObj);
      break;
    case "#prodect":
      renderContent(renderProductsA(), "content");
      load_js("admin/js/navbar/products.js");
      // changeTheme(themeObj);
      break;
    case "#messages":
      renderContent(renderMessagesA(), "content");
      load_js("admin/js/navbar/messages.js");
      // changeTheme(themeObj);
      break;
    case "#adventiser":
      if(document.querySelector('#content').innerHTML==''){
        renderContent(renderAdventisersA(), "content");
        load_js("admin/js/navbar/adventisers.js");
        load_css("css/insideContent.css");
      }
      break;
    case "#addAdmin":
      // renderContent(renderFullStatement(),"content");
      // load_js('js/fullStatement.js');
      // changeTheme(themeObj);
      break;
    case "#editProfile":
      // renderContent(renderSummaryStatement(),"content");
      // load_js('js/summaryStatement.js');
      // changeTheme(themeObj);
      break;
    // case "#showCompetitionDetails":
    //     handleNavigationAdmin2();
    //     break;
    // case "#schoolDetails":
    //     handleNavigationAdmin3();
    //     break;
    default:
       
console.log(window.location.hash)

      if(["#compatatorsAS","#school","#compatatorsA","#entersA","#paymentA"].includes(window.location.hash)){
        handleNavigationAdmin2()
      }else if(["#compatatorsAS","#teachersAS","#entriesAS"].includes(window.location.hash)){
        handleNavigationAdmin3()
      }else{
        renderContent(renderCompetitionsA(), "content");
        load_js("admin/js/navbar/competitions.js");
      }
      // load_css('admin/css/navbar.css');
      // load_js('admin/js/navbar.js');
      break;

  }
}
// }

function handleNavigationAdmin2() {
  const hash = window.location.hash;
//  debugger
  renderContent(renderSidebar(), "content");
  load_css("admin/css/sidebar.css");
  load_js("admin/js/sidebar1.js");

  switch (hash) {
    // case "#logoback":
    // renderContent(renderNavbar(),"body");
    // load_css('admin/css/navbar.css');
    // load_js('admin/js/navbar.js');
    // break;
    // case "#competition":
    //   renderContent(renderCompetitionsA(), "content");
    //   load_js("admin/js/navbar/competitions.js");
    //   // load_css('admin/css/tables.css');
    //   break;
    case "#compatatorsAS":
      renderContent(renderSidebar2(), "content");
      load_css("admin/css/sidebar.css");
      load_js("admin/js/sidebar1.js");
      renderContent(renderCompatatorsAS(), "contentSchool");
      load_css("admin/css/tables.css");
      load_js("admin/js/sidebar2/compatatorsS.js");

      break;
    case "#school":
      renderContent(renderSchool(), "contentCompetition");
      // load_css('admin/css/tables.css');
      load_js("admin/js/sidebar1/schools.js");
      break;
    case "#compatatorsA":
      renderContent(renderCompatatorsA(), "contentCompetition");
      // load_css('admin/css/tables.css');
      load_js("admin/js/sidebar1/compatators.js");
      break;
    case "#entersA":
      renderContent(renderEntersA(), "contentCompetition");
      load_css("admin/css/entryCard.css");
      load_js("admin/js/sidebar1/entries.js");
      break;
    case "#paymentA":
      renderContent(renderPaymentA(), "contentCompetition");
      load_css("admin/css/recitCard.css");
      load_js("admin/js/sidebar1/payments.js");
      break;
    default:
      renderContent(renderSchool(), "contentCompetition");
      //  load_css('admin/css/recitCard.css');
      load_js("admin/js/sidebar1/schools.js");
      handleNavigationAdmin1()

      break;
  }

  // handleNavigationAdmin1();
}

function handleNavigationAdmin3() {


  const hash = window.location.hash;
  console.log("home3admin");
  renderContent(renderSidebar2(), "content");
  load_css("admin/css/sidebar.css");
  load_js("admin/js/sidebar1.js");

  switch (hash) {
    // case "#schoolDetails":
    //   renderContent(renderSidebar2(),"body");
    //   console.log("renderSidebar2");
    //   load_css('admin/css/sidebar.css');
    //   console.log("schoolrendercss");
    //   load_js('admin/js/sidebar2.js');
    //   console.log("schoolrenderjs");
    //   break;
    case "#compatatorsAS":
      renderContent(renderCompatatorsAS(), "contentSchool");
      load_css("admin/css/tables.css");
      load_js("admin/js/sidebar2/compatatorsS.js");
      break;
    case "#teachersAS":
      renderContent(renderTeachersAS(), "contentSchool");
      load_css("admin/css/tables.css");
      load_js("admin/js/sidebar2/teachersS.js");
      break;
    case "#entriesAS":
      renderContent(renderEntriesAS(), "contentSchool");
      load_css("admin/css/tables.css");
      load_js("admin/js/sidebar2/entriesS.js");
      break;
    default:
      renderContent(renderCompatatorsAS(), "contentSchool");
      load_css("admin/css/tables.css");
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
      // load_css('css/insideContent.css');
      break;
  }
}

window.addEventListener("load", HandleNavigation);
window.addEventListener("hashchange", HandleNavigation);

// function changeHash(){
//   window.location.hash = '#contact';
// }

// function backToTop() {
//   // event.preventDefault();
//   alert('fbdbdbdgbdgb');
//   document.getElementById("back-to-top").addEventListener('click', function (event) {
//     event.preventDefault();
//     window.location.hash = this.getAttribute('href');
//   });
// };
//aapi m   statts  data
function responseAlert(res) {
  // `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  //     <symbol id="check-circle-fill" viewBox="0 0 16 16">
  //       <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
  //     </symbol>
  //     <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
  //       <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  //     </symbol>
  //   </svg>`

  if (res.apiStatus) {
    alert(`${res.apiMessage}`);
    // `<div class="alert alert-success alert-dismissible fade show" role="alert">
    //   <strong class="alert-heading">Holy guacamole!</strong> You should check in on some of those fields below.
    //     <div class="d-flex align-items-center">
    //       <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
    //       <div>
    //         ${res.apiMessage}
    //       </div>
    //     </div>

    //   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    // </div>`
  } else if (!res.apiStatus) {
    alert(`${res.apiMessage}`);

    // `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    //   <strong class="alert-heading">Holy guacamole!</strong> You should check in on some of those fields below.
    //   <div class="d-flex align-items-center">
    //     <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
    //     <div>
    //     ${res.apiMessage}
    //     </div>
    //   </div>

    //   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    // </div>`
  } else if (res.apiStatus === 500) {
    alert("500");
  }
}

if (
  getCookie("token") == "" ||
  getCookie("token") == "undefined"
) {
  alert("not excist");
}
