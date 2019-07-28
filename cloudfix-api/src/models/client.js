const { mongoose } = require('../config/database');

// const TicketSchema = require('./ticket');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
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
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;