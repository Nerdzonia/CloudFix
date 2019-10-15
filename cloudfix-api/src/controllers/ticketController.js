const express = require('express');
const Joi = require('@hapi/joi');

// const authMiddleware = require('../middlewares/auth');
const Ticket = require('../models/ticket');
const Chat = require('../models/chat');

const router = express.Router();

// router.use(authMiddleware);

router.get('/show/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate('chat');

        if (!ticket)
            return res.status(400).send({ error: "Cannot find ticket in our system" });

        res.send(ticket);
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

            const { name, message } = result;

            const ticket = await Ticket.findById(req.params.id, async (err, doc) => {
                if (err)
                    return res.status(400).send({ error: 'Error on find ticket' });

                const chat = new Chat({
                    name,
                    message
                });

                doc.chat.push(chat);

                await Chat.create(chat, (err) => {
                    if (err)
                        return res.status(400).send({ error: `Error on create an ticket ${err}` });                        
                    });

                doc.save((err) => {
                    if (err)
                        return res.status(400).send({ error: `Error on save message in ticket ${err}` });
                });
            });
            return res.send({ ticket });
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