import React from "react";
import { Link, Route } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

//**--- Components */
import Loading from "components/base/components/Loading";
import Explainer from "components/base/components/Explainer"
import Search from "components/base/components/Search"

//**--- Controller */
import Controller from "./controller";

    
const Init = ({ url, app }) =>  { 
    const [ loading, setLoading ] = useState(false);
    return (
        <Route 
            path="/motor/parametres/:application" 
            component = {Controller}
        />
    );
}

export default Init;