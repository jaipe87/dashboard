const connection = require('../models/db')
/*

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
*/

// Función utilitaria para ejecutar consultas SQL simples
function executeQuery(res, query, params) {
    connection.query(query, params, (err, results) => {
        if (err) {
            console.error("Error al ejecutar la consulta:", err);
            return res.status(500).json({ error: 'Error al obtener los datos' });
        }

        return res.json(results);
    });
}

module.exports = {
    meses: (req, res) => {
        const { panio } = req.body;
        if (!panio) return res.status(400).json({ error: 'Año es obligatorio' });

        const consult = `
            SELECT DISTINCT mes
            FROM tmp_tabfac 
            WHERE cia = 1 AND anio = ?
            ORDER BY mes ASC;
        `;
        executeQuery(res, consult, [panio]);
    },

    distrito: (req, res) => {
        const { panio } = req.body;
        if (!panio) return res.status(400).json({ error: 'Año es obligatorio' });

        const consult = `
            SELECT distrito
            FROM tmp_tabfac
            WHERE cia = 1 AND anio = ?
            GROUP BY distrito;
        `;
        executeQuery(res, consult, [panio]);
    },

    vendedor: (req, res) => {
        const { panio, pdistrito } = req.body;
        if (!panio) return res.status(400).json({ error: 'Año es obligatorio' });

        let consult = `
            SELECT DISTINCT vendedor
            FROM tmp_tabfac
            WHERE cia = 1 AND anio = ?
        `;
        const params = [panio];

        if (pdistrito && pdistrito !== "Todos") {
            consult += ` AND distrito = ?`;
            params.push(pdistrito);
        }

        consult += ` GROUP BY cia, anio, vendedor`;

        executeQuery(res, consult, params);
    },

    categoria: (req, res) => {
        const { panio, pdistrito, pvendedor } = req.body;
        if (!panio) return res.status(400).json({ error: 'Año es obligatorio' });

        let consult = `
            SELECT DISTINCT categoria
            FROM tmp_tabfac
            WHERE cia = 1 AND anio = ?
        `;
        const params = [panio];

        if (pdistrito && pdistrito !== "Todos") {
            consult += ` AND distrito = ?`;
            params.push(pdistrito);
        }
        if (pvendedor && pvendedor !== "Todos") {
            consult += ` AND vendedor = ?`;
            params.push(pvendedor);
        }

        consult += ` ORDER BY categoria`;

        executeQuery(res, consult, params);
    }
};
