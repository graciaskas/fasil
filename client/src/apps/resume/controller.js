import React from "react";



import { getApp } from "components/base/functions/all";

/**
 *Application Controller function
 * @param {*} param0 
 * return application compoenent
 */
const Controller = ({ match }) => { 
    //Store current application
    const Application = getApp(match.url);
    console.log(Application);
    //**--- Switch application and return corresponding application
        switch (Application) {
            
            default :
                return( 
                    null
            );
        }
    //End of Switch
};

export default Controller;