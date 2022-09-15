const connection = require('../db')


var dataModel = this;


function dataQueryModel(callback) {

    dataModel.data = [];

    connection.connection.query("SELECT * FROM testInput", (error, results, fields) => {

        // results is Array / concat array
        results = [...results]
        var dataQuery = Object.values(JSON.parse(JSON.stringify(results)));
        // callback and copy array return to controller
        callback(dataModel.data = dataQuery.slice());
    }
    )
}

module.exports = {
    dataQueryModel
}


