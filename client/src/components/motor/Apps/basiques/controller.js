import React from "react";

//**-- Components */
import Quartiers from "./Apps/quartier";
import Communes from "./Apps/commune";
import Province from "./Apps/province";
import Ville from "./Apps/ville";

import ProvinceProvider  from "./Apps/province/contexts/province";
import  QuartierProvider  from "./contexts/quartiers";
import  CommuneProvider  from "./Apps/commune/contexts/communes";
import  VilleProvider  from "./contexts/villes";


/**
 *Application Controller function
 * @param {*} param0 
 * return application component
 */
const Controller = ({ match }) => { 
    /**--------
     * Get the name of current application
     * @param {*} url - current url
     * @returns Application name
    */
    const getApplication = (url) => {
        let urlApp = url.toLowerCase();
        let indexOfSlash = urlApp.lastIndexOf("/") + 1;
        let App = urlApp.slice(indexOfSlash);

        return App;
    };
    //Store current application
    const Application = getApplication(match.url);

    //**--- Switch application and return corresponding application
        switch (Application) {
            case "quartiers":  
                return(
                    <QuartierProvider>
                        <Quartiers />
                    </QuartierProvider>
                );
            case "communes":  
                return(
                    <CommuneProvider>
                        <Communes />
                    </CommuneProvider>
                );
            case "villes":  
                return(
                    <VilleProvider>
                        <Ville />
                    </VilleProvider>
                );
            case "provinces":  
                return(
                    <ProvinceProvider>
                        <Province />
                    </ProvinceProvider>
                );
            default :
                return(
                <ProvinceProvider>
                    <Province />
                </ProvinceProvider>
            );
        }
    //**--- End of Switch
};

export default Controller;