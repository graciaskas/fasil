import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CoreContext } from "base/CoreContext";
import Header from "./Header";

function DefaultLayout() {
   const { token } = useContext(CoreContext);

   useEffect(() => {
      console.log("Default Layout loaded !");
   }, []);

   if (!token) {
      return <Navigate to={"/db/login"} />;
   }

   return (
      <div className="app">
         <Header module="Motor" />
         <main className="app__main">
            <div className="app__content">
               <Outlet />
            </div>
         </main>
      </div>
   );
}

export default DefaultLayout;
