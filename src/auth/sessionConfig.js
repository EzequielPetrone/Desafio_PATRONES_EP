const session = require('express-session');

const { EXP_TIME } = require('../config/config') //Importo variables de config

const sessionConfig = session({
    secret: 'clave_test_eze',
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: EXP_TIME
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
})

module.exports = { sessionConfig }