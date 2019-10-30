const express = require('express');
const Joi = require('@hapi/joi');
const multer = require('multer');
const { existsSync, mkdirSync } = require('fs')

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

const { updateTicket, saveTicket } = require('../repository/ticket');
const { findTicketById, addMessageTicket } = require('../repository/ticket');
const { uploadImage } = require('../config/cloudinary');

const router = express.Router();

router.post('/newTicket', upload, async (req, res) => {
    try {
        const schema = Joi.object().keys({
            email: Joi.string().trim().email().required(),
            name: Joi.string().required(),
            title: Joi.string().min(5).required(),
            system: Joi.string().required(),
            message: Joi.string().min(5).required(),
        });

        Joi.validate(req.body, schema, async (err, result) => {
            if (err)
                return res.send({ error: `An error has ocurred ${err}` });
                
            if (req.files.length !== 0) {
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

router.get('/show/:id', async (req, res) => {
    try {
        const schema = Joi.object().keys({
            id: Joi.string().required()
        });
        Joi.validate(req.params, schema, (err, result) => {
            if(err)
                return res.status(400).send({ error: `Erro ao procurar ticket ${err}` });

            findTicketById(res, result.id, 'chat');
        })
    } catch (err) {
        res.status(400).send({ error: `Cannot find ticket ${err}` })
    }
});

router.post('/addMessage/:id', async (req, res) => {
    try {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            message: Joi.string().required()
        });

        Joi.validate(req.body, schema, async (err, result) => {
            if (err)
                return res.status(400).send({ error: `Erro on send a message ${err}` });

            addMessageTicket(res, req.params.id, result);
        });
    } catch (err) {
        return res.status(400).send({ error: `Failed send message ${err}` });
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