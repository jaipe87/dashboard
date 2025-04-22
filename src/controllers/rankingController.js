const connection = require('../models/db')
//PRODUCTOS
module.exports.productosVentas = (req, res) => {
    const { panio, pmes } = req.body;
    const consult = `CALL sp_productos_danmas_ventas(1 , ${panio}, ${pmes})`;
    try {
        connection.query(consult, [panio, pmes], (err, results) => {
            if (err) {
                console.error("Error en la consulta:", err);
                return res.status(500).json({ error: 'Error al obtener los datos' });
            }

            if (results.length > 0 && results[0].length > 0) {
                //console.log(results)
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'No se encontraron productos que dan más ventas' });
            }
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
};

module.exports.productosUtilidad = (req, res) => {
    const { panio, pmes } = req.body;
    const consult = `CALL sp_productos_danmas_utilidad(1 , ${panio}, ${pmes})`;
    try {
        connection.query(consult, [panio, pmes], (err, results) => {
            if (err) {
                console.error("Error en la consulta:", err);
                return res.status(500).json({ error: 'Error al obtener los datos' });
            }

            if (results.length > 0 && results[0].length > 0) {
                //console.log(results)
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'No se encontraron productos que dan más utilidad' });
            }
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
};

//CLIENTES
module.exports.clientesVentas = (req, res) => {
    const { panio, pmes } = req.body;
    const consult = `CALL sp_clientes_danmas_ventas(1 , ${panio}, ${pmes})`;
    try {
        connection.query(consult, [panio, pmes], (err, results) => {
            if (err) {
                console.error("Error en la consulta:", err);
                return res.status(500).json({ error: 'Error al obtener los datos' });
            }
            if (results.length > 0 && results[0].length > 0) {
                //console.log(results)
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'No se encontraron clientes que dan más ventas' });
            }
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
};

module.exports.clientesUtilidad = (req, res) => {
    const { panio, pmes } = req.body;
    const consult = `CALL sp_cliente_danmas_utilidad(1 , ${panio}, ${pmes})`;
    try {
        connection.query(consult, [panio, pmes], (err, results) => {
            if (err) {
                console.error("Error en la consulta:", err);
                return res.status(500).json({ error: 'Error al obtener los datos' });
            }
            if (results.length > 0 && results[0].length > 0) {
                //console.log(results)
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'No se encontraron clientes que dan más utilidad' });
            }
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
};

