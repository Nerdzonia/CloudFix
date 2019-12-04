const express = require('express');
const multer = require('multer');
const { existsSync, mkdirSync } = require('fs');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!existsSync('./temp'))
            mkdirSync('./temp');
        cb(null, './temp/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2,
    }
}).array("file", 5);

const lang = require('../utils/joiPtBr');
const { updateTicket, saveTicket, findTicketById, addMessageTicket, listAllTicket, advancedSearch } = require('../repository/ticket');
const { findById } = require('../repository/User');
const { uploadImage } = require('../config/cloudinary');

const router = express.Router();

router.post('/newTicket', upload, async (req, res) => {
    try {
        const schema = Joi.object().options({ language: { ...lang } }).keys({
            email: Joi.string().trim().email().required(),
            name: Joi.string().required(),
            title: Joi.string().min(5).required(),
            system: Joi.string().required(),
            message: Joi.string().min(5).required(),
        });

        Joi.validate(req.body, schema, async (err, result) => {
            if (err) {
                let erroName = err.details[0].context.key;
                let name;
                switch (erroName) {
                    case 'name':
                        name = "nome"
                        break;
                    case 'title':
                        name = "Assunto"
                        break;
                    case 'system':
                        name = "Sistema"
                        break;
                    case 'email':
                        name = "email"
                        break;
                    case 'message':
                        name = "Descrição"
                        break;
                    default:
                        break;
                }

                return res.send({ error: `Verifique se o campo ${name} esta preenchido corretamente` });
            }
            if (req.files !== undefined) {
                const getData = async () => {
                    return await Promise.all(req.files.map(async (file) => {

                        let data = await uploadImage(file, result.email)

                        return data.url
                    }))
                }
                getData().then(data => {
                    result.images = data

                    saveTicket(res, result);
                });
            } else {
                saveTicket(res, result);
            }
        });
    } catch (error) {
        return res.status(400).send({ error: `Failed to send ticket: ${error}` });
    }
});

router.get('/show/:id', async (req, res) => {
    try {
        const schema = Joi.object().keys({
            id: Joi.string().required()
        });
        Joi.validate(req.params, schema, (err, result) => {
            if (err)
                return res.status(400).send({ error: `Erro ao procurar ticket ${err}` });

            findTicketById(res, result.id, 'chat');
        })
    } catch (err) {
        res.status(400).send({ error: `Cannot find ticket ${err}` })
    }
});

router.post('/addMessage', async (req, res) => {
    try {
        const schema = Joi.object().keys({
            ticketId: Joi.string().required(),
            name: Joi.string(),
            message: Joi.string().required()
        });

        Joi.validate(req.body, schema, async (err, result) => {
            if (err)
                return res.status(400).send({ error: `Erro ao enviar mensagem ${err}` });

            const authHeader = req.headers.authorization;
            if (authHeader) {
                const parts = authHeader.split(' ');
            
                if (parts.length === 2) {
                    if (parts[1]) {
                        const [scheme, token] = parts;
                        const HASH = process.env.HASH || 'DefaultHash';

                        jwt.verify(token, HASH, async (err, decoded) => {
                            if (err)
                                return res.status(401).send({ error: 'Token invalid!' });

                            const data = await findById(decoded.id);
                            result.name = data.name;
                            addMessageTicket(res, result.ticketId, result);
                        });
                    } else{
                        addMessageTicket(res, result.ticketId, result);
                    }
                } else {
                    return res.status(400).send({ error: 'Sem autorização' });
                }
            } else {
                return res.status(400).send({ error: 'Sem autorização' });
            }
        });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: `Failed send message ${err}` });
    }
});

router.use(require('../middlewares/auth'));

router.post('/updateTicket', upload, async (req, res) => {
    try {
        const schema = Joi.object().keys({
            id: Joi.string().required(),
            name: Joi.string().required(),
            title: Joi.string().min(5).required(),
            system: Joi.string().required(),
            image: Joi.any(),
            message: Joi.string().min(5).required(),
        });

        Joi.validate(req.body, schema, (err, result) => {
            if (err)
                return res.status(400).send({ error: `Error on search ticket ${err}` });

            updateTicket(result, res);
        });
    } catch (error) {
        return res.status(400).send({ error: `Erro upload ticket ${error}` });
    }
});

router.post('/advancedSearch', async (req, res) => {
    try {
        const schema = Joi.object().keys({
            name: Joi.string(),
            status: Joi.string(),
            startAt: Joi.date(),
            endsAt: Joi.date()
        });

        Joi.validate(req.body, schema, (err, result) => {
            if (err)
                return res.status(400).send({ error: 'Verifique se os campos estão corretos.' });

            const ENUM = { OPEN: 'open', SOLVED: 'solved', CLOSED: 'closed' };

            if (!!result.status) {
                if (Object.keys(ENUM).some(e => ENUM[e] === result.status))
                    advancedSearch(res, result);
                else
                    res.status(400).send({ error: `Status invalido` });
            } else {
                advancedSearch(res, result);
            }
        });
    } catch (error) {
        return res.status(400).send({ error: `Erro fazer a busca ${error}` });
    }
});

router.get('/updateStatus/:status', async (req, res) => {
    try {
        const schema = Joi.object().keys({
            status: Joi.string().required()
        });

        Joi.validate(req.params, schema, (err, result) => {
            if (err)
                return res.status(400).send({ error: `Erro ao procurar ticket ${err}` });

            const ENUM = { OPEN: 'open', SOLVED: 'solved', CLOSED: 'closed' };

            if (Object.keys(ENUM).some(e => ENUM[e] === result.status)) {
                //salvar se o status corresponde a algum dos valores do objeto
            } else {
                res.status(400).send({ error: `Status invalido` });
            }
        })
    } catch (err) {
        res.status(400).send({ error: `Não pode achar o ticket ${err}` })
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