import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getRecipes, filterRecipesByDiet, orderByOption} from '../actions';
import {Link} from 'react-router-dom'
import Recipe from './Recipe';
import Paginado from './Paginado';
import SearchBar from './SearchBar';

export default function Home (){
    const dispatch = useDispatch()
    const allRecipes = useSelector ((state)=>state.recipes)

    const [order, setOrder]=useState('')

    const [currentPage, setCurrentPAge] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe)
    const paginado=(pageNumber)=>{
        setCurrentPAge(pageNumber)
    }

    useEffect (()=>{
        dispatch(getRecipes());
    },[dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getRecipes());
        setCurrentPAge(1)
    } 

    function handleFilterDiet(e){
        dispatch(filterRecipesByDiet(e.target.value))
        setCurrentPAge(1)
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByOption(e.target.value))
        setCurrentPAge(1)
        setOrder(`Ordered by ${e.target.value}`)
    }
//                        ALGUNA FORMA MEJOR PARA PONER EL ORDER BY?
//                        QUÉ ES LO QUE HACE QUE SE RENDERICE DE VUELTA AL CAMBIAR UN ESTADO?
    return(
        <div>
            <Link to='/recipe'>New recipe</Link>
            <h1>BEST RECIPES EVER!</h1>
            <button onClick={e=>{handleClick(e)}}>
                Show all recipes
            </button>
            <div>
                <select onChange={e=>handleSort(e)}>
                    <option>Order by</option>
                    <option value='az'>A-Z</option>
                    <option value='za'>Z-A</option>
                    <option value='hscore'>High Score</option>
                    <option value='lscore'>Low Score</option>
                </select>
                <select onChange={e=>handleFilterDiet(e)}>
                    <option value='all'>All</option>
                    <option value='gluten free'>Gluten Free</option>
                    <option value='ketogenic'>Ketogenic</option>
                    <option value='lacto ovo vegetarian'>Vegetarian</option>
                    <option value='vegan'>Vegan</option>
                    <option value='pescatarian'>Pescetarian</option>
                    <option value='paleolithic'>Paleo</option>
                    <option value='primal'>Primal</option>
                    <option value='whole 30'>Whole30</option>
                    <option value='dairy free'>Dairy Free</option>
                    <option value='fodmap friendly'>FODMAP Friendly</option>
                </select>
                <Paginado
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginado={paginado}
                />
                <SearchBar/>
                {
                   currentRecipes?.map((r)=>{  // ese ?. qué hace?
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