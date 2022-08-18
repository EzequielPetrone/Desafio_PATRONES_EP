//Importo y configuro el router
const { Router } = require('express')
const apiRouter = Router()

const { infoLogger } = require('../middlewares/logging'); //Importo middlewares que utilizan el logger que configuré

const { getRandoms, getInfo } = require('../controllers/apiController')

// api/randoms calcula nros aleatorios
apiRouter.get('/randoms', infoLogger, getRandoms);

// INFO
apiRouter.get('/info', infoLogger, getInfo);

module.exports = apiRouter