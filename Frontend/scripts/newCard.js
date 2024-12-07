function addNewCard(){
    let cardBox = document.getElementById("cardBox");
    cardBox.classList.remove("d_none");
    cardBox.innerHTML = newCardHTML();
    stopCardArea();
}

function closeNewCard(){
    let cardBox = document.getElementById("cardBox");
    cardBox.classList.add("d_none");
}

function stopCardArea() {
    let area = document.getElementById('cardBoxArea');
    area.addEventListener('click', (event) => {
        event.stopPropagation()
    })
}