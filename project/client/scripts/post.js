import { fetchData } from "./main.js"

console.log("post")
var postform = document.getElementById("post-maker")
var postViewer = document.getElementById("post-viewer")
getPosts()



console.log(postform)
if(postform){
    postform.addEventListener('submit', post)
}

function post(e) {
    e.preventDefault()
    //find this method easier to read
    var title = postform[0].value
    var writepost = postform[1].value
    if(title !== "" && writepost !== ""){
        const post = {
            title: title,
            writepost: writepost
        }
        let userJSON = JSON.stringify(post) 
        console.log(JSON.parse(userJSON))

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
    fetchData("/post/getAllPost", '', "GET")
            .then(data => {
                for (let index = 0; index < data.length; index++) {
                   postViewer.innerHTML += `
                    <div>
                        <p> ${data[index].title}</p>
                        <p> ${data[index].content} </p>
                    </div>
                   `
                    
                }
            })
            .catch(err => {
                let errorSection = document.getElementById("error")
                errorSection.innerText = err.message
            })
}


