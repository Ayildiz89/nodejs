
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const hbs = require('nodemailer-express-handlebars');
var path = require("path");

module.exports = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key:
          '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'
      }
    })
  ).use('compile',hbs({
    viewEngine : {
      extName: '.hbs',
      partialsDir: './app/views/mails',
      layoutsDir: './app/views/mails',
      defaultLayout: 'email.body.hbs',
    },
    viewPath : './app/views/mails',
    extName: '.hbs',
  }));

