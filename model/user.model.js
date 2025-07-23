const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
   
    password: {
        type: String,
        required: true
    },  
} ,
 {timestamps:true , get: time => time.toDateString()}
);



module.exports = mongoose.model("User", userSchema);
