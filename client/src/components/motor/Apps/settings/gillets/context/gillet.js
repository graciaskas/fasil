import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { resetModel } from "components/base/functions/resetModel";


import Model from "../models/gillet";

import { URI } from "components/motor/api/uri";
import { AppContext } from "components/motor/context/app.context";


export const GilletContext = React.createContext();

const Provider = ({ children }) => { 

   const history = useHistory();

   //App Context values
   const { 
      database,
      token,
      setLoading,
      message, setMessage,
      //**-----  Gillets
      gillets,
      setLoadGillets,
      getGillets,
      setGillets
   } = useContext(AppContext);

   //Search input handler
	const handleSearch = (e) => {
		const search = e.target.value.toString().toLowerCase();
		const found = gillets.filter((element) => {
         const num = element.num.toString().toLowerCase();
         const association = element.association.toString().toLowerCase();
         const motard = element.motard.toString().toLowerCase();
         return num.includes(search) || association.includes(search) || motard.includes(search)
      });
		if (found.length == 0 || search == null || search == '') return getGillets();
		setGillets(found);
	};

   const createGillet = async () => {
      try {
         setLoading(true); 
         fetch(URI + "/gillets", {
            method: "POST", headers: {
               "Content-Type": "application/json",
               "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ Model, database })
         })
            .then(res => {
               setLoading(false)
               return res.json();
            }).then(data => {
               setMessage({ message: data.message, type: data.type });
               if (data.data) {
                  setGillets(data);
                  resetModel(Model);
                  setTimeout(() => history.push("/motor/parametres/gillets"), 200)
               }
            })
            .catch(e => console.log(e));
      } catch (error) {
         setMessage({ message: error.message, type: 'danger' });
      }
   };


   const values = {
		handleSearch,
      createGillet
	};

   useEffect(() => { 
      setLoadGillets(true);
   },[]);


   return(
   <GilletContext.Provider value={ values }>
      {children}
   </GilletContext.Provider>)
};


export default Provider;