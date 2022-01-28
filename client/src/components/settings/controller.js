import React from "react"

import Applications from "./Apps/applications/index";
import Configuration from "./Apps/configuration/index";
import Dashboard from "./Apps/dashboard/views";

export default function Controller({ match }){
    //-- function to get the app from path
    let getApp = (url) => {
        let urlApp = url.toLowerCase();
        let indexOfSlash = urlApp.lastIndexOf("/") + 1;
        let App = urlApp.slice(indexOfSlash);

        return App;
    };

    //get app name from parent path eg { /api/app to "app"}
    let App = getApp(match.url);

    if(App === "configuration" || App === "") return <Configuration app={App} url={match.url}/>

    if(App === "applications") return <Applications app={App} url={match.url}/>

    return <Dashboard app={App} url={match.url}/>

}