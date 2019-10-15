const Client = require('../models/client');

const { listAll, findById } = require('./default');

const listAllClients = async (res, populate = {}) => {
    try{
        listAll(Client, res, populate);
    }catch(err){
        return err;
    }
}

const listClientTicketById = async (res, id, populate = {}) => {
    try{
        findById(Client, id, res, populate);
    }catch (err) {
        return err;
    }
}

module.exports = {
    listClientTicketById,
    listAllClients
}