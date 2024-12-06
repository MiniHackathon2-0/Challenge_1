function addNewCard(){
    let cardBox = document.getElementById("cardBox");
    cardBox.classList.remove("d_none");
    cardBox.innerHTML = newCardHTML();
}


function closeNewCard(event){
    event.stopPropagation()
    let cardBox = document.getElementById("cardBox");
    cardBox.classList.add("d_none");
}


async function createCard(event){
    event.preventDefault();
    event.stopPropagation()
    
    try {
        const bodyData = collectData();
        const resp = await createCardFetch(bodyData);
        
        console.log("Card created successfully:", resp);
        closeNewCard(event);
    } catch (error) {
        console.error("Error during card creation:", error);
    }
}


function collectData(){
    const QUESTION = document.getElementById("front").value;
    const ANSWER = document.getElementById("back").value;
    const COLOR = document.getElementById("color").value;
    const CREATOR = localStorage.getItem("id");
    const DATE = Date.now();
    const POSX = Math.random();
    const POSY = Math.random();
    const CATEGORY = localStorage.getItem("curentCategory") || "Unterricht";


    return {
        question: QUESTION,
        answer: ANSWER, 
        creator: CREATOR,
        color: COLOR,
        date: DATE,
        posY: POSY,
        posX: POSX,
        category: CATEGORY
    }
}


async function createCardFetch(card) {
    const response = await fetch(`${url}/api/cards/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("jwtToken"),
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        body: JSON.stringify(card)
    });

    return await response.json();
}
