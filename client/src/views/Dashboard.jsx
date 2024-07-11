import React, { useContext } from "react";

import { Navigate, Link } from "react-router-dom";
import { CoreContext } from "base/CoreContext";

//Load all modules
import { modules } from "base/modules";

export default function Dashoboard({ match }) {
   const { token } = useContext(CoreContext);

   if (!token) {
      return <Navigate to={"/db/login"} />;
   }

   //*** Sort modules alphabeticaly
   let modules_sorted = modules
      .filter((app) => app.active)
      .sort((a, b) => {
         return a.name.localeCompare(b.name);
      });

   return (
      <div className="h-screen bg-blue-500">
         <div className="flex items-center justify-center">
            <div className="modules__container">
               <h4>ZeSlap ERP.</h4>
               <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                  {modules_sorted.map((app, i) => {
                     const path = "/" + app.name.toLowerCase() + "/" + app.main;
                     return (
                        <Link to={path} className="module text-center" key={i}>
                           <div className="module__icon">
                              <img src={app.icon} alt="" />
                           </div>
                           <p>{app.name}</p>
                        </Link>
                     );
                  })}
               </div>
            </div>
         </div>
      </div>
   );
}
