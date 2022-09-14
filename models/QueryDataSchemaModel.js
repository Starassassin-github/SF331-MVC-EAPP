const connection = require('../db')


function dataQueryModel(req, res) {

    connection.connection.query("SELECT * FROM testInput", function (error, results, fields) {
        if (error) throw error;
      
        // results is Array / concat array
        results = [...results]
        dataQuery = Object.values(JSON.parse(JSON.stringify(results)));
        return res.render('../views/index.ejs', { results: dataQuery })
    });
}


module.exports = {
    dataQueryModel
}


