module.exports = [
    //'flow', 'root', 'Aa20012001', {
    'test_db_for_dev', 'developer_educsys', 'h1Jev7?9', {
        host: '212.227.192.142',
        //host: 'localhost',
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
    }
]