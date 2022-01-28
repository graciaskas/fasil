import React, { useEffect, useState } from 'react';
import { RiCloseFill } from "react-icons/ri";  

const Message = ({ message, type, style, handler }) => { 
  
    if(!message || !type) return null;

    const cssClass = `notification alert alert-${type}`;
    
    return(
        <div 
            className = { cssClass } 
            role="alert" 
            style={style}>
           { message }
            <span className="alert-closer" onClick = { () =>  handler({ type : null})}>
               <RiCloseFill />
           </span>
        </div>
    );
}

export default Message;
