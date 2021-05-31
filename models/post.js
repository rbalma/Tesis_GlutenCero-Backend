const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    content: String,
    user:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: String,
        lastname: String,
        avatar: String
    },
    created: {
        type: Date,
        default: Date.now()
    },
    thread: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread'
    }
});

module.exports = mongoose.model('Post', postSchema);