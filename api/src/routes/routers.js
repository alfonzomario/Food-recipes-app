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
            diets: d.diets,
            summary: d.summary.replace(/<[^>]*>?/g, ""), //LO PROPONE MATI
            aggregateLikes: d.aggregateLikes,
            healthScore: d.healthScore,
            steps: d.analyzedInstructions[0]?.steps.map(s=>s.step).join(" ") // POR QUE el Optional chaining ?. LO PROPONE MATI
        };
    });
    return apiInfo;
}

const getDbInfo = async () => {
    let db = await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ['name']
        }
    });
    const finalDb = db.map(d => {
        return {
            id: d.id,
            title: d.title,
            dishTypes: d.dishTypes,
            diets: d.diets.map(d=>d.name),
            summary: d.summary,
            aggregateLikes: d.aggregateLikes,
            healthScore: d.healthScore,
            steps: d.steps
        }
    })
    return finalDb
};

const getAllRecipes = async () =>{
    const dbInfo = await getDbInfo();
    const apiInfo = await getApiInfo();
    const totalInfo = dbInfo.concat(apiInfo);
    return totalInfo;
};

router.get('/recipes', async (req, res, next)=>{
    const title = req.query.name;
    try{
        let totalRecipes = await getAllRecipes();
        if (title) {
            let recipeTitle = await totalRecipes.filter(t => t.title.toLowerCase().includes(title.toLowerCase()))
            recipeTitle.length ?
            res.status(200).send(recipeTitle) :
             res.status(404).send('No existe esta receta.')
     } 
     else{
        res.status(200).send(totalRecipes)
     }
    } catch (error){
        next(error)
    } 
});

router.get('/recipes/:idReceta', async (req, res, next)=>{
    const idReceta = req.params.idReceta;
    try{
        if (idReceta) {
            let totalRecipes = await getAllRecipes();
            let recipeById = await totalRecipes.filter(t=> t.id == idReceta)
            recipeById.length ?
            res.status(200).send(recipeById) :
            res.status(404).send('ID inexistente.')
       }
    } catch (error){
        next(error)
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
       steps,
       diets
           } = req.body
     const newRecipe = await Recipe.create({     
        title,
        summary,
        aggregateLikes,
        healthScore,
        steps
   })
    if(diets){
        for(i=0; i < diets.length; i++){
        const dbDiets = await Diet.findOne({
            where: {name: diets[i]}
        })
        newRecipe.addDiet(dbDiets)
    }
   }
    res.send(newRecipe)
    } catch (error){
        next(error)
    }
})

module.exports = router;