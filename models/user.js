const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchame = Schema( {
    name: {
        type:String,
        trim:true
    },
    lastname: {
        type:String, 
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    role: String,
    active: Boolean,
    avatar: String
});

module.exports = mongoose.model("User", UserSchame);