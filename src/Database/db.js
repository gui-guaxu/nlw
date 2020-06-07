// Import Sqlite Dependency

const sqlite3 = require("sqlite3").verbose()

//Create Database Object

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
// Use the Database object for our operations

db.serialize(() => {
    
    // with SQL commands
    //Create a sheet
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)

    // // Insert Data
    // const query =`
    //         INSERT INTO places (
    //             image,
    //             name,
    //             address,
    //             address2,
    //             state,
    //             city,
    //             items
    //         ) VALUES (?, ?, ?, ?, ?, ?, ?);
    // `

    // const values = [
    //     "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    //     "Papersider",
    //     "Guilerme Gemballa, Jardim América",
    //     "Numero 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Resíduos Eletrônicos, Lâmpadas"
    // ]

    // function afterInsertData(err) {
    //     if(err) {
    //         return console.log(err)
    //     }
        
    //     console.log("Cadastrado com sucesso")
    //     console.log(this)
    
    // }

    //  db.run(query, values, afterInsertData)

    // Consult Data in sheet
    // db.all(`SELECT name FROM places`,function(err, rows) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log("Aqui estão seus registros")
    //     console.log(rows)
    // })

    // Delete data in sheet
    
    // db.run(`DELETE FROM places WHERE id = ?`, [4], function(err) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log("Registro deletado com Sucesso")
    // })
})