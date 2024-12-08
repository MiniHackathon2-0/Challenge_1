function init() {
    loadMainContentStart();
}


function loadMainContentStart() {
    let mainContainer = document.getElementById("mainContainer");
    mainContainer.innerHTML = "";
    let currentLandingPage = localStorage.getItem("currentLandingPage"); // beim reload gucken wo man als letztes war
    mainContainer.classList.add('container-flex');

    // rendern je nach der letzten position
    if (currentLandingPage == null || currentLandingPage == '') {
        mainContainer.innerHTML = loadLogin();
    } else if (currentLandingPage == "register") {
        mainContainer.innerHTML = loadRegister();
    } else {
        mainContainer.innerHTML = loadLogin();
    }
}


function loadLoginContent() {
    let mainContainer = document.getElementById("mainContainer");
    mainContainer.innerHTML = "";
    localStorage.setItem("currentLandingPage", "login"); // hinterlege letzte postion
    mainContainer.innerHTML = loadLogin();
}


function loadRegisterContent() {
    let mainContainer = document.getElementById("mainContainer");
    mainContainer.innerHTML = "";
    localStorage.setItem("currentLandingPage", "register"); // hinterlege letzte postion
    mainContainer.innerHTML = loadRegister();
}

function loadDashboardContent() {
    let mainContainer = document.getElementById("mainContainer");
    mainContainer.innerHTML = "";
    localStorage.setItem("currentLandingPage", "dashboard"); // hinterlege letzte postion
    mainContainer.classList.remove('container-flex');
    mainContainer.innerHTML = loadDashboard(channelName);
    initDashboard();
}

function renderDashboardHelp() {
    const cardArea = document.getElementById("card-container");
    let headerChannel = document.getElementById("headerLanguageId");
    if (!cardArea) {
        console.error("Container mit ID 'card-container' nicht gefunden.");
        return;
    }
    cardArea.innerHTML = '';
    cardArea.innerHTML = loadDashboardHelp();
    headerChannel.innerHTML = '';
}
