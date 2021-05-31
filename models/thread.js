const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const threadSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now()
    },
    user:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: String,
        lastname: String
    }
});

module.exports = mongoose.model('Thread', threadSchema);