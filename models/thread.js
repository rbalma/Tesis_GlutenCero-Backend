const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const threadSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
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
            type: Schema.Types.ObjectId,
            ref: 'User'
    }
});

module.exports = mongoose.model('Thread', threadSchema);