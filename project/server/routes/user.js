const express = require("express")
const User = require("../models/user")
const router = express.Router()

router

.get('/getUsers', async (req, res) => {
  try {
    const user = await User.getUser(req.body.id)
    res.send(user)
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.delete('/deleteUser', async (req, res) => {
  try {
    const result = await User.deleteUser(req.body.id)

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
})

.put('/editUserName', async (req, res) => {
  try{
    const user = User.editUserName(id, newUsername)
  }
  catch(err){
    res.status(500).send({ message: err.message });
  }
})

.put('/editUserEmail', async (req, res) => {
  try{
    const user = User.editUserEmail(req.body.id, req.body.newEmail)
  }
  catch(err){
    res.status(500).send({ message: err.message });
  }
})

.put('/editUserPassword', async (req, res) => {
  try{
    const user = User.editUserPaswword(req.body.id, req.body.password, req.body.newPassword)
  }
  catch(err){
    res.status(500).send({ message: err.message });
  }
})
.delete('/deleteUser', async (req, res) => {
  try{
    const user = User.deleteUser(req.body.id)
  }
  catch(err){
    res.status(500).send({ message: err.message });
  }
})

.post('/createUser',async (req,res) => {
  try{
    const user = await User.createUser(req.body.Username,req.body.Email,req.body.Password)

    if(!user || result.affectedRows === 0){
      return res.status(400).send({ message: "invalid user" });
    }
    res.send({
      id: result.insertId,
      Username,
      Email
    });
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
})

.post('/login', async(req, res) => {
  try {  

    const user = await User.login(req.body.Username, req.body.Password); 

    if (!user){
      return res.status(401).send({ message: "Invalid login" });
    }

    res.send({
      id: result.insertId,
      Username,
      Email
    });


  } catch (err) {
    res.status(500).send({ message: err.message });
  }
})

module.exports = router