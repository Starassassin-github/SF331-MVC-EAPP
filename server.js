const express = require('express');
const routerController = require('./controllers/index');

require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use(express.json());
app.use('/', routerController);



// Listen Port
app.listen(9753, () => {
    console.log(`running on port 9753`);
});