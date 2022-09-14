// route management
const express = require('express');
const router = express.Router();


// models
const { CreateDataConnection } = require('../models/CreateDataSchemaModel');
const dataSchemaModel = require('../models/dataInputSchemaModel');
const { dataQueryModel } = require('../models/QueryDataSchemaModel');


// GET Routes
router.get("/", async (req, res) => {
    try { 
        dataQueryModel(req, res) 
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
        CreateDataConnection(email, firstName, lastName, req, res);
        
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});


module.exports = router