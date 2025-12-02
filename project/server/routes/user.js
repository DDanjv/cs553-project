// 1. import con to access database
const con = require("./db_connect")
// 2. create function that creates entity table if doesn't exist already
async function createUserTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS User (
      UserID INT NOT NULL AUTO_INCREMENT,
      Username VARCHAR(255) NOT NULL UNIQUE,
      Email VARCHAR(255) NOT NULL UNIQUE,
      Password VARCHAR(255) NOT NULL,
      CONSTRAINT userPK PRIMARY KEY(userID)
    );
  `
  await con.query(sql)
}
// 3. call function that creates table
createUserTable()

// 4. create CRUD functions
// READ for grabbing all users
async function getAllUsers() {
  let sql = `
    SELECT * FROM User;
  `
  return await con.query(sql)
}

/* Eventually will add all CRUD operations:
Create: Register function
Read: Login function
*/

// let user = {
//   username: "cathy123",
//   password: "icecream"
// }
async function login(user) {
  let sql = `
    SELECT * FROM User
    WHERE Username="${user.username}"
  `
  let cuser = await con.query(sql)
  return cuser[0]
}

/*
Update: Update password/name function
Delete: Delete user account function*/

/* We need to add each function we create to "module.exports", or 
   else cannot access the functions in our route files*/
// 5. export all functions so accessible by corresponding route file
module.exports = { getAllUsers, login }