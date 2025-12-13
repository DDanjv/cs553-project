import { fetchData } from "./main.js"

var loginform = document.getElementById("login")
if(loginform){
    loginform.addEventListener('submit', login)
}
function login(e) {
    console.log(loginform)
    e.preventDefault()
    //find this method easier to read
    var username = loginform[0].value
    var password = loginform[1].value
    if(password !== ""){
        const user = {
            Username: username,
            Password: password
        }
        let userJSON = JSON.stringify(user) 
        console.log(JSON.parse(userJSON))

        fetchData("/user/login", user, "POST")
        .then(data => {
            if(!data.message) {
            setCurrentUser(data)
            window.location.href = "post.html"
            }
        })
        .catch(err => {
            let errorSection = document.getElementById("error")
            errorSection.innerText = err.message
        })


        if(document.querySelector("h1") === null){
            var para = document.createElement("h1")
            var  txt = document.createTextNode("welcome")
            para.appendChild(txt)
            //found this method insert is better for my sturtce type at times 
            //var element = document.querySelector("for:nth-child(2)")
            // base input document.body.appendChild(para);
            loginform.parentNode.insertBefore(para,loginform);

        }else{
            document.querySelector("h1").innerHTML = "welcome ."
        }

        username = loginform[0].value=""
        password = loginform[1].value=""

    }
    else {
        if(document.querySelector("h1") === null){
            var para = document.createElement("h1")
            var  txt = document.createTextNode("bye")
            para.appendChild(txt)
            //found this method insert is better for my sturtce type at times 
            //var element = document.querySelector("for:nth-child(2)")
            // base input document.body.appendChild(para);
            loginform.parentNode.insertBefore(para,loginform);

        }else{
            document.querySelector("h1").innerHTML = "bye ."
        }
    }
    password = loginform[0].value=""
    password = loginform[1].value=""

    
}

var registerform = document.getElementById("register-form")
if(registerform){
    registerform.addEventListener('submit', register)
}
function register(e) {
    console.log("register")
    e.preventDefault()
    //find this method easier to read
    var username = registerform[0].value
    var email = registerform[1].value
    var password = registerform[2].value
    var repassword = registerform[3].value
    console.log(username,email,password,repassword)
    if(password === repassword && password !== "" && repassword !== ""){
        const user = {
            Username: username,
            Email: email,
            Password: password
        }
        let userJSON = JSON.stringify(user) 
        console.log(JSON.parse(userJSON))

        fetchData("/user/createUser", user, "POST")
        .then(data => {
            if(!data.message) {
            setCurrentUser(data)
            window.location.href = "login.html"
            }
        })
        .catch(err => {
            let errorSection = document.getElementById("error")
            errorSection.innerText = err.message
        })

        
        if(document.querySelector("h1") === null){
            var para = document.createElement("h1")
            var  txt = document.createTextNode("welcome")
            para.appendChild(txt)
            //found this method insert is better for my sturtce type at times 
            //var element = document.querySelector("for:nth-child(2)")
            // base input document.body.appendChild(para);
            document.body.insertBefore(para,registerform);

        }else{
            document.querySelector("h1").innerHTML = "welcome ."
        }



        email = registerform[1].value=""
        password = registerform[2].value=""
        repassword = registerform[3].value=""

    }
    else {    
        if(document.querySelector("h1") === null){
            var para = document.createElement("h1")
            var  txt = document.createTextNode("try again")
            para.appendChild(txt)
            //found this method insert is better for my sturtce type at times 
            //var element = document.querySelector("for:nth-child(2)")
            // base input document.body.appendChild(para);
            document.body.insertBefore(para,registerform);

        }else{
            document.querySelector("h1").innerHTML = "welcome ."
        }
    }
    password = registerform[2].value=""
    repassword =registerform[3].value=""

    
}

export function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'))
}
// example accessing userId for second entity
// let currentUser = getCurrentUser()
// let userId = currentUser.userId

export function removeCurrentUser() {
  localStorage.removeItem('user')
  window.location.href = "login.html"
}

