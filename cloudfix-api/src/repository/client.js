const Client = require('../models/client');

const { listAll } = require('./default');

const listAllClients = async (res, populate = {}) => {
    listAll(Client, res, populate);
}

const listClientTicketById = async (res, id, populate = {}) => {
    try{
        const client = await Client.findById(id).populate(Object.entries(populate).length !== 0 ? populate : '');
        
        return res.send(client);
    }catch (err) {
        return err;
    }
}

module.exports = {
    listClientTicketById,
    listAllClients
}