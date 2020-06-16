const db = require('../database')

module.exports = async function(token, user_id=null){
    const token_user = await db.users.findOne({where:{remember_token:token}})
    //return true
    if(token_user){
        //console.log(token_user)
        const code = db.verifications_code.create({
            created_user_id:user_id,
            code: Math.random()
        })
        return true
    } else {
        return false
    }
}