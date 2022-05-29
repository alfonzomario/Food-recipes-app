const { Router } = require('express');
require('dotenv').config();
const axios = require('axios');
const { Recipe, Diet } = require('../db.js');

const getAllDiets = async () =>{
    const apiKey = process.env.YOUR_API_KEY;
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`);
    const typesDiets = apiUrl.data.results.map(d=>d.diets)
    const arr1 = typesDiets.flat()
    const arr2 = new Set(arr1) // INVESTIGAR
    const arr3 = [...arr2] // INVESTIGAR 
    const arr4 = arr3.map(a=>{return {name: a}})
    await Diet.bulkCreate(arr4) // INVESTIGAR
};

module.exports = {getAllDiets};