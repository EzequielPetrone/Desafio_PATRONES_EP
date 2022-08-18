//Importo Clase Contenedor para luego extender de ella
const ContenedorFile = require('../../contenedores/ContenedorFile');

class ProductosDaoFile extends ContenedorFile {

    constructor() {
        super(process.cwd() + '/fileDB/productos.json');
    }
}

module.exports = ProductosDaoFile