import React from 'react';
import {Link} from 'react-router-dom';
import styles from './styles/Landing.module.css'

export default function LandingPage(){
    return(
        <div className={styles.background}>
            <div className={styles.box}>
            <h1 className={styles.title}>MARITO'S RECIPES</h1>
            <h2 className={styles.title}>Welcome to the best guide of food ever!</h2>
            <Link to='/home'>
                <button className={styles.button}>SHOW ME!</button>
            </Link>
            </div>
        </div>
    )
}