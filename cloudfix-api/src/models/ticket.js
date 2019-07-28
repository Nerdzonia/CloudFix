const { mongoose } = require('../config/database');

const TicketSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,

    },
    system: {
        type: String,
        required: true,
    },
    chat: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
    }],
    status: {
        type: String,
        default: 'open'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ticket = mongoose.model('Ticket', TicketSchema);


module.exports = ticket;