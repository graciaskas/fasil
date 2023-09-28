import React from "react";

import Dashboard from ".";

import { getApp } from "components/base/functions/all";
/**
 *Application Controller function
 * @param {*} param0 
 * return application compoenent
 */
const Controller = ({ match }) => { 
    /**--------
     * Get the name of current application
     * @param {*} url - current url
     * @returns Application name
    */
    //Store current application
    const Application = getApp(match.url);
    
    //**--- Switch application and return corresponding application
        switch (Application) {
            case "dashboard":  
                return <Dashboard />
            break;
            default :
                return  "The Rose"
        }
    //End of Switch
};

export default Controller;