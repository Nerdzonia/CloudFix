const express = require('express');
const Joi = require('@hapi/joi');
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
    limits:{
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
                result.images = req.files;
                // To test create image folder in root of api
                // const {writeFile} = require(`fs`)
                // const path = require("path")
                // result.images.map((file) => {
                //     writeFile(path.resolve(`./image/${file.originalname}`), file.buffer, (err) => err ? console.log(err) : console.log("Ok"))
                // })
            saveTicket(res, result);
            res.send("sucess");
        });
    } catch (error) {
        return res.status(400).send({ error: `Failed to send ticket: ${error}` });
    }
});

router.post('/updateTicket', upload, async (req, res) => {
    try{
        const schema = Joi.object().keys({
            id: Joi.strict().required(),
            name: Joi.string().required(),
            title: Joi.string().min(5).required(),
            system: Joi.string().required(),
            image: Joi.any(),
            message: Joi.string().min(5).required(),
        });

        Joi.validate(req.body, schema, (err, result) => {
            if(err)
                return res.status(400).send({error: `Error on search ticket ${err}`});    
                
            updateTicket(result, res);
        });
    }catch(error){
        return res.status(400).send({error: `Erro upload ticket ${error}`});
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