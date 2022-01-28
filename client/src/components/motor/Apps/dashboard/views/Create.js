import React, { Component, useContext, useRef } from "react";
import { Context } from "context";

import Datepicker from "react-day-picker/DayPickerInput"
import 'react-day-picker/lib/style.css';

import LoadView from "components/base/functions/loadView";

//**--- Components */
import Table from "components/base/Table";
import Datalist from "components/base/Datalist";
import Select from "components/base/Select";

import DefaultColumns from "../data/data";
import { defColgroup } from "../data/data";
import recensementHandler from "../handlers/recensement.handler";


const propertySelection = [
    { name : "Oui", value : true},
    { name : "Non", value : false}
]

const Create = props => {
    const bodyRef = useRef(null);
    const { setBodyRefHeight } = useContext(Context);

    
    return (
        <div className="bodyContainer" id="bodyContainer" ref={ bodyRef }>
            <div id="action_bar" style={{ display: "none" }}></div>
            <div className="main-container" id="main_container">
                <form >
                    {/***--- Block Employee Creation ---***/}
                    <div id="loaded" className="pageSingle" >
                        <div className="page-container">

                            {/* Start Header*/}
                            <div className="pageSingleHeader">
                                <div className="employeeDesc">
                                    <h3>Référence</h3>
                                    <input
                                        type="text"
                                        className="required"
                                        placeholder="Ex: Fiche Famille Kasongo Tambwe"
                                        onChange={function(e){
                                            return recensementHandler.reference(e);
                                        }}
                                    />
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
                                                <div className="label"><p>Responsable</p></div>
                                                <div className="input_input">
                                                    <input onChange = {function(e){
                                                        return recensementHandler.responsable(e);        
                                                    }} />
                                                </div>
                                            </div>
                                            
                                            <div className="input">
                                                <div className="label"><p> Proprietaire ?</p></div>
                                                <div className="input_input">
                                                    < Select 
                                                        data={ propertySelection } 
                                                        onChange = {function(e){
                                                            return recensementHandler.proprietaire(e);
                                                            console.log(e);
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="DataBox">
                                        <div className="DataBoxInputs">
                                            <div className="input">
                                                <div className="label"><p>Quartier</p></div>
                                                <div className="input_input">
                                                    <input />
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p>Numéro de la parcelle</p></div>
                                                <div className="input_input">
                                                    <input  onChange={function(e){
                                                        return recensementHandler.noparcelle(e);
                                                    }}/>
                                                </div>
                                            </div>
                                            
                                           
                                        </div>
                                    </div>

                                    
                                </div>

                                <div className="singleBlock">
                            
                                    <div className="DataBox">
                                        <h4>Résidence actuelle</h4>
                                        <div className="DataBoxInputs">
                                            <div className="input">
                                                <div className="label"><p>Avenue</p></div>
                                                <div className="input_input">
                                                    <input />
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p>Numéro</p></div>
                                                <div className="input_input">
                                                    <input />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="DataBox">

                                    </div>
                                </div>



                                <h4 className="mb-4 t-primary f-bold">Parents</h4>

                                <Table
                                    columns={ DefaultColumns }
                                    colgroup={ defColgroup() }
                                    rows={[]}
                                    inputable={true}
                                    margin={false}
                                    name="Tutelles"
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
                                        columns={ DefaultColumns }
                                        colgroup={ defColgroup() }
                                        rows={[]}
                                        inputable={true}
                                        margin={false}
                                        name="Tutelles"
                                    />
                                </div>
                            </div>
                            {/***  End  Single View tab for Rh informations */}


                            {/***   Single View tab for Rh informations */}
                            <div className="pageSingleLinksData " id="tutelles" style={{ display: "none" }}>
                                <div className="line-table">
                                    <Table
                                        columns={DefaultColumns}
                                        colgroup={defColgroup()}
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
                                        colgroup={defColgroup()}
                                        rows={[]}
                                        inputable={true}
                                        margin={false}
                                        name="Tutelles"
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

export default Create;