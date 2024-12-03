function registerUser(event){
    event.preventDefault();

    let userData = userDataValidation();

    try{
        fetch("/api/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data => console.log(data));

        //weiterleittung später ergänzen, wenn die pinnwand vorhanden ist
    } catch(err){
        console.log('Error:', err);
    }


}


function userDataValidation(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let passwordRepeat = document.getElementById("passwordRepeat").value;
    let userData = {username, password}

    if(password != passwordRepeat && username.length >=3 && password.length >=3 && passwordRepeat.length >=3){
        alert("Please check your date.");
        return false;
    } else {
        return userData;
    }
}