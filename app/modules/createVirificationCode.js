const db = require('../database')
const transporter = require('../confs/mail-conf');

module.exports = async function(token, user_id=null){
    const user = await db.users.findOne({where:{remember_token:token}})
    //return true
    if(user){
        //console.log(token_user)

        
        const sql = {
            where:{create_user_id:user_id}
        }
        const code = await db.verifications_code.findOne(sql)

        if(code){
            const delcode = await db.verifications_code.destroy(sql)
        } 
        const data = {
            created_at: new Date(),
            version: 1,
            create_user_id:user_id,
            code: Math.round(Math.random()*9).toString()+Math.round(Math.random()*9).toString()+Math.round(Math.random()*9).toString()+Math.round(Math.random()*9).toString()+Math.round(Math.random()*9).toString()+Math.round(Math.random()*9).toString()
        }
        //console.log(data)


        await db.verifications_code.create(data).then(res=>{
            //console.log(res)
            if(user.email){
                transporter.sendMail({
                    to: user.email,
                    from: "verification@educsys.de",
                    subject: "Verification",
                    text:"Verification",
                    template: 'verification_code',
                    context: {
                        code:res.code,
                        text:"Dogrulama kodunuz:"
                    }
                })
            }
        }).catch(err=>{return false})
        return true
    } else {
        return false
    }
}