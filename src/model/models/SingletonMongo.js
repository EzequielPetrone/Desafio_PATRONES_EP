//Importo mongoose
const mongoose = require('mongoose')
const { MONGO_URL } = require('../../config/config') //Traigo cadena de conexión a Mongo atlas del .env

let instance = null

class SingletonMongo {

    constructor() {
        mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        this.client = mongoose
    }

    static getInstance() {
        if (!instance) {
            instance = new SingletonMongo()
        }
        return instance
    }
}

module.exports = SingletonMongo