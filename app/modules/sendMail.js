const transporter = require('../confs/mail-conf')
const { mail1Button } = require('../templates/mailTemplates');
const db = require('../database');



module.exports.sendMail = async function({
    to,
    from,
    subject,
    template,
    context,
}){

    let options = {
        plattform_id: 1,
        //email_id: null // Burasi mail servisi kullanilinca acilacak
        to_email:to,
        sending_user_id:null,
        template,
        context_email:JSON.stringify(context),
        sending_company_id:null,
        template_varsion:1
    }


    transporter.sendMail({
        to,
        from,
        subject,
        //html: htmlText,
        text:"EDUCSYS",
        template,
        context
    }).then(res=>{

        if(res.message==="success"){
            options = {
                ...options,
                status:1
            }
        } else {
            options = {
                ...options,
                status:0
            }
        }
        db.sent_mails.create(options)
    });
    
    
    
};
