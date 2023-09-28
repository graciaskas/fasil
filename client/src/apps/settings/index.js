import React from "react"

import { Route } from "react-router-dom";
import SettingsProvider  from "./context/settings.context";

import Header from "../base/components/Header";
import Left from "../base/components/Menu.left";
import Controller from "./controller";

const Settings = props => {
    return(

        <React.Fragment>
            <SettingsProvider>
                <Header name="Settings" request={""}  currentLink="all"/>
                <div className="flex-container">
                    <Left />
                    <Route 
                        path="/settings/:application" 
                        component={ Controller }
                    />
                </div>
            </SettingsProvider>
        </React.Fragment>
    );
};
export default Settings;