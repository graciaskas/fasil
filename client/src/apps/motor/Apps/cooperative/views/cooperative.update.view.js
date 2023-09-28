import React, { useContext, useEffect, useState } from "react";
import LoadView from "components/base/functions/loadView";

import { AppContext } from "components/motor/context/app.context";
import { getUserInfo } from "components/base/functions/all";
import { URI } from "components/motor/api/uri";

//**--- Components */
import Datalist from "components/base/components/Datalist";
import Message from "components/base/components/Message";


import { president, province, ville, quartier, commune, contact,email,setNum,name } from "../handlers/handler.cooperative";
import { provinces } from "components/motor/Apps/data/provinces";
import { villes } from "../../data/villes";
import { communes } from "../../data/communes";
import { quartiers } from "../../data/quartiers";


const Update = ({ id }) => {
   const { 
      message,
      setMessage
   } = useContext(AppContext);

   const { database, token } = getUserInfo();

   const [cooperative, setCooperative] = useState({});

   const getCooperative = async() => { 
      try {
         const request = await fetch(`${URI}/affiliations/${id}/?database=${database}`,{
            headers: {  "Authorization":`Bearer ${token}` }
         });
         const result = await request.json();
         setMessage({ message : result.message, type:result.type });
         if(result.type == "success"){
            setCooperative(result.data)
         }
      } catch (error) {
         console.error(error);
      }
   };

      

  useEffect(() => { 
    getCooperative(id);
  },[]);

  const { address } = cooperative;

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
                                 <div className="employeeDesc">
                                    <h3>Nom de l'association</h3>
                                    <input  
                                       type="text" 
                                       className="required"   
                                       placeholder="Ex: Mabanga" 
                                       onChange={name} 
                                       defaultValue={cooperative.name && cooperative.name}
                                    />
                                 </div>
                           </div>
                                
                           {/* End of Header*/}
                           <div className="pageSingleLinks">
                              <li className="linkActive viewList" id="pubInfoHdlr"
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
                                                        <input onChange={president} defaultValue={cooperative.president && cooperative.president}/>
                                                    </div>
                                                </div>
                                                
                                                <div className="input">
                                                    <div className="label">
                                                        <p>Email</p>
                                                    </div>
                                                    <div className="input_input">
                                                        <input onChange={email} defaultValue={cooperative.email && cooperative.email}/>
                                                    </div>
                                                </div>
                                                <div className="input">
                                                   <div className="label">
                                                      <p>Contact d'urgence</p>
                                                   </div>
                                                   <div className="input_input">
                                                      <input onChange={contact} defaultValue={cooperative.contact && cooperative.contact} />
                                                   </div>
                                                </div>
                                                <div className="input">
                                                   <div className="label">
                                                      <p>Province</p>
                                                   </div>
                                                   <div className="input_input">
                                                      <Datalist 
                                                         onChange={ province }
                                                         data={ provinces }
                                                         item={"nom"}
                                                         className="required"
                                                         defaultValue={address && address.province }
                                                      /> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    <div className="DataBox">
                                        <div className="DataBoxInputs">
                                            <div className="input">
                                                <div className="label">
                                                    <p>Ville </p>
                                                </div>
                                                <div className="input_input">
                                                <Datalist 
                                                   onChange={ ville }
                                                   data={ villes }
                                                   item={"nom"}
                                                   className="required"
                                                   defaultValue={address && address.ville }
                                                /> 
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label">
                                                    <p>Commune  </p>
                                                </div>
                                                <div className="input_input">
                                                <Datalist 
                                                   onChange={ commune }
                                                   data={ communes }
                                                   item={"nom"}
                                                   className="required"
                                                   defaultValue={address && address.commune }
                                                /> 
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label">
                                                   
                                                    <p>Quartier </p>
                                                </div>
                                                <div className="input_input">
                                                <Datalist 
                                                    onChange={ quartier }
                                                    data={ quartiers }
                                                    item={"nom"}
                                                    className="required"
                                                    defaultValue={address && address.quartier }
                                                /> 
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label">
                                                    <p>Avenue</p>
                                                </div>
                                                <div className="input_input">
                                                   <input defaultValue={address && address.avenue }/>
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label">
                                                    <p>Numéro de la parcelle</p>
                                                </div>
                                                <div className="input_input">
                                                    <input  onChange={setNum} defaultValue={address && address.num }/>
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

export default Update;