const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema ({
    title : {
        type: String,
        trim: true
    },
    category: {
        type: String
    },
    date : Date,
    ingredients : {
        type: String
    },
    description : {
        type: String
    },
    image: {
        type: String
    },
    userId: {
        type: String
    },
    userName: {
        type: String
    },
    userLastName: {
        type: String
    },
    active: Boolean
});

module.exports = mongoose.model('Recipe', RecipeSchema);