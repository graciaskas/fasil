import React from "react";
import { Navigate } from "react-router-dom";

/** Import module routes elements*/
import Identification from "./Apps/identification";
import Dashboard from "./Apps/dashboard";

/*** Export default module routes
 * Note :Variable should start with module name followed by word Routes
 */
export const motorRoutes = [
   { path: "", element: <Navigate to={"/motor/dashboard"} /> },
   { path: "dashboard", element: <Dashboard /> },
   {
      path: "identifications",
      element: <Identification />,
   },
];
