const { Router } = require('express');
require('dotenv').config();
const axios = require('axios');
const { Diet, Dish } = require('../db.js');

const getAllDiets = async () =>{
    const apiKey = process.env.YOUR_API_KEY;
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=40`);
    const typesDiets = apiUrl.data.results.map(d=>d.diets) 
    const arr1 = typesDiets.flat() // flat te concatena todos los array
    const obj1 = new Set(arr1) // te crea un objeto eliminando los valores repetidos
    const arr2 = [...obj1]
    const arr3 = arr2.map(a=>{return {name: a.charAt(0).toUpperCase()+ a.slice(1)}})
    await Diet.bulkCreate(arr3)
};

const getAllDishes = async () =>{
    const apiKey = process.env.YOUR_API_KEY;
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=40`);
    const typesDishes = apiUrl.data.results.map(d=>d.dishTypes)
    const arr1 = typesDishes.flat() // flat te concatena todos los array
    const obj1 = new Set(arr1) // te crea un objeto eliminando los valores repetidos
    const arr2 = [...obj1]
    const arr3 = arr2.map(a=>{return {name: a.charAt(0).toUpperCase()+ a.slice(1)}})
    await Dish.bulkCreate(arr3)
};

module.exports = {getAllDiets, getAllDishes};


// son 14 dishTypes: side dish, lunch, main course, main dish, dinner, morning meal, brunch, breakfast, soup, salad, condiment, dip, sauce, spread