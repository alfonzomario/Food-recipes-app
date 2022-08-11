import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {postRecipe, getDiets, getDishes} from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles/Create.module.css'

function validate(input){
    let errors={};
    if (!input.title){
        errors.title = "A title is required.";
    } else if (!input.summary){
        errors.summary = "A summary is required.";
    } else if (!input.aggregateLikes){
        errors.aggregateLikes = "A minimun of likes are required.";
    } else if (input.aggregateLikes < 0){
        errors.aggregateLikes = "Negative number is not allowed";
    } else if (!input.healthScore){
        errors.healthScore = "A health score is required.";
    } else if (!input.steps){
        errors.steps = "Steps are required.";
    } else if (!input.image){
        errors.image = "A image's URL is required.";
    } else if (!/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!]))?/.test(input.image)){
        errors.image = "You need a validate URL.";
    } else if (!input.diets[0]){
        errors.diets = "Types of diets are required.";
    } else if (!input.dishTypes[0]){
        errors.diets = "Types of dishes are required.";
    }
    return errors;
};
export default function RecipeCreate(){
    const dispatch = useDispatch()
    const diets = useSelector((state)=>state.diets)
    const dishTypes = useSelector((state)=>state.dishTypes)
    const [errors, setErrors] = useState({})

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
        if(errors.title || errors.summary || errors.aggregateLikes || errors.healthScore || errors.steps || errors.image || errors.diets || errors.dishTypes){
            let sendErrors = [];
            for (const key in errors) {
            sendErrors.push(`${key[0].toUpperCase()+key.slice(1)}: ${errors[key]}`)
            }
            return alert(sendErrors) 
        }
        else if (input.title){
            dispatch(postRecipe(input))
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
           return alert("Recipe created!")
        }
        return alert("Information are required!")
    }

    useEffect(()=>{  
        dispatch(getDiets())
        dispatch(getDishes())
    },[dispatch]);


    return(
        <div className={styles.background}>
            <div className={styles.box2}>
            {input.diets.map(d=>
                <div key={d}>
                    <p>{d}</p>
                    <button className={styles.buttonX} onClick={()=>handleDelete(d)}>x</button>
                </div>
                )}
            {input.dishTypes.map(d=>
                <div key={d}>
                    <p>{d}</p>
                    <button className={styles.buttonX} onClick={()=>handleDelete2(d)}>x</button>
                </div>
                )}
           </div> 
          <div className={styles.box}>  
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
                    type='range'
                    min='0'
                    max='100'
                    value= {input.healthScore}
                    name= 'healthScore'
                    onChange={(e)=>handleChange(e)}
                    ></input>
                    <label>
                        {input.healthScore}
                    </label>
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
                <option value="" selected disabled hidden>Choose here</option>
                    {diets.map((d)=>(
                        <option key={d.name} value={d.name}>{d.name}</option>
                   ))}
                </select>
                    {errors.diets && (
                        <p className='error'>{errors.diets}</p>
                    )}
                </div>
                <div>Dish types:
                <select onChange={(e)=>handleSelect2(e)}>
                <option value="" selected disabled hidden>Choose here</option>
                    {dishTypes.map((d)=>(
                        <option key={d.name} value={d.name}>{d.name}</option>
                   ))}
                </select>
                    {errors.dishTypes && (
                        <p className='error'>{errors.dishTypes}</p>
                    )}
                </div>
                <button className={styles.button2} type='submit'>Create</button>
            </form>
          </div>    
         <Link to= '/home'><button className={styles.button}>Back</button></Link>
        </div>
    )
}