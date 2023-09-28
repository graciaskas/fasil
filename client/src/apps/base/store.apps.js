import React from "react";

import Application from "./components/App";
import Applications from "./store.apps.data";

export default function Store( props ) { 

    let Apps = Applications.filter( app => app.active);
    
    //sort alphabeticaly
    Apps = Apps.sort(( a, b) => { 
        return a.name.localeCompare(b.name);
    });

    const appPerRow = 6;
    const rows = Math.ceil(Apps.length / appPerRow);
    let rowsArray = [];
    let start = 0;
    let end = appPerRow;
    
    //Paginate rows
    for( let i = 0; i < rows ; i++) { 
        rowsArray.push({ row : i, apps : ""});
        rowsArray[i].apps = Apps.slice(start,end);
        for (let icon = 0; icon < Apps.length; icon++) {
            if(icon == appPerRow) { 
                start += appPerRow;
                end += appPerRow;
                continue;
            }
        } 
    }

    return(
        <>
            {
               rowsArray.map( (row,i) => {
                   const rowApps = [...row.apps];
                   return(
                        <div className="row" key={i}>
                            {
                                rowApps.map( (app, i) => {
                                    const path = `${app.name}/${app.main}`; 
                                    return(
                                        <Application 
                                            key={i}
                                            name={app.name}
                                            icon={app.icon}
                                            path={path.toLowerCase()}
                                        />
                                    )
                                })
                            }
                        </div>
                    );
                })
            }
        </>
    );
}