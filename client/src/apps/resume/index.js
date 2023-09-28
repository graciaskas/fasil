import React from "react";
import { Route } from "react-router";

import Header from "../base/components/Header"
import Left from "../base/components/Menu.left"
import Controller from "./controller";


const Motor = props => {
    return(
        <React.Fragment>
                <Header name="Resume" request={""}  currentLink="dashboard"/>
                <div className="flex-container">
                    <Left />
                    <Route path="/resume/:application" component={Controller} />
                </div>
        </React.Fragment>
    );
};
export default Motor;