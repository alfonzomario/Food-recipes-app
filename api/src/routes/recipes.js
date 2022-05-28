const { Router } = require('express');
require('dotenv').config();
const axios = require('axios');
const { Recipe, Diet } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/all', async (req, res)=>{
    const apiKey = process.env.YOUR_API_KEY;
    const result = await axios.get (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`);
    res.send(result.data)
})

router.get('/info', async (req, res)=>{
    const apiKey = process.env.YOUR_API_KEY;
    const result = await axios.get (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true`);
    res.send(result.data)
})

router.post('/create', async (req, res)=>{
     const {
        title,
        summary,
        aggregateLikes,
        healthScore,
        steps,
            } = req.body
    const newRecipe = await Recipe.create({     
        title,
        summary,
        aggregateLikes,
        healthScore,
        steps,
    })
    res.send(newRecipe)
})

router.post('/newdiet', async (req, res)=>{
    const {
       name
           } = req.body
   const newDiet = await Diet.create({     
        name
   })
   res.send(newDiet)
})

module.exports = router;
