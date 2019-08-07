const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
    }
});

// const templateOptions = {
//     viewEngine: {
//         extname: '.html',
//         layoutsDir: path.resolve('./src/resources/mail/'),
//         defaultLayout: 'email_template',
//         partialsDir: path.resolve('./src/resources/mail/')
//     },
//     viewPath: `${__dirname}/../resources/mail/`,
//     extName: '.html',
// }

//transport.use('compile', hbs(templateOptions));

module.exports = transport;