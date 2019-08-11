const express = require('express');

// const authMiddleware = require('../middlewares/auth');
const Ticket = require('../models/ticket');

const router = express.Router();

// router.use(authMiddleware);

router.get('/show/:id', async (req, res) => {
    try {
    const ticket = await Ticket.findById(req.params.id);
    
    if(!ticket)
        return res.status(400).send({error: "Cannot find ticket in our system"});

    res.send(ticket);
    } catch (err) {
        res.status(400).send({error : `Cannot find ticket ${err}`})
    }
});

module.exports = app => app.use('/ticket', router);