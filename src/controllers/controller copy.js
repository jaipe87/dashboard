const connection = require('../models/db')
module.exports.resumenVentas = (req, res) => {
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
};

/*
module.exports.resumenVentas = (req, res) => {
    const { panio, pmes, pvendedor, pcategoria, pdistrito } = req.body;

    const consult = `CALL sp_resumen_ventas3(?, ?, ?, ?, ?)`;
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
*/

module.exports.ventasTotales = (req, res) => {
    const { panio, pmes, pigv, pvendedor, pcategoria, pdistrito } = req.body;

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

    let query = '';
    if (pigv === 1) {
        query = `
            SELECT 
                anio,
                mes,
                SUM(valor_con_igv) AS total_venta 
            FROM tmp_tabfac 
            ${conditions}
            GROUP BY cia, anio, mes;
        `;
    } else {
        query = `
            SELECT 
                anio,
                mes,
                SUM(valor_sin_igv) AS total_venta 
            FROM tmp_tabfac 
            ${conditions}
            GROUP BY cia, anio, mes;
        `;
    }

    try {
        connection.query(query, (err, results) => {
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
        console.error("Error en la ejecución:", e);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
};

module.exports.utilidades = (req, res) => {
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
            cia,
            anio,
            mes,
            SUM(utilidad) AS total_utilidad
        FROM 
            tmp_tabfac
        ${conditions}
        GROUP BY cia, anio, mes;
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
};
module.exports.valorCompra = (req, res) => {
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
            cia,
            anio,
            mes,
            SUM(valor_compra) AS total_valor_compra
        FROM 
            tmp_tabfac
        ${conditions}
        GROUP BY cia, anio, mes;
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
};
module.exports.rankingCliUtilidad = (req, res) => {
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
            razsoc, 
            SUM(utilidad) utilidad 
        FROM 
            tmp_tabfac
        ${conditions}
       GROUP BY cia,anio,mes, razsoc ORDER BY utilidad DESC;
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
};
module.exports.rankingCliVentas = (req, res) => {
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
            razsoc, 
            SUM(valor_sin_igv) valor_venta 
        FROM 
            tmp_tabfac
        ${conditions}
       GROUP BY cia,anio,mes, razsoc ORDER BY valor_venta DESC;
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
};
module.exports.rankingProdVentas = (req, res) => {
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
            descripcion_articulo, 
            SUM(valor_sin_igv) valor_venta 
        FROM 
            tmp_tabfac
        ${conditions}
       GROUP BY cia,anio,mes, descripcion_articulo ORDER BY valor_venta DESC;
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
};

module.exports.rankingProdUtilidad = (req, res) => {
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
            descripcion_articulo, 
            SUM(utilidad) utilidad 
        FROM 
            tmp_tabfac
        ${conditions}
       GROUP BY cia,anio,mes, descripcion_articulo ORDER BY utilidad  DESC;
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
};
