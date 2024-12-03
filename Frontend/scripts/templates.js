

function loadLogin() {
    return  ` 
    <div class="loginArea">
            <span>Wellcome Back </span>
        
            <form id="loginForm" class="form">
                <input class="input" type="text" placeholder="Name" required>
                <input class="input" type="password" name="password" id="password" placeholder="Password" required>
                <a onclick="loadRegisterContent()">Registry</a>                
                <input class="btn" type="submit" value="Sign in">
            </form>
        </div>
    `;
}

function loadRegister() {
    return `<div class="register">
            <img onclick="loadLoginContent()" src="/Frontend/img/arrow_left.png" alt="arrow left">
            <span>Create Account</span>
            <form id="registForm" class="registform">
                <input class="input" type="text" placeholder="Username" required>
                <input class="input" type="password" name="password" id="password" placeholder="Password" required>
                <input class="input" type="password" name="password" id="passwordRepeat" placeholder=" Repeat Password" required>
                <input class="btn" type="submit" value="Register">
            </form>
        </div>`;
}

