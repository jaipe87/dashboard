const connection = require('../models/db')
/*
module.exports.ping = (req, res) => {
    const consult = `CALL sp_ping('OFICINA')`;
  
    try {
        connection.query(consult, (err, results) => {
            console.log(results)
            res.json(results)
        });
    } catch (e){

    }
}*/

module.exports.ping = (req, res) => {
    const consult = `CALL sp_ping('OFICINA')`;

    connection.query(consult, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }

        if (!results || results.length === 0) {
            return res.status(404).json({ error: 'No se encontraron resultados' });
        }

        // Normalmente en CALL a SP de MySQL, results es un array de arrays
        res.json(results[0]);  // 🔥 IMPORTANTE: results[0] si tu SP devuelve un conjunto de resultados
    });
};