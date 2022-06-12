import React, {useState,useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {postRecipe, getDiets, getDishes} from '../actions';
import { useDispatch, useSelector } from 'react-redux';

function validate(input){
    let errors={};
    if (!input.title){
        errors.title = "A title is required.";
    } else if (!input.summary){
        errors.summary = "A summary is required.";
    } else if (!input.aggregateLikes){
        errors.aggregateLikes = "A minimun of likes are required.";
    } else if (!input.healthScore){
        errors.healthScore = "A health score is required.";
    } else if (!input.steps){
        errors.steps = "Steps are required.";
    } else if (!input.image){
        errors.image = "A image's URL is required.";
    } else if (!input.diets[0]){
        errors.diets = "Types of diets are required.";
    } else if (!input.dishTypes[0]){
        errors.diets = "Types of dishes are required.";
    }
    return errors;
};
// NO PUSE DE LOS LIKES PORQUE NO LO VEO NECESARIO PERO ME GUSTARIA AGREGAR LIKES DE OTRA FORMA.
export default function RecipeCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector((state)=>state.diets)
    const dishTypes = useSelector((state)=>state.dishTypes)
    const [errors, setErrors] = useState({}) // POR QUÉ OBJETO?

    const [input, setInput] = useState({
        title: "",
        summary: "",
        aggregateLikes: "",
        healthScore: "",
        steps: "",
        image: "",
        diets:[],
        dishTypes: []
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e){
            setInput({
                ...input,
                diets: [...input.diets, e.target.value],
            })
        setErrors(validate({
            ...input,
            diets: [...input.diets, e.target.value],
        }))
    }

    function handleSelect2(e){
        setInput({
            ...input,
            dishTypes: [...input.dishTypes, e.target.value]
        })
    setErrors(validate({
        ...input,
        dishTypes: [...input.dishTypes, e.target.value]
    }))
}

    function handleDelete(e){
        setInput({
            ...input,
            diets: input.diets.filter(d => d !== e),
        })
    }

    function handleDelete2(e){
        setInput({
            ...input,
            dishTypes: input.dishTypes.filter(d => d !== e)
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
            diets:[],
            dishTypes: []
        })
        history.push('/home')
    }

    useEffect(()=>{  // PARA QUÉ ES?
        dispatch(getDiets())
    },[dispatch]);

    useEffect(()=>{  // PARA QUÉ ES?
        dispatch(getDishes())
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
                    {errors.title && (
                        <p className='error'>{errors.title}</p>
                    )}
                </div>
                <div>
                <label>Summary:</label>
                    <input
                    type= 'text'
                    value= {input.summary}
                    name= 'summary'
                    onChange={(e)=>handleChange(e)}
                    ></input>
                    {errors.summary && (
                        <p className='error'>{errors.summary}</p>
                    )}
                </div>
                <div>
                <label>Aggregate Likes:</label>
                    <input
                    type= 'number'
                    value= {input.aggregateLikes}
                    name= 'aggregateLikes'
                    onChange={(e)=>handleChange(e)}
                    ></input>
                    {errors.aggregateLikes && (
                        <p className='error'>{errors.aggregateLikes}</p>
                    )}
                </div>
                <div>
                <label>Health Score:</label>
                    <input
                    type= 'number'
                    value= {input.healthScore}
                    name= 'healthScore'
                    onChange={(e)=>handleChange(e)}
                    ></input>
                    {errors.healthScore && (
                        <p className='error'>{errors.healthScore}</p>
                    )}
                </div>
                <div>
                <label>Steps:</label>
                    <input
                    type= 'text'
                    value= {input.steps}
                    name= 'steps'
                    onChange={(e)=>handleChange(e)}
                    ></input>
                    {errors.steps && (
                        <p className='error'>{errors.steps}</p>
                    )}
                </div>
                <div>
                <label>Image:</label>
                    <input
                    type= 'text'
                    value= {input.image}
                    name= 'image'
                    onChange={(e)=>handleChange(e)}
                    ></input>
                    {errors.image && (
                        <p className='error'>{errors.image}</p>
                    )}
                </div>
                <div>Type of Diet:
                <select onChange={(e)=>handleSelect(e)}>
                    {diets.map((d)=>(
                        <option value={d.name}>{d.name.charAt(0).toUpperCase()+ d.name.slice(1)}</option>
                   ))}
                </select>
                    {errors.diets && (
                        <p className='error'>{errors.diets}</p>
                    )}
                </div>
                <div>Dish types:
                <select onChange={(e)=>handleSelect2(e)}>
                    {dishTypes.map((d)=>(
                        <option value={d.name}>{d.name.charAt(0).toUpperCase()+ d.name.slice(1)}</option>
                   ))}
                </select>
                    {errors.dishTypes && (
                        <p className='error'>{errors.dishTypes}</p>
                    )}
                </div>
                <button type='submit'>Create</button>
            </form>
            {input.diets.map(d=>
                <div className='divDiets'>
                    <p>{d.charAt(0).toUpperCase()+ d.slice(1)}</p>
                    <button className='buttonX' onClick={()=>handleDelete(d)}>x</button>
                </div>
                )}
            {input.dishTypes.map(d=>
                <div className='divDishes'>
                    <p>{d.charAt(0).toUpperCase()+ d.slice(1)}</p>
                    <button className='buttonX' onClick={()=>handleDelete2(d)}>x</button>
                </div>
                )}
        </div>
    )
}