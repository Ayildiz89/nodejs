const Sequelize = require('sequelize')

var db = {}

const sequelize = new Sequelize('flow', 'root', 'Aa20012001', {
    host: '212.227.192.142',
    //host: '127.0.0.1',
    port: '3306',
    //port: '8889',
    dialect: 'mysql',
    define: {
        freezeTableName: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false,
})

let models = [
    require('./models/priorities.js'),
    require('./models/status.js'),
    require('./models/tickets.js'),
    require('./models/users.js'),
    require('./models/company'),
    require('./models/user_company.js'),
    require('./models/courses.js'),
    require('./models/check_list'),
    require('./models/category'),
    require('./models/classroom'),
    require('./models/event_check_list'),
    require('./models/event_users'),
    require('./models/events'),
    require('./models/form_data'),
    require('./models/lesson'),
    require('./models/notifications'),
    require('./models/reports'),
    require('./models/reports_of_event'),
    require('./models/user_other_data'),
    require('./models/company_templates'),
]

// Initialize models
models.forEach(model => {
    const seqModel = model(sequelize, Sequelize)
    db[seqModel.name] = seqModel
})

// Apply associations
Object.keys(db).forEach(key => {
    if ('associate' in db[key]) {
        db[key].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
