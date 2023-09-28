import React from "react";
import { Link } from "react-router-dom";

const Navlink = (props) => { 
   const { subMenus, name, app, state, i, menu } = props;
   if(subMenus.length == 0 ) { //if menu has not submenus
       return (
           <Link to={`/${app}/${name}`}   style={{color:'#fff'}} key={i}>
               {name}
           </Link>
       )
   }
   return ( // Display menu submenus
       <>
           <a className="nav-link text-white" href="#" id="applink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               {menu.name}
           </a>
           <div className="dropdown">
               <div className="dropdown-menu" aria-labelledby="applink">
                   {
                       subMenus.map( (subMenu,i) => ( 
                           <Link className="dropdown-item" key={i} to={`/${app.toLowerCase()}/${menu.name}/${subMenu}`}>
                               {subMenu}
                           </Link>
                       ))
                   }
               </div>
           </div> 
       </>
   )
};

export default Navlink;