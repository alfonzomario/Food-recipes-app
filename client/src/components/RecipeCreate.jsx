import React, {useState,useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {postRecipe, getDiets} from '../actions';
import { useDispatch, useSelector } from 'react-redux';

export default function RecipeCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector((state)=>state.diets)

    const [input, setInput] = useState({
        title: "",
        summary: "",
        aggregateLikes: "",
        healthScore: "",
        steps: "",
        image: "",
        diets:[]
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleSelect(e){
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        }
    
    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postRecipe(input))
        alert("Recipe created!")
        setInput({
            title: "",
            summary: "",
            aggregateLikes: "",
            healthScore: "",
            steps: "",
            image: "",
            diets:[]
        })
        history.push('/home')
    }

    useEffect(()=>{  // PARA QUÉ ES?
        dispatch(getDiets())
    },[dispatch]);

    return(
        <div>
            <Link to= '/home'><button>Back</button></Link>
            <h1>Create your recipe!</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Title:</label>
                    <input
                    type= 'text'
                    value= {input.title}
                    name= 'title'
                    onChange={(e)=>handleChange(e)}
                    ></input>
                </div>
                <div>
                <label>Summary:</label>
                    <input
                    type= 'text'
                    value= {input.summary}
                    name= 'summary'
                    onChange={(e)=>handleChange(e)}
                    ></input>
                </div>
                <div>
                <label>Aggregate Likes:</label>
                    <input
                    type= 'number'
                    value= {input.aggregateLikes}
                    name= 'aggregateLikes'
                    onChange={(e)=>handleChange(e)}
                    ></input>
                </div>
                <div>
                <label>Health Score:</label>
                    <input
                    type= 'number'
                    value= {input.healthScore}
                    name= 'healthScore'
                    onChange={(e)=>handleChange(e)}
                    ></input>
                </div>
                <div>
                <label>Steps:</label>
                    <input
                    type= 'text'
                    value= {input.steps}
                    name= 'steps'
                    onChange={(e)=>handleChange(e)}
                    ></input>
                </div>
                <div>
                <label>Image:</label>
                    <input
                    type= 'text'
                    value= {input.image}
                    name= 'image'
                    onChange={(e)=>handleChange(e)}
                    ></input>
                </div>
                <div>Type of Diet:
                <select onChange={(e)=>handleSelect(e)}>
                    {diets.map((d)=>(
                        <option value={d.name}>{d.name.charAt(0).toUpperCase()+ d.name.slice(1)}</option>
                   ))}
                </select>
                <ul><li>{input.diets.map(d=>d.charAt(0).toUpperCase()+ d.slice(1)+", ")}</li></ul>
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}