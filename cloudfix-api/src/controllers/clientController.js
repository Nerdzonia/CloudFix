const express = require('express');
const Joi = require('@hapi/joi');
const multer = require('multer');
const { uploadImage } = require('../config/cloudinary')
const { existsSync, mkdirSync } = require('fs')
const path = require("path");
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
const { listClientTicketById, listAllClients } = require('../repository/client');

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
            
        });
    } catch (error) {
        return res.status(400).send({ error: `Failed to send ticket: ${error}` });
    }
});

router.post('/updateTicket', upload, async (req, res) => {
    try {
        const schema = Joi.object().keys({
            id: Joi.strict().required(),
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

router.get('/listAll', async (req, res) => {
    try {
        listAllClients(res);
    } catch (error) {
        return res.status(400).send({ error: `Could't list clients. Error: ${error}` });
    }
});

router.get('/listTickets/:id', async (req, res) => {
    try {
        listClientTicketById(res, req.params.id, {
            path: 'tickets'
        });
    } catch (error) {
        return res.status(400).send({ error: `Could't search the ticket into client. Error: ${error}` });
    }
});

module.exports = app => app.use('/client', router);