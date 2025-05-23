const connection = require('../models/db')
/*module.exports.resumenVentas = (req, res) => {
    const { panio, pmes, pvendedor, pcategoria, pdistrito } = req.body;
    
    let conditions = `WHERE cia = 1 AND anio = ${panio}`;
    
    if (pmes && pmes !== "Todos") {
        conditions += ` AND mes = ${pmes}`;
    }
    if (pvendedor && pvendedor !== "Todos") {
        conditions += ` AND vendedor = "${pvendedor}"`;
    }
    if (pcategoria && pcategoria !== "Todos") {
        conditions += ` AND categoria = "${pcategoria}"`;
    }
    if (pdistrito && pdistrito !== "Todos") {
        conditions += ` AND distrito = "${pdistrito}"`;
    }

    const consult = `
        SELECT  
            SUM(cantidad) AS cantidad_venta, 
            SUM(valor_sin_igv) AS valor_venta, 
            SUM(valor_con_igv - valor_sin_igv) AS igv_venta, 
            SUM(valor_con_igv) AS total_venta, 
            SUM(valor_compra) AS costos_venta, 
            SUM(utilidad) AS utilidad 
        FROM tmp_tabfac 
        ${conditions}
        GROUP BY cia, anio;
    `;

    try {
        connection.query(consult, (err, results) => {
            if (err) {
                console.error("Error en la consulta:", err);
                return res.status(500).json({ error: 'Error al obtener los datos' });
            }

            if (results.length > 0) {
                res.json(results);
            } else {
                res.status(404).json({ error: 'No se encontraron datos de ventas' });
            }
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
};*/

/*
module.exports.resumenVentas = (req, res) => {
    const { panio, pmes, pvendedor, pcategoria, pdistrito } = req.body;

    const consult = `CALL sp_resumen_ventas3(1, ?, ?, ?, ?, ?)`;
    const params = [panio, pmes || null, pvendedor || null, pcategoria || null, pdistrito || null];

    connection.query(consult, params, (err, results) => {
        if (err) {
            console.error("Error al ejecutar el stored procedure:", err);
            return res.status(500).json({ error: 'Error al obtener los datos' });
        }

        if (results[0].length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'No se encontraron datos de ventas' });
        }
    });
};

module.exports.ventasTotales = (req, res) => {
    const { panio, pmes, pigv, pvendedor, pcategoria, pdistrito } = req.body;

    const consult = `CALL sp_ventas_anuales2(1, ?, ?, ?, ?, ?, ?)`;
    const params = [panio, pmes, pigv, pvendedor || null, pcategoria || null, pdistrito || null];

    connection.query(consult, params, (err, results) => {
        if (err) {
            console.error("Error al ejecutar el stored procedure:", err);
            return res.status(500).json({ error: 'Error al obtener los datos' });
        }

        if (results[0].length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'No se encontraron datos de ventas' });
        }
    });
};

module.exports.utilidades = (req, res) => {
    const { panio, pmes, pvendedor, pcategoria, pdistrito } = req.body;

    const consult = `CALL sp_utilidades_anuales2(1, ?, ?, ?, ?,?)`;
    const params = [panio, pmes, pvendedor || null, pcategoria || null, pdistrito || null];

    connection.query(consult, params, (err, results) => {
        if (err) {
            console.error("Error al ejecutar el stored procedure:", err);
            return res.status(500).json({ error: 'Error al obtener los datos' });
        }

        if (results[0].length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'No se encontraron datos de ventas' });
        }
    });
};
module.exports.valorCompra = (req, res) => {
    const { panio, pmes, pvendedor, pcategoria, pdistrito } = req.body;

    const consult = `CALL sp_valor_compra_anuales2(1, ?, ?, ?, ?,?)`;
    const params = [panio, pmes, pvendedor || null, pcategoria || null, pdistrito || null];

    connection.query(consult, params, (err, results) => {
        if (err) {
            console.error("Error al ejecutar el stored procedure:", err);
            return res.status(500).json({ error: 'Error al obtener los datos' });
        }

        if (results[0].length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'No se encontraron datos de ventas' });
        }
    });
};

module.exports.rankingCliUtilidad = (req, res) => {
    const { panio, pmes, pvendedor, pcategoria, pdistrito } = req.body;

    const consult = `CALL sp_clientes_danmas_utilidad2(1, ?, ?, ?, ?,?)`;
    const params = [panio, pmes, pvendedor || null, pcategoria || null, pdistrito || null];

    connection.query(consult, params, (err, results) => {
        if (err) {
            console.error("Error al ejecutar el stored procedure:", err);
            return res.status(500).json({ error: 'Error al obtener los datos' });
        }

        if (results[0].length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'No se encontraron datos de ventas' });
        }
    });
};
module.exports.rankingCliVentas = (req, res) => {
    const { panio, pmes, pvendedor, pcategoria, pdistrito } = req.body;
    
    const consult = `CALL sp_clientes_danmas_ventas2(1, ?, ?, ?, ?,?)`;
    const params = [panio, pmes, pvendedor || null, pcategoria || null, pdistrito || null];

    connection.query(consult, params, (err, results) => {
        if (err) {
            console.error("Error al ejecutar el stored procedure:", err);
            return res.status(500).json({ error: 'Error al obtener los datos' });
        }

        if (results[0].length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'No se encontraron datos de ventas' });
        }
    });
};
module.exports.rankingProdVentas = (req, res) => {
    const { panio, pmes, pvendedor, pcategoria, pdistrito } = req.body;

    const consult = `CALL sp_productos_danmas_ventas2(1, ?, ?, ?, ?,?)`;
    const params = [panio, pmes, pvendedor || null, pcategoria || null, pdistrito || null];

    connection.query(consult, params, (err, results) => {
        if (err) {
            console.error("Error al ejecutar el stored procedure:", err);
            return res.status(500).json({ error: 'Error al obtener los datos' });
        }

        if (results[0].length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'No se encontraron datos de ventas' });
        }
    });
};

module.exports.rankingProdUtilidad = (req, res) => {
    const { panio, pmes, pvendedor, pcategoria, pdistrito } = req.body;

    const consult = `CALL sp_productos_danmas_utilidad2(1, ?, ?, ?, ?,?)`;
    const params = [panio, pmes, pvendedor || null, pcategoria || null, pdistrito || null];

    connection.query(consult, params, (err, results) => {
        if (err) {
            console.error("Error al ejecutar el stored procedure:", err);
            return res.status(500).json({ error: 'Error al obtener los datos' });
        }

        if (results[0].length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'No se encontraron datos de ventas' });
        }
    });
};
*/


