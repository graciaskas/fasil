import React from "react";
import { typePersonnes } from "components/motor/Apps/identification/data";

const GilletGrid = (props) => { 

   const { image, num,username,active,size,type, email,id } = props;
   const status = (status) => { 
       if(!status) return 'bg-warning';
       if(status) return 'bg-success';
       return 'inactive'
   };

   const img = image === "" ? "/src/male.png": image;
   const typeName = typePersonnes.filter( t => t.value == type);

   return(
       <div className={`col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 col-12 box__link`} >
           <div className="box__user" style={{height : "100px"}}>
               <div className="box__image user" style={{height : "100px",width :"80px"}}>
                   <img src={ img ? img : "/src/male.png" } alt="" />
               </div>
               <div className="box__description ml-2 user">
                   <h4 style={{fontSize:"16px"}}> {num}  </h4>
                   <p>{email}</p>
                   <span className="status bg-secondary text-right">{typeName[0].name}</span>
                   <div className="absolute">
                       <span className={status(active)}></span>
                   </div>
               </div>
           </div>
       </div>
   )
};

export default GilletGrid;