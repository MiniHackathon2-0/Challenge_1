function loadLogin() {
    return /*html*/ `
    <div class="loginArea">
        <div class="login-container">
            <div class="input">
                <p class="sign-in">Sign in</p>
                <form id="loginForm" class="auth-form" onsubmit="return loginUser(event)">
                    <div style="width: 100%; margin-bottom: 24px">
                        <p class="over-input-username">Username</p>
                        <input class="input" type="text" placeholder="Name" id="usernameLogin" required
                            class="input-username">
                    </div>
                    <div style="width: 100%">
                        <p class="over-input-username">Password</p>
                        <input class="input" type="password" name="password" id="passwordLogin" placeholder="Password"
                            required>
                    </div>
                    <div style="width: 100%">
                        <button type="submit" class="Sign-in-button">Sign in</button>
                        <div class="registry-bottom">
                            <a onclick="loadRegisterContent()" class="sign-up-button">Create an Account</a>
                        </div>
                    </div>
                </form>
            </div>
            <div class="right-container"></div>
        </div>
    </div>
    `;
}

function loadRegister() {
    return /*html*/ `
    <div class="register">
            <div class="login-container">
                <div class="input">
                    <div class="register-header">
                        <img class="arrow" onclick="loadLoginContent()" src="./img/arrow_right.png" alt="arrow left">
                        <p class="sign-up">Create Account</p>
                    </div>
                    <form id="registForm" class="auth-form" onsubmit="return registerUser(event)" method="post">
                        <div> 
                            <p class="over-input-username">Username</p> 
                        </div>
                        <input class="input" type="text" id="username" placeholder="Username" required>
                        <div> 
                            <div class="over-input">
                                <p class="over-input-username">Password</p> </div>
                            </div>
                            <input class="input" type="password" name="password" id="passwordReg" placeholder="Password" required>
                            <input class="input" type="password" name="password" id="passwordRepeat" placeholder="Repeat Password" required>
                        <div>
                            <button type="submit" class="Sign-in-button">Register</button>
                        </div>
                    </form>
                </div>
                <div class="right-container"></div>
            </div>
        </div>
        `;
}

function loadDashboard(channelName) {
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
                <div id="headerLanguageId">
                    
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

function headerLanguage(channel) {
    return /*html*/`
    <h2 id="current-language">${channel.title}</h2>
    <button id="add-card" onclick="addNewCard('')">Neuer Lernzettel</button>`;

}

function loadLanguage(channel, i) {
    return `
        <div class="language" data-language="${channel.title}" onclick="switchLanguage(${i})" 
        ondblclick="deleteChannelOpen(${i})">${channel.title}</div>`;
}

function inputChannel() {
    return `
    <div id="input-channel" class="input-new-channel d_none"><span>New Channel</span>
        <input id="newInput" type="text">
        <div ><button id="save-channel" onclick="saveChannel()">Save</button> <button id="cancel-channel" onclick="cancelChannel()">Cancel</button></div>
    </div>`;
}


function newCardHTML() {
    return /*html*/`
        <div class="container-backgroound">
            <div id="cardBoxArea" class="card-style">
                <form  onsubmit="return createCard(event)" method="post">
                    <div class="cardPosCenter">
                        <label for="front">Question</label>
                        <input type="text" id="front"  name="front" placeholder="Front Text" required>
                        <label for="back">Answer</label>
                        <textarea id="back" name="back" placeholder="Back Text" required></textarea>
                        <label for="color">Color</label>
                        <input type="color" id="color" name="color" value="#ffffff">
                        <div class="button-box">
                            <button type="button" onclick="closeNewCard(event)" class="btn-cancel">Cancel</button>
                            <button type="submit" class="btn-confirm">Create</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>`;
}

function deletArea(i) {
    return /*html*/`
        <div id="deletChanelAreaStop" class="deletAreaError">
            <div class="card-style delet-area">
                <span>Are you sure you want to delete the channel?</span>
                <div class="button-box-delet">    
                    <button class="btn-confirm" onclick="deleteChannel('${i}')">Yes</button>                    
                    <button class="btn-cancel" onclick="closeDeleteChannel()">No</button>
                </div>
            </div>
        </div>`;

}

function loadCard(card, i) {
    return /*html*/`
        <div id="movable${i}" onclick="flipAction(${i})"  class="card" style="background-color: ${card.color};
        left: ${card.posX}%; 
        top: ${card.posY}%;">
        <div id="cardContent${i}" class="card-content">
        <span>${card.question}</span>
        <div class="button-box-Card">
        <button id="deleteCardBtn" class="btn-delete"  onclick="event.stopPropagation();deleteCard(${i})"><img src="./img/delete-icon.png" alt="delete Icon"></button>
        <button id="editCardArea" class="btn-edit"  onclick="event.stopPropagation();editcard(${i})"><img src="./img/edit-icon.png" alt="delete Icon"></button>
        </div>
        </div>
        
        </div>
        `;

}




function loadFlipCard(card, i) {
    return /*html*/`
        <div id="cardContent${i}" class="card-content" >
            <span>${card.answer}</span>
            <div class="button-box-Card">
        <button id="deleteCardBtn" class="btn-delete"  onclick="event.stopPropagation();deleteCard(${i})"><img src="./img/delete-icon.png" alt="delete Icon"></button>
        <button id="editCardArea" class="btn-edit"  onclick="event.stopPropagation();editcard(${i})"><img src="./img/edit-icon.png" alt="delete Icon"></button>
        </div>
        </div>`;
}

function loadFlipEnd(card, i) {
    return /*html*/`
        <div id="cardContent${i}" class="card-content" >
            <span>${card.question}</span>
            <div class="button-box-Card">
                <button id="deleteCardBtn" class="btn-delete"  onclick="event.stopPropagation();deleteCard(${i})">
                <img src="./img/delete-icon.png" alt="delete Icon"></button>
                <button id="editCardArea" class="btn-edit"  onclick="event.stopPropagation();editcard(${i})">
                <img src="./img/edit-icon.png" alt="delete Icon"></button>
            </div>
        </div>`;
}

function editCardHTML(i) {
    return /*html*/`
        <div class="container-backgroound" ">
            <div id="cardBoxAreaEdit" class="card-style">
                <form  onsubmit="return editCardSend(event,${i})" method="post">
                <div class="cardPosCenter">
                    <label for="front">Question</label>
                    <input type="text" id="frontEdit"  name="front" placeholder="Front Text" required value="${cards[i].question}">
                    <label for="back">Answer</label>                    
                    <textarea id="backEdit" name="back" placeholder="Back Text" required >${cards[i].answer}</textarea>
                    <label for="color">Color</label>
                    <input type="color" id="colorEdit" name="color"  value="${cards[i].color}">
                    <div class="button-box">
                        <button type="button" class="btn-cancel" onclick="closeEditCard(event)">Cancel</button>
                        <button type="submit" class="btn-confirm">Create</button>
                    </div>
                </div>
                </form>

            </div>
        </div>
    `;
}


