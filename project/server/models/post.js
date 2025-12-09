const mysql = require('mysql2')
const con = require("./db_connect")

async function createPostTable() {
    let sql = 
        'CREATE TABLE IF NOT EXISTS posts ( id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, title VARCHAR(100) NOT NULL, content TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES User(id) );'
    await con.query(sql)
}
createPostTable()

//create post
async function createPost(user_id, title, content) {
    let sql = 'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?);'
    return await con.query(sql, [user_id, title, content])
}

//get posts
async function getAllPosts() {
    let sql = 'SELECT * FROM posts;'
    return await con.query(sql)
}
async function getPost(id) {
    let sql = 'SELECT * FROM posts WHERE id = ?;'
    return await con.query(sql, [id])
}

//edit post
async function editPostTitle(id, newTitle) {
    let sql = 'UPDATE posts SET title = ? WHERE id = ?;'
    return await con.query(sql, [newTitle, id])
}
async function editPostContent(id, newContent) {
    let sql = 'UPDATE posts SET content = ? WHERE id = ?;'
    return await con.query(sql, [newContent, id])
}

//delete post
async function deletePost(id) {
    let sql = 'DELETE FROM posts WHERE id = ?;'
    return await con.query(sql, [id])
}

module.exports = {
    createPost,
    getAllPosts,
    getPost,
    editPostTitle,
    editPostContent,
    deletePost
}
