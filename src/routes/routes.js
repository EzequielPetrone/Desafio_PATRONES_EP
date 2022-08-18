//Importo y configuro el router
const express = require('express')
const router = express.Router()

//Para leer bien los req.body
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const { isAuth, isNotAuth } = require('../middlewares/auth')

const { infoLogger, warnLogger } = require('../middlewares/logging') //Importo middlewares que utilizan el logger que configuré

const { getIndex, getLogin, postLogin, getFailLogin, getSignup, postSignup, getFailSignup, getLogout, getCheckAuth, failRouteHandler } = require('../controllers/routesController')

//  INDEX
router.get('/', infoLogger, isAuth, getIndex);

//  LOGIN
router.get('/login', infoLogger, isNotAuth, getLogin)

router.post('/login', infoLogger, postLogin);

router.get('/faillogin', infoLogger, getFailLogin);

//  SIGNUP
router.get('/signup', infoLogger, isNotAuth, getSignup)

router.post('/signup', infoLogger, postSignup);

router.get('/failsignup', infoLogger, getFailSignup);

//  LOGOUT
router.get('/logout', infoLogger, isAuth, getLogout);

// check if logged
router.get('/checkAuth', infoLogger, getCheckAuth);

//  FAIL ROUTE
router.use('*', warnLogger, failRouteHandler);

module.exports = router