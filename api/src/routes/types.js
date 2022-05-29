const { Router } = require('express');
require('dotenv').config();
const axios = require('axios');
const { Recipe, Diet } = require('../db.js');

const getAllDiets = async () =>{
    const apiKey = process.env.YOUR_API_KEY;
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`);
    const typesDiets = apiUrl.data.results.map(d=>d.diets)
    const arr1 = typesDiets.flat()
    const obj1 = new Set(arr1)
    const arr2 = [...obj1] // CÓMO OCURRE? 
    const arr3 = arr2.map(a=>{return {name: a}})
    await Diet.bulkCreate(arr3)
};

module.exports = {getAllDiets};