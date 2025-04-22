const connection = require('../models/db')
/*
module.exports.ventas = (req, res) => {
    
    const {panio, pmes } = req.body; 
    const consult = `CALL sp_resumen_ventas(1 , ${panio}, ${pmes})`;
    
    try {
        connection.query(consult, [panio, pmes], (err, results) => {
            console.log(results)
            res.json(results)
        });
    } catch (e){
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
}
*/
/*
module.exports.ventas = (req, res) => {
    const { panio, pmes } = req.body;
    const consult = `CALL sp_resumen_ventas2(1 , ${panio}, ${pmes})`;

    try {
        connection.query(consult, [panio, pmes], (err, results) => {
            if (err) {
                console.error("Error en la consulta:", err);
                return res.status(500).json({ error: 'Error al obtener los datos' });
            }

            if (results.length > 0 && results[0].length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'No se encontraron datos de ventas' });
            }
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
};

module.exports.ventasAnuales = (req, res) => {
    const { panio, pigv } = req.body;
    const consult = `CALL sp_ventas_anuales(1, ${panio},${pigv});`;

    try {
        connection.query(consult, [panio, pigv], (err, results) => {
            if (err) {
                console.error("Error en la consulta:", err);
                return res.status(500).json({ error: 'Error al obtener los datos' });
            }

            if (results.length > 0 && results[0].length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'No se encontraron datos de ventas anuales' });
            }
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
};
*/


// Función utilitaria para consultas
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

module.exports = {
    ventas: (req, res) => {
        const { panio, pmes } = req.body;

        if (!panio || !pmes) {
            return res.status(400).json({ error: 'El año (panio) y el mes (pmes) son obligatorios' });
        }

        const consult = `CALL sp_resumen_ventas2(1, ?, ?)`;
        const params = [panio, pmes];

        executeProcedure(res, consult, params, 'No se encontraron datos de ventas');
    },

    ventasAnuales: (req, res) => {
        const { panio, pigv } = req.body;

        if (!panio || pigv === undefined) {
            return res.status(400).json({ error: 'El año (panio) y el IGV (pigv) son obligatorios' });
        }

        const consult = `CALL sp_ventas_anuales(1, ?, ?)`;
        const params = [panio, pigv];

        executeProcedure(res, consult, params, 'No se encontraron datos de ventas anuales');
    }
};
