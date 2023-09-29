import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
   return (
      <>
         <div className="form__flex" style={{ height: "100vh" }}>
            <div className="center">
               <h1>404 | Page non trouvée !</h1>
               <p>Vous avez peut etre essayer une adresse invalide...</p>

               <br />
               <br />
               <Link
                  to={"/"}
                  className="p-2 bg-blue-500 rounded-full text-white px-3"
               >
                  Back home
               </Link>
            </div>
         </div>
      </>
   );
}
