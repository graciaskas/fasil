import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaUpload, FaTrash } from 'react-icons/fa';
import { getBas64 } from 'components/base/functions/all';
import { URI } from 'components/base/auth/access.token';


import Select from 'components/base/components/Select';
import Message from 'components/base/components/Message';

import { setName, setUsername, setRole, setPassword, setEmail, setTitle, setImage, setActive } from '../handlers/create.handler';


import { AppContext } from 'components/motor/context/app.context';
import { UserContext } from '../context/user.context';
import userModel from '../models/user.model';
import { parseUrl } from 'query-string';
import { useHistory } from 'react-router-dom';

const access = [
   { name : "user", value:"user"},
   { name : "admininstrator", value:"admin"},
];

//Titles
const titles_ = [
   { name: "Président d'association", value: "PA",  access: "admin"},
   { name: "Autorité morale", value: "AM", access: "admin"},
   { name: "Administrateur simple", value: "AS", access: "admin"},
   { name: "Controlleur", value: "CLR", access: "user"},
   { name: "Encodeur", value: "ECR", access: "user"},
];

const actif = [
   { name : "Oui", value: true },
   { name : "Non", value: false },
];

function Update() {

   const { location } = useHistory();
   const { search } = location;
   const { query } = parseUrl(search);
   const id = query.q ? query.q : null; //Get the current ID

   const { message, setMessage, database } = useContext(AppContext);
   const [ titles, setTitles ] = useState(titles_);
   const { getUser } = useContext(UserContext);
   const [ user, setUser ] = useState([]);
      //Get user properties
   const { image, name, title, role, username, email,active, password } = user;

   const inputFile = useRef(null);
   const [ imageSelected, setImageSelected ] = useState(null);
   const [ imageUploaded, setImageUploaded ] = useState(null);

   //Click input file hidden to unhidde it
   const showUpload = () => (inputFile.current) ? inputFile.current.click(): null;

   //handle input file from user upload
   const setFileImage = async (e) => { 
      try {
         const file = e.target.files[0];
         const base64 = await getBas64(file);
         setTimeout(() => { 
            setImageSelected(base64);
            setImageUploaded(base64);
            setImage(base64);
         },10);
      } catch (error) {
         
      }
     
   };

   const removeImage = () => { 
      setImageSelected(null);
      setImage("");
   }

   //Bind user model with user's data
   const setUserModel = () => {
      userModel.name = name;
      userModel.role = role;
      userModel.username = username;
      userModel.title = title && title.name;
      userModel.active = active;
      userModel.email = email
      userModel.database = database
   };

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

   useEffect(()=> { 
      getUser(setUser, id);
   },[])

   useEffect(() => { 
      setUserModel(); //bind user bind with user's data
      setImageSelected(image);
      setTitles(fileterTitles(userModel.role)); //Filter titles according to role selected
   },[user]);

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
                                 <img src={ imageSelected ? imageSelected : imageUploaded}/>
                                 <div className="e-uploader">
                                    <span onClick={showUpload}> <FaUpload /></span>
                                    <span onClick={removeImage}><FaTrash /></span>
                                    <input hidden  type="file" id="input-file"  name="image" name="user" ref={inputFile} onChange={setFileImage} />
                                 </div>
                              </div>
                              <div className="employeeDesc">
                                 <h3> Nom complet</h3>
                                 <input type="text" placeholder="Ex: Gracias Kasongo" className="required" defaultValue={name} onChange={setName} />
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
                                             <input type="text" maxLength="15" defaultValue={username} onChange={setUsername} className="required"/> 
                                          </div>
                                          </div>
                                          <div className="input">
                                            <div className="label"><p>Niveau d'accèss</p></div>
                                            <div className="input_input">
                                                <Select data={access} onChange={handleAccess}  defaultValue={role} className="required" item="name"/>
                                            </div>
                                          </div>
                                          <div className="input">
                                             <div className="label"><p>Titre</p></div>
                                             <div className="input_input">
                                               <Select onChange={setTitle} className="required" item="name" data={titles} defaultValue={ title && title.name }/>
                                             </div>
                                          </div>
                                          <div className="input">
                                             <div className="label"><p>Email</p></div>
                                             <div className="input_input">
                                                <input type="email" onChange={setEmail} defaultValue={email}/>
                                             </div>
                                          </div>
                                       </div>
                                    </div>

                                    <div className="DataBox">
                                       <div className="DataBoxInputs">
                                          <div className="input">
                                             <div className="label"><p>Actif ?</p></div>
                                             <div className="input_input">
                                                   <Select data={actif} onChange={setActive} defaultValue={active} className="required" />
                                             </div>
                                          </div>
                                          <div className="input">
                                             <div className="label"><p>Mot de passe </p></div>
                                             <div className="input_input">
                                                <input  type="password"  onChange={setPassword} className="required"/> 
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
export default Update;