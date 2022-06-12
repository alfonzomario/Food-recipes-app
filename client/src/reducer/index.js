
import { GET_RECIPES, FILTER_BY_DIET, ORDER_BY_OPTION, GET_TITLE_RECIPES, POST_RECIPE, GET_DIETS, GET_DETAIL, GET_DISHES } from "../actions";

const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: [],
    dishTypes: []
}

function rootReducer (state=initialState, action){
    switch(action.type) {
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload  
            }
        case GET_TITLE_RECIPES:
            return{
                ...state,
                recipes: action.payload
            }
        case GET_DIETS:
            return{
                ...state,
                diets: action.payload
            }
        case GET_DISHES:
            return{
                ...state,
                dishTypes: action.payload
            }
        case FILTER_BY_DIET:
                const allRecipes = state.allRecipes
                const dietsFiltered = action.payload === 'all' ? allRecipes : allRecipes.filter(r=>r.diets.includes(action.payload))
                return{
                    ...state,
                    recipes: dietsFiltered
                }
        case POST_RECIPE:
            return{
                ...state,
            }
        case ORDER_BY_OPTION:
            let sortedArr = action.payload
            if (sortedArr === 'az'){
                state.recipes.sort(function(a,b){
                    if(a.title.toUpperCase()>b.title.toUpperCase()){
                        return 1;
                    }
                    if(b.title.toUpperCase()>a.title.toUpperCase()){
                        return-1;
                    }
                    return 0;
                })
            }
            if (sortedArr === 'za'){
                state.recipes.sort(function(a,b){
                    if(a.title.toUpperCase()>b.title.toUpperCase()){
                        return -1;
                    }
                    if(b.title.toUpperCase()>a.title.toUpperCase()){
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
                ...state,  // retorna el estado ya modificado por el sort?
            }
            case GET_DETAIL:
                return{
                    ...state,
                    detail: action.payload
                }
    
            default:
                return state;
    }
}

export default rootReducer;