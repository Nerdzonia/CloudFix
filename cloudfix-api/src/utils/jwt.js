const jwt = require('jsonwebtoken');

async function generateToken(params = {}, HASH){
    const token = await jwt.sign(params, HASH, {
        expiresIn: 86400,
    });

    return token;
}

module.exports = generateToken;