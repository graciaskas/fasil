import React from "react";
import { Link } from "react-router-dom";

const CooperativeGrid = (props) => { 
   const { image, name,president,active,size,motards, email,id } = props;
   const status = (status) => { 
       if(!status) return 'bg-warning';
       if(status) return 'bg-success';
       return 'inactive'
   };

   const img = image === "" ? "/src/image.png": image;
   
   return(
       <Link to={`/motor/cooperatives/view/?q=${id}`} 
           className={`col-lg-${size - 1}  col-sm-6 col-xs-12 box__link`} >
           <div className="box__user" style={{height : "100px"}}>
               <div className="box__image user" style={{height : "100px",width :"80px"}}>
                   <img src={ img ? img : "/src/image.png" } alt="" />
               </div>
               <div className="box__description ml-2 user">
                   <h4 style={{fontSize:"16px"}}> {name}  </h4>
                   <p>{email}</p>
                   <p>Motard: {motards}</p>
                   <span className="status bg-secondary text-right">{president}</span>
                   <div className="absolute">
                       <span className={status(active)}></span>
                   </div>
               </div>
           </div>
       </Link>
   )
};

export default CooperativeGrid;
