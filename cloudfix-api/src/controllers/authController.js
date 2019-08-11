const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const User = require('../models/user');
const generateToken = require('../utils/jwt');
const convertToHtmlAndSendMail = require('../modules/ejs');

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
    
        const data = {
            link: `${process.env.HOST}${process.env.PORT || ''}/ticket/${token}`
        }

        const mailer = {
            to: email,
            from: 'handhead@gmail.com',
        }

        convertToHtmlAndSendMail(data  ,mailer);
        
        res.send({message: `Send to email ${email}`})
    }catch (error) {
        console.log(error)
        res.status(400).send({ error: 'Error on try change password!'});
    }
});

router.post('/reset_password', async (req, res) => {
    const { email, token, password } = req.body;

    try{
        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');

        if(!user)
            return res.status(400).send({error: 'User not found'});

        if( token !== user.passwordResetToken)
            return res.status(400).send({ error: 'Token invalid' });

        const now = new Date();

        if(now > user.passwordResetExpires)
            return res.status(400).send({error: 'Token expired, generate a new one'});
        
        user.password = password;

        await user.save();

        res.send({message: 'Save password'});
    } catch (err) {
        res.status(400).send({error : 'Cannot reset password'})
    }
});

module.exports = app => app.use('/auth', router);