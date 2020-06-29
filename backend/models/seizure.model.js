const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const typeSchema = require('./type.model');
const medicineSchema = require('./medicine.model');

const Schema = mongoose.Schema;

const seizureSchema = new Schema({
    type: {
        type: typeSchema,
        required: true,
    },
    medicine: {
        type: medicineSchema,
        required: false
    },
    date: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    note: {
        type: String,
        required: false,
        trim: true
    }
});

seizureSchema.plugin(uniqueValidator);

const Seizure = mongoose.model('Seizure', seizureSchema);

module.exports = Seizure;