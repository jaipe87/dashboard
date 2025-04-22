const express = require('express');
const router = express.Router();
const { ping } = require('../controllers/pingController');
const { ventas, ventasAnuales } = require('../controllers/ventasController');
const { login } = require('../controllers/loginController');
const { utilidadesAnuales } = require('../controllers/utilidadesController');
const { valorCompraAnuales } = require('../controllers/valorCompraController');
const { vendedor, distrito, categoria, meses } = require('../controllers/filtrosController');
const { productosVentas, productosUtilidad, clientesVentas, clientesUtilidad } = require('../controllers/rankingController');
const { resumenVentas, ventasTotales, utilidades, valorCompra, rankingProdVentas, rankingProdUtilidad, rankingCliUtilidad, rankingCliVentas } = require('../controllers/controller');


router.get('/ping', ping);
router.post('/login', login);
/*
router.post('/ventas', ventas);
router.post('/ventasAnuales', ventasAnuales);
router.post('/utilidadesAnuales', utilidadesAnuales);
router.post('/valorCompraAnuales', valorCompraAnuales);


router.post('/ranking/ventas/productos', productosVentas)
router.post('/ranking/ventas/clientes', clientesVentas)

router.post('/ranking/utilidades/productos', productosUtilidad)
router.post('/ranking/utilidades/clientes', clientesUtilidad)
*/

router.post('/filtros/vendedor', vendedor)
router.post('/filtros/distrito', distrito)
router.post('/filtros/categoria', categoria)
router.post('/filtros/meses', meses)


router.post('/resumenventas', resumenVentas)
router.post('/ventastotales', ventasTotales)
router.post('/utilidades', utilidades)
router.post('/valorCompra', valorCompra)

//Cambiar el nombre de las rutas
router.post('/ranking/prodventas', rankingProdVentas)
router.post('/ranking/produtilidad', rankingProdUtilidad)
router.post('/ranking/cliutilidad', rankingCliUtilidad)
router.post('/ranking/cliventas', rankingCliVentas)

module.exports = router;

