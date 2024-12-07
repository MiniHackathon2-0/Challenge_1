function addNewCard() {
    let cardBox = document.getElementById("cardBox");
    cardBox.classList.remove("d_none");
    cardBox.innerHTML = newCardHTML();
    stopCardArea();
}


function closeNewCard(event) {
    // event.stopPropagation();
    let cardBox = document.getElementById("cardBox");
    cardBox.classList.add("d_none");
}

function stopCardArea() {
    let area = document.getElementById('cardBoxArea');
    area.addEventListener('click', (event) => {
        event.stopPropagation()
    })
}

async function createCard(event) {
    event.preventDefault();
    event.stopPropagation()

    try {
        const bodyData = collectData();
        const resp = await createCardFetch(bodyData);
        cards.push(resp);
        renderCards();
        console.log("Card created successfully:", resp);
        closeNewCard(event);
    } catch (error) {
        console.error("Error during card creation:", error);
        alert(error.message)
    }


}


function collectData() {
    const QUESTION = document.getElementById("front").value;
    const ANSWER = document.getElementById("back").value;
    const COLOR = document.getElementById("color").value;
    const POSX = Math.random() * 90 + 5;
    const POSY = Math.random() * 90 + 5;
    const CATEGORY = localStorage.getItem("curentCategory") || "Unterricht";


    return {
        question: QUESTION,
        answer: ANSWER,
        color: COLOR,
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
        },
        body: JSON.stringify(card)
    });

    if (!response.ok) {
        throw new Error(`HTTP-Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
}

async function deleteCard(i) {
    const card = cards[i];    
   await deleteCardFetch(card);
   const cardBox = document.getElementById("card-container");
   cardBox.innerHTML = '';
   cards.splice(i, 1);
   renderCards();
   

}

async function deleteCardFetch(card) {
    const cardBox = document.getElementById("card-container");
    const id = card._id;
    const response = await fetch(`${url}/api/cards/`+ id, {
        method: "Delete",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("jwtToken"),
        },
        
    });

    if (!response.ok) {
        throw new Error(`HTTP-Error: ${response.status} ${response.statusText}`);
    }

   
    
}
