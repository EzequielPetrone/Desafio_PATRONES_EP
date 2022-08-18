const ProductosDaoMongo = require('./ProductosDaoMongo');
const ProductosDaoFile = require('./ProductosDaoFile');

class ProductosFactoryDAO {

    static get(tipo) {

        switch (tipo) {
            case 'MONGO': return new ProductosDaoMongo();
            case 'FILE': return new ProductosDaoFile();
            default: return new ProductosDaoMongo();
        }
    }
}

module.exports = ProductosFactoryDAO