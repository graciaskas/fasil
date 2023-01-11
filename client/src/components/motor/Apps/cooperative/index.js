import React, { useContext } from "react";
import { Link, Route, useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { parseUrl } from "query-string";
import { FaCogs } from "react-icons/fa";

import Search from "components/base/components/Search";


//**-- App components */
import Create from "./views/cooperative.create.view";

import CooperativesList from "./views/cooperatives.list.view";
import CooperativeGrids from "./views/cooperative.grids.view";
import CoopertativeUpdate from "./views/cooperative.update.view";
import CooperativerView from "./views/cooperative.view";


import { CooperativeContext } from "./contexts";
import { AppContext } from "components/motor/context/app.context";
import { URI } from "../../api/uri";



const Handler = ({data}) => { 
    const {  search } = useLocation();
    const { url, query } = parseUrl(search);

    if (!data) return null;
    
    let isViewType = query.viewType ? true : false;
    let viewType = 'grid';

    if (isViewType)
        viewType = query.viewType; 
    
    if (viewType === "list")
        return <CooperativesList data={data.data} /> 
        
    return <CooperativeGrids data= { data.data } />
};

const Init = ({ app, name }) =>  {

    const {  createCooperative, deleteCooperative } = useContext(CooperativeContext);
    const {  search } = useLocation();
    const { query } = parseUrl(search);

    const id = query.q ? query.q : "";
    
    const { setLoadAssociations, associations, database, token } = useContext(AppContext)
    const history = useHistory();
    const { location } = history;
    
    const apiObject = {
        url: URI,
        pathname: "affiliations",
        token,
        params: {
            database
        }
    };

    useEffect(() => { 
        setLoadAssociations(true);
    },[ ]);
    
    
    return (
        <div className="page" id="page">
            
                <div className="headPage" id="AppHeaderPage">
                    <div className="headPageTitle">
                        <h4>
                            <Link to="/motor/cooperatives">
                                <span className="link">Associations</span>
                            </Link>
                        </h4>
                        <div className="buttons " id="myButtons">
                            <Route path="/motor/cooperatives/create" exact>
                                <button className="bg-blue" onClick={createCooperative}>
                                   Sauvegarder
                                </button> 
                            </Route>

                            <Route path="/motor/cooperatives" exact>
                                <Link to="/motor/cooperatives/create">
                                    <button  className="bg-blue">Créer</button> 
                                </Link>
                            </Route>

                            <Route path="/motor/cooperatives/view" exact>
                                <Link to={`/motor/cooperatives/update/?q=${id}`}>
                                    <button  className="bg-blue">Modifier</button> 
                                </Link>
                                <Link to="/motor/cooperatives" >
                                    <button  className="bg-o">Annuler</button> 
                                </Link>
                            </Route>

                            <Route path="/motor/cooperatives/update" exact>
                                <button  className="bg-blue">Sauvegarder</button> 
                                <Link to="/motor/cooperatives/">
                                    <button  className="bg-o">Annuler</button> 
                                </Link>
                            </Route>
                        </div>
                    </div>
                     {/* Action button  */}
                     <Route path="/motor/cooperatives/view" exact>
                        <div className="navbar mt-4 mr-3">
                            <div className="dropdown show">
                                <button  className="bg-blue d-flex text-white" id="filters" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                <span className="mr-2"><FaCogs /></span>
                                <span> Action</span>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="filters">
                                    <Link  to={`/motor/cooperatives/create/?q=${id}`}className="dropdown-item">Duplicate</Link>
                                    <a className="dropdown-item" onClick={() => deleteCooperative(id)}>Delete</a>
                                    <a className="dropdown-item">Achive</a>
                                </div>
                            </div>
                        </div>
                    </Route>

                    {/**-- Search & Filter Component   **/}
                    <Route path="/motor/cooperatives" exact>
                        {
                            associations != null ? (
                                <Search
                                    data={associations}
                                    viewType="both"
                                    location={location}
                                    filters={[]}
                                    context={CooperativeContext}
                                    searching={true}
                                    api={apiObject}
                                />
                            ):null
                        }
                    </Route>
                </div>{/** End HeadPage */}


                {   /***-- Application routes   ---**/ }
                    <Route path="/motor/cooperatives" exact>
                        <Handler data = {associations} />
                    </Route>

                    <Route path="/motor/cooperatives/create" exact>
                        <Create />
                    </Route>
                    <Route path="/motor/cooperatives/view" >
                        <CooperativerView id={ id }/>
                    </Route>
                    <Route path="/motor/cooperatives/update" >
                        <CoopertativeUpdate id={ id }/>
                    </Route>
                {   /***-- End Application routes   ---**/ }
        </div>
    );
}

export default Init;