import React from "react";

const LoadingDark = props => { 
   return(
      <div className="loading">
         <div className="loading-container">
            <div className="spinner">
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
            </div>
            <h4 className="text-center">Loading...</h4>
         </div>
      </div>
   );
};

export default LoadingDark;