const Ticket = require('../models/ticket');
const Client = require('../models/client');
const Chat = require('../models/chat');

const { update, listAll, findById } = require('./default');
const convertToHtmlAndSendMail = require('../modules/ejs');

const mailerTemplate = {
    to: null,
    subject: 'Suporte handhead',
    from: 'handhead@gmail.com',
}

const templateLink = './src/resources/mail/email_update_template.ejs';

const updateTicket = async (body, res) => {
    try {
        await Client.findOne({ tickets: body.id }, async (err, doc) => {
            if (err || !doc)
                return res.status(400).send({ error: 'Erro ao tentar achar o ticket' });

            const sendEmailLink = convertToHtmlAndSendMail(
                { link: `${process.env.WEB_LINK}?id=${doc.id}` },
                { ...mailerTemplate, to: doc.email, },
                templateLink
            );

            update(Ticket, body, res, sendEmailLink);
        });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao tentar atualizar o ticket' });
    }
}

const listAllTicket = async (res, populate, page) => {
    try {
        const options = {
            page: page || 1,
            limit: 5,
            populate: Object.entries(populate).length !== 0 ? populate : ''
        };

        await Ticket.paginate({}, options, (err, result) => {
            if (err)
                return res.status(400).send({ error: `Erro ao tentar paginar: ${error}` });

            return res.send({ data: { ...result } });
        })
        // listAll(Ticket, res, populate);
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao listar tickets ' });
    }
}

const findTicketById = (res, id, populate) => {
    try {
        findById(Ticket, id, res, populate);
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao procurar um ticket' });
    }
}

const addMessageTicket = async (res, id, ticketMessage = {}) => {
    try {
        const { name, message, userType } = ticketMessage;

        await Ticket.findById(id, async (err, doc) => {
            if (err)
                return res.status(400).send({ error: 'Error on find ticket' });

            if (doc !== null) {
                const chat = new Chat({
                    name,
                    message,
                    userType
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

                if(userType === 'admin')
                    await Client.findOne({ tickets: id }, async (err, doc) => {
                        if (err || !doc)
                            return res.status(400).send({ error: 'Erro ao tentar achar o ticket' });
            
                        convertToHtmlAndSendMail(
                            { link: `${process.env.WEB_LINK}?id=${id}` },
                            { ...mailerTemplate, to: doc.email, },
                            templateLink
                        );
                    });

                return res.send({ data: doc });
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

        const mailer = { ...mailerTemplate, to: email };

        let templatePath = './src/resources/mail/email_template.ejs';

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

                await convertToHtmlAndSendMail(data, mailer, templatePath);

                return res.send({ id: ticket.id });
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

            await convertToHtmlAndSendMail(data, mailer, templatePath);

            return res.send({ id: ticket.id });
        }
    } catch (err) {
        return res.status(400).send({ error: `erro on save ticket ${err}` })
    }

}

const searcByCriteria = async (res, result) => {
    try {
        let query = {};

        let options = {
            page: 1,
            limit: 5
            // populate: Object.entries(populate).length !== 0 ? populate : ''
        };

        const SORT_ENUM = { ascending: 'asc', descending: 'desc' }

        if (result.pagination) {
            if (result.pagination.hasOwnProperty('sort') && !Object.keys(SORT_ENUM).some(e => (SORT_ENUM[e] === result.pagination.sort)))
                return res.status(400).send({ error: 'Valor sort invalido, aceita apenas asc ou desc' });
            else
                Object.keys(result.pagination).map(e => {
                    switch (e) {
                        case 'sort':
                            options.sort = { [result.pagination.column]: result.pagination.sort }
                            break;
                        case 'page':
                            options.page = result.pagination.page
                            break;
                        case 'limit':
                            options[e] = result.pagination[e]
                            break;
                    }
                });
        }


        if (result.query)
            Object.keys(result.query).map(e => {
                switch (e) {
                    case 'startAt':
                        query['updatedAt'] = { ...query['updatedAt'], $gte: `${result.query[e]}` };
                        break;
                    case 'endsAt':
                        query['updatedAt'] = { ...query['updatedAt'], $lte: `${result.query[e]}` };
                        break;
                    case 'name':
                        query[e] = new RegExp(`.*${result.query[e]}.*`, 'i');
                        break;
                    default:
                        query[e] = result.query[e];
                        break;
                }
            });

        await Ticket.paginate(query, options, (err, doc) => {
            if (err)
                return res.status(400).send({ error: 'Erro na busca avançada do ticket.' });

            if (doc)
                return res.send({ data: { ...doc } });
            else
                return res.status(400).send({ error: 'Sem resultado na busca avançada do ticket.' });
        });

    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Ocorreu algum erro ao fazer busca avançada no ticket.' });
    }
}

// const searcByCriteria = async (res, result) => {
//     try{
//         let query = {};

//         Object.keys(result).map(e => {
//             switch (e) {
//                 case 'startAt':
//                     query['updatedAt'] = { ...query['updatedAt'], $gte: `${result[e]}` };
//                     break;
//                 case 'endsAt':
//                     query['updatedAt'] = { ...query['updatedAt'], $lte:`${result[e]}` };
//                     break;
//                 case 'name':
//                     query[e] = new RegExp(`.*${result[e]}.*`, 'i');
//                     break;
//                 default:
//                     query[e] = result[e];
//                     break;
//                 }
//             });

//         const data = await Ticket.find(query) || [];

//         if(data.length !== 0)
//             res.send({data: data});
//         else
//             res.status(400).send({error: 'Sem resultado na busca avançada do ticket.'});
//     }catch(err){
//         return res.status(400).send({error: 'Ocorreu algum erro ao fazer busca avançada no ticket.'});
//     }
// }

module.exports = {
    updateTicket,
    listAllTicket,
    findTicketById,
    addMessageTicket,
    saveTicket,
    searcByCriteria
}