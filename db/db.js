//this method saves to mongoDB
const { default: mongoose } = require('mongoose');
const Registration = require('../api/models/registration');

const postRegistration = async (req) =>{
    const registration = new Registration({
        _id: mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        age: req.body.age,
        gender: req.body.gender,
        consent: req.body.consent,
        bio: req.body.bio
    });

    //calls to mongoDB are asynchronous
    return await registration.save();
};
module.exports = postRegistration;