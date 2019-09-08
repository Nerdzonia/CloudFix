const express = require('express');
const Joi = require('@hapi/joi');
const multer = require('multer');
const upload = multer({
    limits:{
        files:5,
        fileSize: 1024 * 1024 * 2
    }
}).array('image');

const convertToHtmlAndSendMail = require('../modules/ejs');

const Client = require('../models/client');
const Ticket = require('../models/ticket');

const router = express.Router();

router.post('/newTicket', upload, async (req, res) => {
    try {
        const schema = Joi.object().keys({
            email: Joi.string().trim().email().required(),
            name: Joi.string().required(),
            title: Joi.string().min(5).required(),
            system: Joi.string().required(),
            image: Joi.any(),
            message: Joi.string().min(5).required(),
        });

        Joi.validate(req.body, schema, async (err, result) => {
            if (err)
                return res.send({ error: `An error has ocurred ${err}` });

            const { email, name, title, message, system } = result;

            const createTicket = new Ticket({
                title,
                message,
                name,
                system
            });

            const mailer = {
                to: email,
                subject: 'Suporte handhead',
                from: 'handhead@gmail.com',
            }

            if (await Client.findOne({ email })) {
                await Client.findOne({ email }, async (err, doc) => {
                    if (err) return res.status(400).send({error: `error on send ticket ${err}`});

                    doc.tickets.push(createTicket);

                    await doc.save((err) => {
                        if (err) throw err;
                    });

                    const ticket = await Ticket.create(createTicket).catch(err => res.status(400).send({error: `Erro on send ticket ${err}`}))

                    const data = {
                        link: `${process.env.HOST}${process.env.PORT || ''}/ticket/show/${ticket.id}`,
                    }

                    await convertToHtmlAndSendMail(data, mailer);
                    
                    return res.send({ ticket });
                });
            } else {
                const client = new Client({
                    email,
                    tickets: createTicket._id
                });
    
                await Client.create(client).catch(err => res.status(400).send({ error: `${err} Don't create a new Client` }));
                const ticket = await Ticket.create(createTicket).catch(err => res.status(400).send({ error: `${err} Don't create a new Ticket` }));
    
                const data = {
                    link: `${process.env.HOST}${process.env.PORT || ''}/ticket/show/${ticket.id}`,
                }
    
                await convertToHtmlAndSendMail(data, mailer);
    
                return res.send({ ticket });
            }
        });
    } catch (error) {
        return res.status(400).send({ error: `Failed to send ticket: ${error}` });
    }
});

router.get('/listAll', async (req, res) => {
    try {
        const clients = await Client.find().populate('tickets');
        return res.send(clients);
    } catch (error) {
        return res.status(400).send({ error: `Could't list clients. Error: ${error}` });
    }
});

router.get('/listTickets/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id).populate('tickets');
        return res.send(client);
    } catch (error) {
        return res.status(400).send({ error: `Could't search the ticket into client. Error: ${error}` });
    }
});

module.exports = app => app.use('/client', router);