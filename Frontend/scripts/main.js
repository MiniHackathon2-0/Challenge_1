function init() {
    loadMainContentStart();
}


function loadMainContentStart() {
    let mainContainer = document.getElementById("mainContainer");
    mainContainer.innerHTML = "";
    let currentLandingPage = localStorage.getItem("currentLandingPage"); // beim reload gucken wo man als letztes war
    
    // rendern je nach der letzten position
    if (currentLandingPage != null || "") {
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
