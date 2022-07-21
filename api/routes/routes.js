const express = require("express");
const req = require('express/lib/request');
const router = express.Router();
const postRegistration = require("../../db/db");

router.get("/", ()=>{
    res.status(200).json({
        message: 'Server is up',
        method: req.method, 
    });
});


router.post("/registration", (req,res,next)=>{
    //note: result is the response from the db.js method
    //res is the result this post method is sending back
    //this has a then, because postRegistration is async 

    //calls the method to save the request data
    //then creates a json containing the data that got saved

    //saves under accounts/registrations because .env logs us into...
    //mongodb://localhost:27017/accounts
    //and then the schema is exported as a model named "Registration"
    postRegistration(req).then(result =>{
        res.status(200).json({
            message: "Registration Saved",
            status: 200,
            registration:{
                firstName: result.firstName,
                lastName: result.lastName,
                address: result.address,
                city: result.city,
                state: result.state,
                zipcode: result.zipcode,
                age: result.age,
                gender: result.gender,
                consent: result.consent,
                bio: result.bio,
                metadata:{
                    hostname: req.hostname,
                    method: req.method,
                },
            },
        });
    }).catch(err => {
        res.status(500).json({
            message: "Registration Failed",
            status: 500,
            error:{
                message: err.message,
                metadata:{
                    hostname: req.hostname,
                    method: req.method,
                },
            },
        });
    });
})



module.exports = router;