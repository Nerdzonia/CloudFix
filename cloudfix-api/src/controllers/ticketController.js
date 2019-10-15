const express = require('express');
const Joi = require('@hapi/joi');

// const authMiddleware = require('../middlewares/auth');

const { findTicketById, addMessageTicket } = require('../repository/ticket');

const router = express.Router();

// router.use(authMiddleware);

router.get('/show/:id', async (req, res) => {
    try {
        findTicketById(res, req.params.id, 'chat');
    } catch (err) {
        res.status(400).send({ error: `Cannot find ticket ${err}` })
    }
});

router.post('/addMessage/:id', async (req, res) => {
    try {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            message: Joi.string().required()
        });

        Joi.validate(req.body, schema, async (err, result) => {
            if (err)
                return res.status(400).send({ error: `Erro on send a message ${err}` });

            addMessageTicket(res, req.params.id, result);
        });
    } catch (err) {
        return res.status(400).send({ error: `Failed send message ${err}` });
    }
});

router.get('/listAll', async (req, res) => {
    try {
        listAllTicket(res, {
            path: 'tickets',
            populate: 'chat'
        });
    } catch (error) {
        return res.status(400).send({ error: `Could't list clients. Error: ${error}` });
    }
});

module.exports = app => app.use('/ticket', router);