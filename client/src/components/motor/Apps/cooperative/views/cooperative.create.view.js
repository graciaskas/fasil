import React, { useContext, useEffect } from "react";
import LoadView from "components/base/functions/loadView";

//**--- Components */
import Datalist from "components/base/components/Datalist";
import Message from "components/base/components/Message";
import Select from "components/base/components/Select";

import { CooperativeContext } from "../contexts";

import DefaultColumns from "../data/index";
import { defColgroup } from "../data/index";

import { president, province, ville, quartier, commune, contact,email,setNum,name } from "../handlers/handler.cooperative";
import { provinces } from "components/motor/Apps/data/provinces";
import { villes } from "../../data/villes";
import { AppContext } from "components/motor/context/app.context";
import { communes } from "../../data/communes";
import { quartiers } from "../../data/quartiers";
import { FaTrash, FaUpload } from "react-icons/fa";


const Create = props => {

    const { 
        message,
        setMessage
     } = useContext(AppContext);

    useEffect(() => { 
       
    },[]);
  
    return (
        <div className="bodyContainer" id="bodyContainer">
            <div id="action_bar" style={{ display: "none" }}></div>

                <div className="main-container bg-sheet" id="main_container">
                    <Message message={message.message} type={message.type} handler={setMessage} />
                    <form >
                        {/***--- Block Employee Creation ---***/}
                        <div id="loaded" className="pageSingle" >
                            <div className="page-container">
                            
                                {/* Start Header*/}
                                    <div className="pageSingleHeader">
                                        <div className="emp-d">
                                            <div className="emp-i">
                                                <img src={ "" }/>
                                                <div className="e-uploader">
                                                    <span> <FaUpload /></span>
                                                    <span><FaTrash /></span>
                                                </div>
                                            </div>
                                            <div className="employeeDesc">
                                                <h3>Nom de l'association</h3>
                                                <input  type="text" className="required"   placeholder="Ex: Mabanga" onChange={name} />
                                            </div>
                                        </div>
                                    </div>
                                
                                {/* End of Header*/}

                                <div className="pageSingleLinks">
                                    <li
                                        className="linkActive viewList"
                                        id="pubInfoHdlr"
                                        onClick={(e) => LoadView(e, "infosPubliques")}> Informations publiques</li>
                                </div>

                            
                            {/***---   Single View tab for Public informations */}
                            <div className="pageSingleLinksData " id="infosPubliques" >

                                <div className="singleBlock">
                                 
                                    <div className="DataBox">
                                        
                                        <div className="DataBoxInputs">
                                            <div className="input">
                                                <div className="label">
                                                    <p>Président</p>
                                                </div>
                                                <div className="input_input">
                                                    <input onChange={president}/>
                                                </div>
                                            </div>
                                                
                                                <div className="input">
                                                    <div className="label">
                                                        <p>Email</p>
                                                    </div>
                                                    <div className="input_input">
                                                        <input onChange={email}/>
                                                    </div>
                                                </div>
                                                <div className="input">
                                                    <div className="label">
                                                        <p>Contact d'urgence</p>
                                                    </div>
                                                    <div className="input_input">
                                                        <input onChange={contact}/>
                                                    </div>
                                                </div>
                                                <div className="input">
                                                    <div className="label"> <p>Province</p></div>
                                                    <div className="input_input">
                                                        <Datalist onChange={ province }  data={ provinces } item={"nom"} className="required" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    <div className="DataBox">
                                        <div className="DataBoxInputs">
                                            <div className="input">
                                                <div className="label"><p>Ville</p></div>
                                                <div className="input_input">
                                                    <Datalist onChange={ ville } data={ villes } item={"nom"} className="required" /> 
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p>Commune</p></div>
                                                <div className="input_input">
                                                    <Datalist onChange={ commune } data={ communes }  item={"nom"} className="required" /> 
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p>Quartier</p></div>
                                                <div className="input_input">
                                                    <Datalist onChange={quartier} data={ quartiers } item={"nom"}className="required" /> 
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"> <p>Avenue</p></div>
                                                <div className="input_input">
                                                    <input />
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"> <p>Numéro</p></div>
                                                <div className="input_input">
                                                    <input  onChange={setNum}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/***  End  Single View tab for vehicules informations */}
                        </div>
                    </div>
                    {/* End Of Block Employe */}
                </form>
            </div>
        </div>
    );
}

export default Create;