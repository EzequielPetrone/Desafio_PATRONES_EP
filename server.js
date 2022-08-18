// ESTE CÓDIGO ES PARA CORRERLO CON NODE/NODEMON YA QUE EN CASO QUE EL MODE LO AMERITE EL CLUSTERING ES MANUAL (con FOREVER también puede aplicar)

//Importo dependencias varias
const express = require('express');
const { createServer } = require("http")
const { Server } = require("socket.io")

const handlebars = require('express-handlebars');
const passport = require('passport');
const cluster = require('cluster'); // Importo cluster

const { sessionConfig } = require('./src/auth/sessionConfig') //Importo mi express-session ya seteado

const { PORT, MODE, NUMCPUS } = require('./src/config/config') //Importo variables de config

const logger = require('./src/utils/logger') //Importo logger que configuré

const productServices = require('./src/services/productServices') //Importo services class para el manejo de Productos

const { appErrorHandler } = require('./src/middlewares/appErrorHandler') // importo Handler para errores de la Express App

//Importo Routers
const apiRouter = require('./src/routes/apiRoutes');
const router = require('./src/routes/routes');

if (MODE == 'CLUSTER' && cluster.isPrimary) {
    // console.log(`PID MASTER ${process.pid}`)
    // Cuando el modo pasado por args es CLUSTER, el process MASTER lanza los workers, 1 por cada cpu
    for (let i = 0; i < NUMCPUS; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        // console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork() //Si un worker muere levanto otro
    })

} else { // Cuando el modo pasado por args es FORK o es un cluster worker uso el código de siempre

    //Configuro Express app, server http y socket
    const app = express();
    const httpServer = createServer(app);
    const io = new Server(httpServer);

    app.disable('x-powered-by'); // un pequeño seteo de seguridad

    //Seteo HBS views
    app.engine(
        "hbs",
        handlebars.engine({
            extname: ".hbs",
            defaultLayout: 'index.hbs',
            layoutsDir: __dirname + "/src/views/layouts",
            partialsDir: __dirname + "/src/views/partials/",
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true,
            }
        })
    );
    app.set('view engine', 'hbs');
    app.set('views', './src/views');

    //Seteo 'public' como static
    app.use(express.static(__dirname + "/public"));

    //Configuro Middleware de manejo de errores
    app.use(appErrorHandler)

    //Configuro session e inicializo passport
    app.use(sessionConfig)
    app.use(passport.initialize())
    app.use(passport.session())

    //Seteo Routers
    app.use('/api', apiRouter)
    app.use('/', router)

    const productService = new productServices() //instancio según mi clase de la capa de negocio

    //Gestiono conexión con socket clients
    io.on('connection', async (socket) => {

        //Envío al nuevo socket los productos registrados al momento
        socket.emit('PRODLIST', await productService.getAll())

        //Recibo, guardo y retransmito Productos
        socket.on('NEWPROD', async (data) => {
            try {
                let newId = await productService.saveProducto(data)
                if (newId) {
                    io.sockets.emit('PRODLIST', await productService.getAll());
                } else {
                    throw 'Error al guardar nuevo producto'
                }
            } catch (error) {
                logger.error(error)
            }
        });
    });

    //Socket.io Error logging
    io.engine.on("connection_error", (err) => {
        // console.log(err.req);    // the request object
        logger.error(`Socket.io Error -> code: ${err.code}, descr: ${err.message}, sid: ${err.context.sid}`)
    });

    //Pongo a escuchar al server
    httpServer.listen(PORT, err => {
        if (!err) {
            logger.info(`Server running. PORT: ${httpServer.address().port}`)
        } else {
            logger.error(err)
        }
    });

    //Server Error handling
    httpServer.on("error", error => logger.error('Error en el servidor: ' + error))
}