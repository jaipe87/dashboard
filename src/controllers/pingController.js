const connection = require('../models/db')

module.exports.ping = (req, res) => {
    const consult = `CALL sp_ping('OFICINA')`;
  
    try {
        connection.query(consult, (err, results) => {
            console.log(results)
            res.json(results)
        });
    } catch (e){

    }
}
