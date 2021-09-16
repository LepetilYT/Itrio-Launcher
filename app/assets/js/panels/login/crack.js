const { auth, config } = require('./assets/js/utils.js');
const fs = require("fs-extra")
const dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME)

document.querySelector(`.password`).style.display = "none"
document.querySelector(`.microsoft-btn`).style.display = "none"
document.getElementsByName('pseudo')[0].placeholder ='nom d\'utilisateur';

document.querySelector(".login-btn").addEventListener("click", () => {
    if (document.querySelector(".pseudo").value == ""){
        document.querySelector(".info-login").innerHTML = "Entrez votre nom d'utilisateur"
        document.querySelector(".info-login").style.color = "red";
        document.querySelector(".info-login").style.display = "block"
        return;
    }

    document.querySelector(".login-btn").disabled = true
    document.querySelector(".pseudo").disabled = true
    document.querySelector(".info-login").style.color = "#000000";
    document.querySelector(".info-login").innerHTML = "Connexion en cours..."
    document.querySelector(".info-login").style.display = "block"
    auth.loginMojang(document.querySelector(".pseudo").value).then(user => {
        config.config().then(res => {
            if(document.querySelector(".loginRemember").checked == true){
                const file = require(`${dataDirectory}/${res.dataDirectory}/config.json`);
                file.Login.Account = {"Crack":{"User": user}} 
                fs.writeFileSync(`${dataDirectory}/${res.dataDirectory}/config.json`, JSON.stringify(file, true, 4), 'UTF-8')
            }
        })
        changePanel("login", "home")
    }).catch (err => {
        document.querySelector(".login-btn").disabled = false
        document.querySelector(".pseudo").disabled = false
        document.querySelector(".info-login").innerHTML = "error"
        document.querySelector(".info-login").style.color = "red";
        document.querySelector(".info-login").style.display = "block"
    })
})

document.addEventListener('keydown', function (e) {
    if(e.key === 'Enter'){
        var click = new Event('click')
        document.querySelector(".login-btn").dispatchEvent(click)
    }
})