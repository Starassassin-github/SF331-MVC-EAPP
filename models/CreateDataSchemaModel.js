const connection = require('../db')

function CreateDataConnection(email, firstName, lastName, req, res) {

    connection.connection.query(
        "INSERT INTO TestToPass(email, firstname, lastname) VALUES(?, ?, ?)",
        [email, firstName, lastName],
        (err, results, fields) => {
            if (err) {
                console.log("Error while inserting into the database", err);
                return res.status(400).send();
            }
            return res.status(201).json({ message: `Successfully Created! email:${email} has been added!` })
        }
    )
}

module.exports = {
    CreateDataConnection
}