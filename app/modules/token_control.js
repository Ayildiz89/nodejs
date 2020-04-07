const db = require('../database')

module.exports = async function(token, company_id=null){
    const token_user = await db.users.findOne({where:{remember_token:token}})
    if(token_user){
        return true
    } else {
        return false
    }
}