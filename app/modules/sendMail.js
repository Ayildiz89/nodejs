const transporter = require('../confs/mail-conf')
const { mail1Button } = require('../templates/mailTemplates')

module.exports.sendMail = async function({
    to,
    from,
    subject,
    theme,
    content,
}){
    let htmlText="This E-mail has sent by EDUCSYS Teams";
    switch(theme){
        case "1Button":
            htmlText = mail1Button(content);
            break;
        default:
            htmlText = `<h1>${content.title}</h1><p>${content.text}</p>`
            break;
    }
    return transporter.sendMail({
        to,
        from,
        subject,
        html: htmlText
      }).then(res=>{return res});
};

/**
 * 
 * 

 */