import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTitleRecipes } from '../actions';

export default function SearchBar({paginado}){
const dispatch = useDispatch() 
const [title, setTitle] = useState("")

function handleInputChange(e){
    e.preventDefault()
    setTitle(e.target.value)
}

function handleSubmit(e){
    e.preventDefault()
    dispatch(getTitleRecipes(title))
    setTitle("")
    paginado(1) 
}

return (
    <div>
        <input
        type= 'text'
        placeholder = "Search..."
        value = {title}
        onChange={(e)=> handleInputChange(e)}/>
        <button type='submit' onClick={(e)=>handleSubmit(e)}>Search</button>
    </div>
)

}