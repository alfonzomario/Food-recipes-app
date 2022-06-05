import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getRecipes} from '../actions';
import {Link} from 'react-router-dom'
import Recipe from './Recipe';

export default function Home (){
    const dispatch = useDispatch()
    const allRecipes = useSelector ((state)=>state.recipes)

    useEffect (()=>{
        dispatch(getRecipes());
    },[dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getRecipes());
    } 

    return(
        <div>
            <Link to='/new'>New recipe</Link>
            <h1>BEST RECIPES EVER!</h1>
            <button onClick={e=>{handleClick(e)}}>
                Show all recipes
            </button>
            <div>
                <select>
                    <option value='az'>A-Z</option>
                    <option value='za'>Z-A</option>
                    <option value='hscore'>High Score</option>
                    <option value='lscore'>Low Score</option>
                </select>
                <select>
                    <option value='all'>All</option>
                    <option value='gluten free'>Gluten Free</option>
                    <option value='ketogenic'>Ketogenic</option>
                    <option value='lacto ovo vegetarian'>Vegetarian</option>
                    <option value='vegan'>Vegan</option>
                    <option value='pescatarian'>Pescetarian</option>
                    <option value='paleolithic'>Paleo</option>
                    <option value='primal'>Primal</option>
                    <option value='low fodmap'>Low FODMAP</option>
                    <option value='whole 30'>Whole30</option>
                    <option value='dairy free'>Dairy Free</option>
                    <option value='fodmap friendly'>FODMAP Friendly</option>
                </select>
                {
                   allRecipes?.map((r)=>{
                       return (
                           <div>
                               <Link to={"/home/" + r.id}>
                               <Recipe image={r.image} title={r.title} diets={r.diets} key={r.id}/>
                               </Link>
                           </div>
                       )
                   })
                }
            </div>
        </div>
    )
}