import React from 'react';
import styles from './styles/Paginado.module.css'


export default function Paginado ({recipesPerPage, allRecipes, paginado}){
    const pageNumbers= []

    for (let i=0;i<Math.ceil(allRecipes/recipesPerPage);i++){
        pageNumbers.push(i+1)
    }
    return(
        <nav className={styles.paginado}>
            <ul className={styles.paginacion}>
                {pageNumbers && pageNumbers.length>1 && pageNumbers.map(number=>(
                    <button onClick={()=> paginado(number)} className={styles.item} key={number}>
                        {number}
                    </button>
                ))}

            </ul>
        </nav>
    )
}