const express = require('express');
const cors = require('cors');      // <-- Importar cors aquí
const app = express();
// cors
app.use(cors());
/*
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT","OPTIONS"],
}));*/
 // <--Mildware basico
app.use(express.json());

const rutas = require('./routes');
app.use('/', rutas);

module.exports = app;