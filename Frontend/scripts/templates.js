

function loadLogin() {
    return /*html*/ ` 
    <div class="loginArea">
            <span>Wellcome Back </span>
        
            <form id="loginForm" class="form">
                <input class="input" type="text" placeholder="Name" id="usernameLogin" required>
                <input class="input" type="password" name="password" id="passwordLogin" placeholder="Password" required>
                <a onclick="loadRegisterContent()">Registry</a>                
                <input class="btn" type="submit" value="Sign in">
            </form>
        </div>
    `;
}

function loadRegister() {
    return /*html*/ `<div class="register" onload="clearValues()">
            <img onclick="loadLoginContent()" src="/Frontend/img/arrow_left.png" alt="arrow left">
            <span>Create Account</span>
            <form id="registForm" class="registform" onsubmit="return registerUser(event)" method="post">
                <input class="input" type="text" id="username" placeholder="Username" required>
                <input class="input" type="password" name="password" id="passwordReg" placeholder="Password" required>
                <input class="input" type="password" name="password" id="passwordRepeat" placeholder=" Repeat Password" required>
                <button class="btn" type="submit">Register</button>
            </form>
        </div>`;
}

