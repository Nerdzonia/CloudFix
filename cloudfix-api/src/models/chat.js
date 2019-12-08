const { mongoose } = require('../config/database');

const chatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;