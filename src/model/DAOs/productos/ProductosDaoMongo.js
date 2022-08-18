//Importo Clase Contenedor para luego extender de ella
const ContenedorMongo = require('../../contenedores/ContenedorMongo')

// Importo Model del schema 'productos' 
const productosModel = require('../../models/productos')

//DAO que extiende de clase Contenedor
class ProductosDaoMongo extends ContenedorMongo {

    constructor() {
        super(productosModel);
    }
}

module.exports = ProductosDaoMongo