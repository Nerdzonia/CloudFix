const jwt = require('jsonwebtoken');

async function generateToken(params = {}, HASH){
    const token = await jwt.sign(params, HASH, {
        expiresIn: 3600,
    });

    return token;
}

module.exports = generateToken;