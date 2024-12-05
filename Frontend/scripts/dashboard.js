


let channels= [
    {
        "creator": "1939745a8048c8a91fac634a759",
        "title": "Mathematik",
        "cards": []
    },
    {
        "creator": "1939745a8048c8a91fac634a759",
        "title": "Englisch",
        "cards": []
    },
    {
        "creator": "1939745a8048c8a91fac634a759",
        "title": "Französisch",
        "cards": []
    },
];

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
function initDashboard() {
    loadTest();
    loadData();
};

async function loadData() {
    try {
    
        const response = await fetch(url + "/api/test", {
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
        console.log(result);
        
    } catch (error) {
        console.log(error);
    }

}

function loadTest() {   
    let language = document.getElementById("languages");
    for (let i = 0; i < channels.length; i++) {
        let channel = channels[i].title;
        language.innerHTML += loadLanguage(channel);
    }
    
    
}