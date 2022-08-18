const { CANT_DEFAULT } = require('../config/config') //Importo variables de entorno

const { generateRandoms, generateInfo } = require('../services/apiServices')

const getRandoms = (req, res) => {
    // No uso el fork de child_process para que sea más simple mostrar la división entre Controllers y Services.
    const cant = req.query.cant || CANT_DEFAULT // Tomamos el query param CANT del request, en caso que no venga o no sea un nro válido uso valor por default (seteado en el .env)
    const result = generateRandoms(cant)
    res.type('json').send(JSON.stringify(result, null, 2)) // Uso esta opción de response para que el json se vea formateado
}

const getInfo = (req, res) => res.type('json').send(JSON.stringify(generateInfo(), null, 2)) // Esta vista la dejé como un JSON formateado, si llego a tener tiempo le diseño un html...

module.exports = { getRandoms, getInfo }