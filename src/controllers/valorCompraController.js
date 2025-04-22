const connection = require('../models/db')
module.exports.valorCompraAnuales = (req, res) => {
    const { panio, pvendedor, pdistrito, pcategoria } = req.body;
    const consult = `CALL sp_valor_compra_anuales(1, ${panio}, '${pvendedor}', '${pdistrito}', '${pcategoria}');`;
    
    try {
        connection.query(consult, [panio, pvendedor, pdistrito, pcategoria], (err, results) => {
            if (err) {
                console.error("Error en la consulta:", err);
                return res.status(500).json({ error: 'Error al obtener los datos' });
            }

            if (results.length > 0 && results[0].length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'No se encontraron datos de valor de compra anuales' });
            }
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
};
 