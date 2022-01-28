import React, { useContext, useState } from "react";
import  { useHistory } from "react-router-dom";

import { Context } from "../../contexts/indentification.context";


import Select from "components/base/Select";
import Message from "components/base/Message";

const propertySelection = [
    { name : "Oui", value : 'oui'},
    { name : "Non", value : 'non'}
];


const IdentificationType = ({ display }) => {

    const history = useHistory();
    const value = useContext(Context);

    const { propType, setPropType } = value;
    const [ data, setData ] = useState(null);
    const [style,setStyle] = useState(display);

    const [ message, setMessage ] = useState( { 
        message: null,
        type: null
    });

    console.log(style);
    
    
    const locateProp = () => { 
        if(data != null ) { 
            const { value } = data;
            setPropType(value.toLowerCase());
            history.push("/motor/identifications/create?propType="+value.toLowerCase());
        }else { 
            setMessage( { 
                type : 'danger',
                message : 'Veuillez définir un type propriétaire !'
            });
        }
        setStyle("none");
    };


    const close = () => {
        //change the modal classList 
        document.getElementById('m_body_master').classList = "modal-body w-40 modal-out"
        setTimeout(function(){
            document.getElementById('modal_master').style.display = 'none'
        },200);
    }

    return(
        <React.Fragment>
        <div className="modal " style={{ display : style }} id="modal_master">
            <div className="modal-body w-40 modal-in" id='m_body_master'>
                <div className="head">
                    <h4>Type de Propriétaire</h4>
                </div>
                <div className="" id="report_master">
                    <Message 
                        message = { message.message } 
                        type = { message.type }
                        style = {{}} 
                        handler = { setMessage}
                    />
                    <form className="form"  >

                        <div style={{margin:"6px 0px"}}>
                            <p> 
                                Pour demarrer avec un enregistrement de l'identification, 
                                vous devez selectioner si le motard est 
                                un propriétaire ou non.
                            </p>
                        </div>

                        <div className="DataBoxInputs">
                            <div className="input">
                                <div className="label">
                                    <p>Est le propriétaire ? </p>
                                </div>
                                <div className="input_input">
                                    <Select 
                                        data = { propertySelection} 
                                        required="required"
                                        onChange = {(data) =>  setData(data)}
                                    />
                                </div>
                            </div>
                        </div>

                        <button type="submit"  className="btn bg-blue" onClick = { locateProp }>
                            Définir
                        </button>
                        <button type="button" className="btn bg-second" onClick = {() => close()}>
                            Fermer
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </React.Fragment>
    );
};


export default  IdentificationType;
