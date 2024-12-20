
const url = "http://89.47.51.229:8080";

async function registerUser(event) {
    event.preventDefault();

    let userData = userDataValidation(event);
    if (!userData) {
        return;
    }

    try {
        const response = await fetch(url + "/auth/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`HTTP-Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        if (result.jwtToken) {
            localStorage.setItem("jwtToken", result.jwtToken);
            localStorage.setItem("id", result.id);
            localStorage.setItem("username", result.name);
            localStorage.setItem("bgColor", result.backgroundColor);
            loadDashboardContent();
        };
    } catch (error) {
        console.error("Error: ", error.message);
        alert(error.message);
    }
}

async function loginUser(event) {
    event.preventDefault();

    let loginData = loginDataValidation(event);
    if (!loginData) {
        return;
    }

    try {
        const response = await fetch(url + "/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const result = await response.json();

        if (result.jwtToken) {
            localStorage.setItem("jwtToken", result.jwtToken);
            localStorage.setItem("id", result.id);
            localStorage.setItem("username", result.name);
            localStorage.setItem("bgColor", result.backgroundColor);

            loadDashboardContent();
        }
    } catch (error) {
        console.error("Error: ", error.message);
        alert(error.message);
    }
}



function userDataValidation(event) {
    let name = event.target[0].value;
    let password = event.target[1].value;
    let passwordRepeat = event.target[2].value;
    let userData = { name, password }

    if (password != passwordRepeat && name.length >= 3 && password.length >= 3 && passwordRepeat.length >= 3) {
        alert("Repeat password, name and  min length 3.");
        return false;
    } else {
        return userData;
    }
}

function loginDataValidation(event) {
    let name = event.target[0].value;
    let password = event.target[1].value;

    if (name.length < 3 || password.length < 3) {
        alert("Username and passwordhave to be min length 3 chars.");
        return false;
    }

    return { name, password };
}

function clearValues() {
    let name = document.getElementById("username").value;
    let password = document.getElementById("passwordReg").value;
    let passwordRepeat = document.getElementById("passwordRepeat").value;
    name = '';
    password = '';
    passwordRepeat = '';
}

function logout() {
    let mainContainer = document.getElementById("mainContainer");
    mainContainer.innerHTML = "";
    mainContainer.innerHTML = loadLogin();
}