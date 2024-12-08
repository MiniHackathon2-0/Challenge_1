
let channels = [];
let userName;
let bgColor;
let cards = [];
let channelName;
let clickCount = 0;



async function initDashboard() {
    userName = localStorage.getItem("username");
    bgColor = localStorage.getItem("bgColor");
    await loadData();
    loadChannelsData();
    loadBakcgroundColorAndName();
};


async function loadData() {
    try {
        const response = await fetch(url + "/api/channel", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwtToken"),
            },
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const result = await response.json();
        loadSubjectsArray(result);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

async function loadCards() {
    const category = localStorage.getItem("curentCategory");
    try {
        const response = await fetch(url + "/api/cards/" + category, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwtToken"),
            },
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const result = await response.json();

        loadCardsArray(result);
    } catch (error) {
        console.log(error);
    }
}


function loadSubjectsArray(result) {
    channels = [];

    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        channels.push(element);
    }
}

function loadCardsArray(result) {
    cards = [];

    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        const newElement = {
            ...element,
            "isFlipped": false,
            "movedX": element.posX,
            "movedY": element.posY,
            "isMoved": false
        };
        cards.push(newElement);
    }
}


async function createChannel(channelInput) {
    try {
        let creator = {
            "title": channelInput,
        }

        const response = await fetch(url + "/api/channel/", {
            method: "Post",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwtToken"),
            },
            body: JSON.stringify(creator)
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        initDashboard();
    } catch (error) {
        console.log(error);
    }
}


function newChannel() {
    let inputFeld = document.getElementById("inputDivChanneloverlay");
    inputFeld.innerHTML = inputChannel();
    let input = document.getElementById("input-channel");
    input.classList.remove("d_none");
    inputFeld.classList.remove("d_none");
    stopInputArea();

}


function cancelChannel() {
    let overlay = document.getElementById("inputDivChanneloverlay");
    let inputFeld = document.getElementById("newInput");
    let input = document.getElementById("input-channel");
    inputFeld.value = '';
    input.classList.add("d_none");
    overlay.classList.add("d_none");

}


function stopInputArea() {
    let area = document.getElementById('input-channel');
    area.addEventListener('click', (event) => {
        event.stopPropagation()
    })
}


function saveChannel() {
    let overlay = document.getElementById("inputDivChanneloverlay");
    let input = document.getElementById("input-channel");
    let channel = document.getElementById("languages");
    let inputFeld = document.getElementById("newInput");
    let channelInput = inputFeld.value;
    channel.innerHTML = '';
    overlay.classList.add("d_none");
    input.classList.add("d_none");
    createChannel(channelInput);
    inputFeld.value = '';
}


function loadChannelsData() {
    let language = document.getElementById("languages");
    language.innerHTML = '';
    for (let i = 0; i < channels.length; i++) {
        let channel = channels[i];
        language.innerHTML += loadLanguage(channel, i);
    }
}
async function deleteChannel(i) {
    let overlay = document.getElementById("deletChanel");
    let header = document.getElementById("headerLanguageId");
    let mainContainer = document.getElementById("card-container");
    let channel = channels[i];
    try {
        const response = await fetch(url + "/api/channel/" + channel._id, {
            method: "Delete",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwtToken"),
            },

        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        overlay.classList.add("d_none");
        header.innerHTML = '';
        mainContainer.innerHTML = '';
        channels.splice(i, 1);
        loadChannelsData();
    } catch (error) {
        console.log(error);
    }
}

function deleteChannelOpen(i) {
    let overlay = document.getElementById("deletChanel");
    overlay.classList.remove("d_none");
    overlay.innerHTML = '';
    overlay.innerHTML = deletArea(i);
    stopDeletArea();
}
function stopDeletArea() {
    let area = document.getElementById('deletChanelAreaStop');
    area.addEventListener('click', (event) => {
        event.stopPropagation()
    })
}

function closeDeleteChannel() {
    let overlay = document.getElementById("deletChanel");
    overlay.classList.add("d_none");
}
async function switchLanguage(i) {
    const channel = channels[i];
    localStorage.setItem("curentCategory", channel.title);
    const header = document.getElementById("headerLanguageId");
    channelName = channels[i];
    console.log(channelName);
    header.innerHTML = '';
    header.innerHTML = headerLanguage(channelName);
    await loadCards();
    renderCards();

}

function renderCards() {
    const cardArea = document.getElementById("card-container");
    if (!cardArea) {
        console.error("Container mit ID 'card-container' nicht gefunden.");
        return;
    }
    cardArea.innerHTML = '';
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const cardHTML = loadCard(card, i);
        const wrapper = document.createElement("div");
        wrapper.innerHTML = cardHTML;
        const newCardElement = wrapper.firstElementChild;
        if (!newCardElement) {
            console.error("Fehler beim Laden der Karte:", card);
            continue;
        }
        makeMovable(newCardElement, i);
        cardArea.appendChild(newCardElement);
    }

}

function getMaxCoordinates(cardElement, parentElement) {
    const parentRect = parentElement.getBoundingClientRect();
    const cardRect = cardElement.getBoundingClientRect();
    const maxX = 100 - (cardRect.width / parentRect.width) * 100;
    const maxY = 100 - (cardRect.height / parentRect.height) * 100;
    return { maxX, maxY };
}

function moveCard(e, cardElement, offsetX, offsetY, parentElement, i) {
    const parentRect = parentElement.getBoundingClientRect();
    let xPercent = ((e.clientX - parentRect.left - offsetX) / parentRect.width) * 100;
    let yPercent = ((e.clientY - parentRect.top - offsetY) / parentRect.height) * 100;
    const { maxX, maxY } = getMaxCoordinates(cardElement, parentElement);
    xPercent = Math.max(0, Math.min(xPercent, maxX));
    yPercent = Math.max(0, Math.min(yPercent, maxY));
    cardElement.style.left = `${xPercent}%`;
    cardElement.style.top = `${yPercent}%`;
    cards[i].movedX = xPercent;
    cards[i].movedY = yPercent;
}


function stopDragging(cardElement, mouseMoveHandler, mouseUpHandler, card) {
    cardElement.style.cursor = "grab";
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
    console.log("Card moved:", card.id, card.posX, card.posY);

    if (
        (card.movedX !== card.posX) ||
        (card.movedY !== card.posY)
    ) {
        card.isMoved = true;
        card.posX = card.movedX;
        card.posY = card.movedY;
        updateCardPosition(card._id, card.posX, card.posY);
    } else {
        card.isMoved = false;
    }
}


function makeMovable(cardElement, i) {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;
    cardElement.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
        cardElement.style.cursor = "grabbing";
        const parentElement = cardElement.parentElement;
        const mouseMoveHandler = (e) => moveCard(e, cardElement, offsetX, offsetY, parentElement, i);
        const mouseUpHandler = () => stopDragging(cardElement, mouseMoveHandler, mouseUpHandler, cards[i]);
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
    });
}

