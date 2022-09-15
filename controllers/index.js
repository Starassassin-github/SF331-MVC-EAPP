// route management
const express = require('express');
const router = express.Router();


// models
const { CreateDataConnection } = require('../models/CreateDataSchemaModel');
const dataSchemaModel = require('../models/dataInputSchemaModel');
const { dataQueryModel } = require('../models/QueryDataSchemaModel');


// GET Routes
router.get("/", (req, res) => {
    try { 
    dataQueryModel(function(callback){
        return res.render('../views/index.ejs', { results: callback })
    }); 
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
}
)


// CREATE Routes
router.post('/create', async (req, res) => {

    // This is View Data from LDAP SERVER 
    // Preparing This method to Store in Local Database
    const obj = JSON.parse(JSON.stringify(req.body));

    const parseObj = obj.data;

    // Preparing Data Obj to Store on Local Database
    const dataReducer = new dataSchemaModel(parseObj);
    const [email, firstName, lastName] = dataReducer.reducerSchema();

    try {
        CreateDataConnection(email, firstName, lastName, function(callback){
            if (callback == 'status400') {
                return res.status(400).send();
            }
        });
        return res.status(201).json({ message: `Successfully Created! email:${email} has been added!` })
        
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});


module.exports = router