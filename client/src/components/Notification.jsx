import React, { useEffect, useState } from 'react';
import { RiCloseFill } from "react-icons/ri";  

const Notification = ({ message, type, style, handler, title }) => { 
  
   if(!message || !type) return null;

   const cssClass = `notification notification-${type}`;
    
   return(
      <div className = {cssClass} role="alert" style={style}>
         <div className='notification-header'>
            <h4>{title}</h4>
            <span className="alert-closer" onClick = { () => handler({ type : null})}>
               <RiCloseFill />
            </span>
         </div>
         <div className='notification-body'>
            <p>{message}</p>
         </div>
      </div>
    );
}

export default Notification;
