const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
        trim : true,
        minlength : 3,
        maxlength : 15
    },
    lastname : {
        type : String,
        trim : true,
        minlength : 2
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        match : [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    mobilenumber : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        match : [/^\d{10}$/, 'The mobile number must be 10 charachters']
    },
    age : {
        type : Number,
        min : [18, 'Age must be 18 or greater than 18']
    },
    address : {
        type : String,
        trim : true
    },
    role : {
        type : String,
        enum : ['admin', 'user', 'moderator']
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        match: [/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/, 'Password must contain at least one letter, one number, and one special character']

    },
}, { timestamps : true });


module.exports = mongoose.model('user', userSchema);