import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES'
export const FILTER_BY_DIET = 'FILTER_BY_DIET'
export const ORDER_BY_OPTION = 'ORDER_BY_OPTION'
export const GET_TITLE_RECIPES = 'GET_TITLE_RECIPES'
export const GET_DIETS = 'GET_DIETS'
export const POST_RECIPE = 'POST_RECIPE'
export const GET_DETAIL = 'GET_DETAIL'
export const GET_DISHES = 'GET_DISHES'

export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/food/recipes");
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}
export function getTitleRecipes(title){
    return async function (dispatch){
        try{
            var json = await axios.get("http://localhost:3001/food/recipes?name="+title);
            return dispatch({
                type: 'GET_TITLE_RECIPES',
                payload: json.data
            })
        } catch (error){
            console.log(error)  // POR QUÉ EN ALGUNOS CASOS ME PIDE HACER CATCH ERROR?
        }
    }
}
export function getDiets(){
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/food/types")
        return dispatch({
            type: 'GET_DIETS',
            payload: json.data
        })
    }
}
export function getDishes(){
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/food/dishes")
        return dispatch({
            type: 'GET_DISHES',
            payload: json.data
        })
    }
}
export function postRecipe(payload){
    return async function (dispatch){
        var json = await axios.post("http://localhost:3001/food/recipe", payload);
        return json;
    }
}
export function filterRecipesByDiet(payload){
    return {
        type: 'FILTER_BY_DIET',
        payload
    }
}
export function orderByOption(payload){
    return {
        type: 'ORDER_BY_OPTION',
        payload
    }
}
export function getDetail(id){
    return async function (dispatch){
        try{
            var json = await axios.get("http://localhost:3001/food/recipes/"+id);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        } catch(error){
            console.log(error)
        }
    } 
}