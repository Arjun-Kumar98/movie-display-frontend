'use client';

import React from 'react';

interface ButtonProps{
    type:'submit'|'reset';
    label:string;
    onClick?:()=>void;
    className?:string;
}

const Button:React.FC<ButtonProps>=({
    type,
    label,
    onClick,
    className=''
})=>{
    return(
        <button
        type={type}
        onClick={onClick}
        className={`button ${className}`}
        >
        {label}
        </button>
    );
};

export default Button;