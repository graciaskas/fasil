import React, { useContext, useEffect } from "react";
import LoadView from "components/base/functions/loadView";

//**--- Components */
import Datalist from "components/base/components/Datalist";
import Message from "components/base/components/Message";
import Select from "components/base/components/Select";


import { president, province, ville, quartier, commune, contact,email,setNum,name } from "../handlers/province.handler";
import { AppContext } from "components/motor/context/app.context";
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

                     <div className="pageSingleHeader"> {/* Start Header*/}
                           <div className="emp-d">
                              <div className="emp-i">
                                 <img src={ "" }/>
                                 <div className="e-uploader">
                                       <span> <FaUpload /></span>
                                       <span><FaTrash /></span>
                                 </div>
                              </div>
                              <div className="employeeDesc">
                                 <h3>Nom de la province</h3>
                                 <input  type="text" className="required"   placeholder="Ex: Nord Kivu" onChange={name} />
                              </div>
                           </div>
                     </div>   {/* End of Header*/}

                     <div className="pageSingleLinks">
                        <li className="linkActive viewList" id="pubInfoHdlr"
                           onClick={(e) => LoadView(e, "infosPubliques")}> 
                              Informations publiques
                        </li>
                     </div>

                            
                     {/***---   Single View tab for Public informations */}
                     <div className="pageSingleLinksData " id="infosPubliques" >

                        <div className="singleBlock">
                                 
                           <div className="DataBox">

                              <div className="DataBoxInputs">
                                 <div className="input">
                                    <div className="label"><p>Chef Lieu</p>  </div>
                                    <div className="input_input">
                                       <input onChange={president}/>
                                    </div>
                                 </div>
                                                
                                 <div className="input">
                                    <div className="label"><p>Code (Short name)</p></div>
                                    <div className="input_input">
                                       <input onChange={email}/>
                                    </div>
                                 </div>

                                 <div className="input">
                                    <div className="label"><p>Contact d'urgence</p></div>
                                    <div className="input_input">
                                       <input onChange={contact}/>
                                    </div>
                                 </div>
                                
                              </div>
                           </div>
                                    
                           <div className="DataBox">
                              <div className="DataBoxInputs">
                                 <div className="input">
                                    <div className="label"><p>Gouverneur</p></div>
                                    <div className="input_input">
                                       <input />
                                    </div>
                                 </div>
                              </div>
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