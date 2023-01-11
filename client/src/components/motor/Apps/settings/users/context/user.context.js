import React, { useContext, useState } from "react";
import { useHistory } from "react-router";


import Model from "../models/user.model";

import { AppContext } from "components/motor/context/app.context";

import { URI } from "components/motor/api/uri";
import { useEffect } from "react/cjs/react.development";
import { parseUrl } from "query-string";
import axios from "axios";

export const UserContext = React.createContext();

const Provider = ({ children }) => { 

   const history = useHistory();
   const { location } = useHistory();
   const { search } = location;
   const { query } = parseUrl(search);
   const id = query.q ? query.q : null; //Get the current ID

   const [ user, setUser ] = useState([]);
   const [ loadUser, setLoadUser ] = useState(false);
   const [ changeId, setChangeId] = useState(false);

   const { database, bearer, setMessage, utilisateurs, 
      setUtilisateurs, getUtilisateurs, setLoading } = useContext(AppContext);

   const getUser = async (setter, id) => { 
      try {
         setLoading(true)
         const { data } = await axios(URI + "/users/" + id + "/?database=" + database, {
            method: "GET",
            headers: { "Authorization": bearer }
         });
         setUser(data);
         if( setter ) setter(data)
         setLoading(false)
      } catch (error) {
         console.error(error);  
      }
   };

   const updateUser = async () => { 
      try {
         Model.database = database;
         const request = await fetch(URI+"/users/"+id,{method : "PUT", headers : { "Content-Type":"application/json","Authorization": bearer },
            body : JSON.stringify({ database, Model })
         });
         const response = await request.json();
         console.log(response);
         const { message, type } = response;
         setMessage({ message, type});
         if(type === "success") { 
            getUtilisateurs();
            return history.push("/motor/parametres/utilisateurs/view/?q="+id);
         }
      } catch (error) {  setMessage({ message : "Error :"+error, type : "danger"})}
   }

   const createUser = async () => { 
      try {
         Model.database = database;
         const request = await fetch(URI+"/users/", { 
            method: "POST", 
            headers: { 
               "Content-Type": "application/json", 
               "Authorization": bearer
            },
            body : JSON.stringify({ database, Model })
         });
         const response = await request.json();
         const { message, type } = response;
         setMessage({ message, type});
         if(type === "success") { 
            getUtilisateurs();
            return history.push("/motor/parametres/utilisateurs");
         }
      } catch (error) {  setMessage({ message : "Error :"+error, type : "danger"})}
   };

   const deleteUser = async () => { 
      try {
         const headers = new Headers();
         headers.append('Authorization', bearer);
         headers.append('database', database);
         const request = await fetch(URI+"/users/"+id, { 
            method: "DELETE", 
            headers
         });
         const response = await request.json();
         const { message, type } = response;
         setMessage({ message, type});
         if(type === "success") { 
            getUtilisateurs(); //load users
            return history.push("/motor/parametres/utilisateurs"); //locate to users's page
         }
      } catch (error) {  setMessage({ message : "Error :"+error, type : "danger"})}
   };

   const archiveUser = () => { 
      console.log(id);
   }

   //Search input handler
	const handleSearch = (e) => {
		const search = e.target.value.toString();
		const found = utilisateurs.filter((element) => element.username.toLowerCase().includes(search));
		if (found.length == 0 || search == null || search == '') return getUtilisateurs();
		setUtilisateurs(found);
	};

   const values = { 
      createUser, updateUser, deleteUser, archiveUser, getUser,
      handleSearch,
      user, loadUser, setLoadUser,setChangeId
   };

   useEffect(() => { 
      if(loadUser) { 
         getUser();
         setLoadUser(false);
      };
   },[loadUser]);

   
   return(
      <UserContext.Provider value={ values }>
         { children }
      </UserContext.Provider>
   );
};

export default Provider;