import React, { useContext, useEffect, useRef, useState } from "react";

import Datepicker from "react-day-picker/DayPickerInput"
import 'react-day-picker/lib/style.css';

import LoadView from "components/base/functions/loadView";
import { FaUpload , FaTrash } from "react-icons/fa";
import imageProprietaire from "components/base/icons/image.png";

//**--- Components */
import Datalist from "components/base/components/Datalist";
import Select from "components/base/components/Select";
import Message from "components/base/components/Message";
import Camera from "../modals/camera";
import { AppContext } from "components/motor/context/app.context";

import { quartiers }  from "../../data/quartiers";
import { communes, genders, nationalities } from "../../data/base";
import { villes } from "../../data/villes";
//import form inputs handlers
import Handler from "../handlers/driver.handler";
import Model from "../models/model.driver";

import { getUserInfo } from "components/base/functions/all";
import { typePersonnes } from "../data";
import { getBas64 } from "components/base/functions/all";


const { setQuartier, setCommune, setType, setAvenue, setProprietaire, setNationalite, 
    setGender, setMobile,setGillet,setVilleNaissance,setDateBirth,setNumero,setCarte,
    setEmail,setPermis,setOwner
} = Handler;


const propertySelection = [
    { name : "Oui", value : true},
    { name : "Non", value : false}
];


