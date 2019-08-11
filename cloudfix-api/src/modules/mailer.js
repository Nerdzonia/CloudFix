// const path = require('path');
const nodemailer = require('nodemailer');
// const hbs = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
    }
});

module.exports = transport;