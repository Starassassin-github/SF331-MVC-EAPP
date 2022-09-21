const axios = require('axios');

function getTodosFromMicroService(callback) {
    axios.get('https://eapp-service-sf341.onrender.com/todos').then(
        response => {
            // callback to controller
            // response is javascript object
            callback(response);
        }
    );
};

module.exports = {
  getTodosFromMicroService  
};
