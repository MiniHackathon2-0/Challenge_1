function init() {
    loadMainContentStart()
}

function loadMainContentStart() {
let mainContainer = document.getElementById("mainContainer");
mainContainer.innerHTML = "";
mainContainer.innerHTML = loadLogin();    
}

function loadLoginContent() {
let mainContainer = document.getElementById("mainContainer");
mainContainer.innerHTML = "";
mainContainer.innerHTML = loadLogin();    
}

function loadRegisterContent() {
let mainContainer = document.getElementById("mainContainer");
mainContainer.innerHTML = "";
mainContainer.innerHTML = loadRegister();
    
}