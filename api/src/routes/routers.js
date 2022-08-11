const { Router } = require('express');
require('dotenv').config();
const axios = require('axios');
const { Recipe, Diet, Dish } = require('../db.js');
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
            dishTypes: d.dishTypes.map(dish=>dish.charAt(0).toUpperCase()+ dish.slice(1)),
            diets: d.diets.map(diet=>diet.charAt(0).toUpperCase()+ diet.slice(1)),
            summary: d.summary.replace(/<\/?.*?>/g, ""), //https://programmerclick.com/article/8344579458/
            aggregateLikes: d.aggregateLikes,
            healthScore: d.healthScore,
            steps: d.analyzedInstructions[0]?.steps.map(s=>s.step).join(" ") // ? Optional chaining es para mapear aunque haya arrays undefined
        };
    });
    return apiInfo;
}

const getDbInfo = async () => {
    let db = await Recipe.findAll({
        include:[{
            model: Diet,
            attributes: ['name']
        },
        {
            model: Dish,
            attributes: ['name']
        }]
    });
    const finalDb = db.map(d => {
        // const {id, title, disTypes, diets, summary, aggregateLikes, healthScore, steps, image} = d --> ECMAScript6
        return {
            id: d.id,
            title: d.title,
            dishTypes: d.dishes.map(d=>d.name),
            diets: d.diets.map(d=>d.name),
            summary: d.summary,
            aggregateLikes: d.aggregateLikes,
            healthScore: d.healthScore,
            steps: d.steps,
            image: d.image
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
             res.status(404).send('unfinded')
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
            res.status(404).send('ID unavailable.')
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

router.get('/dishes', async (req, res, next)=>{
    try{
        const dishType = await Dish.findAll();
        res.status(200).json(dishType)
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
       image,
       dishTypes,
       diets
           } = req.body
     const newRecipe = await Recipe.create({     
        title,
        summary,
        aggregateLikes,
        healthScore,
        steps,
        image
   })
   if(dishTypes){
    for(i=0; i < dishTypes.length; i++){
    const dbDishes = await Dish.findOne({
        where: {name: dishTypes[i]}
    })
    newRecipe.addDish(dbDishes)
    }
}
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