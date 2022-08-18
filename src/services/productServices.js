const { TIPO_PERSISTENCIA } = require('../config/config') //Importo variables de entorno

const logger = require('../utils/logger')

//Importo Factory 
const ProductosFactoryDAO = require('../model/DAOs/productos/FactoryProductos');

class productServices {

    constructor() { // seteo contenedor de productos según Factory
        this.contenedorProd = ProductosFactoryDAO.get(TIPO_PERSISTENCIA)
    }

    async getAll() {
        return await this.contenedorProd.getAll()
    }

    async saveProducto(obj) {
        if (obj &&
            typeof (obj.title) == 'string' &&
            typeof (obj.price) == 'number' &&
            typeof (obj.thumbnail) == 'string') {

            return await this.contenedorProd.save(obj)

        } else {
            logger.error(`Estructura del objeto Producto INCORRECTA. Se esperaba: { title : string , price : number , thumbnail : string }`);
            return null
        }
    }
}

module.exports = productServices