const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const noticesSchema = new Schema ({
    title : {
        type: String,
        trim: true
    },
    date : {
        type: Date
    },
    description : {
        type: String,
        trim: true
    },
    image: {
        type: String
    }
});

noticesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Notice', noticesSchema);