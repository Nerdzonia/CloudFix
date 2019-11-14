const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const convertToHtmlAndSendMail = require('../modules/ejs');
// const checkTokenJwt = require('../middlewares/auth');
const generateToken = require('../utils/jwt');

const HASH = process.env.HASH || 'DefaultHash';

const changePassword = async (res, result) => {
    try {
        const { email } = result;
        const user = await User.findOne({ email });

        if (!user)
            return res.status(400).send({ error: 'User not found!' });

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

        convertToHtmlAndSendMail(data, mailer);

        res.send({ message: `Send to email ${email}` });
    } catch (err) {
        return err;
    }
}

const resetPassword = async (res, result) => {
    try {
        const { email, token, password } = result;

        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');

        if (!user)
            return res.status(400).send({ error: 'User not found' });

        if (token !== user.passwordResetToken)
            return res.status(400).send({ error: 'Token invalid' });

        const now = new Date();

        if (now > user.passwordResetExpires)
            return res.status(400).send({ error: 'Token expired, generate a new one' });

        user.password = password;

        await user.save();

        res.send({ message: 'Save password' });
    } catch (err) {
        return err;
    }

}

const login = async (res, result) => {
    try {
        const { email, password } = result;

        const user = await User.findOne({ email }).select('+password');

        if (!user)
            return res.status(400).send({ error: 'User not found!' });

        if (!await bcrypt.compare(password + HASH, user.password))
            return res.status(400).send({ error: 'Invalid password!' });

        user.password = undefined;

        const token = await generateToken({ id: user.id }, HASH);

        return res.send({
            user,
            token,
        });
    } catch (err) {
        return err;
    }
}

const registerNewUser = async (res, result) => {
    try {
        const { email } = result
        if (await User.findOne({ email }))
            return res.status(400).send({ error: "Usuário já existe!" });

        const user = await User.create(result);

        user.password = undefined;

        const token = await generateToken({ id: user.id }, HASH);

        return res.send({
            user,
            token,
        });
    } catch (err) {
        return res.status(400).send({ error: `Falha ao registrar novo usuário! ${err}` });
    }
}

module.exports = {
    changePassword,
    login,
    resetPassword,
    registerNewUser
}