// Función utilitaria para ejecutar SPs
function executeProcedure(res, query, params) {
    connection.query(query, params, (err, results) => {
        if (err) {
            console.error("Error al ejecutar el stored procedure:", err);
            return res.status(500).json({ error: 'Error al obtener los datos' });
        }

        if (results && results[0] && results[0].length > 0) {
            return res.json(results[0]);
        } else {
            return res.status(404).json({ error: 'No se encontraron datos' });
        }
    });
}

module.exports = {
    resumenVentas: (req, res) => {
        const { panio, pmes, pvendedor, pcategoria, pdistrito } = req.body;
        if (!panio) return res.status(400).json({ error: 'Año es obligatorio' });

        const consult = `CALL sp_resumen_ventas3(1, ?, ?, ?, ?, ?)`;
        const params = [panio, pmes || null, pvendedor || null, pcategoria || null, pdistrito || null];
        executeProcedure(res, consult, params);
    },

    ventasTotales: (req, res) => {
        const { panio, pmes, pigv, pvendedor, pcategoria, pdistrito } = req.body;
        if (!panio || pigv === undefined) return res.status(400).json({ error: 'Año e IGV son obligatorios' });

        const consult = `CALL sp_ventas_anuales2(1, ?, ?, ?, ?, ?, ?)`;
        const params = [panio, pmes, pigv, pvendedor || null, pcategoria || null, pdistrito || null];
        executeProcedure(res, consult, params);
    },

    utilidades: (req, res) => {
        const { panio, pmes, pvendedor, pcategoria, pdistrito } = req.body;
        if (!panio) return res.status(400).json({ error: 'Año es obligatorio' });

        const consult = `CALL sp_utilidades_anuales2(1, ?, ?, ?, ?, ?)`;
        const params = [panio, pmes, pvendedor || null, pcategoria || null, pdistrito || null];
        executeProcedure(res, consult, params);
    },

    valorCompra: (req, res) => {
        const { panio, pmes, pvendedor, pcategoria, pdistrito } = req.body;
        if (!panio) return res.status(400).json({ error: 'Año es obligatorio' });

        const consult = `CALL sp_valor_compra_anuales2(1, ?, ?, ?, ?, ?)`;
        const params = [panio, pmes, pvendedor || null, pcategoria || null, pdistrito || null];
        executeProcedure(res, consult, params);
    },

    rankingCliUtilidad: (req, res) => {
        const { panio, pmes, pvendedor, pcategoria, pdistrito } = req.body;
        if (!panio) return res.status(400).json({ error: 'Año es obligatorio' });

        const consult = `CALL sp_clientes_danmas_utilidad2(1, ?, ?, ?, ?, ?)`;
        const params = [panio, pmes, pvendedor || null, pcategoria || null, pdistrito || null];
        executeProcedure(res, consult, params);
    },

    rankingCliVentas: (req, res) => {
        const { panio, pmes, pvendedor, pcategoria, pdistrito } = req.body;
        if (!panio) return res.status(400).json({ error: 'Año es obligatorio' });

        const consult = `CALL sp_clientes_danmas_ventas2(1, ?, ?, ?, ?, ?)`;
        const params = [panio, pmes, pvendedor || null, pcategoria || null, pdistrito || null];
        executeProcedure(res, consult, params);
    },

    rankingProdVentas: (req, res) => {
        const { panio, pmes, pvendedor, pcategoria, pdistrito } = req.body;
        if (!panio) return res.status(400).json({ error: 'Año es obligatorio' });

        const consult = `CALL sp_productos_danmas_ventas2(1, ?, ?, ?, ?, ?)`;
        const params = [panio, pmes, pvendedor || null, pcategoria || null, pdistrito || null];
        executeProcedure(res, consult, params);
    },

    rankingProdUtilidad: (req, res) => {
        const { panio, pmes, pvendedor, pcategoria, pdistrito } = req.body;
        if (!panio) return res.status(400).json({ error: 'Año es obligatorio' });

        const consult = `CALL sp_productos_danmas_utilidad2(1, ?, ?, ?, ?, ?)`;
        const params = [panio, pmes, pvendedor || null, pcategoria || null, pdistrito || null];
        executeProcedure(res, consult, params);
    }
};