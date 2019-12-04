const User = require('../models/user');


const findById = async (id) => {
    const data = await User.findById(id);
    return data;
}

module.exports = {
    findById
}