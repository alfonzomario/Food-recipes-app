const { Router } = require('express');
require('dotenv').config();
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const recipes = require('./recipes')
router.use('/prueba', recipes)

module.exports = router;
