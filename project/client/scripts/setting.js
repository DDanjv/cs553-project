import { fetchData , navbar } from "./main.js"
import { getCurrentUser, removeCurrentUser, setCurrentUser } from "./user.js";

let user = getCurrentUser()
navbar()

// Form elements
let emailForm = document.getElementById("setting-edit-email")
let passwordForm = document.getElementById("setting-edit-password")
let deleteForm = document.getElementById("setting-edit-delete")
let usernameForm = document.getElementById("setting-edit-name")
const errorSection = document.getElementById("error")

if(!user){
    window.location.href = "login.html"
}

if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        editUserEmail(emailForm[0].value);
    });
}

if (passwordForm) {
    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        editUserPassword(
            passwordForm[0].value,
            passwordForm[1].value
        );
    });
}

if (deleteForm) {
    deleteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        deleteUser(deleteForm[0].value);
    });
}

if (usernameForm) {
    usernameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        editUserName(usernameForm[0].value);
    });
}

function editUserName(newUsername) {
    fetchData("/user/editUserName", {id: user.id, newUsername: newUsername}, "PUT")
        .then(data => {
            console.log(data)
            user.Username = newUsername

            setCurrentUser(user)
            localStorage.setItem("currentUser", JSON.stringify(user))
            navbar()
        })
        .catch(err => {
            if (errorSection) errorSection.innerText = err.message;
            else console.error(err);
        });
}
function editUserEmail(id, newEmail) {
    fetchData("/user/editUserEmail", {id: user.id, newEmail: newEmail}, "PUT")
        .then(data => {
            console.log(data)
            user.Email = newEmail

            setCurrentUser(user)
            localStorage.setItem("currentUser", JSON.stringify(user))
        })
        .catch(err => {
            if (errorSection) errorSection.innerText = err.message;
            else console.error(err);
        });
    
    
}

function editUserPassword(password, newPassword) {
    console.log(password, newPassword)
    fetchData("/user/editUserPassword", {id: user.id, password: password, newPassword: newPassword}, "PUT")
        .then(data => {
            console.log(data)

        })
        .catch(err => {
            if (errorSection) errorSection.innerText = err.message;
            else console.error(err);
        });
    
}
function deleteUser(password) {
    fetchData("/user/deleteUser/", user.id, "DELETE")
        .then(data => {
            console.log(data)
            //update current user info
            removeCurrentUser()
            window.location.href = "register.html"
        })
        .catch(err => {
            if (errorSection) errorSection.innerText = err.message;
            else console.error(err);
        });
    
}