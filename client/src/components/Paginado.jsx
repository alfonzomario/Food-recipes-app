import React from 'react';

export default function Paginado ({recipesPerPage, allRecipes, paginado}){
    const pageNumbers= []

    for (let i=0;i<Math.ceil(allRecipes/recipesPerPage);i++){
        pageNumbers.push(i+1)
    }
    return(
        <nav>
            <ul className='paginado'>
                {pageNumbers &&                 // cómo se lee este código?
                pageNumbers.map(number=>(
                    <li className='number' key={number}>
                        <a onClick={()=> paginado(number)}>{number}</a>
                    </li>
                ))}

            </ul>
        </nav>
    )
}