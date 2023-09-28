import React from "react";

export const VilleContext = React.createContext();

const Provider = ({ children }) => { 
      //Search input handler
	const handleSearch = (e) => {
		// const search = e.target.value.toString();
		// const found = utilisateurs.filter((element) => element.username.toLowerCase().includes(search));
		// if (found.length == 0 || search == null || search == '') return getUtilisateurs();
		// setUtilisateurs(found);
	};

   return(<VilleContext.Provider value={{ handleSearch}}>
      { children }
   </VilleContext.Provider>)
}

export default Provider;