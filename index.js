const cors = require("cors")
require("dotenv").config()
require("./db/config")
const express = require("express");
const hbs = require("express-handlebars");
const path = require("path")
const port = process.env.port || 3030
const server = express();
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cors())
server.use(express.static("storage"))

// static files de bootstrap
server.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
server.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))


server.set("view engine", "hbs");
server.set("views", path.join(__dirname, "views"))
server.engine("hbs", hbs.engine({ extname: "hbs"}))

server.listen(port, (err) => {
    err ? console.warn(`Hubo un error {
        message: ${err} }`) : console.log(`Servidor corre en http://localhost:${port}`)
})


//welcome endpoint
server.get("/", (req, res) => {
    const content = `
    <h1>Nuestra API con Express</h1>
    <pre>Bienvenidos a nuestra API construida con Node JS y el framework Express</pre>
    `
    res.send(content)
})

//Routing for endpoint /users
server.use("/users", require("./users/usersRoute"))


//Routing for endpoint /posts
server.use("/posts", require("./posts/postsRoute"))

//catch all route (404)
server.use((req, res, next) => {
    let error = new Error("Resource not found");
    error.status = 404
    next(error)
})

//Error handler
server.use((error, req, res, next) => {
    if (!error.status) {
        error.status = 500
    }
    res.status(error.status).json({ status: error.status, message: error.message })
})


//clase 10 01:20:20 trabado por que no puedo crear mi pag en heroku