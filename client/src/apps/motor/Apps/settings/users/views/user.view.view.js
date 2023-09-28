
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { parseUrl } from "query-string";
import { AppContext } from "components/motor/context/app.context";
import Message from "components/base/components/Message";
import { UserContext } from "../context/user.context";

const View = (props) => { 

   const { message, setMessage,  } = useContext(AppContext);
   const { getUser,setUserId } = useContext(UserContext);
   const [ user, setUser ] = useState([]);

   const { location } = useHistory();
   const { search } = location;
   const { query } = parseUrl(search);
   const id = query.q ? query.q : null; //Get the current ID

   useEffect(()=> { 
      getUser(setUser, id);
   }, []);
   

   if (!user) return;

   const { image, name, username, title, role } = user.data;


    return (
      <div className="bodyContainer" id="bodyContainer" >
         <div id="action_bar" style={{ display: "none" }}></div>
         <div className="main-container bg-sheet" id="main_container">
            <Message  message={message.message}   type={message.type}  handler={setMessage} /> 
            <form>
               <div id="loaded" className="pageSingle" >
                  <div className="page-container">
                     <div className="pageSingleHeader">
                        <div className="emp-d">
                           <div className="emp-i">
                              <img src={ image ? image : "/src/male.png" }/> 
                           </div>
                           <div className="employeeDesc">
                              <h3>{ name && name }</h3>
                           </div>
                         </div>
                      </div>


                     <div className="pageSingleLinksData">
                        <div className="singleBlock">
                           <div className="DataBox">
                              <div className="DataBoxInputs">
                                 <div className="input">
                                    <div className="label"><p>Login</p></div>
                                    <div className="input_input"><p>{username}</p></div>
                                 </div>
                                  
                                    <div className="input">
                                       <div className="label"><p>Niveau d'accèss</p></div>
                                       <div className="input_input">
                                          <p>{role}</p>
                                       </div>
                                     </div>
                                     <div className="input">
                                       <div className="label"><p>Titre</p></div>
                                       <div className="input_input"><p>{ title && title.name }</p> </div>
                                    </div>
                                     <div className="input">
                                       <div className="label"><p>Email</p></div>
                                       <div className="input_input">
                                          <p>{user.email && user.email}</p>
                                       </div>
                                     </div>
                                  </div>
                              </div>

                                 <div className="DataBox">
                                    <div className="DataBoxInputs">
                                       <div className="input">
                                          <div className="label"><p>Actif ?</p></div>
                                          <div className="input_input">
                                             <p>{user.active ? "Oui" : "Non"}</p>
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
  )
};

export default View;