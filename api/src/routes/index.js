const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const rutas = require('./routers')
router.use('/food', rutas)


// PRUEBAS A LA API Y DB:
const pruebas = require('./pruebas')
router.use('/prueba', pruebas)

module.exports = router;
