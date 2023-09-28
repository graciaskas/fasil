import React from "react";
import { getApp } from "components/base/functions/all";


import Vehicules from "./vehicules";
import VehiculeProvider from "./vehicules/contexts/vehicules.context";
import Identifications from "./identifications";

/**
 *Application Controller function
 * @param {*} param0 
 * return application compoenent
 */
 const Controller = ({ match }) => { 
   //Store current application
   const Application = getApp(match.url);
   //**--- Switch application 
   switch (Application) {
      case "vehicules":
         return(
            <VehiculeProvider>
               <Vehicules />
            </VehiculeProvider>
         )
      default:
         return(<Identifications />)
   }
};

export default Controller;