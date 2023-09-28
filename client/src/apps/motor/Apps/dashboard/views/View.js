import React, { Component } from "react";
import { useHistory, useParams, useLocation } from "react-router";
import Datepicker from "react-day-picker/DayPickerInput";
import 'react-day-picker/lib/style.css';

import LoadView from "components/base/functions/loadView";

//**--- Components */
import Table from "components/base/Table";

import DefaultColumns from "../data/data";
import recensementHandler from "../handlers/recensement.handler";

/**
 * Get a document based on _id
 * @param {*} data DataSer
 * @param {*} index Item ID
 * @returns Document
 */
const singleData = (data, index) => { 
    if(!data.length) return
    const single = data.filter( record => { 
        return record._id == index;
    });
    console.log(single);
}



const View = props => {

    const history = useHistory();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const { pathname, search } =  history.location;
    const { data } = props;

    //**-- Get query ID */
    const qid = params.has("q") ? params.get("q"): null;

    //**-- Get record set from query ID */
    const record = data.length ? data.filter( record => { 
        return record._id == qid;
    }) : [];

    console.log(record);
    
    return (
        <div className="bodyContainer" id="bodyContainer">
            <div id="action_bar" style={{ display: "none" }}></div>
            <div className="main-container" id="main_container">
                <form >
                    {/* Block Employee Creation */}
                    <div id="loaded" className="pageSingle" >
                        <div className="page-container">

                            {/* Start Header*/}
                            <div className="pageSingleHeader">
                                <div className="employeeDesc">
                                    <h3>Famille KIKUTA</h3>
                                  
                                </div>
                            </div>
                            {/* End of Header*/}

                            <div className="pageSingleLinks">

                                <li
                                    className="linkActive viewList"
                                    id="pubInfoHdlr"
                                    onClick={(e) => LoadView(e, "infosPubliques")}> Informations publiques</li>

                                <li className="viewList"
                                    id="enfantsBook"
                                    onClick={(e) => LoadView(e, "enfants")}>Enfants</li>

                                <li className="viewList"
                                    id="tutellesBook"
                                    onClick={(e) => LoadView(e, "tutelles")}>Sous-tutelles</li>

                                <li className="viewList"
                                    id="autresBook"
                                    onClick={(e) => LoadView(e, "autres")}>Autres membres du menage</li>
                            </div>


                            {/***---   Single View tab for Public informations */}
                            <div className="pageSingleLinksData " id="infosPubliques" >
                                <div className="singleBlock">
                                    <div className="DataBox">
                                        {/* <h4>Adresse</h4> */}
                                        <div className="DataBoxInputs">
                                            <div className="input">
                                                <div className="label"><p>Numéro de la parcelle</p></div>
                                                <div className="input_input">
                                                    <input />
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p>Résidence actuelle</p></div>
                                                <div className="input_input">
                                                    <input />
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p> Proprietaire ?</p></div>
                                                <div className="input_input">
                                                    <input type="radio" defaultChecked />
                                                    <input type="radio" defaultChecked />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="DataBox">
                                        {/* <h4>Résidence actuelle</h4> */}
                                        <div className="DataBoxInputs">
                                            <div className="input">
                                                <div className="label"><p>Quartier</p></div>
                                                <div className="input_input">
                                                    <input />
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p>Cellule</p></div>
                                                <div className="input_input">
                                                    <input />
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p>Avenue</p></div>
                                                <div className="input_input">
                                                    <input />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                                <h4 className="mb-4 t-primary f-bold">Parents</h4>

                                <Table
                                    columns={DefaultColumns}
                                    colgroup={[]}
                                    rows={[]}
                                />

                                <div className="singleBlock">
                                    <div className="DataBox">
                                        <div className="DataBoxInputs">
                                            <div className="input">
                                                <div className="label"><p>Remarque genérale</p></div>
                                                <div className="input_input">
                                                    <textarea />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/***  End  Single View tab for Public informations */}


                            {/***   Single View tab for Rh informations */}
                            <div className="pageSingleLinksData " id="enfants" style={{ display: "none" }}>
                                <div className="singleBlock">
                                    <Table
                                        columns={DefaultColumns}
                                        colgroup={[]}
                                        rows={[]}
                                    />
                                </div>
                            </div>
                            {/***  End  Single View tab for Rh informations */}


                            {/***   Single View tab for Rh informations */}
                            <div className="pageSingleLinksData " id="tutelles" style={{ display: "none" }}>
                                <div className="line-table">
                                    <Table
                                        columns={DefaultColumns}
                                        colgroup={[]}
                                        rows={[]}
                                        inputable={true}
                                        margin={false}
                                        name="Tutelles"
                                    />
                                </div>
                            </div>
                            {/***  End  Single View tab for Rh informations */}

                            {/***   Autres membres */}
                            <div className="pageSingleLinksData " id="autres" style={{ display: "none" }}>
                                <div className="singleBlock">
                                    <Table
                                        columns={DefaultColumns}
                                        colgroup={[]}
                                        rows={[]}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* End Of Block Employe */}
                </form>
            </div>
        </div>
    );
}

export default View;