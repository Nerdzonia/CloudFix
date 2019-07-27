const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
    },
    name: {
        type: String,
        maxlength: 100,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password + process.env.HASH || '', 11);
    this.password = hash;

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;