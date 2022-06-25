import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getRecipes, filterRecipesByDiet, orderByOption} from '../actions';
import {Link} from 'react-router-dom'
import Recipe from './Recipe';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import styles from './styles/Home.module.css'

export default function Home (){
    const dispatch = useDispatch()
    const allRecipes = useSelector ((state)=>state.recipes)

    const [order, setOrder]=useState('')

    const [currentPage, setCurrentPAge] = useState(1)
    const [recipesPerPage] = useState(9)
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
        order === '' ? setOrder('setOrder') : setOrder('')
    }

    return(
        <div className={styles.background}>

        <div className={styles.bigbox}>

            <h1>MARITO'S RECIPES</h1>
            <Link to='/recipe'><button className={styles.button}>New recipe</button></Link>
            <SearchBar
                    paginado={paginado}
                />
            <button onClick={e=>{handleClick(e)}}>
                Show all recipes
            </button>
                  <div>
                        <select onChange={e=>handleSort(e)}>
                            <option value="" selected disabled hidden>Order by</option>
                            <option value='az'>A-Z</option>
                            <option value='za'>Z-A</option>
                            <option value='hscore'>High Score</option>
                            <option value='lscore'>Low Score</option>
                        </select>
                        <select onChange={e=>handleFilterDiet(e)}>
                            <option value="" selected disabled hidden>Diets</option>
                            <option value='all'>All</option>
                            <option value='Gluten free'>Gluten Free</option>
                            <option value='Ketogenic'>Ketogenic</option>
                            <option value='Lacto ovo vegetarian'>Vegetarian</option>
                            <option value='Vegan'>Vegan</option>
                            <option value='Pescatarian'>Pescetarian</option>
                            <option value='Paleolithic'>Paleo</option>
                            <option value='Primal'>Primal</option>
                            <option value='Whole 30'>Whole30</option>
                            <option value='Dairy free'>Dairy Free</option>
                            <option value='Fodmap friendly'>FODMAP Friendly</option>
                        </select>
                    </div>
                </div>

                <div className={styles.recipes}>
                { allRecipes==="unfinded"? <p>No existe esta receta.</p> :
                   currentRecipes?.map((r)=>{  // ese ?. qué hace?
                       return (
                           <div className={styles.recipe}>
                               <Link className={styles.hipervinculo} to={"/home/" + r.id}>
                               <Recipe image={r.image} title={r.title} diets={r.diets} key={r.id}/>
                               </Link>
                           </div>
                       )
                   })
                }
                </div>
                <Paginado
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginado={paginado}
                />
        </div>
    )
}