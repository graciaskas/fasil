import React, { useContext, useEffect, useState } from 'react';


import LoadView from "components/base/functions/loadView";
import { useHistory } from 'react-router';
import { parseUrl } from 'query-string';
import Message from 'components/base/components/Message';
import { IdentificationContext } from '../contexts/indentification.context';
import { URI } from 'components/motor/api/uri';
import { getUserInfo } from 'components/base/functions/all';
import LoadingDark from 'components/base/components/LoadingDark';

const finger = "/src/finger.JPG";

function View({ data }) {

    const { database, token } = getUserInfo();
    const { message, setMessage, printing, setPriting } = useContext(IdentificationContext)
    const { location } = useHistory();
    const { search, pathname} = location;
    const { url, query } = parseUrl(search);

    const [ content, setContent ] = useState([]);
    const [ gillet, setGillet ] = useState([]);
    const [ engine, setEngine ] = useState([]);
    const [ owner, setOwner ] = useState([]);
  

    const [ loadMotor, setLoadMotor ] = useState(false);

    let id = null
    if(query.q) id = query.q;

    const fetchDriver = async(id) => {
        try {
            const Url= `${URI}/drivers/${id}/?database=${database}&engine=true&owner=true`
            const request = await fetch(Url,{ method: "GET", headers:{"Authorization":`Bearer ${token}`}});
            const data = await request.json();


            console.log(data);
            //--- Set driver is proprietor -- 
            setContent(data.driver);
            setEngine(data.engine);
            setGillet(data.gillet);
            setLoadMotor(true);
            //If data has owner then set owner;
            if(data.owner) setOwner(data.owner);

        } catch (error) { console.error(error); }
    };

    
    useEffect(() => { fetchDriver(id); }, [])

    useEffect(() => { fetchDriver(id); }, [ loadMotor ]);

   
    const { address } = content;
    const address_ = owner.address ? owner.address : {};

    return (
        <div className="bodyContainer" id="bodyContainer" >
            <Message message={message.message} type={message.type} handler={setMessage}/>
            {   printing ?  <LoadingDark /> : null }
            <div id="action_bar" style={{ display: "none" }}></div>
                <div className="main-container bg-sheet" id="main_container">
                    <form >
                        <div id="loaded" className="pageSingle" >
                            <div className="page-container">
                                {/*---  Header  */}
                                <div className="pageSingleHeader">
                                    <div className="emp-d">
                                        <div className="emp-i">
                                            <img src={content.image ? content.image : "/src/male.png"}/>
                                        </div>
                                        <div className="employeeDesc">
                                            <h3>{content.names}</h3>
                                            { content.isOwner !== true ? ( 
                                                owner.isPP !== true ? <h4 className='status bg-primary d-inline'>{owner.names}</h4> : null
                                            ): <h4 className='status bg-success d-inline'> Privé </h4> }
                                        </div>
                                        <div className="emp-i ml-4">
                                            <img src={gillet.image}/>
                                        </div>
                                        <div className="emp-i">
                                            <img src={finger}/>
                                        </div>
                                    </div>
                                </div>
                                {/* End of Header*/}

                            <div className="pageSingleLinks">
                                <li
                                    className="linkActive viewList"
                                    id="pubInfoHdlr"
                                    onClick={(e) => LoadView(e, "infosPubliques")}> Informations publiques</li>

                                <li className="viewList"
                                    id="enfantsBook"
                                    onClick={(e) => LoadView(e, "vehicule")}> Vehicule</li>
                                    
                                {
                                    !content.isOwner ? (
                                        <li className="viewList"
                                        id="tutellesBook"
                                        onClick={(e) => LoadView(e, "proprietaire")}>Propriétaire</li>
                                    ):null
                                }
                                
                            </div>

                            
                            {/***---   Single View tab for Public informations */}
                            <div className="pageSingleLinksData" id="infosPubliques" >

                                <div className="singleBlock">
                                    <div className="DataBox">
                                        <h4>Identité</h4>
                                        <div className="DataBoxInputs">
                                            <div className="input">
                                                <div className="label">
                                                    <p>Nationalité</p>
                                                </div>
                                                <div className="input_input">
                                                    <p>  {content.nationality && content.nationality}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="input">
                                                <div className="label"><p>Genre</p></div>
                                                <div className="input_input">
                                                    <p>{ content.gender && content.gender }</p>
                                                </div>
                                            </div>

                                            <div className="input">
                                                <div className="label"><p>Ville de naissance</p></div>
                                                <div className="input_input">
                                                    <p>{ content.birthTown && content.birthTown }</p>
                                                </div>
                                            </div>
                                            <div className="input">
                                                <div className="label"><p>Date</p></div>
                                                <div className="input_input">
                                                    <p>{ content.birthDay && content.birthDay }</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                <div className="DataBox">
                                    <h4>Résidence actuelle</h4>
                                    <div className="DataBoxInputs">
                                        <div className="input">
                                            <div className="label"><p>Commune</p></div>
                                            <div className="input_input">
                                                <p>{address && address.commune}</p>
                                            </div>
                                        </div>
                                        <div className="input">
                                            <div className="label"><p>Quartier</p></div>
                                            <div className="input_input">
                                                <p>{address && address.quartier}</p>
                                            </div>
                                        </div>
                                        <div className="input">
                                            <div className="label"><p>Avenue</p></div>
                                            <div className="input_input">
                                                <p>{address && address.avenue}</p>
                                            </div>
                                        </div>
                                        <div className="input">
                                            <div className="label"><p>Numéro de la parcelle</p></div>
                                            <div className="input_input">
                                                <p>{address && address.no}</p>
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
                                               <p>{content.phone}</p>
                                            </div>
                                        </div>
                                       
                                        <div className="input">
                                            <div className="label"><p>Email</p></div>
                                            <div className="input_input">
                                                <p>{content.phone}</p>
                                            </div>
                                        </div>

                                        <div className="input">
                                            <div className="label"><p>Carte d'electeur</p></div>
                                            <div className="input_input">
                                                <p>{content.id_no}</p>
                                            </div>
                                        </div>
                                        <div className="input">
                                            <div className="label"><p>Permis de conduire</p></div>
                                            <div className="input_input">
                                                <p>{content.id_driver}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="DataBox">
                                    <div className="DataBox">
                                        <h4>Propriétaire ? </h4>
                                        <div className="DataBoxInputs">
                                            <div className="input">
                                                <div className="label"><p>Est le propriétaire ? </p></div>
                                                <div className="input_input">
                                                    <p>{content.isOwner ? "Oui" : "Non"}</p>
                                                </div>
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
                                                <p>{content.affiliation}</p>
                                            </div>
                                        </div>
                                        <div className="input">
                                            <div className="label"><p>Gillet</p></div>
                                            <div className="input_input">
                                                <p>{content.gillet}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div> 

                            </div>
                        </div>
                        {/***  End  Single View tab for public informations */}



                        {/***---   Single View tab for Vehicules */}
                        <div className="pageSingleLinksData " id="vehicule" style={{ display: "none" }}>
                            <div className="singleBlock">
                                <div className="DataBox">
                                    <div className="DataBoxInputs">
                                        <div className="input">
                                            <div className="label">
                                                <p>Image</p>
                                            </div>
                                            <div className="input_input">
                                                <img alt="" src={engine.image} width="70px" height="50px"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="DataBox">
                                    <div className="DataBoxInputs">
                                        <div className="input">
                                            <div className="label">
                                                <p>Marque</p>
                                            </div>
                                            <div className="input_input">
                                              <p>{engine.marque}</p>
                                            </div>
                                        </div>
                                        <div className="input">
                                            <div className="label">
                                                <p>Model</p>
                                            </div>
                                            <div className="input_input">
                                              <p>{engine.model}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="DataBoxInputs">
                                        <div className="input">
                                            <div className="label">
                                                <p>Moteur</p>
                                            </div>
                                            <div className="input_input">
                                                <p>{engine.moteur}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="DataBox">
                                    <div className="DataBoxInputs">
                                        <div className="input">
                                            <div className="label">
                                                <p>Chassis</p>
                                            </div>
                                            <div className="input_input">
                                                <p>{engine.chassis}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="DataBoxInputs">
                                        <div className="input">
                                            <div className="label">
                                                <p>Plaque</p>
                                            </div>
                                            <div className="input_input">
                                                <p>{engine.plaque}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="DataBoxInputs">
                                        <div className="input">
                                            <div className="label">
                                                <p>Type pneus</p>
                                            </div>
                                            <div className="input_input">
                                                <p>{engine.typePneu}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="DataBoxInputs">
                                        <div className="input">
                                            <div className="label">
                                                <p>Couleur</p>
                                            </div>
                                            <div className="input_input">
                                                <p>{engine.couleur}</p>
                                            </div>
                                        </div>
                                    </div>
                            
                                </div>
                            </div>
                        </div>
                        {/***---  Single View tab for Vehicules */}

                       



                        {
                            content.isOwner == false ? (
                            <div className="pageSingleLinksData" id="proprietaire"  style={{ display: "none" }}>
                                <div className="singleBlock">
                                    {
                                        owner.isPP == "true" ? (
                                            <div className="DataBox">
                                                <h4>Identité</h4>
                                                <div className="DataBoxInputs">
                                                    <div className="input">
                                                        <div className="label"><p>Nationalité</p></div>
                                                        <div className="input_input"><p>{owner.nationality}</p></div>
                                                    </div>
                                                    
                                                    <div className="input">
                                                        <div className="label"><p>Genre</p></div>
                                                        <div className="input_input"> <p>{owner.gender}</p></div>
                                                    </div>

                                                    <div className="input">
                                                        <div className="label"><p>Ville de naissance</p></div>
                                                        <div className="input_input">
                                                            <p>{owner.birthTown}</p>
                                                        </div>
                                                    </div>
                                                    <div className="input">
                                                        <div className="label"><p>Date</p></div>
                                                        <div className="input_input">
                                                            <p>{owner.birthDay}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ): null
                                    }    
                                        
                                    {
                                        owner.isPP == "false" ? (
                                            <div className="DataBox">
                                                <h4>Adresse</h4>
                                                <div className="DataBoxInputs">
                                                    <div className="input">
                                                        <div className="label"><p>Commune</p></div>
                                                        <div className="input_input">
                                                            <p>{address_ && address_.commune}</p>
                                                        </div>
                                                    </div>
                                                    <div className="input">
                                                        <div className="label"><p>Quartier</p></div>
                                                        <div className="input_input">
                                                            <p>{address_ && address_.quartier}</p>
                                                        </div>
                                                    </div>
                                                    <div className="input">
                                                        <div className="label"><p>Avenue</p></div>
                                                        <div className="input_input">
                                                            <p>{address_ && address_.avenue}</p>
                                                        </div>
                                                    </div>
                                                    <div className="input">
                                                        <div className="label"><p>Numéro de la parcelle</p></div>
                                                        <div className="input_input">
                                                            <p>{address && address.no}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null
                                    }


                                    {
                                        owner.isPP == "true" ? (
                                            <div className="DataBox">
                                                <h4>Résidence actuelle</h4>
                                                <div className="DataBoxInputs">
                                                    <div className="input">
                                                        <div className="label"><p>Commune</p></div>
                                                        <div className="input_input"> <p>{address_ && address_.commune}</p>  </div>
                                                    </div>
                                                    <div className="input">
                                                        <div className="label"><p>Quartier</p></div>
                                                        <div className="input_input"><p>{address_ && address.quartier}</p> </div>
                                                    </div>
                                                    <div className="input">
                                                        <div className="label"><p>Avenue</p></div>
                                                        <div className="input_input"><p>{address_ && address_.avenue}</p></div>
                                                    </div>
                                                    <div className="input">
                                                        <div className="label"><p>Numéro de la parcelle</p></div>
                                                        <div className="input_input"> <p>{address && address.no}</p></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                             
                                            <div className="DataBox">
                                                <h4>Fiscalité</h4>
                                                <div className="DataBoxInputs">
                                                    <div className="input">
                                                        <div className="label"><p>Numéro Impot</p></div>
                                                        <div className="input_input"><p>{owner.numImpot}</p></div>
                                                    </div>

                                                    <div className="input">
                                                        <div className="label"><p>Id. Nat</p></div>
                                                        <div className="input_input"><p>{owner.idnat}</p></div>
                                                    </div>

                                                    <div className="input">
                                                        <div className="label"><p>RCCM</p></div>
                                                        <div className="input_input"> <p>{owner.rccm}</p> </div>                                  
                                                    </div>

                                                </div>
                                            </div> 
                                        )
                                    }

                                </div>


                            <div className="singleBlock">
                                <div className="DataBox">
                                    <h4>Coordonées</h4>
                                    <div className="DataBoxInputs">
                                        <div className="input">
                                            <div className="label"><p>Mobile</p></div>
                                            <div className="input_input"> <p>{ address_ & address_.phone}</p></div>
                                        </div>
                                    
                                        <div className="input">
                                            <div className="label"><p>Email</p></div>
                                            <div className="input_input"><p>{ address_ && address_.email}</p> </div>
                                        </div>

                                        <div className="input">
                                            <div className="label">
                                                <p>{owner.isPP == "true" ? "Carte d'electeur" : "Email"}</p>
                                            </div>
                                            <div className="input_input"> 
                                                <p> {owner.isPP == "true"  ? owner.id_no : owner.email}</p>
                                            </div>
                                        </div>

                                        <div className="input">
                                            <div className="label">
                                                <p>{ owner.isPP == "true" ? "Permis de conduire" : "Siteweb" }</p>
                                            </div>
                                            <div className="input_input">
                                                <p>{ owner.isPP == "true" ? owner.id_driver : owner.website }</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                </div>
                            </div>
                        ) : null }

                        </div>
                        
                    </div>
                    {/* End Of Block Employe */}
                </form>
            </div>
        </div>
    )
}

export default View;