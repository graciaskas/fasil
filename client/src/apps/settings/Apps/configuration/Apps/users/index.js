import React from 'react';
import Search from 'components/base/components/Search';
import { useHistory } from 'react-router';
import { Link, Route } from "react-router-dom";
import { SettingsContext } from 'components/settings/context/settings.context';

function Init( props ) {
    
    const { location } = useHistory();


    return (
        <>
            <div className="headPage" id="AppHeaderPage">
                    <div className="headPageTitle">
                        <h4>
                            <Link to="/settings/configuration/users">
                                <span className="link"> Users </span>
                            </Link>
                        </h4>
                    
                    { /** Buttons */}
                    <div className="buttons " id="myButtons">
                        <Route path="/settings/configuration/users/create" exact>
                            <button className="bg-blue" >
                                Sauvegarder
                            </button> 
                            {/* <IdentificationType display = {isOn} /> */}
                        </Route>
                        <Route path="/settings/configuration/users" exact>
                            <Link to="/settings/configuration/users/create">
                                <button  className="bg-blue">Créer</button> 
                            </Link>
                        </Route>
                           
                        <Link to="/settings/configuration/users/import">
                            <button  className="bg-o"> Importer  </button> 
                        </Link>
                    </div>
                </div>

                {/**-- Search & Filter Component   **/}
                <Route path="/settings/configuration/users/create" exact>
                    <Search 
                        data= { [] }
                        location= { location } 
                        filters = {['parent','capacity','manager']}
                        searching = { false }
                        context={SettingsContext}
                    />
                </Route>
                <Route path="/settings/configuration/users" exact>
                    <Search 
                        data= { [] }
                        location= { location } 
                        filters = {['parent','capacity','manager']}
                        searching = { true }
                        context={SettingsContext}
                    />
                </Route>
            </div>

            <div className="bodyContainer">

            </div>
        </>
    );
}

export default Init;