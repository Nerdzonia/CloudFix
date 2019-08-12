const path = require('path');
const ejs = require('ejs');
// const fs = require('fs');
const transporter = require('./mailer');

function convertToHtmlAndSendMail(data, mailer) {
    ejs.renderFile(path.resolve('./src/resources/mail/email_template.ejs'), data, (err, html) => {
        if (err)
            return console.log(err);
        // fs.writeFile(path.resolve('./src/resources/mail/template.html'), html, (err) => {console.log('ok')}); // this create a local file template
        transporter.sendMail({
            ...mailer,
            html: html
        }, (err, info) => {
            if (err)
                console.log(`Error on send Mail ${err}`);
        });
    });
}

module.exports = convertToHtmlAndSendMail;