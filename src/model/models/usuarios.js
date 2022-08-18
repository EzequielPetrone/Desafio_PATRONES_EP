// Importo e instancio Singleton para la conexión con Mongo
const SingletonMongo = require('./SingletonMongo')
const mongoose = SingletonMongo.getInstance().client

const UsuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  name: { type: String, required: true, max: 100 }
})

module.exports = mongoose.model('usuarios', UsuarioSchema)