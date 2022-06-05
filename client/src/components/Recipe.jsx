import React from "react";

export default function Recipe({image, title, diets}){
    return (
        <div>
            <img src={image} alt="img not found" width="312px" height="231px" />
            <h3>{title}</h3>
            <h5>{diets}</h5>
        </div>
    );
}