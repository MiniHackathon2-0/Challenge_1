async function registerUser(event){
    event.preventDefault();

    let userData = userDataValidation();
    if (!userData) {
        return;
    }

    try{
        await fetch("http://127.0.0.1:8000/api/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data => console.log(data)); // console.log dann mit eine variable ersetzen die befüllt wird(zB userData)

        clearValues();
        //weiterleittung später ergänzen, wenn die pinnwand vorhanden ist

    } catch(err){
        console.log('Error:', err);
    }
}


function userDataValidation(){
    let name = document.getElementById("username").value;
    let password = document.getElementById("passwordReg").value;
    let passwordRepeat = document.getElementById("passwordRepeat").value;
    let userData = {name, password}

    if(password != passwordRepeat && name.length >=3 && password.length >=3 && passwordRepeat.length >=3){
        alert("Please check your date.");
        return false;
    } else {
        return userData;
    }
}

function clearValues(){
    let name = document.getElementById("username").value;
    let password = document.getElementById("passwordReg").value;
    let passwordRepeat = document.getElementById("passwordRepeat").value;
    name = '';
    password = '';
    passwordRepeat = '';
}