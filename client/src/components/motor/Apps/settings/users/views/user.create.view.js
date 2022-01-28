import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaUpload, FaTrash } from 'react-icons/fa';
import { getBas64 } from 'components/base/functions/all';

import { setName, setUsername, setRole ,setPassword,setEmail,setTitle, setImage,setActive } from '../handlers/create.handler';
import Message from 'components/base/components/Message';
import Select from 'components/base/components/Select';

import { AppContext } from 'components/motor/context/app.context';

const access = [{ name: "Utilisateur", value: "user"},{ name: "Administrateur", value:"admin"}];
const actif = [{ name: "Oui", value: true },{ name: "Non", value: false }];

//Titles
const titles_ = [
   { name: "Président d'association", value: "PA",  access: "admin"},
   { name: "Autorité morale", value: "AM", access: "admin"},
   { name: "Administrateur simple", value: "AS", access: "admin"},
   { name: "Controlleur", value: "CLR", access: "user"},
   { name: "Encodeur", value: "ECR", access: "user"},
];



function Create() {

   const inputFile = useRef(null);
   const { message, setMessage } = useContext(AppContext);
   const [ imageSelected, setImageSelected ] = useState(null);
   const [ titles, setTitles ] = useState(titles_);

   //Click input file hidden to unhidde it
   const showUpload = () => (inputFile.current) ? inputFile.current.click(): null;

   //handle input file from user upload
   const setFileImage = async (e) => { 
      const file = e.target.files[0];
      const base64 = await getBas64(file);
      setImage(base64);
      setImageSelected(base64);
   }

   //Filter titles by access
   const fileterTitles = (stateAccess) => { 
      const filetered = titles_.filter( title => title.access == stateAccess);
      return filetered;
   };

   //Role handler
   const handleAccess = ({ value }) => { 
      setTitles(fileterTitles(value)); //Filter titles according to role selected
      setRole(value); // Set Role;
   };

   const removeImage = () => setImageSelected(null);

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
                                    <img src={ imageSelected }/>
                                    <div className="e-uploader">
                                       <span onClick={showUpload}> <FaUpload /></span>
                                       <span className="fa fa-trash"><FaTrash /></span>
                                       <input hidden type="file" id="input-file" name="image" ref={inputFile} onChange={setFileImage}  />
                                    </div>
                                 </div>
                                 <div className="employeeDesc">
                                    <h3> Nom complet</h3>
                                    <input type="text"  placeholder="Ex: Gracias Kasongo" className="required"onChange={ setName }  />
                                 </div>
                           </div>
                        </div>


                           <div className="pageSingleLinksData">
                              <div className="singleBlock">
                                 <div className="DataBox">
                                    <div className="DataBoxInputs">
                                        <div className="input">
                                          <div className="label"><p>Login</p></div>
                                          <div className="input_input">
                                             <input type="text" maxLength="15" onChange={setUsername} className="required"/>   
                                          </div>
                                          </div>

                                          <div className="input">
                                            <div className="label"><p>Niveau d'accèss</p></div>
                                            <div className="input_input">
                                                <Select
                                                   data={ access } 
                                                   onChange={ handleAccess }
                                                   className="required"
                                                />
                                            </div>
                                          </div>
                                          <div className="input">
                                             <div className="label"><p>Titre</p></div>
                                             <div className="input_input">
                                               <Select onChange={setTitle} className="required" item="name" data={titles}/>
                                             </div>
                                          </div>
                                         
                                       <div className="input">
                                          <div className="label"><p>Email</p></div>
                                          <div className="input_input">
                                             <input type="email" onChange={setEmail}/>
                                          </div>
                                       </div>
                                    </div>
                                </div>

                                <div className="DataBox">
                                    
                                    <div className="DataBoxInputs">
                                        <div className="input">
                                            <div className="label"><p>Actif ?</p></div>
                                            <div className="input_input">
                                                <Select  data={actif}  onChange={setActive} className="required" defaultValue="Oui" />
                                            </div>
                                        </div>
                                        <div className="input">
                                            <div className="label"><p>Mot de passe </p></div>
                                            <div className="input_input">
                                               <input type="password" onChange={ setPassword } className="required"/>
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
}
export default Create;