console.log("login")

var loginform = document.forms[0]
console.log(loginform)

if(loginform){
    loginform.addEventListener('submit', login)
}

function login(e) {
    e.preventDefault()
    //find this method easier to read
    var username = loginform[0].value
    var password = loginform[1].value
    if(password === password && password !== ""){
        const user = {
            username: username,
            password: password
        }
        let userJSON = JSON.stringify(user) 
        console.log(JSON.parse(userJSON))

        const url = '/login'
        const fetchOptions = { method: 'POST' } // base options
        fetch(url, Object.assign({}, fetchOptions, {
            headers: { 'Content-Type': 'application/json' },
            body: userJSON
        }))
        .then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))
        .then(data => {
            console.log('login response', data)
            if (data && data.token) {
                // store token/session as needed
                localStorage.setItem('authToken', data.token)
            }
        })
        .catch(err => {
            console.error('login request failed', err)
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
