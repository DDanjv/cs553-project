import { fetchData } from "./main.js"
import { getCurrentUser, removeCurrentUser } from "./user.js";

let user = getCurrentUser()

// Form elements
let emailForm = document.getElementById("setting-edit-email")
let passwordForm = document.getElementById("setting-edit-password")
let deleteForm = document.getElementById("setting-edit-delete")
let usernameForm = document.getElementById("setting-edit-name")
const errorSection = document.getElementById("error")