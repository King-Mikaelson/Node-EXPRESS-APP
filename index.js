const express = require("express")
const app = express()
const users = require("./users.json")
const fs = require("fs")




app.use(express.json());
app.use(express.urlencoded());

app.get('/', function(req, res) {
    res.send("helloo world")
})
app.get("/books", function(req, res) {
    res.send("there are 10 books in the store")
})
app.post("/", function(req, res) {
    res.send("this is a post request")
})

app.get("/users", (req, res) => {
    // fetch all users
    return res.json({users})
})

app.post("/users", (req, res) => {
    console.log(req.body.newUser);
    // create a new user from client request 
    // and save new user to exisiting Database
    users.push(req.body.newUser);
    // save updated data to users.json
    // stringify the file users.json
    let stringedData = JSON.stringify(users, null, 2);
    fs.writeFile("users.json", stringedData, (err) => {
        if(err) {
            return res.status(500).json({message :  err})
        }
    })
    // Send back a response to client
    return res.status(200).json({message : "new user created"})

})

// Fetch a single user
app.get("/users/:id", (req, res) => {
    // fetvh req params.id
    let id = req.params.id;
    // find user with id
    let foundUser = users.find(user => {
        return String(user.id) === id
    })
    // return user object as resonse
    // return a 404 error if user not found
    if (foundUser) {
    return res.status(200).json({user : foundUser})}
})

app.listen("3000", function () {
    console.log("server is up and running");
})