const passport = require('passport');

const { loginStrategy, signupStrategy, serializeUser, deserializeUser } = require('../services/passportServices')

passport.use('login', loginStrategy)

passport.use('signup', signupStrategy)

passport.serializeUser(serializeUser)

passport.deserializeUser(deserializeUser)

module.exports = { passport }