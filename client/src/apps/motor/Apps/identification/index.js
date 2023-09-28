import React, { useContext } from "react";
import { Link, Route, useHistory, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { parseUrl } from "query-string";

//**--- Components */

import Explainer from "components/base/components/Explainer";
import Search from "components/base/components/Search";

//**-- App components */
import View from "./views/identification.view";
import Create from "./views/driver.create";
import ViewListGrid from "./views/identifications.view";
import CreateMotor from "./views/motor.create";
import CreateOwner from "./views/motor.owner";


//**-- Data */
// import demoData from "./data/demo.identifications.js";
import { IdentificationContext } from "./contexts/indentification.context";
import { AppContext } from "components/motor/context/app.context";
import { CoreContext } from "components/base/Context";
import { URI } from "components/motor/api/uri";

const filters = [ 
    { name: "Noms", value: "names" },
    { name: "Association", value: "affiliation" },
    { name: "Commune", value: "address.commune"},
    { name: "Type", value: "type" }
];


const Handler = ({ data }) => { 
    //Destructure identification context
    const { record, stepUrl } = useContext(IdentificationContext);
    if(!data) return null
    //Verify if record parameter or stepUr is null
    if(record == null || stepUrl == null) { 
        return  <ViewListGrid data = { data.data } />
    }
    //Return view for motor
    if(stepUrl && stepUrl === 'motor') { 
        return <CreateMotor />
    }
    //return view for owner
    if(stepUrl && stepUrl === 'owner') { 
        return <CreateOwner />
    }
    return null
};


const Init = ({ app, name }) =>  {

    const history = useHistory();
    const { location } = history;
    
  
    const { drivers, setDrivers, loadDrivers, getDrivers, database, token } = useContext(AppContext);
   

    const { createDriver, createOwner, createEngine,
        printIdentification, stepUrl, setStep, } = useContext(IdentificationContext);
    
    const apiObject = {
        url: URI,
        pathname: "drivers",
        token,
        params: {
            database,
        }
    };

    useEffect(() => { 
        if (loadDrivers === true) {
         getDrivers(null, null, null);
        }
    },[ loadDrivers ]);

    useEffect(() => { 
        if(stepUrl === "motor") setStep(2);
        if (stepUrl === "owner") setStep(3);
        getDrivers(null,null, null);
    }, []);

    return (
        <div className="page" id="page">
            <div className="headPage" id="AppHeaderPage">
                <div className="headPageTitle">
                    <h4>
                        <Link to="/motor/identifications">
                            <span className="link" onClick={() => getDrivers()}> {name} / {stepUrl}  </span>
                        </Link>
                    </h4>

                    <div className="buttons " id="myButtons">
                        <Route path="/motor/identifications/create" exact>
                            <button className="bg-blue" onClick={createDriver}>
                                Sauvegarder
                            </button>
                            <Link to="/motor/identifications">
                                <button  className="bg-o">Annuler</button> 
                            </Link>
                            {/* <IdentificationType display = {isOn} /> */}
                        </Route>

                            <Route path="/motor/identifications" exact>
                                {   // If step is motor means creating driver's engine
                                    stepUrl === "motor" ? ( 
                                        <button className="bg-blue"  onClick={createEngine}>  Sauvegarder</button> 
                                    ) : null    
                                }

                                {   // If step is owner means creating an engine's owner
                                    stepUrl === "owner" ? (
                                        <>
                                            <button  className="bg-blue" onClick={createOwner}>Sauvegarder  </button>
                                            <Link to={"/motor/identifications/"}>
                                                <button className="bg-o">Annuler</button>
                                            </Link> 
                                        </>
                                    ) : null
                                }

                                {   //If there is no setp display defaut create driver form buttom
                                    !stepUrl ? (
                                        <Link to="/motor/identifications/create">
                                            <button  className="bg-blue">Créer</button> 
                                        </Link>
                                    ):null
                                }

                            </Route>

                            <Route path="/motor/identifications/view" exact>
                                <Link to="/motor/identifications/create">
                                    <button  className="bg-blue">Créer</button> 
                                </Link>
                                <button  className="bg-o" onClick={printIdentification}> Imprimer  </button> 
                            </Route>
                        </div>
                    </div>
                
                    {/**-- Search & Filter Component   **/}
                    <Route path="/motor/identifications" exact>
                        {   // Render component when data is available
                            drivers !== null ? (
                                <Search
                                    data={drivers}
                                    location={location}
                                    viewType={"both"}
                                    filters={filters}
                                    searching={true}
                                    context={IdentificationContext}
                                    updateState={setDrivers}
                                    api={apiObject}
                                />
                            ): null
                        }
                    </Route>
                </div>

            {   /***-- Application routes   ---**/ }
                <Route path="/motor/identifications" exact>
                    <Handler data={drivers} />
                </Route>

                <Route path="/motor/identifications/create" exact>
                    <Create />
                </Route>

                <Route path="/motor/identifications/view" >
                    <View data={ [] }/>
                </Route>
            {   /***-- End Application routes   ---**/ }
        </div>
    );

   
}

export default Init;