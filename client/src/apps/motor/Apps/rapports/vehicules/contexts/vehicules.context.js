import React, { useContext, useEffect } from "react";
import { AppContext } from "components/motor/context/app.context";
import { URI } from "components/motor/api/uri";
import { useState } from "react/cjs/react.development";

export const VehiculeContext = React.createContext();

export default function Provider ({ children }) { 

   const {  getEngines, message, setMessage } = useContext(AppContext);
   const { database, bearer } = useContext(AppContext);
   const [ engines, setEngines ] = useState([]);


   const handleGroupBy = async( filter ) => { 
      try {
         const search = value.toString().toLowerCase();
				const response = await fetch(`${URI}/engines/?groupBy=${filter}&database=${database}`, {  
               method : "GET", 
               headers: { "Authorization": bearer }
				});
				const json = await response.json();	
            console.log(json);
            return
				if (search == null || search == '') return getEngines(setEngines);
				//return setDrivers(found);
				return setEngines(json.data)
      } catch (error) {
         console.error(error)
      }
   };
  
   //Search input handler
	const handleSearch = async (filter, value) => {
		try {
			if(filter) { 
				const search = value.toString().toLowerCase();
				const response = await fetch(`${URI}/engines/?q=${value}&field=${filter}&database=${database}`, {  
               method : "GET", 
               headers: { "Authorization": bearer }
				});
				const json = await response.json();	
				if (search == null || search == '') return getEngines(setEngines);
				//return setDrivers(found);
				return setEngines(json.data)
			}
		} catch (error) {
			console.error(error);	
		}
	};

   const value = { 
      handleSearch,handleGroupBy,
      engines,
      setEngines
   };

   useEffect(() => { 
      console.log(engines);
      getEngines(setEngines);
   },[]);

   return(<VehiculeContext.Provider value={ value }>
      { children }
   </VehiculeContext.Provider>)
};