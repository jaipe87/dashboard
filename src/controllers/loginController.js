const crypto = require('crypto');
const connection = require('../models/db');
const jwt = require('jsonwebtoken');
/*
module.exports.login = (req, res) => {
   
    const { NOMUSR, PWD } = req.body;

    // const hashedPassword = crypto.createHash('md5').update(PWD).digest('hex');

    const consult = 'SELECT * FROM tg_usr WHERE NOMUSR = ? AND PWD = ?';
    try {
        connection.query(consult, [NOMUSR, PWD], (err, result) => {
            if (err) {
                return res.status(500).send({ error: 'Error en el servidor' });
            }
            if (result.length > 0) {
                const user = result[0];
                const token = jwt.sign(
                    { 
                        username: user.NOMUSR,
                        role: user.CODCAR
                    }, 
                    "Stack", 
                    { expiresIn: '3m' }
                );
            
                res.send({ 
                    token, 
                    username: user.NOMUSR,
                    role: user.CODCAR
                });

            } else {
                console.log('Wrong user');
                res.send({ message: 'Wrong user' }); 
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Error en el servidor' });
    }
}*/

module.exports.login = (req, res) => {
    const { NOMUSR, PWD } = req.body;

    if (!NOMUSR || !PWD) {
        return res.status(400).json({ error: 'Faltan datos de usuario o contraseña' });
    }

    const consult = 'SELECT * FROM tg_usr WHERE NOMUSR = ? AND PWD = ?';
    
    connection.query(consult, [NOMUSR, PWD], (err, result) => {
        if (err) {
            console.error('Error en la base de datos:', err);
            return res.status(500).json({ error: 'Error en el servidor de base de datos' });
        }

        if (result.length > 0) {
            const user = result[0];
            const token = jwt.sign(
                { 
                    username: user.NOMUSR,
                    role: user.CODCAR
                }, 
                "Stack", 
                { expiresIn: '3m' }
            );
        
            return res.json({ 
                token, 
                username: user.NOMUSR,
                role: user.CODCAR
            });
        } else {
            console.log('Usuario o contraseña incorrectos');
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
    });
};