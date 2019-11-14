const System = require('../models/systems');
const { listAll, save, removeOne } = require('./default');

const findAll = async (res) => {
    listAll(System, res);
}

const add = async (res, result) => {
    let data = await System.findOne({name: new RegExp(`^${result.name}$`, 'i')});
    if(!data)
        save(System, result, res);
    else
        res.status(400).send({error: 'Sistema já existe'});
}

const remove = (res, id) => {
    removeOne(System, id, res);
}

const findByName = async () => {

}

module.exports = {
    add,
    remove,
    findAll
}