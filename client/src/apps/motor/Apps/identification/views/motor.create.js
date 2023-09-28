
import React, { useContext, useRef, useState } from 'react';
import { FaUpload, FaTrash} from  "react-icons/fa";


import { 
    setChassis,
    setCouleur,
    setMarque,
    setMoteur,
    setModel,
    setPlaque,
    setTypePneu } from "../handlers/motor.handler";

import Datalist from 'components/base/components/Datalist';
import Message from 'components/base/components/Message';
import Select from 'components/base/components/Select';

import { AppContext } from 'components/motor/context/app.context';
import { colors } from '../../data/colors';
import { getBas64 } from 'components/base/functions/all';
import { setImage } from '../handlers/motor.handler';

function MotoCreate(props) {
    const { message, setMessage } = useContext(AppContext);
    const imageRef = useRef(null);
    const [ imageSelected, setImageSelected ] = useState(null);
    
    const showUpload = () => { 
        console.log(imageRef);
        if(imageRef.current) { 
            imageRef.current.click();
        }
    }
    const uploadImage = async (e) => { 
        const file = e.target.files[0];
        const base64 = await getBas64(file);
        setImageSelected(base64);
        setImage(base64);
    };

    return (
        <div className="bodyContainer" id="bodyContainer" >
            <div id="action_bar" style={{ display: "none" }}></div>
            <div className="main-container bg-sheet" id="main_container">
                <Message message={message.message} type={message.type} handler={setMessage}/>
                <form >
                    {/***--- Block Employee Creation ---***/}
                    <div id="loaded" className="pageSingle" >
                        <div className="page-container">
                        
                                <div className="pageSingleHeader">
                                    <div className="emp-d">
                                        <div className="emp-i">
                                            <img src={ imageSelected }/>
                                            <div className="e-uploader">
                                                <span onClick={showUpload}><FaUpload /></span>
                                                <span className="fa fa-trash"><FaTrash /></span>
                                                <input hidden type="file" id="file" name="image" onChange={uploadImage}   ref={imageRef}/>
                                            </div>
                                        </div>
                                        <div className="employeeDesc">
                                            <h3> Numéro du model </h3>
                                            <input 
                                               placeholder="Eg: GLX STAR"
                                               onChange={setModel}
                                               className="required"
                                            />
                                        </div>
                                    </div>
                                </div>
                            {/* End of Header*/}

                            <div className="pageSingleLinksData">

                                <div className="singleBlock">
                                    <div className="DataBox">
                                       <div className="DataBoxInputs">
                                           <div className="input">
                                               <div className="label">
                                                   <p>Marque</p>
                                               </div>
                                               <div className="input_input">
                                                   <input onChange={setMarque} className="required"/>
                                               </div>
                                            </div>
                                        </div>
                                        <div className="DataBoxInputs">
                                           <div className="input">
                                               <div className="label">
                                                   <p>Moteur</p>
                                               </div>
                                               <div className="input_input">
                                                   <input onChange={setMoteur} className="required"/>
                                               </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/** End Data box */}

                                    <div className="DataBox">
                                       <div className="DataBoxInputs">
                                           <div className="input">
                                               <div className="label">
                                                   <p>Chassis</p>
                                               </div>
                                               <div className="input_input">
                                                   <input onChange={setChassis} className="required"/>
                                               </div>
                                            </div>
                                        </div>
                                        <div className="DataBoxInputs">
                                           <div className="input">
                                               <div className="label">
                                                   <p>Plaque</p>
                                               </div>
                                               <div className="input_input">
                                                   <input onChange={setPlaque} className="required"/>
                                               </div>
                                            </div>
                                        </div>
                                        <div className="DataBoxInputs">
                                           <div className="input">
                                               <div className="label">
                                                   <p>Type pneus</p>
                                               </div>
                                               <div className="input_input">
                                                   <input onChange={setTypePneu} type="number" min="2"/>
                                               </div>
                                            </div>
                                        </div>
                                        <div className="DataBoxInputs">
                                           <div className="input">
                                               <div className="label">
                                                   <p>Couleur</p>
                                               </div>
                                               <div className="input_input">
                                                   {/* <input type="color" onChange={setCouleur}/> */}
                                                    <Datalist
                                                        item="name"
                                                        data={colors}
                                                        onChange={setCouleur}
                                                    />
                                               </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/** End Data inputs */}
                                </div>
                                {/** End page single block */}
                            </div>
                            {/** End page single link */}

                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MotoCreate
