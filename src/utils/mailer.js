const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const rootDir = require('./path');

let transport = nodemailer.createTransport({
    host: process.env.MAIL_SERVER,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

exports.sendMail = (htmlFileName, htmlDataObject, email, subject) => {
    ejs.renderFile(path.join(rootDir, "views", "emails", htmlFileName), htmlDataObject, function (err, html) {
        if (err) {
            console.log(err);
        } else {
            var mainOptions = {
                from: process.env.MAIL_FROM,
                to: email,
                subject: subject,
                html: html
            };

            transport.sendMail(mainOptions, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Message sent: ' + info.response);
                }
            });
        }
    });
}