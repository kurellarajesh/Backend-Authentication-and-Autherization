const mongoose = require('mongoose');

const connectToDb = async() => {
    try {
        await mongoose.connect('mongodb+srv://kurellarajesh15:Node.jsPractice@authentication.fedar.mongodb.net/?retryWrites=true&w=majority&appName=Authentication');
        console.log("Mongo DB connected successfully");
    } catch(error){
        console.log("The error is", error);
    }
};


module.exports = connectToDb;