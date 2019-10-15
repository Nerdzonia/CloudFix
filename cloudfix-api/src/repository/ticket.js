const Ticket = require('../models/ticket');
const Client = require('../models/client');

const { update, listAll } = require('./default');
const convertToHtmlAndSendMail = require('../modules/ejs');

const updateTicket = (body, res) => {
    update(Ticket, body, res);
}

const listAllTicket = (res, populate) => {
    listAll(Ticket, res, populate);
}

const saveTicket = async (res, result) => {
    const { email, name, title, message, system } = result;

            const createTicket = new Ticket({
                title,
                message,
                name,
                system
            });

            const mailer = {
                to: email,
                subject: 'Suporte handhead',
                from: 'handhead@gmail.com',
            }

            if (await Client.findOne({ email })) {
                await Client.findOne({ email }, async (err, doc) => {
                    if (err) return res.status(400).send({error: `error on send ticket ${err}`});

                    doc.tickets.push(createTicket);

                    await doc.save((err) => {
                        if (err) throw err;
                    });

                    const ticket = await Ticket.create(createTicket).catch(err => res.status(400).send({error: `Erro on send ticket ${err}`}))

                    const data = {
                        link: `${process.env.HOST}${process.env.PORT || ''}/ticket/show/${ticket.id}`,
                    }

                    await convertToHtmlAndSendMail(data, mailer);
                    
                    return res.send({ ticket });
                });
            } else {
                const client = new Client({
                    email,
                    tickets: createTicket._id
                });
    
                await Client.create(client).catch(err => res.status(400).send({ error: `${err} Don't create a new Client` }));
                const ticket = await Ticket.create(createTicket).catch(err => res.status(400).send({ error: `${err} Don't create a new Ticket` }));
    
                const data = {
                    link: `${process.env.HOST}${process.env.PORT || ''}/ticket/show/${ticket.id}`,
                }
    
                await convertToHtmlAndSendMail(data, mailer);
    
                return res.send({ ticket });
            }
}

module.exports = {
    updateTicket,
    listAllTicket,
    saveTicket
}