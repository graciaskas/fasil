import React from "react";

export const ProvinceContext = React.createContext();

const Provider = ({ children }) => { 
      //Search input handler
	const handleSearch = (e) => {
		// const search = e.target.value.toString();
		// const found = utilisateurs.filter((element) => element.username.toLowerCase().includes(search));
		// if (found.length == 0 || search == null || search == '') return getUtilisateurs();
		// setUtilisateurs(found);
	};

   return(<ProvinceContext.Provider value={{ handleSearch}}>
      { children }
   </ProvinceContext.Provider>)
}

export default Provider;