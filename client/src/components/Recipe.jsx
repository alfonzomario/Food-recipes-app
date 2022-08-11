import React from "react";
import styles from './styles/Recipe.module.css'

export default function Recipe({image, title, diets}){
    return (
        <div className={styles.box}>
            <img className={styles.image} src={image} alt="img not found"/>
            <h3>{title}</h3>
            <h5>{diets.toString().replace(/,/g,", ")}</h5>
        </div>
    );
}