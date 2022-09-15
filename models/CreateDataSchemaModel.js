const connection = require('../db')

function CreateDataConnection(email, firstName, lastName, callback) {

    connection.connection.query(
        "INSERT INTO TestToPass(email, firstname, lastname) VALUES(?, ?, ?)",
        [email, firstName, lastName],
        (err, results, fields) => {
            if (err) {
                console.log("Error while inserting into the database", err);
                callback("status400")
            }
        }
    )
}

module.exports = {
    CreateDataConnection
}