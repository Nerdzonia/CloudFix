const express = require('express');
const { mongoose } = require('../config/database');

const Client = require('../models/client');
const Ticket = require('../models/ticket');

const router = express.Router();

router.post('/newTicket', async (req, res) => {
    const { email, name, ticket } = req.body;

    try {
       
        // This condition prevents to continue if ticket has any value undefined
        if(!Object.keys(ticket).every(obj => ticket[obj] !== "")){
            return res.status(400).send({ error: "any undefined input" });
        }

        const createTicket = new Ticket({
            _id: new mongoose.Types.ObjectId(),
            ...ticket
        });

        // Update if already exist email in database
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

        // Create a new client and ticket in database
        const client = new Client({
            name: name,
            email: email,
            tickets: createTicket._id
        });

        const clientSuccess = await Client.create(client).catch(err => res.status(400).send({ error: `${err} Don't create a new Client` }));
        await Ticket.create(createTicket).catch(err => res.status(400).send({ error: `${err} Don't create a new Ticket` }));            

        return res.send({ clientSuccess });
        
    }catch (error) {
        return res.status(400).send({ error: "Failed to send ticket" });
    }
});

router.get('/listAll', async (req, res) => {
    try{
        const clients = await Client.find();

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


router.get('/search/:id', async (req, res) => {
    try{
        const client = await Client.findById(req.params.id);

        return res.send(client);
    } catch (error) {
        res.status(400).send({ error: `Can't search client. Error: ${error}`});
    }
});

module.exports = app => app.use('/client', router);