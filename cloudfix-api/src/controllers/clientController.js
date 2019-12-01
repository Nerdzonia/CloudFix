const express = require('express');

const { listClientTicketById, listAllClients } = require('../repository/client');
const middlewareAuth = require('../middlewares/auth');

const router = express.Router();

router.use(middlewareAuth);

router.get('/listAll', async (req, res) => {
    try {
        listAllClients(res);
    } catch (error) {
        return res.status(400).send({ error: `Não foi possivel listar todos os clientes: ${error}` });
    }
});

router.get('/listTickets/:id', async (req, res) => {
    try {
        listClientTicketById(res, req.params.id, {
            path: 'tickets'
        });
    } catch (error) {
        return res.status(400).send({ error: `Não foi possivel achar o cliente. Error: ${error}` });
    }
});

module.exports = app => app.use('/client', router);