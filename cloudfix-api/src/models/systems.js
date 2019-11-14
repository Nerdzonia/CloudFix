const { mongoose } = require('../config/database');

const systemShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true });

const System = mongoose.model('System', systemShema);

module.exports = System;