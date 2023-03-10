const express = require('express');
const path = require('path');
const config = require('./config');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../routes');


// get app
const app = express();
//logger
console.log(config.env,"checking environment");
if(config.env==='development'){
    console.log("Haan hai")
    app.use(logger('dev'));
}
// get dist folder
const distDir = path.join('../../dist');

// use dist folder as hosting folder by express
app.use(express.static(distDir));

// parsing from api
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// secure app
app.use(helmet());

// allow aors
app.use(cors());

//api routes
app.use('/api/',routes);

// serve the index.html
app.get('*',(req,res)=> res.sendFile(path.join(distDir,'index.html')));

module.exports = app;