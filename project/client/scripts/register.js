console.log("register")

var registerform = document.forms[0]

if(registerform){
    registerform.addEventListener('submit', register)
}

function register(e) {
    e.preventDefault()
    //find this method easier to read
    var username = registerform[0].value
    var email = registerform[1].value
    var password = registerform[2].value
    var repassword = registerform[3].value
    console.log(username,email,password,repassword)
    if(password === repassword && password !== "" && repassword !== ""){
        const user = {
            username: username,
            email: email,
            password: password
        }
        let userJSON = JSON.stringify(user) 
        console.log(JSON.parse(userJSON))

        
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
