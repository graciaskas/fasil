import React, {useContext, useEffect, useState } from "react";

import Datepicker from "react-day-picker/DayPickerInput"
import 'react-day-picker/lib/style.css';

import LoadView from "components/base/functions/loadView";
import { FaUpload , FaTrash,  } from "react-icons/fa";
import imageProprietaire from "components/base/icons/image.png";

//**--- Components */
import Datalist from "components/base/components/Datalist";
import Select from "components/base/components/Select";
import Message from "components/base/components/Message";
import Camera from "../modals/camera";



//import contexts
import { IdentificationContext } from "../contexts/indentification.context";
import { AppContext } from "components/motor/context/app.context";
//Data
import { quartiers }  from "../../data/quartiers";
//import form inputs handlers
import Handler from "../handlers/owner.handler";
import { useHistory } from "react-router-dom";
import { parseUrl } from "query-string";
import { URI } from "components/motor/api/uri";
import { getUserInfo } from "components/base/functions/all";
import modelOwner from "../models/model.owner";

const { 
    setQuartier, 
    setCommune, 
    setAvenue,
    setProprietaire, 
    setNationalite, 
    setGender, setMobile,
    setVilleNaissance,
    setDateBirth,
    setNumero,
    setCarte,
    setRccm,
    setWeb,
    setIdnat,
    setNumImpot,
    setIsPP_,
    setEmail,
    setPermis,
} = Handler;


const genders = [
    { name : "Masculin", value : "masculin"},
    { name : "Feminin", value : "feminin"},
    { name : "Transgenre", value : "transgenre"},
];

const nationalities = [
    { name : "Congolais(e)", value : 'Congo'},
    { name : "Rwandais(e)", value : 'Rwanda'},
    { name : "Burundais(e)", value : 'Burundi'},
    { name : "Ugandais(e)", value : 'Uganda'},
    { name : "Camerounais(e)", value : 'Cameroun'},
    { name : "Senegalais(e)", value : 'Senegal'},
    { name : "Brazavillois(e)", value : 'Congo-Brazaville'}
];

const communes = [
    { name : "Karisimbi", value : 'karisimbi'},
    { name : "Goma", value : 'goma'}
];

const propertySelection = [
    { name : "Personne morale",   value : false },
    { name : "Personne physique", value : true }
];



