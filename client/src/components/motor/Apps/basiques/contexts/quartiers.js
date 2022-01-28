import React from "react";

export const QuartierContext = React.createContext();

const Provider = ({ children }) => { 
      //Search input handler
	const handleSearch = (e) => {
		// const search = e.target.value.toString();
		// const found = utilisateurs.filter((element) => element.username.toLowerCase().includes(search));
		// if (found.length == 0 || search == null || search == '') return getUtilisateurs();
		// setUtilisateurs(found);
	};

   return(<QuartierContext.Provider value={{ handleSearch}}>
      { children }
   </QuartierContext.Provider>)
}

export default Provider;