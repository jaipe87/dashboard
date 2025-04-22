const connection = require('../models/db')

module.exports.meses = (req, res) => {
    const { panio } = req.body;
    const consult = `
        SELECT DISTINCT 
            mes 
        FROM tmp_tabfac 
        WHERE cia=1 AND anio = ${panio}
        ORDER BY mes ASC;
    `;

    try {
        connection.query(consult, (err, results) => {
            res.json(results)
        });
    } catch (e){
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
}

module.exports.distrito = (req, res) => {
    const { panio } = req.body;
    const consult = `
        SELECT
            distrito 
        FROM 
            tmp_tabfac 
        WHERE cia=1 AND anio = ${panio} 
        GROUP BY distrito;`;
    try {
        connection.query(consult, (err, results) => {
            res.json(results)
        });
    } catch (e){
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
}

module.exports.vendedor = (req, res) => {
    const { panio, pdistrito } = req.body;
    let conditions = `WHERE cia = 1 AND anio = ${panio}`;

    if (pdistrito && pdistrito !== "Todos") {
        conditions += ` AND distrito = "${pdistrito}"`;
    }
    const consult = `
    SELECT DISTINCT 
        vendedor 
    FROM tmp_tabfac 
    ${conditions}
    GROUP BY cia, anio, vendedor`;
    try {
        connection.query(consult, (err, results) => {
            res.json(results)
        });
    } catch (e){
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
}

module.exports.categoria = (req, res) => {
    const { panio, pdistrito, pvendedor } = req.body;
    let conditions = `WHERE cia = 1 AND anio = ${panio}`;

    if (pdistrito && pdistrito !== "Todos") {
        conditions += ` AND distrito = "${pdistrito}"`;
    }
    if (pvendedor && pvendedor !== "Todos") {
        conditions += ` AND vendedor = "${pvendedor}"`;
    }
    const consult = `
        SELECT DISTINCT 
            categoria 
        FROM tmp_tabfac
        ${conditions}
        ORDER BY categoria;`;
    try {
        connection.query(consult, (err, results) => {
            res.json(results)
        });
    } catch (e){

    }
}
