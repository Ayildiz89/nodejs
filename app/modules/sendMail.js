const transporter = require('../confs/mail-conf')
const { mail1Button } = require('../templates/mailTemplates')

const Handlebars = require('handlebars')
//const verificatin_code_tamplate = require('../views/mails/verification_code.handlebars')
//const template = Handlebars.compile(verificatin_code_tamplate)

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
        case "verification_code":
            htmlText = "sss"//template({message:"Kodunuz asagidadir",title:"Dogrulama"})
            break;
        default:
            htmlText = `<h1>${content.title}</h1><p>${content.text}</p>`
            break;
    }
    return transporter.sendMail({
        to,
        from,
        subject,
        //html: htmlText,
        text:"nnnnn",
        template: 'verification_code',
        content: {
            title:"Baslik",
            message:"Mesaj",
            code:"012541"
        }
      }).then(res=>{return res});
};

/**
 * 
 * 

 */