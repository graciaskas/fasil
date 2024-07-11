import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { CoreContext } from "base/CoreContext";
import Header from "./Header";
import { getModuleFromPath } from "base/functions/all";

function DefaultLayout() {
   const { pathname } = useLocation();
   const [module, setModule] = useState("main");
   const { token } = useContext(CoreContext);

   useEffect(() => {
      //Set current working module to current root location
      setModule(getModuleFromPath(pathname));
   }, []);

   useEffect(() => {
      setModule(getModuleFromPath(pathname));
   }, [pathname]);

   if (!token) {
      return <Navigate to={"/db/login"} />;
   }

   return (
      <div className="app">
         <Header module={module} />
         <main className="app__main">
            <div className="app__content">
               <Outlet />
            </div>
         </main>
      </div>
   );
}

export default DefaultLayout;
