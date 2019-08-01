const express = require('express');
const Joi = require('@hapi/joi');

const Client = require('../models/client');
const Ticket = require('../models/ticket');

const router = express.Router();

router.post('/newTicket', async (req, res) => {
    try {       
        const schema = Joi.object().keys({
            email: Joi.string().trim().email().required(),
            name: Joi.string().required(),
            ticket: {
                title: Joi.string().min(5).required(),
                message: Joi.string().min(5).required(),
                system: Joi.string().required()
            }
        });

        Joi.validate(req.body, schema, async (err, result) => {
            if(err)
                res.send({error: `An error has ocurred ${err}`});

                const { email, name, ticket } = result;

                const createTicket = new Ticket({
                    ...ticket
                });

                if(await Client.findOne({ email })){
                    const tickets = await Client.findOne({ email }, async (err, doc) => {
                        if(err) throw err;
                        
                        doc.tickets.push(createTicket);
                        
                        await doc.save((err) => {
                            if(err) throw err;
                        });
                        
                        await Ticket.create(createTicket).catch(err => res.status(400).send({ error: `${err} Dont create a new Ticket` }));                               
                    });
                    
                    return res.send({response: tickets});
                }

                const client = new Client({
                    name: name,
                    email: email,
                    tickets: createTicket._id
                });
                
                const clientSuccess = await Client.create(client).catch(err => res.status(400).send({ error: `${err} Don't create a new Client` }));
                await Ticket.create(createTicket).catch(err => res.status(400).send({ error: `${err} Don't create a new Ticket` }));            
                
                return res.send({ clientSuccess });
        });
    }catch (error) {
        return res.status(400).send({ error: `Failed to send ticket: ${error}` });
    }
});

router.get('/listAll', async (req, res) => {
    try{
        const clients = await Client.find().populate('tickets');      
        return res.send(clients);
    } catch (error) {
        return res.status(400).send({error: `Could't list clients. Error: ${error}`});
    }
});

router.get('/listTickets/:id', async (req, res) => {
    try{
        const client = await Client.findById(req.params.id).populate('tickets');
        return res.send(client);
    } catch (error) {
        return res.status(400).send({ error: `Could't search the ticket into client. Error: ${error}`});
    }
});

module.exports = app => app.use('/client', router);