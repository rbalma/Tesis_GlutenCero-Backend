const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const recipeSchema = new Schema ({
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

recipeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Recipe', recipeSchema);