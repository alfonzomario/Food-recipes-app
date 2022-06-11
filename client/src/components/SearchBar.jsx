import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTitleRecipes } from '../actions';

export default function SearchBar(){
const dispatch = useDispatch() // para qué es
const [title, setTitle] = useState("")

function handleInputChange(e){
    e.preventDefault()
    setTitle(e.target.value)
}

function handleSubmit(e){
    e.preventDefault()
    dispatch(getTitleRecipes(title)) // CÓMO HACER SI NO ENCUENTRA UN TITULO
}

return (
    <div>
        <input
        type= 'text'
        placeholder = "Search..."
        onChange={(e)=> handleInputChange(e)}/>
        <button type='submit' onClick={(e)=>handleSubmit(e)}>Search</button>
    </div>
)

}