async function updateCardPosition(id, posX, posY) {
    let creator = {
        "posX": posX,
        "posY": posY
    }
    try {
        const response = await fetch(url + "/api/cards/" + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwtToken"),
            },
            body: JSON.stringify(creator)
        });

        if (!response.ok) {
            throw new Error("Fehler beim Speichern der Position");
        }

        console.log("Position erfolgreich gespeichert");
    } catch (error) {
        console.log("Fehler beim Speichern der Position:", error);
    }

}


function loadBakcgroundColorAndName() {
    const bgColorElement = document.getElementById("bgColor");
    if (bgColor) {
        bgColorElement.style.backgroundColor = bgColor;
    }
    if (userName) {
        bgColorElement.innerHTML = `Hallo ${userName}`;
    }
}

function flipAction(i) {

    if (cards[i].isMoved)  return;
   

    if (!cards[i].isFlipped) {
        console.log('start:', cards[i].isFlipped);
        
        flipCard(i);
        
        console.log('end:', cards[i].isFlipped);
    } else {
        console.log('start:', cards[i].isFlipped);        
        flipEnd(i);
        console.log('end:', cards[i].isFlipped);
    }

    cards[i].isFlipped = !cards[i].isFlipped;
}

function flipCard(i) {
    let cardElement = document.getElementById('movable' + i);
    cardElement.classList.remove('flip-reverse');
    cardElement.classList.add('flip');
    cardElement.innerHTML = '';
    flipStart(i);
}

function flipStart(i) {
    const card = cards[i];
    let cardElement = document.getElementById('movable' + i);
    cardElement.innerHTML = loadFlipCard(card, i);
    let cardText = document.getElementById('cardContent' + i);
    cardText.classList.add('flip-back');
}

function flipEnd(i) {
    let cardElement = document.getElementById('movable' + i);
    cardElement.innerHTML = '';
    cardElement.classList.remove('flip');
    cardElement.classList.add('flip-reverse');
    cardElement.innerHTML = flipEndToStart(i);
    let cardText = document.getElementById('cardContent' + i);
    cardText.classList.remove('flip-back');
}

function flipEndToStart(i) {
    const card = cards[i];
    return loadFlipEnd(card, i);
}
