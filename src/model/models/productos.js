// Importo e instancio Singleton para la conexión con Mongo
const SingletonMongo = require('./SingletonMongo')
const mongoose = SingletonMongo.getInstance().client

const productoSchema = new mongoose.Schema({

    title: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    thumbnail: { type: String, required: true }
},
    { strict: false },
    { timestamps: true }
)

module.exports = mongoose.model('productos', productoSchema)