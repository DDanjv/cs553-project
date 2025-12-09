const express = require("express");
const User = require("../models/user");
const router = express.Router();

router
  // get
  .get('/getUser', async (req, res) => {
    try {
      const user = await User.getUser(req.query.id);

      const usersafe = [{id: user[0].id, Username: user[0].Username, Email: user[0].Email}];
      console.log(usersafe[0].Username)
      
      res.send(usersafe[0]);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })

  // Delete 
  .delete('/deleteUser', async (req, res) => {
    try {
      const result = await User.deleteUser(req.body.id);

      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "User not found" });
      }

      res.send({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  })

  //edit
  .put('/editUserName', async (req, res) => {
    try {
      const user = await User.editUserName(req.body.id, req.body.newUsername);
      res.send(user);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  })

  .put('/editUserEmail', async (req, res) => {
    console.log(req.body)
    try {
      const user = await User.editUserEmail(req.body.id, req.body.newEmail);
      res.send(user);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  })

  .put('/editUserPassword', async (req, res) => {
    try {
      const user = await User.editUserPassword(req.body.id, req.body.password, req.body.newPassword);
      res.send(user);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  })

  // Create a user
  .post('/createUser', async (req, res) => {
    try {
      const user = await User.createUser(req.body.Username, req.body.Email, req.body.Password);

      if (!user || user.affectedRows === 0) {
        return res.status(400).send({ message: "Invalid user" });
      }

      res.send({
        id: user.id,
        Username: req.body.Username,
        Email: req.body.Email
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  })

  // User login
  .post('/login', async (req, res) => {
    try {
      const user = await User.login(req.body.Username, req.body.Password);
      if (!user) {
        return res.status(401).send({ message: "Invalid login" });
      }
      const usersafe = [{id: user[0].id, Username: user[0].Username, Email: user[0].Email}];
      console.log(usersafe[0].Username)
      res.send(usersafe[0]);

    } catch (err) {
      res.status(500).send({ message: err.message });
    }
})

module.exports = router;