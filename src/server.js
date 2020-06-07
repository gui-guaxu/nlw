const express = require("express")
const server = express()

// Take the Database
const db = require("./Database/db.js")

//Confic public directory
server.use(express.static("public"))

// Enable req.body in the application
server.use(express.urlencoded({extended: true}))

//Utilizando Template Engine
const nonjucks = require("nunjucks")
nonjucks.configure("src/views", {
    express: server,
    noCache: true
})


//Config waypaths of the application
//Home Page
//req:requisition
//res:Resposta - Anwser
server.get("/", (req, res) =>{
    return res.render("index.html")
})

server.get("/create-point", (req, res) =>{
    
    // req.query: Query Strings from URL
    // req.query

    return res.render("create-point.html")
})

server.post("/save-point", (req,res) => {

    //req.body: Form body
    // console.log(req.body)

    //Insert data to Database
    const query =`
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `

    const values = [
       req.body.image,
       req.body.name,
       req.body.address,
       req.body.address2,
       req.body.state,
       req.body.city,
       req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no Cadastro")
        }
        
        console.log("Cadastrado com sucesso")
        console.log(this)
    
        return res.render("create-point.html", {saved: true})
    }

     db.run(query, values, afterInsertData)

    
})


server.get("/search", (req, res) =>{

    const search = req.query.search

    if(search == "") {
        //Empty search
        return res.render("search-results.html", {total: 0})

    }
    //Take data from Database
        // Consult data in sheet
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`,function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        console.log("Aqui estão seus registros")
        console.log(rows)

        //Show HTML page with Database data
        return res.render("search-results.html", {places: rows, total})
    })
  
})

//Turn on the server
server.listen(3000)