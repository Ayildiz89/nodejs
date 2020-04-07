
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

module.exports = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key:
          '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'
      }
    })
  );

/**
 * 
 */