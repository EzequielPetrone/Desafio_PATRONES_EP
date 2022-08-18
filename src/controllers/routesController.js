const { passport } = require('../auth/passportConfig') //Importo mi passport ya configurado

//  INDEX
const getIndex = (req, res) => res.render('main', { username: req.user.name });

//  LOGIN
const getLogin = (req, res) => res.render('login')

const postLogin = passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/' });

const getFailLogin = (req, res) => res.render('login-error');

//  SIGNUP
const getSignup = (req, res) => res.render('signup')

const postSignup = passport.authenticate('signup', { failureRedirect: '/failsignup', successRedirect: '/' });

const getFailSignup = (req, res) => res.render('signup-error');

//  LOGOUT
const getLogout = (req, res) => {
    const usuario = req.user.name
    req.logout(err => {
        if (!err) {
            res.render('logout', { username: usuario });
        } else {
            res.redirect('/');
        }
    })
}

// check if logged (endpoint que uso en el frontend)
const getCheckAuth = (req, res) => res.json({ auth: req.isAuthenticated() });

const failRouteHandler = (req, res) => res.status(404).render('routing-error', { originalUrl: req.originalUrl, method: req.method })

module.exports = { getIndex, getLogin, postLogin, getFailLogin, getSignup, postSignup, getFailSignup, getLogout, getCheckAuth, failRouteHandler }