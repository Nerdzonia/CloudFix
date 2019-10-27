const { mongoose } = require('../config/database');

const TicketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
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
    images: {
        type: Array,
    },
    chat: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
    }],
    status: {
        type: String,
        default: 'open'
    },
}, {timestamps: true});

const ticket = mongoose.model('Ticket', TicketSchema);


module.exports = ticket;