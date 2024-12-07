
let channels = [];
let userName;
let bgColor;
let cards = [];
let channelName;
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
                'Authorization': 'Bearer ' + localStorage.getItem("jwtToken")
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


function loadSubjectsArray(result) {
    channels = [];

    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        channels.push(element);
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
                'Authorization': 'Bearer ' + localStorage.getItem("jwtToken")
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
        language.innerHTML += loadLanguage(channel,i);
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
                'Authorization': 'Bearer ' + localStorage.getItem("jwtToken")
            },
            
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        overlay.classList.add("d_none");
        header.innerHTML = '';
        mainContainer.innerHTML = '';
        initDashboard();
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
function switchLanguage(i) {
    
    
    let header = document.getElementById("headerLanguageId");
    channelName = channels[i];
    console.log(channelName);    
    header.innerHTML = '';
    header.innerHTML = headerLanguage(channelName);

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