import { fetchData, navbar } from "./main.js"
import { getCurrentUser, removeCurrentUser } from "./user.js";

let user = getCurrentUser()
console.log(user)

navbar()

var postform = document.getElementById("post-maker")
var postViewer = document.getElementById("post-viewer")
var postuser = document.getElementById("post-user")
var editform = document.getElementById("post-edit")
const errorSection = document.getElementById("error")
getPosts()
if(user){
    getUserPosts()
}else{
    window.location.href = "login.html"
}

if(postform){
    postform.addEventListener('submit', post)
}
if(editform){
    editform.addEventListener('submit', (e) => {
        e.preventDefault()
        var id = editform[0].value
        console.log(id)
        var newTitle = editform[1].value
        console.log(newTitle)
        var newContent = editform[2].value
        console.log(newContent)
        if(newTitle !== ""){
            editeditTitlePost(id, newTitle, user.id)
        }
        if(newContent !== ""){
            editeditContentPost(id, newContent, user.id)
        }
        editform[0].value = ""
        editform[1].value = ""
        editform[2].value = ""
    })
}


function post(e) {
    e.preventDefault()
    //find this method easier to read
    var title = postform[0].value
    var writepost = postform[1].value
    if(title !== "" && writepost !== ""){
        const post = {
            user_id: user.id,
            title: title,
            content: writepost
        }
        //let userJSON = JSON.stringify(post) 
        //console.log(JSON.parse(userJSON))

        fetchData("/post/createPost", post, "POST")
            .then(data => {
                console.log(data)
                getUserPosts();
                getPosts()
            })
            .catch(err => {
                if (errorSection) errorSection.innerText = err.message;
                else console.error(err);
            });

        if(document.querySelector("h1") === null){
            var para = document.createElement("h1")
            var  txt = document.createTextNode("posted")
            para.appendChild(txt)
            //found this method insert is better for my sturtce type at times 
            //var element = document.querySelector("for:nth-child(2)")
            // base input document.body.appendChild(para);
            postform.parentNode.insertBefore(para,postform);

        }else{
            document.querySelector("h1").innerHTML = "posted ."
        }

        title = postform[0].value=""
        writepost = postform[1].value=""

    }
    else {
        if(document.querySelector("h1") === null){
            var para = document.createElement("h1")
            var  txt = document.createTextNode("finish it :(")
            para.appendChild(txt)
            //found this method insert is better for my sturtce type at times 
            //var element = document.querySelector("for:nth-child(2)")
            // base input document.body.appendChild(para);
            postform.parentNode.insertBefore(para,postform);

        }else{
            document.querySelector("h1").innerHTML = "finish it :( ."
        }
    }
    title = postform[0].value=""
    writepost = postform[1].value=""

    
}

function getPosts() {
    postViewer.innerHTML = "";
    fetchData("/post/getAllPost", '', "GET")
            .then(data => {
                postViewer.innerHTML = "";
                for (let index = 0; index < data.length; index++) {

                   postViewer.innerHTML += `
                    <div class = "base-item">
                        <p> ${data[index].title}</p>
                        <p> ${data[index].content} </p>
                    </div>
                   `
                    
                }
            })
            .catch(err => {
                if (errorSection) errorSection.innerText = err.message;
                else console.error(err);
            });
}

function getUserPosts() {
    fetchData(`/post/getUserPosts`, `?user_id=${user.id}`, "GET")
            .then(data => {
                postuser.innerHTML = "";
                for (let index = 0; index < data.length; index++) {
                   const div = document.createElement("div");
                   div.className = "base-item-user";
                   div.innerHTML = `
                        <p> ${data[index].id} ${data[index].title}</p>
                        <p> ${data[index].content} </p>
                        <p class="base-button-delete">delete post</p>
                   `;
                   postuser.appendChild(div);
                   div.querySelector(".base-button-delete").addEventListener('click', () => {
                        deletePost(data[index].id)
                   });
                }
            })
            .catch(err => {
                if (errorSection) errorSection.innerText = err.message;
                else console.error(err);
            });
}
function deletePost(id) {
    console.log("Deleting post with id:", id);
    fetchData(`/post/deletePost/`, id, "DELETE")
        .then(data => {
            console.log(data);
            getUserPosts();
            getPosts()
        })
        .catch(err => {
            if (errorSection) errorSection.innerText = err.message;
            else console.error(err);
        });
}
function editeditContentPost(id, newContent) {
    const post = {
        id: id,
        newContent: newContent,
        user_id: user.id
    }
    console.log(post + " edited content post")
    fetchData("/post/editPostContent", post, "PUT")
        .then(data => {
            console.log(data);
            getUserPosts();
            getPosts()
        })
        .catch(err => {
            if (errorSection) errorSection.innerText = err.message;
            else console.error(err);
        });
}
function editeditTitlePost(id, newTitle) {
    const post = {
        id: id,
        newTitle: newTitle,
        user_id: user.id
    };
    console.log( JSON.stringify(post) )
    console.log(post +"title")
    fetchData("/post/editTitle", post, "PUT")
        .then(data => {
            console.log(data);
            getUserPosts();
            getPosts()
        })
        .catch(err => {
            if (errorSection) errorSection.innerText = err.message;
            else console.error(err);
        });
}

