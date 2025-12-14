import { fetchData } from "./main.js"
import { getCurrentUser, removeCurrentUser } from "./user.js";

let user = getCurrentUser()

// Form elements
let emailForm = document.getElementById("setting-edit-email")
let passwordForm = document.getElementById("setting-edit-password")
let deleteForm = document.getElementById("setting-edit-delete")
let usernameForm = document.getElementById("setting-edit-name")
const errorSection = document.getElementById("error")

if(!user){
    window.location.href = "login.html"
}

async function editUserName(params) {
    fetchData("/user/editUserName", {id: user.id, newUsername: params}, "PUT")
        .then(data => {
            console.log(data)
            //update current user info
            user.Username = params
            localStorage.setItem("currentUser", JSON.stringify(user))
        })
        .catch(err => {
            if (errorSection) errorSection.innerText = err.message;
            else console.error(err);
        });
}

async function editUserEmail(id, newEmail) {
    fetchData("/user/editUserEmail", {id: user.id, newUsername: params}, "PUT")
        .then(data => {
            console.log(data)
            //update current user info
            user.Username = params
            localStorage.setItem("currentUser", JSON.stringify(user))
        })
        .catch(err => {
            if (errorSection) errorSection.innerText = err.message;
            else console.error(err);
        });
    
    
}

async function editUserPassword(id, password, newPassword) {
    fetchData("/user/editUserPassword", {id: user.id, newUsername: params}, "PUT")
        .then(data => {
            console.log(data)
            //update current user info
            user.Username = params
            localStorage.setItem("currentUser", JSON.stringify(user))
        })
        .catch(err => {
            if (errorSection) errorSection.innerText = err.message;
            else console.error(err);
        });
    
}
async function deleteUser(password) {
    fetchData("/user/deleteUser/", user.id, "DELETE")
        .then(data => {
            console.log(data)
            //update current user info
            user.Username = params
            localStorage.setItem("currentUser", JSON.stringify(user))
        })
        .catch(err => {
            if (errorSection) errorSection.innerText = err.message;
            else console.error(err);
        });
    
}