const Create = props => {

    const inputFile = useRef(null);
    const { database, token } = getUserInfo();
    const [ display, setDisplay ] = useState("none");
    const [ isOwner, setIsOwner ] = useState(true);
    const [ fileSelected, setFileSelected ] = useState(imageProprietaire);
    const [ gillets, setGillets ] = useState([]);

    const {
        typePersonne, setTypePersonne, message, setMessage, associations, setLoadAssociations,
        setLoadDrivers, getGillets } = useContext(AppContext);

    const removeFileSelected = () => setFileSelected(null);

    const setAssociation = value => { 
        Model.affiliation = value;
        const gilletsAssocation = gillets.filter( gillet => gillet.association === value);
        setGillets(gilletsAssocation);
    };

    useEffect(() => { 
        setLoadAssociations(true);
        setLoadDrivers(false);
        getGillets(setGillets, typePersonne); //load gillets according to selected person type
    }, []);
    

    //Click input file hidden to unhidde it
   const showUpload = () => (inputFile.current) ? inputFile.current.click(): null;

   //handle input file from user upload
   const setFileImage = async (e) => { 
      const file = e.target.files[0];
      const base64 = await getBas64(file);
    //   setImage(base64);
      setFileSelected(base64);
   }

   const removeImage = () => setFileSelected(null);

    //Load Gillets acconding to typePersonne change
    useEffect(() => { 
        getGillets(setGillets, typePersonne); //load gillets according to selected person type
    }, [ typePersonne ]);
    


        
    return (
        <div className="bodyContainer" id="bodyContainer" >
            <div id="action_bar" style={{ display: "none" }}></div>

            <div className="main-container bg-sheet" id="main_container">
                <Message message={message.message} type={message.type} handler={setMessage}/>

                <form encType='multipart/form-data'>
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
                                        <div>
                                            <h4> Noms de la personne </h4>
                                            <input type="text"  onChange={(e) => setProprietaire(e)}  placeholder="Ex: Gracias Kasongo" className="required" />
                                            {/* <Camera 
                                                isOwner={false} display={ display } 
                                                setDisplay = { setDisplay } 
                                                fileSelected = { fileSelected }  
                                                setFileSelected = { setFileSelected }
                                            /> */}
                                            <input type={"file"} ref={inputFile} onChange={setFileImage} hidden/>
                                        </div>

                                        <div className="select">
                                            <div className="DataBoxInputs">
                                                <div className="input">
                                                    <div className="label"><p>Type d'identification</p></div>
                                                    <div className="input_input">
                                                        <Select 
                                                            data={ typePersonnes } onChange={ ({ value }) => setType(value, setTypePersonne) }
                                                            className="required mt--5" item="name" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

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
                                            <h4>Identité</h4>
                                            <div className="DataBoxInputs">
                                                <div className="input">
                                                    <div className="label">
                                                        <p>Nationalité</p>
                                                    </div>
                                                    <div className="input_input">
                                                        <Select data={nationalities}  className="required"  onChange = { data =>  setNationalite(data) } />
                                                    </div>
                                                </div>                                         
                                               
                                                <div className="input">
                                                    <div className="label"><p>Genre</p></div>
                                                    <div className="input_input">
                                                        <Select data={genders} className="required" onChange = { data =>  setGender(data) } />
                                                    </div>
                                                </div>
                                               
                                                <div className="input">
                                                    <div className="label"><p>Ville de naissance</p></div>
                                                    <div className="input_input">
                                                        <Datalist  onChange={setVilleNaissance}    data={villes}    item="nom"  create={true} />
                                                    </div>
                                                </div>

                                                <div className="input">
                                                    <div className="label"><p>Date  de naissance</p></div>
                                                    <div className="input_input">
                                                        <Datepicker onChange={(e) => console.log(e)}  />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    <div className="DataBox">
                                        <h4>Résidence actuelle</h4>
                                        <div className="DataBoxInputs">
                                           
                                            <div className="input">
                                                <div className="label"><p>Commune </p></div>
                                                <div className="input_input">
                                                    <Datalist  data={communes} item="name" className="required" create={true} onChange = {setCommune} />
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p>Quartier / Grpt</p></div>
                                                <div className="input_input">
                                                    <Datalist onChange={setQuartier} data={quartiers} item={"nom"}  create={true} className="required" />
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p>Avenue</p></div>
                                                <div className="input_input">
                                                    <input onChange={setAvenue} />
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p>Parcelle</p></div>
                                                <div className="input_input">
                                                    <input  onChange={setNumero}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="DataBox">
                                        <h4>Coordonées</h4>
                                        <div className="DataBoxInputs">
                                            <div className="input">
                                                <div className="label"><p>Phone</p></div>
                                                <div className="input_input">
                                                    <input  onChange={setMobile}  className="required" />
                                                </div>
                                            </div>
                                           
                                            <div className="input">
                                                <div className="label"><p>Email</p></div>
                                                <div className="input_input">
                                                    <input onChange = {setEmail} />
                                                </div>
                                            </div>

                                            <div className="input">
                                                <div className="label"><p>Carte d'electeur</p></div>
                                                <div className="input_input">
                                                    <input  onChange={setCarte} className="required" />
                                                </div>
                                            </div>
                                            
                                            <div className="input">
                                                <div className="label"><p>Permis de conduire</p></div>
                                                <div className="input_input">
                                                    <input  onChange={setPermis}/>
                                                </div>
                                            </div>
                                                 
                                        </div>
                                    </div>

                                </div>


                            <div className="singleBlock">
                            {
                                typePersonne !== 1 ? (
                                    <div className="DataBox">
                                        <h4>QR Code</h4>
                                        <div className="DataBoxInputs">
                                            <div className="input">
                                                <div className="label"><p>Autocollant</p></div>
                                                <div className="input_input">
                                                    <Datalist  
                                                        data={ gillets.data }  
                                                        item={"num"}   
                                                        create={false}  
                                                        className="required" 
                                                        onChange={setGillet}
                                                     />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ):null
                            }
                            
                              
                                    { 
                                        //If person to identify is a taximan
                                        typePersonne == 1 ? (
                                            <>
                                                <div className="DataBox">
                                                    <h4>Propriétaire ? </h4>
                                                    <div className="DataBoxInputs">
                                                        <div className="input">
                                                            <div className="label"><p>Est le propriétaire ? </p></div>
                                                            <div className="input_input">
                                                                <Select data={propertySelection} className="required" onChange = {(data) =>  {
                                                                        setOwner(data);
                                                                        setIsOwner(data.value);
                                                                    }} 
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="DataBox">
                                                    <h4>Association</h4>
                                                    <div className="DataBoxInputs">
                                                        <div className="input">
                                                            <div className="label"><p>Association</p></div>
                                                            <div className="input_input">
                                                                <Datalist data={associations && associations.data} item={"name"} create={false} className="required"  onChange={setAssociation} />
                                                            </div>
                                                        </div>
                                                        <div className="input">
                                                            <div className="label"><p>Gillet</p></div>
                                                            <div className="input_input">
                                                                <Datalist  data={ gillets && gillets.data }  item={"num"}   create={false}  className="required" onChange={setGillet} url="gillets" type={typePersonne}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> 
                                            </>
                                        ):null
                                    }

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