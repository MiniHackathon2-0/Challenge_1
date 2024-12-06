

function loadLogin() {
    return /*html*/ `
    <div class="authScreen">
        <div class="loginArea">
            <span>Wellcome Back </span>

            <form id="loginForm" class="form" onsubmit="return loginUser(event)">
                <input class="input" type="text" placeholder="Name" id="usernameLogin" required>
                <input class="input" type="password" name="password" id="passwordLogin" placeholder="Password" required>
                <a onclick="loadRegisterContent()">Registry</a>
                <button class="btn" type="submit">Login</button>
            </form>
        </div>
    </div>
    `;
}

function loadRegister() {
    return /*html*/ `
    <div class="authScreen">
        <div class="register" onload="clearValues()">
            <img onclick="loadLoginContent()" src="/img/arrow_left.png" alt="arrow left">
            <span>Create Account</span>
            <form id="registForm" class="registform" onsubmit="return registerUser(event)" method="post">
                <input class="input" type="text" id="username" placeholder="Username" required>
                <input class="input" type="password" name="password" id="passwordReg" placeholder="Password" required>
                <input class="input" type="password" name="password" id="passwordRepeat" placeholder=" Repeat Password" required>
                <button class="btn" type="submit">Register</button>
            </form>
        </div>
    </div>
        `;
}

function loadDashboard() {
    return /*html*/ `
    <div id="app">
        <div id="sidebar">
            <h2>Sprachen</h2>
            <div id="languages">
                
                
            </div>
            <button id="add-language" onclick="newChannel()">+</button>
        </div>
        <div id="main">
            <div class="headerDiv">
                <div>
                    <h2 id="current-language">Englisch</h2>
                    <button id="add-card">Neuer Lernzettel</button>
                </div>
                <div class="whiteBackground">
                    <span id="bgColor" >Hallo ${userName}</span>
                </div>
            </div>
            <div id="card-container" data-language="Englisch"></div>
        </div>
    </div>

    <div id="language-modal" class="modal hidden">
        <div class="modal-content">
            <h3>Neue Sprache hinzufügen</h3>
            <input type="text" id="new-language" placeholder="Sprache eingeben">
            <button id="save-language">Speichern</button>
            <button id="cancel-language">Abbrechen</button>
        </div>
    </div>

    <div id="card-modal" class="modal hidden">
        <div class="modal-content">
            <h3>Lernzettel erstellen</h3>
            <label for="front-text">Vorderseite:</label>
            <input type="text" id="front-text" placeholder="Text für die Vorderseite">
            <label for="back-text">Rückseite:</label>
            <input type="text" id="back-text" placeholder="Text für die Rückseite">
            <label for="card-color">Farbe:</label>
            <input type="color" id="card-color" value="#ffffff">
            <button id="create-card">Erstellen</button>
            <button id="cancel-card">Abbrechen</button>
        </div>
    </div>
`;
}

function loadLanguage(channel) {
    return `
    <div class="language" data-language="${channel}">${channel}</div>
                `;
}

function inputChannel() {

    return`
    <div id="input-channel" class="input-new-channel d_none"><span>New Channel</span>
    <input id="newInput" type="text">
    <div ><button id="save-channel" onclick="saveChannel()">Save</button> <button id="cancel-channel" onclick="cancelChannel()">Cancel</button></div>
     </div>
     
    `
    
}