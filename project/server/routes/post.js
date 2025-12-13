const express = require("express")
const Post = require("../models/post")
const router = express.Router()


router

.post('/createPost',async (req,res) => {
    try {
        const post = await Post.createPost(req.body.user_id,req.body.title,req.body.content)

        if(!req.body.title){
            return res.status(400).send({ message: "exist already" });
        }
        res.send(post)
    } catch (error) {
        res.status(500).send({ message: err.message });
    }
})

.get('/getPost',async (req,res) => {
    try {
        const post = await Post.getPost(req.body.id)
        res.send(post)
        
    } catch (error) {
        res.status(500).send({ message: err.message });
    }
})

.get('/getAllPost',async (req,res) => {
    try {
        const posts = await Post.getAllPosts()
        console.log(posts)
        res.send(posts)
        
    } catch (error) {
        res.status(500).send({ message: err.message });
    }
})

.put('/editTitle',async (req,res) => {
    try {
        const post = await Post.editPostTitle(req.body.id, req.body.newTitle)
        res.send(post)
        
    } catch (error) {
        res.status(500).send({ message: err.message });
    }
})

.put('/editPost',async (req,res) => {
    try {
        const post = await Post.editPostContent(req.body.id, req.body.newContent)
        res.send(post)
        
    } catch (error) {
        res.status(500).send({ message: err.message });
    }
})

.delete('/deletePost',async (req,res) => {
    try {
        const post = await Post.deletePost(req.body.id)
        res.send("poost del")
        
    } catch (error) {
        res.status(500).send({ message: err.message });
    }
})

module.exports = router
