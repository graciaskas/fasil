import React from "react"
import {Link, useHistory} from "react-router-dom"

import Search from "components/base/components/Search"

import data from "components/base/store.apps.data";
import { SettingsContext } from "components/settings/context/settings.context";

const Applications = (props) => {

    const history = useHistory();
    const { location } = history;

    return(
        <div className="page">
            <div className="headPage" id="AppHeaderPage">
                <div className="headPageTitle">
                    <h4>
                        <Link to="/settings/applications">
                            <span className="link">Applications</span>
                        </Link>
                    </h4>
                    <div className="buttons " id="myButtons">
                        <button className="bg-blue">Mettre à jour la liste</button>
                    </div>
                </div>
                <Search 
                    data= { [] }
                    location= { location } 
                    filters = {['Categorie','Status']}
                    searching = { true }
                    context={SettingsContext}
                />
            </div>
            <div className="bodyContainer">

      
                <div className="main-container bg-gray">
                    <div className="row pr-3">
                        { 
                            data.map( (app,i) => {

                                const { active } = app;
                                const className = active ? "btn bg-o" : "btn bg-blue";
                                const text = active ? "Desinstaller" : "Installer";

                                return(
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 col-12" key={i}>
                                        <div className="box__user">
                                            <div className="box__image user">
                                                <img src={app.icon} alt={app.icon}/>
                                            </div>
                                            <div className="box__description user">
                                                <h4>{app.name}</h4>
                                                <p>Lorem, ipsum dolor sit amet elit. Doloribus vero aliquid.</p>
                                                <div className="box__bottom">
                                                    <button className = {className} >
                                                        {text}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};


export default  Applications;