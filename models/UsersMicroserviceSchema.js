const axios = require('axios');

function getUsersFromMicroService(callback) {
    axios.get('https://eapp-service-sf341.onrender.com/users').then(
        response => {
            // callback to controller
            // response is javascript object
            callback(response);
        }
    );
};

module.exports = {
    getUsersFromMicroService  
};
