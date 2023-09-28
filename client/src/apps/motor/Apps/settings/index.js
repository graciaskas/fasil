import React from "react";
import { Link, Route } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

//**--- Components */
import Loading from "components/Loading";
import Explainer from "components/Explainer"
import Search from "components/Search"

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