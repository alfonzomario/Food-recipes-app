const { Router } = require('express');
require('dotenv').config();
const axios = require('axios');
const { Diet } = require('../db.js');

const getAllDiets = async () =>{
    const apiKey = process.env.YOUR_API_KEY;
    const arr0 = ["low fodmap"];
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`);
    const typesDiets = apiUrl.data.results.map(d=>d.diets)
    const arr1 = typesDiets.flat() // flat te concatena todos los array
    const arr01 = arr0.concat(arr1)
    const obj1 = new Set(arr01) // te crea un objeto eliminando los valores repetidos
    const arr2 = [...obj1]
    const arr3 = arr2.map(a=>{return {name: a}})
    await Diet.bulkCreate(arr3)
};

module.exports = {getAllDiets};