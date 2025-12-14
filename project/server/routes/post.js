const express = require("express")
const Post = require("../models/post")
const { con } = require("../models/db_connect")
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
        const post = await Post.getPost(req.query.id)
        res.send(post)
        
    } catch (error) {
        res.status(500).send({ message: err.message });
    }
})
.get('/getUserPosts',async (req,res) => {
    try {
        const posts = await Post.getPostsByUserId(req.query.user_id)
        res.send(posts)
        
    } catch (error) {
        res.status(500).send({ message: err.message });
    }
})

.get('/getAllPost',async (req,res) => {
    try {
        const posts = await Post.getAllPosts()
        //console.log(posts)
        res.send(posts)
        
    } catch (error) {
        res.status(500).send({ message: err.message });
    }
})

.put('/editTitle',async (req,res) => {
    try {
        const post = await Post.editPostTitle(req.body.id, req.body.newTitle, req.body.user_id)
        res.send(post)
        
    } catch (error) {
        res.status(500).send({ message: err.message });
    }
})

.put('/editPostContent',async (req,res) => {
    try {
        const post = await Post.editPostContent(req.body.id, req.body.newContent, req.body.user_id)
        res.send(post)
        
    } catch (error) {
        res.status(500).send({ message: err.message });
    }
})

.delete('/deletePost/:id',async (req,res) => {
    try {
        console.log("Delete request received for id:", req.params.id);
        const post = await Post.deletePost(req.params.id)
        res.json({ message: "post deleted" });

        
    } catch (error) {
        res.status(500).send({ message: err.message });
    }
})

module.exports = router
