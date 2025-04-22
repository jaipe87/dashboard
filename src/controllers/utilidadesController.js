const connection = require('../models/db');
/*


module.exports.utilidadesAnuales = (req, res) => {
    const { panio, pvendedor, pdistrito, pcategoria } = req.body;
    const consult = `CALL sp_utilidades_anuales(1, ${panio}, '${pvendedor}', '${pdistrito}', '${pcategoria}');`;
    
    try {
        connection.query(consult, [panio, pvendedor, pdistrito, pcategoria], (err, results) => {
            if (err) {
                console.error("Error en la consulta:", err);
                return res.status(500).json({ error: 'Error al obtener los datos' });
            }

            if (results.length > 0 && results[0].length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'No se encontraron datos de utilidades anuales' });
            }
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
};
*/

const connection = require('../models/db');

// Función utilitaria para ejecutar stored procedures
function executeProcedure(res, query, params, emptyMessage) {
    connection.query(query, params, (err, results) => {
        if (err) {
            console.error("Error al ejecutar el stored procedure:", err);
            return res.status(500).json({ error: 'Error al obtener los datos' });
        }

        if (results && results[0] && results[0].length > 0) {
            return res.json(results[0]);
        } else {
            return res.status(404).json({ error: emptyMessage });
        }
    });
}

module.exports.utilidadesAnuales = (req, res) => {
    const { panio, pvendedor, pdistrito, pcategoria } = req.body;

    // Validación básica
    if (!panio) {
        return res.status(400).json({ error: 'El año (panio) es obligatorio' });
    }

    const consult = `CALL sp_utilidades_anuales(1, ?, ?, ?, ?)`;
    const params = [
        panio,
        pvendedor || null,
        pdistrito || null,
        pcategoria || null
    ];

    executeProcedure(res, consult, params, 'No se encontraron datos de utilidades anuales');
};
