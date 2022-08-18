const { PROCESS_INFO } = require('../config/config') //Importo variables de entorno

const generateRandoms = (cant) => {

    const qty = Math.abs(parseInt(cant))
    const obj = {}

    for (let index = 0; index < qty; index++) {

        const nro = Math.floor(Math.random() * 1000) + 1 // Genero nro entero aleatorio entre 1 y 1000

        if (obj[nro]) {
            obj[nro] += 1 // Si ya existe dentro del objeto ese nro como key, incremento su value
        } else {
            obj[nro] = 1 // sino creo ese nro como key y le asigno value 1
        }
    }
    return obj
}

const generateInfo = () => {
    // Le agrego al objeto con los datos del node process el uso de memoria total (rss) y el pid
    // ya que es el único dato que vale la pena obtenerlo en tiempo real al momento del request
    // el resto de la data siempre es la misma una vez iniciado el server
    return {
        ...PROCESS_INFO,
        pid: process.pid,
        rss: process.memoryUsage().rss
    }
}

module.exports = { generateRandoms, generateInfo }