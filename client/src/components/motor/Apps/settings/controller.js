import React from "react";
import { getApp } from "components/base/functions/all";
import Users from "./users";
import Gillets from "./gillets";
import GilletProvider  from "./gillets/context/gillet";
import UserProvider  from "./users/context/user.context";

const Controller = ({ match }) => { 
    //Store current application
    const Application = getApp(match.url);

    //**--- Switch application and return corresponding application
        switch (Application) {
            case "utilisateurs":  
                return(
                    <UserProvider>
                        <Users />
                    </UserProvider>
                );                
                break;
            case "gillets":  
                return(
                    <GilletProvider>
                        <Gillets />
                    </GilletProvider>)
            default :
                return  <>odoo</>
        }
    //**--- End of Switch
};

export default Controller;