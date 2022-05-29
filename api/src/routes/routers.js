const { Router } = require('express');
require('dotenv').config();
const axios = require('axios');
const { Recipe, Diet } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const getApiInfo = async () => {
    const apiKey = process.env.YOUR_API_KEY;
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`);
    const apiInfo = await apiUrl.data.results.map(d => {
        return {
            id: d.id,
            image: d.image,
            title: d.title,
            dishTypes: d.dishTypes,
            diet: d.diets,
            summary: d.summary, // .replace(/<[^>]*>?/g, "") LO PROPONE MATI
            aggregateLikes: d.aggregateLikes,
            healthScore: d.healthScore,
            steps: d.analyzedInstructions[0]?.steps.map(s=>s.step) // POR QUE el Optional chaining ?. LO PROPONE MATI
        };
    });
    return apiInfo;
}

const getDbInfo = async () => {
    return await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [] // POR QUÉ? LO PROPONE SELENE
            }
        }
    });
};

const getAllRecipes = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo;
};

router.get('/recipes/:idReceta', async (req, res, next)=>{
    const title = req.query.name;
    const idReceta = req.params.idReceta;
    try{
        let totalRecipes = await getAllRecipes();
        console.log(totalRecipes)
        if (title) {
         let recipeTitle = await totalRecipes.filter(t => t.title.toLowerCase().includes(title.toLowerCase()))
         recipeTitle.length ?
         res.status(200).send(recipeTitle) :
         res.status(404).send('No existe esta receta.')
     } 
        if (idReceta) {
         let recipeById = await totalRecipes.filter(t=> t.id == idReceta)
         recipeById.length ?
         res.status(200).send(recipeById) :
         res.status(404).send('ID inexistente.')
        }
     else{
        res.status(200).send(totalRecipes)
     }
    } catch (error){
        res.send("Se te acabó la API KEY")
        console.log(error)
    } 
});

router.get('/types', async (req, res, next)=>{
    try{
        const dietType = await Diet.findAll();
        res.status(200).json(dietType)
    } catch (error){
        next(error)
    }
});

router.post('/recipe', async (req, res, next)=>{
    try{
    const {
       title,
       summary,
       aggregateLikes,
       healthScore,
       steps
           } = req.body
     const newRecipe = await Recipe.create({     
        title,
        summary,
        aggregateLikes,
        healthScore,
        steps
   })
   res.send(newRecipe)
    } catch (error){
        next(error)
    }
})

module.exports = router;