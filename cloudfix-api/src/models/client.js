const { mongoose } = require('../config/database');

const ClientSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;