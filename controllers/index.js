// route management
const express = require('express');
const router = express.Router();

const connection = require('../models');


// GET Routes
router.get("/", (req, res) => {

    // Query Data from LDAP Server
    // View On Localhost
    try {
            connection.query("SELECT * FROM testInput", (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                // results is Array / concat array
                results = [...results]
                // Parsing Access Data to Object
                dataQuery = Object.values(JSON.parse(JSON.stringify(results)));
                res.render('../views/index.ejs', { results: results })
            })

    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

// CREATE Routes
router.post('/create', async (req, res) => {

    // This is View Data from LDAP SERVER 
    // Preparing This method to Store in Local Database
    const obj = JSON.parse(JSON.stringify(req.body));
    
    const parseObj = obj.data;
    const objArray = parseObj.split("|");

    // Preparing Data Obj to Store on Local Database
    const [ email, firstName, lastName ] = objArray;

    try {
        connection.query(
            "INSERT INTO TestToPass(email, firstname, lastname) VALUES(?, ?, ?)",
            [email, firstName, lastName],
            (err, results, fields) => {
                if (err) {
                    console.log("Error while inserting into the database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: `Successfully Created! email:${email} has been added!`})
            }
        )
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
});


module.exports = router