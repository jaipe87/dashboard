const connection = require('../models/db')

module.exports.ping = (req, res) => {
    const consult = `CALL sp_utilidades_anuales(1, 2023, 'OFICINA')`;

    try {
        connection.query(consult, (err, results) => {
            console.log(results)
            res.json(results)
        });
    } catch (e){

    }
}
