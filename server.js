const express = require('express');
const router = require('./controllers/index');


require('./models');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use(express.json());
app.use('/', router);



// Listen Port
app.listen(9753, () => {
    console.log(`running on port 9753`);
});