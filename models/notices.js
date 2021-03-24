const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noticesSchema = new Schema ({
    title : {
        type: String,
        trim: true
    },
    date : {
        type: String
    },
    description : {
        type: String,
        trim: true
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('Notice', noticesSchema);