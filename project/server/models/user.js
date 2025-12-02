const mysql = require('mysql2')
const con = require("./db_connect")


//create table
async function createUserTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS User (
      id INT AUTO_INCREMENT PRIMARY KEY,
      Username VARCHAR(255) NOT NULL UNIQUE,
      Email VARCHAR(255) NOT NULL UNIQUE,
      Password VARCHAR(255) NOT NULL
      );
  `
    await con.query(sql)
}

// creates table if not there
createUserTable()
// pass separately
//crud

//get functions

async function getAllUsers() {
    let sql = `
    SELECT * FROM User;
  `
    return await con.query(sql)
}
async function getUser(id) {
    let sql = "SELECT * FROM User WHERE id = ?;";
    return await con.query(sql, [id]);
}


//create uses

async function createUser(Username, Email, Password) {
    let sql = "INSERT INTO User (Username, Email, Password) VALUES (?, ?, ?);";
    return await con.query(sql, [Username, Email, Password]);
}


//edit user

async function editUserName(id, newUsername) {
    let sql = "UPDATE User SET Username = ? WHERE id = ?;";
    return await con.query(sql, [newUsername, id]);
}
async function editUserEmail(id, newEmail) {
    let sql = "UPDATE User SET Email = ? WHERE id = ?;";
    return await con.query(sql, [newEmail, id]);
}
async function editUserPaswword(id, password, newPassword) {
    if (password === newPassword) {
        throw new Error("New password cannot be the same as the old password.");
    }
    let sql = "UPDATE User SET Password = ? WHERE id = ?;";
    return await con.query(sql, [newPassword, id]);
}

//login

async function login(Username, Password) {
    let sql = "SELECT * FROM User WHERE Username = ? AND Password = ?;"
    let [cuser] = await con.query(sql, [Username, Password])
    return cuser[0]
}

//delete user

async function deleteUser(id) {
    let sql = "DELETE FROM User WHERE id = ?;";
    return await con.query(sql, [id]);
}


module.exports = { getAllUsers, 
                    login, 
                    getUser, 
                    createUser, 
                    editUserName, 
                    editUserEmail, 
                    editUserPaswword };





