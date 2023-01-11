import React, { useContext } from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import { SettingsContext } from 'components/settings/context/settings.context';
import Search from 'components/base/components/Search';
import Message from 'components/base/components/Message';
import { CoreContext } from 'components/base/Context';
import Create from "./views/company.create.view";
import { URI } from 'components/settings/api';
import { getUserInfo } from 'components/base/functions/all';
import companyModel from './models/company.model';



const Init = (props) => {

   const { location } = useHistory();
   const { message, setMessage } = useContext(CoreContext);
   const { database, token } = getUserInfo();

   const create = async () => { 
      try {
         const response = await fetch(`${URI}/company`,{
            method : "POST",
            headers : { 
               "Content-Type": "application/json",
               "Authorization":"Bearer "+token
            },
            body : JSON.stringify({ companyModel , database })
         });
         const json = await response.json();
         setMessage({ message : json.message, type: json.type });
      } catch (error) {
         setMessage({ message : ""+error, type: "danger" });
         console.error(error);
         console.log(message);
      }
   };

   return (
      <div>
         <div className="headPage" id="AppHeaderPage">
            <div className="headPageTitle">
               <h4>
                  <Link to="/settings/configuration/company">
                     <span className="link"> Société </span>
                  </Link>
               </h4>
                   
               { /** Buttons */}
               <div className="buttons " id="myButtons">

                  <Route path="/settings/configuration/company/create" exact>
                     <button className="bg-blue" onClick={create}>Sauvegarder </button> 
                     <Link to={'/settings/configuration/company/'}>
                        <button  className="bg-o">Annuler</button> 
                     </Link>
                  </Route>

                  <Route path="/settings/configuration/company" exact>
                     <Link to="/settings/configuration/company/create">
                        <button  className="bg-blue">Créer</button> 
                     </Link>
                  </Route>
               </div>
            </div>

            {/**-- Search & Filter Component   **/}
            <Route path="/settings/configuration/company/create" exact>
               <Search 
                  data= { [] }
                  location= { location } 
                  filters = {['parent','capacity','manager']}
                  searching = { false }
                  context={SettingsContext}
                  />
            </Route>
            <Route path="/settings/configuration/company" exact>
                  <Search 
                     data= { [] }
                     location= { location } 
                     filters = {['parent','capacity','manager']}
                     searching = { true }
                     context={SettingsContext}
                  />
            </Route>
         </div>


         <Route path="/settings/configuration/company/create" exact>
            <div className="bodyContainer" id="bodyContainer">
               <div id="action_bar" style={{display:"none"}}></div>
               <div className="main-container bg-gray">
                  <Message message={message.message} type={message.type} handler={setMessage}/>
                  <Create />
               </div>
            </div>
         </Route>
         

      </div>
   );
};

export default Init
