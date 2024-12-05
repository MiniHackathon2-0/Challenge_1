
let channels= [];

let cards = [
    {
        "question": "Was ist ?",
        "answer": " ist eine NoSQL-Datenbank.",
        "creator": "643c1f5e5a4b6a2b1b7fdd29",
        "color": "blue",
        "date": 11234151325,
        "posY": 1,
        "posX": 1,
        "category": "Datenbanken",
        "_id": "67518861ec10698ded58b3dd",
        "__v": 0
    },

    {
        "question": "Was ist ?",
        "answer": " ist eine NoSQL-Datenbank.",
        "creator": "643c1f5e5a4b6a2b1b7fdd29",
        "color": "blue",
        "date": 11234151325,
        "posY": 1,
        "posX": 1,
        "category": "Datenbanken",
        "_id": "67518861ec10698ded58b3dd",
        "__v": 0
    },

    {
        "question": "Was ist ?",
        "answer": " ist eine NoSQL-Datenbank.",
        "creator": "643c1f5e5a4b6a2b1b7fdd29",
        "color": "blue",
        "date": 11234151325,
        "posY": 1,
        "posX": 1,
        "category": "Datenbanken",
        "_id": "67518861ec10698ded58b3dd",
        "__v": 0
    },

];
async function initDashboard() {
    
    await loadData();
    loadChannelsData();
    
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
            "creator": localStorage.getItem("id"),
            "title": channelInput,
            "cards": []
            
        }
            
            const response = await fetch(url + "/api/channel", {
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

        const result = await response.json();
        console.log(result);
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
    let input = document.getElementById("input-channel");
    let channel = document.getElementById("languages");
    let inputFeld = document.getElementById("newInput");
    let channelInput = inputFeld.value;
    channel.innerHTML ='';
    input.classList.add("d_none");
    createChannel(channelInput);
    inputFeld.value = '';
    
}

function loadChannelsData() {   
    let language = document.getElementById("languages");
    for (let i = 0; i < channels.length; i++) {
        let channel = channels[i].title;
        language.innerHTML += loadLanguage(channel);
    }
    
    
}