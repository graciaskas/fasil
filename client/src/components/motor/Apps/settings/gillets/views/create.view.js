import React, { useContext, useEffect, useState } from 'react';
//Datas
import { provinces } from "components/motor/Apps/data/provinces";
import { communes } from 'components/motor/Apps/data/communes';
import { villes } from 'components/motor/Apps/data/villes';
import { colors } from 'components/motor/Apps/data/colors';

import { getUserInfo } from 'components/base/functions/all';
import { URI } from 'components/base/auth/access.token';

import Select from 'components/base/components/Select';
import Datalist from "components/base/components/Datalist";
import Message from 'components/base/components/Message';

//Handlers
import { setCommune, setNum, setProvince, setColor, setAssociation, setVille, setType } from '../handlers/create.handler';
import { typePersonnes } from 'components/motor/Apps/identification/data';


import { AppContext } from 'components/motor/context/app.context';

function Create({ create }) {

    const { message, setMessage, associations, setLoadAssociations } = useContext(AppContext);
    const [ type, setType_ ] = useState(typePersonnes[1].value);


    useEffect(()=> {
        if(type == 1) { setLoadAssociations(true); } 
    },[type]);


    return (
        <div className="bodyContainer" id="bodyContainer" >
            <div id="action_bar" style={{ display: "none" }}></div>
            <div className="main-container bg-sheet" id="main_container">
                <Message message={message.message}  type={message.type} handler={setMessage} />
                <form>
                    <div id="loaded" className="pageSingle" >
                        <div className="page-container">
                            <div className="pageSingleHeader">
                                <div className="emp-d">
                                    <div className="employeeDesc">
                                        <div>
                                            <h3>Nombre de gillet(s) à créer</h3>
                                            <input  type="number"  min="1" onChange={setNum}  className="required" placeholder="ex: 100" />
                                        </div>
                                        <div className="select">
                                            <div className="DataBoxInputs">
                                                <div className="input">
                                                    <div className="label"><p>Type de gillet </p></div>
                                                    <div className="input_input">
                                                        <Select 
                                                            data={ typePersonnes } onChange={ ({ value }) => {
                                                                setType_(value);
                                                                setType(value);
                                                            }}
                                                            className="required mt--5" item="name" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        <div className="pageSingleLinksData">
                            <div className="singleBlock">
                                <div className="DataBox">

                                    <div className="DataBoxInputs">
                                        {
                                            type == 1 ? (
                                                <div className="input">
                                                    <div className="label"><p>Association</p></div>
                                                    <div className="input_input">
                                                    <Datalist  data={associations && associations.data}  item={"name"}   onChange={setAssociation}  className="required" />
                                                    </div>
                                                </div>
                                            ):null
                                        }
                                        {/*
                                        <div className="input">
                                            <div className="label"><p>Province</p></div>
                                            <div className="input_input">
                                               <Datalist 
                                                    data={ provinces } 
                                                    item={"nom"} 
                                                    onChange={setProvince}
                                                    className="required"
                                                />
                                            </div>
                                        </div>
                                        <div className="input">
                                            <div className="label"><p>Ville / Territoire</p></div>
                                            <div className="input_input">
                                                <Datalist 
                                                    item="nom" 
                                                    data={villes}
                                                    onChange={ setVille }
                                                    className="required"
                                                />
                                            </div>
                                        </div>
                                         <div className="input">
                                            <div className="label"><p>Commune / Chefferie </p></div>
                                            <div className="input_input">
                                                <Datalist
                                                    item={"nom"} 
                                                    data={ communes } 
                                                    onChange={setCommune}
                                                    className="required"
                                                />
                                            </div>
                                        </div> */}
                                    </div>
                                </div>

                                <div className="DataBox">
                                    
                                    <div className="DataBoxInputs">
                                     
                                        {/* <div className="input">
                                            <div className="label"><p>Couleur</p></div>
                                            <div className="input_input">
                                                <Datalist
                                                    item="name" 
                                                    data={ colors } 
                                                    onChange={setColor}
                                                />
                                            </div>
                                        </div> */}
                                        
                                    </div>
                                </div>

                            </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Create;