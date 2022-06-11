import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES'
export const FILTER_BY_DIET = 'FILTER_BY_DIET'
export const ORDER_BY_OPTION = 'ORDER_BY_OPTION'
export const GET_TITLE_RECIPES = 'GET_TITLE_RECIPES'
export const GET_DIETS = 'GET_DIETS'
export const POST_RECIPE = 'POST_RECIPE'

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
            console.log(error)
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