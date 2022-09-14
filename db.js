const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // XXAMP
    database: 'test_mysql',
    port: 3306,
});
   
connection.connect((err, connection) => {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as server');

});

module.exports = { connection };
