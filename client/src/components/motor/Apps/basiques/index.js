import React from "react";
import { Route } from "react-router-dom";

//**--- Controller */
import Controller from "./controller";

const Init = ({ url, app }) =>  { 
    return (
        <Route 
            path="/motor/basiques/:application" 
            component = {Controller}
        />
    );
}

export default Init;