const Create = props => {

    const { step, setStep, loading, setLoading } = useContext(IdentificationContext);;
    const [ isPP, setIsPP ] = useState(true);
    const [ updateIsPP, setUpdateIsPP ] = useState(true);
    const [ display, setDisplay ] = useState("none");
    const [ fileSelected, setFileSelected ] = useState(imageProprietaire);
    const { message, setMessage } = useContext(AppContext);
    const { location } = useHistory();

    const showUpload = () => setDisplay("block");
    const removeFileSelected = () => setFileSelected(null);

    const getEngine = async (id) => { 
        try {
            const { database, token } = getUserInfo(); //get current user database and token
            const request = await fetch(URI+"/engines/"+id+"/?database="+database, { 
                method : "GET", 
                headers: { "Authorization":"Bearer "+token }
            });
            const result = await request.json();
            console.log(result);

            if(result.type == "success") { 
                const { data, driver } = result;
                if(driver.type == 3) { 
                    setIsPP(false) //set model is for company;
                    setUpdateIsPP(false); //forbid update isPP state
                    modelOwner.isPP = false // update model isPP attribute to false (company)
                } 
            } else { setMessage({ message: result.message, type : result.type }) } //Display server message
        } catch (error) { console.error(error);} //catch error
    };

    const setInitialStates = () => { //set initial states acconding to url
        const { search } = location;
        const { query } = parseUrl(search);
        const { record, type } = query;

        //if record exists and not type
        if(record && !type) getEngine(record) //Update state from engine function

        if(record && type ) { 
            if(type == "company") { 
                setIsPP(false); //update isPP state
                setUpdateIsPP(false); //forbid update isPP state
            }
        }
    };

    useEffect(() => { 
        const text =  isPP ? "Personnel physique" : "Personne morale";
        setMessage( { 
            type : 'info',
            message : ` Etape  3 | Enregistrement du propriétaire | `+ text
        });
    },[ isPP , step ]);

    useEffect(() => { 
        setInitialStates();
    },[]);

    console.log(isPP);

    
    return (
        <div className="bodyContainer" id="bodyContainer" >
            <div id="action_bar" style={{ display: "none" }}></div>

            <Message 
                type = {message.type} 
                message = {message.message} 
                style = {{ marginBottom : "2px"}}
                handler = {setMessage}
            />
            

            <div className="main-container bg-sheet" id="main_container">
                <form>
                    {/***--- Block Employee Creation ---***/}
                    <div id="loaded" className="pageSingle" >
                        <div className="page-container">
                            <div className="pageSingleHeader">
                                <div className="emp-d">
                                    <div className="emp-i">
                                        <img src={ fileSelected }/>
                                        <div className="e-uploader">
                                            <span onClick={showUpload}> <FaUpload /></span>
                                            <span className="fa fa-trash" onClick={removeFileSelected}><FaTrash /></span>
                                        </div>
                                    </div>
                                    <div className="employeeDesc">
                                        <h3> {isPP ? "Propriétaire" : "Entreprise"} </h3>
                                        <input 
                                            type="text" 
                                            onChange={(e) => setProprietaire(e)}
                                            placeholder={isPP ? "Ex: Gracias Kasongo" : "Ex: ZeSlap Inc."}
                                            className="required"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pageSingleLinks">
                                <li
                                    className="linkActive viewList"
                                    id="pubInfoHdlr"
                                    onClick={(e) => LoadView(e, "infosPubliques")}>
                                    Informations publiques
                                </li>                              
                            </div>

                            
                            {/***---   Single View tab for Public informations */}
                            <div className="pageSingleLinksData " id="infosPubliques" >

                                <div className="singleBlock">
                                    {  isPP ? ( 
                                        <div className="DataBox">
                                            <h4>Identité</h4>
                                            <div className="DataBoxInputs">
                                                <div className="input">
                                                    <div className="label">
                                                        <p>Nationalité</p>
                                                    </div>
                                                    <div className="input_input">
                                                        <Select data={nationalities} onChange = { data => { setNationalite(data); }} />
                                                    </div>
                                                </div>
                                                
                                               
                                                <div className="input">
                                                    <div className="label"><p>Genre</p></div>
                                                    <div className="input_input">
                                                        <Select data={genders} onChange = { data => { setGender(data); }} />
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
                                        </div>
                                    ): null  }

                                    <div className="DataBox">
                                        <h4>Adresse</h4>
                                        <div className="DataBoxInputs">
                                           
                                            <div className="input">
                                                <div className="label"><p>Commune</p></div>
                                                <div className="input_input">
                                                   {
                                                       isPP ? (
                                                       <Select data ={communes} className="required" onChange = {(data) => setCommune(data)}/>
                                                       ) : (
                                                        <Datalist data ={communes} item="name" create={true} 
                                                            className="required" onChange = {(value) => { modelOwner.address.commune = value }} />
                                                       )
                                                   }
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p>Quartier</p></div>
                                                <div className="input_input">
                                                    {/* <input onChange={setQuartier} /> */}
                                                    <Datalist onChange={setQuartier} data={quartiers} item={"nom"} className="required" create={true} /> 
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

                                    {
                                        !isPP ? (
                                            <div className="DataBox">
                                                <h4>Fiscalité</h4>
                                                <div className="DataBoxInputs">
                                                    <div className="input">
                                                        <div className="label"><p>Numéro Impot</p></div>
                                                        <div className="input_input">
                                                            <input onChange={setNumImpot}/>
                                                        </div>
                                                    </div>
                                                    <div className="input">
                                                        <div className="label"><p>Id. Nat</p></div>
                                                        <div className="input_input">
                                                            <input onChange={setIdnat}/>
                                                        </div>
                                                    </div>
                                                    <div className="input">
                                                        <div className="label"><p>RCCM</p></div>
                                                        <div className="input_input">
                                                            <input onChange={setRccm}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                        ): null
                                    }
                                </div>


                                <div className="singleBlock">
                                    <div className="DataBox">
                                        <h4>Coordonées</h4>
                                        <div className="DataBoxInputs">
                                            <div className="input">
                                                <div className="label"><p>Mobile</p></div>
                                                <div className="input_input">
                                                    <input className="required"  onChange={setMobile} />
                                                </div>
                                            </div>
                                           
                                            <div className="input">
                                                <div className="label"><p>Email</p></div>
                                                <div className="input_input">
                                                    <input onChange = {setEmail} />
                                                </div>
                                            </div>

                                            {
                                                isPP ? (<>
                                                        <div className="input">
                                                            <div className="label"><p>Carte d'electeur</p></div>
                                                            <div className="input_input">
                                                                <input  className="required"  onChange={setCarte}  />
                                                            </div>
                                                        </div>
                                                        <div className="input">
                                                            <div className="label"><p>Permis de conduire</p></div>
                                                            <div className="input_input">
                                                                <input  onChange={setPermis}/>
                                                            </div>
                                                        </div>
                                                    </>
                                                ):(
                                                    <div className="input">
                                                        <div className="label"><p>Siteweb</p></div>
                                                        <div className="input_input">
                                                            <input  onChange={setWeb}/>
                                                        </div>
                                                    </div>
                                                )
                                            }                                 
                                        </div>
                                    </div>


                                    <div className="DataBox">
                                        { updateIsPP ? (
                                            <>
                                                <h4>Personne</h4>
                                                <div className="DataBoxInputs">
                                                    <div className="input">
                                                        <div className="label"><p> Morale ou Physique </p></div>
                                                        <div className="input_input">
                                                            <Select 
                                                                data = { propertySelection} 
                                                                className="required"
                                                                onChange = {(data) =>  { 
                                                                    setIsPP(data.value)
                                                                    setIsPP_(data) 
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : null}
                                        
                                    </div>   

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Create;