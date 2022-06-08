import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES'
export const FILTER_BY_DIET = 'FILTER_BY_DIET'
export const ORDER_BY_OPTION = 'ORDER_BY_OPTION'

export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/food/recipes");
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
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