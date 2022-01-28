import { getApp } from "components/base/functions/all";
import React from "react";

export default function Controller({ match }){
    const app = getApp(match.url);
    console.log(app);
    switch (app) {
        case "":
            return <h1>Odoo</h1>
            break;
    
        default:
            break;
    }
}

