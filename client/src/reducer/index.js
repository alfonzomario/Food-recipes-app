
import { GET_RECIPES, FILTER_BY_DIET, ORDER_BY_OPTION } from "../actions";

const initialState = {
    recipes: [],
    allRecipes: []
}

function rootReducer (state=initialState, action){
    switch(action.type) {
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload  
            }
        case FILTER_BY_DIET:
                const allRecipes = state.allRecipes
                const dietsFiltered = action.payload === 'all' ? allRecipes : allRecipes.filter(r=>r.diets.includes(action.payload))
                return {
                    ...state,
                    recipes: dietsFiltered
                }
        case ORDER_BY_OPTION:
            let sortedArr = action.payload
            if (sortedArr === 'az'){
                state.recipes.sort(function(a,b){
                    if(a.title>b.title){
                        return 1;
                    }
                    if(b.title>a.title){
                        return-1;
                    }
                    return 0;
                })
            }
            if (sortedArr === 'za'){
                state.recipes.sort(function(a,b){
                    if(a.title>b.title){
                        return -1;
                    }
                    if(b.title>a.title){
                        return 1;
                    }
                    return 0;
                })
            }
            if (sortedArr === 'hscore'){
                state.recipes.sort(function(a,b){
                    if(a.aggregateLikes>b.aggregateLikes){
                        return -1;
                    }
                    if(b.aggregateLikes>a.aggregateLikes){
                        return 1;
                    }
                    return 0;
                })
            }
            if (sortedArr === 'lscore'){
                state.recipes.sort(function(a,b){
                    if(a.aggregateLikes>b.aggregateLikes){
                        return 1;
                    }
                    if(b.aggregateLikes>a.aggregateLikes){
                        return -1;
                    }
                    return 0;
                })
            }
            return{
                ...state,
                characters: sortedArr
            }
            
    
            default:
                return state;
    }
}

export default rootReducer;