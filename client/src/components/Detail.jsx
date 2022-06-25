import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clearDetail } from "../actions";
import { useEffect } from "react";
import styles from './styles/Detail.module.css'

export default function Detail(){
const dispatch = useDispatch()

const {id} = useParams()

useEffect(()=>{
    dispatch(getDetail(id))
    return(()=>{
        dispatch(clearDetail())
    })
},[dispatch])

const theRecipe = useSelector ((state)=>state.detail)

return (
   <div className={styles.background}>
    {
        theRecipe.length>0 ?
    <div>
        <div className={styles.box}>
            <img className={styles.image} src={theRecipe[0].image} alt="img not found" width="312px" height="231px"/>
            <h1>{theRecipe[0].title}</h1>
         <div className={styles.box2}>  
            <h4>Diets: {theRecipe[0].diets.toString().replace(/,/g,", ")}</h4>
            <h4>Dish type: {theRecipe[0].dishTypes.toString().replace(/,/g,", ")}</h4>
            <h3>Likes: {theRecipe[0].aggregateLikes}</h3>
            <h3>Health score: {theRecipe[0].healthScore}</h3>
         </div> 
        </div>    
            <p className={styles.text}>Summary: {theRecipe[0].summary}</p>
            <p className={styles.text}>Steps: {theRecipe[0].steps}</p>
    </div> : <p className={styles.loading}>Loading...</p>
    }
    <Link to= '/home'>
        <button className={styles.button}>Back to home</button>
    </Link>
   </div> 
)
}

