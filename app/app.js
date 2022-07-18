const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();
const routes = require('../api/routes/routes');

app.use(express.urlencoded({extended:true}));
app.use(express.json());


//handles CORS
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE');
    }
    next();
});

app.use('/', routes);

//error handling middleware
app.use((req,res,next) => {
    const error = new Error('Not Found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status
        },
    });
});

mongoose.connect(process.env.db_url, (err)=>{
    if(err){
        console.error('Error', err.message);
    }
    else{
        console.log("MongoDB connected successfully");
    }
});

module.exports = app;