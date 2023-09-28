import React from "react";

import Dashboard from "apps/motor/Apps/dashboard";
import Basique from "apps/motor/Apps/basiques"
import Motard from "apps/motor/Apps/rapports";
import Identification from "apps/motor/Apps/identification";
import ProviderIdentification from "apps/motor/Apps/identification/contexts/indentification.context";

import Cooperative from "./Apps/cooperative";
import ProviderCooperative from "./Apps/cooperative/contexts";
import Parametres from "./Apps/settings";
import Rapports from "./Apps/rapports"

import { getApp } from "base/functions/all";

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
            case "dashboard":  
                return <Dashboard />;
            case "cooperatives":  
                return (
                    <ProviderCooperative>
                        <Cooperative />
                    </ProviderCooperative>);
            case "identifications":  
                return( 
                    <ProviderIdentification>
                        <Identification 
                            name = "Identifications"
                            app = "identifications"
                        />
                    </ProviderIdentification>
                );
            case "motards":  
                return <Motard />
            case "basiques":  
                return <Basique />
            case "rapports":
                return <Rapports />
            case "parametres":  
                return <Parametres />
            default :
                return( 
                    <ProviderIdentification>
                        <Identification 
                            name = "Identifications"
                            app = "identifications"
                        />
                    </ProviderIdentification>
            );
        }
    //End of Switch
};

export default Controller;