const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const typeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    }
});

typeSchema.plugin(uniqueValidator);

const User = mongoose.model('Type', typeSchema);

module.exports = User;