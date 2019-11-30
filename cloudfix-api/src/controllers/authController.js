const express = require('express');
const Joi = require('@hapi/joi');
const lang = require('../utils/joiPtBr');

// const middlewareAuth = require('../middlewares/auth');
const { changePassword, login, resetPassword, registerNewUser } = require('../repository/auth');

const router = express.Router();

router.post('/authenticate', async (req, res) => {
    try {
        const schema = Joi.object().options({ language: { ...lang } }).keys({
            email: Joi.string().trim().email().required(),
            password: Joi.string().required()
        });
        Joi.validate(req.body, schema, async (err, result) => {
            if (err)
                return res.status(400).send({ error: "Cheque se campos os estão corretos!" });

            login(res, result);
        });
    } catch (err) {
        res.status(400).send({ error: `Failed to authenticate ${err}` });
    }
});

// router.use(middlewareAuth);

router.post('/register', async (req, res) => {
    try {
        const schema = Joi.object().keys({
            email: Joi.string().trim().email().required(),
            name: Joi.string().required(),
            password: Joi.string().required()
        });

        Joi.validate(req.body, schema, async (err, result) => {
            if (err)
                return res.status(400).send({ error: `Failed to validade a new user ${err}` });

            registerNewUser(res, result);
        });
    } catch (error) {
        return res.status(400).send({ error: 'Registration failed!' });
    }
});


router.post('/change_password', async (req, res) => {
    try {
        const schema = Joi.object().keys({
            email: Joi.string().trim().email().required(),
        });

        Joi.validate(req.body, schema, async (err, result) => {
            if (err)
                return res.status(400).send({ error: `Validate error ${err}` });

            changePassword(res, result);
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({ error: 'Error on try change password!' });
    }
});

router.post('/reset_password', async (req, res) => {

    const schema = Joi.object().keys({
        email: Joi.string().trim().email().required(),
        token: Joi.string().required(),
        password: Joi.string().required()
    });

    Joi.validate(req.body, schema, async (err, result) => {
        try {
            if (err)
                return res.status(400).send({ error: `Failed to reset password ${err}` });

            resetPassword(res, result);
        } catch (err) {
            res.status(400).send({ error: 'Cannot reset password' })
        }
    });
});

// router.get('/checkJwt', checkTokenJwt, async (req, res) => {
//     const user = await User.findById(req.userId);
//     res.send(user)
// });

module.exports = app => app.use('/auth', router);