function addNewCard(){
    let cardBox = document.getElementById("cardBox");
    cardBox.classList.remove("d_none");
    cardBox.innerHTML = newCardHTML();
}

function closeNewCard(){
    let cardBox = document.getElementById("cardBox");
    cardBox.classList.add("d_none");
}