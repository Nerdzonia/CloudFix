const router = require('express').Router();
const Joi = require('@hapi/joi');

const lang = require('../utils/joiPtBr');
const { add, findAll, remove } = require('../repository/system');
const middlewareAuth = require('../middlewares/auth');

router.get('/listAll', (req, res) => {
    findAll(res);
});

router.use(middlewareAuth);

router.post('/add', async (req, res) => {
    const schema = Joi.object().options({language: {...lang}}).keys({
        name: Joi.string().required()
    });

    Joi.validate(req.body, schema, (err, result) => {
        if(err)
            return res.status(400).send({error: `Erro ao salvar um novo sistema ${err}`});
        add(res, result);
    });
});

router.get('/remove/:id', (req, res) => {
    const schema = Joi.object().options({language: {...lang}}).keys({
        id: Joi.string().required()
    });

    Joi.validate(req.params, schema, (err, result) => {
        if(err)
            return res.status(400).send({error: 'Erro ao deletar um sistema'});
        
        remove(res, result.id);
    });
});

module.exports = app => app.use('/system', router);