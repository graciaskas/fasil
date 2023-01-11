import React, { useState, useEffect, useContext} from "react";
import { Link, Route, useHistory, useLocation } from "react-router-dom";
import { parseUrl } from "query-string";


import GilletsGrids from "./views/gillet.grids.view.js";
import GilletsList from "./views/gillet.list.view.js";

//**-- Components */
import Search from "components/base/components/Search";
import Create from "./views/create.view.js"

//**-- Contexts */
import { GilletContext } from "./context/gillet.js";
import { AppContext } from "components/motor/context/app.context.js";


import { URI } from "components/motor/api/uri";
//**-- application data */
const Columns = [
    'Id',
    'Code',
    'Image',
    'Assigné à',
    'Province',
    'Commune',
    'Association',
    'Etat'
 ];
 



const GilletsListGrids = ({ data }) => { 

    const {  search } = useLocation();
    const { url, query } = parseUrl(search);
    
    let isViewType = query.viewType ? true : false;
    let viewType = 'grid';

    if(isViewType) viewType  = query.viewType; 
    
    
    if(viewType === "list") return <GilletsList data={ data }  columns={Columns} /> 
        
    return <GilletsGrids data= { data } />
}



 const Gillets = (props) => { 

    const history = useHistory();
    const { location } = useHistory();
     const { token, database } = useContext(AppContext);


    //**-- MainApp context values */
    const {
        gillets,
        setGillets,
        setLoadGillets,
        associations
     } = useContext(AppContext);
     

    //Create gillets handler from the app context;
    const { createGillet } = useContext(GilletContext);
     
    const apiObject = {
        url: URI,
        pathname: "gillets",
        token,
        params: {
            database,
        }
    };

    

    useEffect(() => { 
        setLoadGillets(true);
    }, []);

     
    if (!gillets) return null;
     


    return(
        <div className="page" id="page">
            <div className="headPage" id="AppHeaderPage">
                <div className="headPageTitle">
                    <h4>
                        <Link to="/motor/parametres/gillets">
                            <span className="link">Gillets</span>
                        </Link>
                    </h4>

                    <Route path="/motor/parametres/gillets" exact>
                        <Link to="/motor/parametres/gillets/create">
                            <button className="btn bg-blue">Créer</button>
                        </Link>
                    </Route>

                    <Route path="/motor/parametres/gillets/create" exact>
                        <button 
                            className="btn bg-blue"
                            onClick={ () => createGillet() }>Sauvegarder</button>
                        <Link to="/motor/parametres/gillets">
                            <button className="btn bg-o">Annuler</button>
                        </Link>
                    </Route>
                    
                </div>

                <Search 
                    data={gillets}
                    searching={true}
                    viewType="both"
                    location={ location }
                    context={GilletContext}
                    filters={[]}
                    api={apiObject}
                    updateState={setGillets}
                />
            </div>

            <Route path="/motor/parametres/gillets" exact>
                <GilletsListGrids data={gillets.data}/>
            </Route>

            <Route path="/motor/parametres/gillets/create" exact>
               <Create create={ createGillet } associations={ associations } />
            </Route>

        </div>
    );
}

export default Gillets;