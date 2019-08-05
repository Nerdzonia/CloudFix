const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const mailer = require('../modules/mailer')

const User = require('../models/user');
const generateToken = require('../utils/jwt');

const router = express.Router();
const HASH = process.env.HASH || 'DefaultHash';

router.post('/register', async (req, res) => {
    const { email } = req.body;

    try {
        if(await User.findOne({ email }))
            return res.status(400).send({error: "User already exists!"});
        
        const user = await User.create(req.body);

        user.password = undefined;    
        const token = await generateToken({id: user.id }, HASH);
        return res.send({ 
            user, 
            token,
        });
    } catch (error) {
        return res.status(400).send({ error : 'Registration failed!'});
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user)
        return res.status(400).send({ error: 'User not found!' });

    if(!await bcrypt.compare(password + HASH, user.password))
        return res.status(400).send({ error: 'Invalid password!' });

    user.password = undefined;
    const token = await generateToken({id: user.id }, HASH);
    return res.send({ 
        user, 
        token,
     });
});

router.post('/change_password', async (req, res) => {
    const { email } = req.body;

    try{
        const user = await User.findOne({ email });

        if(!user)
            return res.status(400).send({ error: 'User not found!'});

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });
        
        res.send({token});
        // testing send email
        // mailer.sendMail({
        //     to: email,
        //     from: 'icarodaviduarte@gmail.com',
        //     template: 'auth/email_template',
        //     context: { token },
        // }, (err) => {
        //     console.log(err)
        //     if(err)
        //         return res.status(400).send({ error: `Cannot send change password email.`})

        //     return res.send();
        // });
    }catch (error) {
        console.log(error)
        res.status(400).send({ error: 'Error on try change password!'});
    }
});

module.exports = app => app.use('/auth', router);