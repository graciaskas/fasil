import React from "react";
import { Route } from "react-router-dom";

import Controller from "./controller";


 const Configuration = (props) => {
    
    return(
        <>
            <div className="page">
                <Route 
                    path="/settings/configuration/:setting"
                    component={ Controller }
                />
            </div> 
        </>
    );
};

export default Configuration;