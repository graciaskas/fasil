import React from 'react';
import { FaCogs, FaLanguage, FaUsers } from "react-icons/fa";
import { } from "react-icons/ri";

function Dashboard( props ) {
    return (
        <div className="dashboard-main">
            <div className="row">
                <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="d-most">
                        <div className="most-h">
                            <span><FaCogs /></span>
                            <h4>Applications disponibles</h4>
                        </div>
                        <div className="most-divider"> </div>
                            
                        <div className="most-d">
                            <div className="d-bl">
                                <h4>200</h4>
                                <p>Installées</p>
                            </div>
                            <div className="d-bl text-right">
                                <h4>200 789</h4>
                                <p>Non Installé(es)</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="d-most">
                        <div className="most-h">
                            <span><FaUsers /></span>
                            <h4> Utilisateurs </h4>
                        </div>
                        <div className="most-divider"></div>
                        <div className="most-d">
                            <div className="d-bl">
                                <h4>200</h4>
                                <p>Actif(s)</p>
                            </div>
                            <div className="d-bl text-right">
                                <h4>200 789</h4>
                                <p>Non Actif(s)</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="d-most">
                        <div className="most-h">
                            <span><FaLanguage /></span>
                            <h4> Traductions  </h4>
                        </div>
                        <div className="most-divider"></div>
                        <div className="most-d">
                            <div className="d-bl">
                                <h4></h4>
                                <p></p>
                            </div>
                            <div className="d-bl text-right">
                                <h4>200 000</h4>
                                <p>Non Actif(s)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;