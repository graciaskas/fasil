import React, { useContext, useEffect, useState } from "react";
import Message from "components/base/components/Message";
import LoadView from "components/base/functions/loadView";
import { AppContext } from "components/motor/context/app.context";
import { getUserInfo } from "components/base/functions/all";
import { URI } from "components/motor/api/uri";


const View = ({id }) => {

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
                                          <h3>{cooperative.name && cooperative.name}</h3>
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
                                                      <p>{cooperative.president && cooperative.president}</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="input">
                                                    <div className="label">
                                                        <p>Email</p>
                                                    </div>
                                                    <div className="input_input">
                                                      <p>{cooperative.email && cooperative.email}</p>
                                                    </div>
                                                </div>
                                                <div className="input">
                                                   <div className="label">
                                                      <p>Contact d'urgence</p>
                                                   </div>
                                                   <div className="input_input">
                                                      <p>{cooperative.contact && cooperative.contact}</p>
                                                   </div>
                                                </div>
                                                <div className="input">
                                                   <div className="label">
                                                      <p>Province</p>
                                                   </div>
                                                   <div className="input_input">
                                                      <p>{address && address.province}</p>
                                                   </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    <div className="DataBox">
                                        <div className="DataBoxInputs">
                                            <div className="input">
                                                <div className="label">
                                                    <p>Ville</p>
                                                </div>
                                                <div className="input_input">
                                                   <p>{address && address.ville}</p>
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label">
                                                    <p>Commune </p>
                                                </div>
                                                <div className="input_input">
                                                   <p>{address && address.commune}</p>
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label">
                                                   <p>Quartier</p>
                                                </div>
                                                <div className="input_input">
                                                   <p>{address && address.quartier}</p>
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label">
                                                    <p>Avenue</p>
                                                </div>
                                                <div className="input_input">
                                                   <p>{address && address.avenue}</p>
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label">
                                                    <p>Numéro de la parcelle</p>
                                                </div>
                                                <div className="input_input">
                                                   <p>{address && address.num}</p>
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

export default View;