import { getCurrentUser, removeCurrentUser } from "./user.js";

//navbar implementation
let nav = document.querySelector(".nav-bar")
if(getCurrentUser()) {
  nav.innerHTML = `
    <a href="./post.html" class="nav-link">post</a>
    <a class="nav-link" id="logout">LOGOUT</a>
  `
} else {
  nav.innerHTML = `
    <a href="./login.html" class="nav-link">login</a>
    <a href="./register.html" class="nav-link">register</a>
  `
}

let logoutBtn = document.getElementById("logout")
if(logoutBtn) logoutBtn.addEventListener('click', removeCurrentUser)

// Fetch method implementation:
export async function fetchData(route = '', data = {}, methodType) {
  let response;
  if(methodType === 'GET'){
    response = await fetch(
      `http://localhost:3000${route}${data}`
    );
  }
  else{
    response = await fetch(`http://localhost:3000${route}`, {
      method: methodType, // *POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
  }
  console.log(response)
  if (response.ok) {
    return await response.json(); // parses JSON response into native JavaScript objects
  } else {
    throw await response.json();
  }
}
