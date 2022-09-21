// route management
const express = require('express');
const router = express.Router();

// models
const { CreateDataConnection } = require('../models/CreateDataSchemaModel');
const dataSchemaModel = require('../models/dataInputSchemaModel');
const { dataQueryModel } = require('../models/QueryDataSchemaModel');

// models data from microservice
const { getTodosFromMicroService } = require('../models/TodosMicroserviceSchema');
const { getUsersFromMicroService } = require('../models/UsersMicroserviceSchema');


// GET Routes
router.get("/", (req, res) => {

    try {
        // get Data from Model
        dataQueryModel(function(callback){
        // response data and show on View
        return res.render('../views/index.ejs', { results: callback })
        }); 
    }
    catch (err) {
        // display an error
        console.log(err);
        // response status if error and show on View
        return res.status(500).send();
    }

});


// CREATE Routes
router.post('/create', (req, res) => {

    // This is View Data from LDAP SERVER 
    // Preparing This method to Store in Local Database
    const obj = JSON.parse(JSON.stringify(req.body));

    const parseObj = obj.data;

    // Preparing Data Obj to Store on Local Database
    const dataReducer = new dataSchemaModel(parseObj);
    const [email, firstName, lastName] = dataReducer.reducerSchema();

    try {
        // get Data from Model
        CreateDataConnection(email, firstName, lastName, function(callback){
            if (callback == 'status400') {
                // response status 400 if error and show on View
                return res.status(400).send();
            }
        });
        // response data and show on View
        return res.status(201).json({ message: `Successfully Created! email:${email} has been added!` })
        
    } catch (err) {
        // display an error
        console.log(err);
        // response status if error and show on View
        return res.status(500).send();
    }

});

// API GET data from Microservice
router.get('/api/todos',(req,res) => {

    try {
        // Call Microservice with model to fetch data from microservice
        getTodosFromMicroService(function(callback) {
            // response json data
            return res.json(callback.data);
        });
    } catch (err) {
        // display an error
        console.log(err);
        // response status if error and show on View
        return res.status(500).send();
    } 

});

// API GET data from Microservice
router.get('/api/users',(req,res) => {

    try {
        // Call Microservice with model to fetch data from microservice
        getUsersFromMicroService(function(callback) {
            // response json data
            return res.json(callback.data);
        });
    } catch (err) {
        // display an error
        console.log(err);
        // response status if error and show on View
        return res.status(500).send();
    } 

});


module.exports = router