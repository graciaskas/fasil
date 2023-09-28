import React, { Component, useContext, useEffect, useRef, useState } from "react";

import Datepicker from "react-day-picker/DayPickerInput"
import 'react-day-picker/lib/style.css';

import LoadView from "components/base/functions/loadView";
import { FaUpload , FaTrash, FaAddressCard } from "react-icons/fa";
import imageProprietaire from "components/base/icons/image.png";

//**--- Components */
import Table from "components/base/Table";
import Datalist from "components/base/Datalist";
import Select from "components/base/Select";
import Message from "components/base/Message";

import DefaultColumns from "../data/index";
import { defColgroup } from "../data/index";
import identificationHandler from "../handlers/identification.handler";

//import form inputs handlers
import { 
    setQuartier, setCommune, setAvenue,
    setProprietaire, setNationalite, setEmploi,
    setContact, setEtat, setGenre, setMobile, setVille,
    setVilleNaissance,setDateBirth,setNumero,setCarte,
    setEmail,setIdnat,setNumImpot,setPermis,setRccm,setWeb 
} from "../handlers/identification.handler";


//import contexts
import { Context } from "../contexts/Context";
import { coreContext } from 'components/base/Context';



const Create = props => {

    const appContextData= useContext(Context);
    const coreContextData =  useContext(coreContext);
    const formRef = useRef(null);

    const { propType, setPropType, step, setStep } = appContextData;


    const [ message, setMessage ] = useState( { 
        message: null,
        type: null
    });

    const inputFile = useRef(null);
  
    const [ fileSelected, setFileSelected ] = useState(imageProprietaire);

    const showupload = (e) => {
        e.preventDefault();
        if(inputFile.current) { 
            inputFile.current.click();
        } 
    }

    const fileSelectHandler = (e) => {
        e.preventDefault();
        setFileSelected({ fileSelected:e.target.files })
        /* this.setState({fileSelected:e.target.files},() => {
            const isImage = this.getfileextension(this.state.fileSelected[0].name);
            if(isImage){ 
                const formData = new FormData();
                formData.append('image',this.state.fileSelected[0]);
                this.props.Form.image = formData;

              
                fetch("http://localhost:8020/employee/upload",{
                    method:'POST',
                    body:formData
            
                }).then( res => res.json())
                .then( data => {
                    this.setState({fileSelected:data.path});
                }).catch( e => console.log(e)) 
                
            }
        });
        */
    };

    //submit owner
    const submitOwner = e => { 
        e.preventDefault();
        console.log(formRef);
        setStep(2);
    };

    useEffect(() => { 
       setMessage( { 
            type : 'info',
            message : ` Etape  ${step} <==>  Vous enregistrer une identification dont 
                le propriétaire est de type `+ propType.toUpperCase()
       });
    },[ propType, step ]);

    
    return (
        <div className="bodyContainer" id="bodyContainer" >
            <div id="action_bar" style={{ display: "none" }}></div>

            <Message 
                type = {message.type} 
                message = {message.message} 
                style = {{ marginBottom : "2px"}}
                handler = {setMessage}
            />

            <div className="main-container" id="main_container">
           
                <form ref={formRef}>
                    {/***--- Block Employee Creation ---***/}
                    <div id="loaded" className="pageSingle" >
                        <div className="page-container">
                        
                                <div className="pageSingleHeader">
                                    <div className="emp-d">
                                        <div className="emp-i">
                                            <img src={ fileSelected }/>
                                            <div className="e-uploader">
                                                <span onClick={ showupload }> <FaUpload /></span>
                                                <span className="fa fa-trash"><FaTrash /></span>
                                                <input 
                                                    hidden 
                                                    type="file"
                                                    name="image" 
                                                    ref={inputFile} 
                                                    onChange={ fileSelectHandler } name="user"/>
                                            </div>
                                        </div>
                                        <div className="employeeDesc">
                                            <h3>Propriétaire</h3>
                                            <input 
                                                type="text" 
                                                placeholder="Ex: Gracias Kasongo ou Ets ZeSlap"
                                                onChange={setProprietaire}
                                                className="required"
                                            />
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
                                    { propType == 'pp' ? (
                                        <div className="DataBox">
                                            <h4>Identité</h4>
                                            <div className="DataBoxInputs">
                                                <div className="input">
                                                    <div className="label">
                                                        <span><FaAddressCard /></span>
                                                        <p>Nationalité</p>
                                                    </div>
                                                    <div className="input_input">
                                                        <input onChange={setNationalite}/>
                                                    </div>
                                                </div>
                                                
                                                <div className="input">
                                                    <div className="label"><p>Emploi</p></div>
                                                    <div className="input_input">
                                                        <input onChange={setEmploi}/>
                                                    </div>
                                                </div>
                                                <div className="input">
                                                    <div className="label"><p>Contact d'urgence</p></div>
                                                    <div className="input_input">
                                                        <input onChange={setContact}/>
                                                    </div>
                                                </div>
                                                <div className="input">
                                                    <div className="label"><p>Genre</p></div>
                                                    <div className="input_input">
                                                        <input onChange={setGenre}/>
                                                    </div>
                                                </div>
                                                <div className="input">
                                                    <div className="label"><p>Etat civil</p></div>
                                                    <div className="input_input">
                                                        <input onChange={setEtat}/>
                                                    </div>
                                                </div>
                                                <div className="input">
                                                    <div className="label"><p>Ville de naissance</p></div>
                                                    <div className="input_input">
                                                        <input onChange={setVilleNaissance}/>
                                                    </div>
                                                </div>
                                                <div className="input">
                                                    <div className="label"><p>Date</p></div>
                                                    <div className="input_input">
                                                        <Datepicker onChange={setDateBirth}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>) : null }
                                    
                                    <div className="DataBox">
                                        <h4>Résidence actuelle</h4>
                                        <div className="DataBoxInputs">
                                            <div className="input">
                                                <div className="label"><p>Ville</p></div>
                                                <div className="input_input">
                                                    <input onChange={setVille}/>
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p>Commune</p></div>
                                                <div className="input_input">
                                                    <input onChange={setCommune}/>
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p>Quartier</p></div>
                                                <div className="input_input">
                                                    <input onChange={setQuartier} />
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p>Avenue</p></div>
                                                <div className="input_input">
                                                    <input onChange={setAvenue} />
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p>Numéro de la parcelle</p></div>
                                                <div className="input_input">
                                                    <input  onChange={setNumero}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="singleBlock">
                                <div className="DataBox">
                                        <h4>Coordonées</h4>
                                        <div className="DataBoxInputs">
                                            <div className="input">
                                                <div className="label"><p>Mobile</p></div>
                                                <div className="input_input">
                                                    <input  onChange={setMobile}/>
                                                </div>
                                            </div>
                                           
                                            <div className="input">
                                                <div className="label"><p>Email</p></div>
                                                <div className="input_input">
                                                    <input onChange = {setEmail} />
                                                </div>
                                            </div>

                                            {  
                                                //affiche proprietaire selon le type du proprietaire
                                                // pp = personne physique;
                                                // pm = personne morale; 
                                                propType !== 'pp' ? (
                                                    <div className="input">
                                                        <div className="label"><p>Site web</p></div>
                                                        <div className="input_input">
                                                            <input  onChange={setWeb}/>
                                                        </div>
                                                    </div>
                                                    ) : (
                                                    <>
                                                        <div className="input">
                                                            <div className="label"><p>Carte d'electeur</p></div>
                                                            <div className="input_input">
                                                                <input  onChange={setCarte}/>
                                                            </div>
                                                        </div>
                                                        <div className="input">
                                                            <div className="label"><p>Permis de conduire</p></div>
                                                            <div className="input_input">
                                                                <input  onChange={setPermis}/>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div className="DataBox">
                                        <h4>Fiscalité</h4>
                                        <div className="DataBoxInputs">
                                            <div className="input">
                                                <div className="label"><p>Numéro d'impot</p></div>
                                                <div className="input_input">
                                                    <input onChange={setNumImpot}/>
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p>RCCM</p></div>
                                                <div className="input_input">
                                                    <input onChange={setRccm}/>
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p>Id Nat.</p></div>
                                                <div className="input_input">
                                                    <input onChange={setIdnat}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                
                
                                <div className="page-footer">
                                    <div className="page-footer-divider"></div>
                                    <button className="btn bg-blue" onClick={submitOwner}>
                                        Confirmer
                                    </button>
                                </div>

                            </div>
                            {/***  End  Single View tab for vehicules informations */}


                            {/***   Single View tab for vehicules informations */}
                            <div className="pageSingleLinksData " id="vehicules" style={{ display: "none" }}>
                                <div className="singleBlock">

                                    <div className="DataBox">
                                        <div className="DataBoxInputs">
                                            <div className="input">
                                                <div className="label"><p>Marque</p></div>
                                                <div className="input_input">
                                                    <input />
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p>Model</p></div>
                                                <div className="input_input">
                                                    <input />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="DataBox">
                                        <div className="DataBoxInputs">
                                            <div className="input">
                                                <div className="label"><p>Moteur</p></div>
                                                <div className="input_input">
                                                    <input />
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p>Chassis</p></div>
                                                <div className="input_input">
                                                    <input />
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p>Type</p></div>
                                                <div className="input_input">
                                                    <input />
                                                </div>
                                            </div>
                                            
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/***  End  Single View tab for vehicules informations */}


                            {/***   Single View tab for conducteurs informations */}
                            <div className="pageSingleLinksData " id="conducteurs" style={{ display: "none" }}>
                                <div className="line-table">
                                    <Table
                                        columns={DefaultColumns}
                                        colgroup={defColgroup()}
                                        rows={[]}
                                        inputable={true}
                                        margin={false}
                                        name="Conducteurs"
                                    />
                                </div>
                            </div>
                            {/***  End  Single View tab for conducteurs informations */}

                            
                        </div>
                    </div>
                    {/* End Of Block Employe */}
                </form>
            </div>
        </div>
    );
}

export default Create;