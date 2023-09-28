import React from "react";
import { Link } from "react-router-dom";
import { RiGridFill } from "react-icons/ri"

const Branding = ({ app }) =>  { 
   const name = app == "main" ? "Apps store" : app;
   return ( 
       <div className="brand">
           <Link to="/dashboard" style={{color:"#fff"}}>
               <div className="menuGrid">
                   <span>
                       <RiGridFill />
                   </span>
               </div>
           </Link>
           <h1 className="text-center "> { name } </h1>
       </div>
   );   
};

export default Branding;