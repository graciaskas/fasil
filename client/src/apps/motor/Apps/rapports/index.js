import React from "react";
import { Route } from "react-router-dom";

import Controller from "./controller";


const Init = ({ url, app }) =>  {
    return (
        <Route path="/motor/rapports/:application" component={Controller}/>
    );
}

export default Init;