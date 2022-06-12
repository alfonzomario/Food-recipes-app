import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function Detail(){
const dispatch = useDispatch()

const {id} = useParams()

useEffect(()=>{
    dispatch(getDetail(id))
},[dispatch]) // QUÉ OCURRE EN EL SEGUNDO PARÁMETRO?

const theRecipe = useSelector ((state)=>state.detail)

return (
   <div>
    {
        theRecipe.length>0 ?
        <div>
            <h1>{theRecipe[0].title}</h1>
            <img src={theRecipe[0].image} alt="img not found" width="312px" height="231px"/>
            <h4>Diets: {theRecipe[0].diets.toString().replace(/,/g,", ")}</h4>
            <h4>Dish type: {theRecipe[0].dishTypes.toString().replace(/,/g,", ")}</h4>
            <h3>Likes: {theRecipe[0].aggregateLikes}</h3>
            <h3>Health score: {theRecipe[0].healthScore}</h3>
            <p>Steps: {theRecipe[0].steps}</p>
        </div> : <p>Loading...</p> // MEDIO QUE NO ME ANDA ESTO
    }
    <Link to= '/home'>
        <button>Back to home</button>
    </Link>
   </div> 
)
}

