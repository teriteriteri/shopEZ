//get installed dependencies
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//import a local file
const config = require('./config');

//use dependencies
const app = express();

//function to connect to MongoDB
mongoose.connect(config.database, { useNewUrlParser: true }, err => {
    if(err){
        console.log(err);
    } else {
        console.log("Connected to the database!");
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})); // false to read img in future
app.use(morgan('dev')); //log all requests on the terminal
app.use(cors()); //middle ware

//http route,  pass in (req, res, next) as call back funct with req, res, next as params 
app.get('/', (req, res, next) => {
    //return json object
    res.json({
        user:'Teri'
    });
});

app.listen(config.port, err => {
    console.log('App is running on port:' + config.port);
});