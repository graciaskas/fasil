import React from "react";
import { Route } from "react-router";

import Header from "../base/components/Header"
import Left from "../base/components/Menu.left"
import Controller from "./controller";
import Provider from "./context/app.context";

const Motor = props => {
    return(
        <React.Fragment>
            <Provider>
                <Header name="Motor" request={""}  currentLink="dashboard"/>
                <div className="flex-container">
                    <Left />
                    <Route path="/motor/:application" component={Controller} />
                </div>
            </Provider>
        </React.Fragment>
    );
};
export default Motor;