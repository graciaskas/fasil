import React, { useRef } from 'react';
import Datalist from 'components/base/components/Datalist';
import { useState } from 'react/cjs/react.development';
import { FaTrash, FaUpload } from 'react-icons/fa';
import { getBas64 } from 'components/base/functions/all';
import LoadView from 'components/base/functions/loadView';

import { setName, setImage } from "../handlers/componay.handlers";

function Create( props ) {

    const [ fileSelected, setFileSelected ] = useState("/src/image.png");
    const fileRef = useRef(null);
    const showUpload = e => fileRef.current.click();
    const removeFileSelected = () => setFileSelected("/src/image.png");

    const uploadFile = async(e) => { 
        try {
            const file = e.target.files[0];
            const base64 = await getBas64(file);
            setFileSelected(base64);
            setImage(base64) // set image
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <div className="bodyContainer">
                <div className="action-bar hidden" id="action_bar"></div>
                <div className="main-container bg-gray" id="main_container">
                    <form >
                        <div id="loaded" className="pageSingle">
                            <div className="page-container">

                                <div className="pageSingleHeader">
                                    <div className="emp-d">
                                        <div className="emp-i">
                                            <img src={ fileSelected }/>
                                            <div className="e-uploader">
                                                <span onClick={showUpload}> <FaUpload /></span>
                                                <span className="fa fa-trash" onClick={removeFileSelected}><FaTrash /></span>
                                                <input ref={fileRef} type="file" hidden onChange={uploadFile}/>
                                            </div>
                                        </div>
                                        <div className="employeeDesc">
                                            <div>
                                                <h4> Nom de la société </h4>
                                                <input type="text"   placeholder="Ex: ZeSlap Inc." className="required" onChange={setName}/>
                                            </div>
                                        </div>
                                    </div>
                                </div> 


                                <div className="pageSingleLinks">
                                    <li
                                        className="linkActive viewList"
                                        id="pubInfoHdlr"
                                        onClick={(e) => LoadView(e, "infosPubliques")}> Informations publiques</li>                              
                                </div>


                                <div className="pageSingleLinksData " id="infosPubliques" >
                                    <div className="singleBlock">
                                        <div className="DataBox">
                                            <h4>Adresse</h4>
                                            <div className="DataBoxInputs">
                                                <div className="input">
                                                    <div className="label"> <p>Province</p>   </div>
                                                    <div className="input_input">
                                                        <input className='required'/>
                                                    </div>
                                                </div>
                                                <div className="input">
                                                    <div className="label"><p>Ville</p></div>
                                                    <div className="input_input">
                                                        <input className='required'/>
                                                    </div>
                                                </div>
                                                <div className="input">
                                                    <div className="label"><p>Commune</p> </div>
                                                    <div className="input_input">
                                                        <input className='required'/>
                                                    </div>
                                                </div>
                                                <div className="input">
                                                    <div className="label"><p>Quartier</p></div>
                                                    <div className="input_input">
                                                        <input className='required'/>
                                                    </div>
                                                </div>
                                                <div className="input">
                                                    <div className="label"><p>Avenue</p></div>
                                                    <div className="input_input">
                                                        <input className='required'/>
                                                    </div>
                                                </div>
                                                <div className="input">
                                                    <div className="label"><p>Numéro de la parcelle</p></div>
                                                    <div className="input_input">
                                                        <input className='required'/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="DataBox">
                                            <h4>Fiscalité</h4>
                                            <div className="DataBoxInputs">
                                                <div className="input">
                                                    <div className="label"><p>Id Nat.</p></div>
                                                    <div className="input_input">
                                                        <input />
                                                    </div>
                                                </div>
                                                <div className="input">
                                                    <div className="label"><p>RCCM</p> </div>
                                                    <div className="input_input">
                                                        <input />
                                                    </div>
                                                </div>
                                                <div className="input">
                                                    <div className="label"><p>N° d'impôt</p> </div>
                                                    <div className="input_input">
                                                        <input />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='singleBlock'>
                                        <div className="DataBox">
                                            <h4>Contact</h4>
                                            <div className="DataBoxInputs">
                                                <div className="input">
                                                    <div className="label"><p>Téléphone</p></div>
                                                    <div className="input_input">
                                                        <input className='required'/>
                                                    </div>
                                                </div>
                                                <div className="input">
                                                    <div className="label"><p>Email</p> </div>
                                                    <div className="input_input">
                                                        <input />
                                                    </div>
                                                </div>
                                                <div className="input">
                                                    <div className="label"><p>Site web</p> </div>
                                                    <div className="input_input">
                                                        <input />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='DataBox'></div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create
