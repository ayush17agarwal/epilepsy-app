const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const medicineSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        uniqueCaseInsensitive: true,
    },
    dosage: {
        type: Number,
        required: true,
    },
    dosageSuffix: {
        type: String,
        required: true,
        maxlength: 5
    },
    timesGiven: {
        type: Number,
        required: true
    },
    notes: {
        type: String,
        required: false,
    },
    rescueMed: {
        type: Boolean,
        required: true
    }
});

medicineSchema.plugin(uniqueValidator);

const User = mongoose.model('Medicine', medicineSchema);

module.exports = User;