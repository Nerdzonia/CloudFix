const Ticket = require('../models/ticket');
const Client = require('../models/client');
const Chat = require('../models/chat');

const { update, listAll, findById } = require('./default');
const convertToHtmlAndSendMail = require('../modules/ejs');

const updateTicket = (body, res) => {
    try {
        update(Ticket, body, res);
    } catch (err) {
        return res.status(400).send({error: 'Erro ao tentar atualizar o ticket'});
    }
}

const listAllTicket = (res, populate) => {
    try {
        listAll(Ticket, res, populate);
    } catch (err) {
        return res.status(400).send({error: 'Erro ao listar tickets '});
    }
}

const findTicketById = (res, id, populate) => {
    try {
        findById(Ticket, id, res, populate);
    } catch (err) {
        return res.status(400).send({error: 'Erro ao procurar um ticket'});
    }
}

const addMessageTicket = async (res, id, ticketMessage = {}) => {
    try {
        const { name, message } = ticketMessage;

        await Ticket.findById(id, async (err, doc) => {
            if (err)
                return res.status(400).send({ error: 'Error on find ticket' });

            if (doc !== null) {
                const chat = new Chat({
                    name,
                    message
                });


                doc.chat.push(chat);

                await Chat.create(chat, (err) => {
                    if (err)
                        return res.status(400).send({ error: `Error on create an ticket ${err}` });
                });

                doc.save((err) => {
                    if (err)
                        return res.status(400).send({ error: `Error on save message in ticket ${err}` });
                });
                return res.send({ doc });
            } else {
                res.status(400).send({ error: 'Ticket not valid wrong id' });
            }
        });
    } catch (err) {
        return err;
    }
}

const saveTicket = async (res, result) => {
    
    try {
        const { email, name, title, message, system, images } = result;
        const createTicket = new Ticket({
            title,
            message,
            name,
            system,
            images
        });

        const mailer = {
            to: email,
            subject: 'Suporte handhead',
            from: 'handhead@gmail.com',
        }

        
        if (await Client.findOne({ email })) {
            await Client.findOne({ email }, async (err, doc) => {
                if (err) return res.status(400).send({ error: `error on send ticket ${err}` });
                
                doc.tickets.push(createTicket);
                
                await doc.save((err) => {
                    if (err) throw err;
                });
                
                const ticket = await Ticket.create(createTicket).catch(err => res.status(400).send({ error: `Erro on send ticket ${err}` }))
                
                const data = {
                    link: `${process.env.WEB_LINK}?id=${ticket.id}`,
                }

                await convertToHtmlAndSendMail(data, mailer);

                return res.send({ id: ticket.id  });
            });
        } else {
            const client = new Client({
                email,
                tickets: createTicket._id
            });

            await Client.create(client).catch(err => res.status(400).send({ error: `${err} Don't create a new Client` }));
            const ticket = await Ticket.create(createTicket).catch(err => res.status(400).send({ error: `${err} Don't create a new Ticket` }));
            
            const data = {
                link: `${process.env.WEB_LINK}?id=${ticket.id}`,
            }
            
            await convertToHtmlAndSendMail(data, mailer);

            return res.send({ id: ticket.id });
        }
    } catch (err) {
        return res.status(400).send({ error: `erro on save ticket ${err}` })
    }

}

module.exports = {
    updateTicket,
    listAllTicket,
    findTicketById,
    addMessageTicket,
    saveTicket,
}