const { mongoose } = require('../config/database');

const chatSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    messages: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;