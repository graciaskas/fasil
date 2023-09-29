import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CoreContext } from "base/CoreContext";

function GuestLayout() {
   const { token } = useContext(CoreContext);
   if (token) {
      return <Navigate to={"/dashboard"} />;
   }
   return (
      <div className="bg-slate-100">
         <Outlet />
      </div>
   );
}

export default GuestLayout;
