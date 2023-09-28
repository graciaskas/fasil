import React, { useState, useEffect, useContext} from "react";
import { Link, Route, useHistory, useLocation } from "react-router-dom";
import { parseUrl } from "query-string";
import { FaCogs } from "react-icons/fa"


import Search from "components/base/components/Search";
import Table from "components/base/components/Table";
import Create from "./views/user.create.view";
import Message from "components/base/components/Message";
import UserView from "./views/user.view.view";
import UpdateView from "./views/user.update.view";
import UsersList from "./views/users.list.view";

//**-- Contexts */
import { UserContext } from "./context/user.context";
import { AppContext } from "components/motor/context/app.context.js";
import { URI } from "components/motor/api/uri";




const Handler = ({ data }) => { 

    const {  search } = useLocation();
    const {  query } = parseUrl(search);
    const { message, setMessage } = useContext(AppContext);

    if(!data) return null
    let isViewType = query.viewType ? true : false;
    let viewType = 'grid';

    if(isViewType) viewType  = query.viewType; 
    
    
    if(viewType === "list") return (
        <>
            <Message message={message.message} type={message.type} handler={setMessage}/>
            <UsersList data={ data.data } /> 
        </>
    ) 
    else return(
        <>
            <Message message={message.message} type={message.type} handler={setMessage}/>
            <UserGrids data= { data.data } />
        </>
    )
}

const UserGrid = (props) => { 

    const { image, name,username,active,size,role, email,id } = props;
    const status = (status) => { 
        if(!status) return 'bg-warning';
        if(status) return 'bg-success';
        return 'inactive'
    };

    const img = image === "" ? "/src/male.png": image;

    return(
        <Link to={`/motor/parametres/utilisateurs/view/?q=${id}`} 
            className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12 col-12 box__link" >
            <div className="box__user" style={{height : "100px"}}>
                <div className="box__image user" style={{height : "100px",width :"80px"}}>
                    <img src={ img ? img : "/src/male.png" } alt="" />
                </div>
                <div className="box__description ml-2 user">
                    <h4 style={{fontSize:"16px"}}> {name}  </h4>
                    <p>Login : {username}</p>
                    <p>{email}</p>
                    <span className="status bg-secondary text-right">{role}</span>
                    <div className="absolute">
                        <span className={status(active)}></span>
                    </div>
                </div>
            </div>
        </Link>
    )
}



const UserGrids = ({ data }) => { 

    return(
         <div className="bodyContainer" id="bodyContainer">
            <div id="action_bar" style={{display:"none"}}></div>
            <div className="main-container bg-gray" id="main_container">

                <div className="row pr-3" >
                    {
                        data.map( (record, i) => {
                            return(
                                <UserGrid
                                    key={i}
                                    size={""}
                                    id={record._id}
                                    image={record.image}
                                    active={record.active}
                                    email={record.email}
                                    username={record.username}
                                    role={record.role}
                                    name={record.name}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};





 const Users = (props) => { 

    const history = useHistory();
    const { location } = useHistory();
    const { search } = location;
    const { query } = parseUrl(search);
    const id = query.q ? query.q : null; //Get the current ID

    //**-- MainApp context values */
    const { utilisateurs, setLoadUtilisateurs,setUtilisateurs,database, token } = useContext(AppContext);
    const { createUser, updateUser, deleteUser, archiveUser, handleSearch } = useContext(UserContext);
     

    const apiObject = {
        url: URI,
        pathname: "users",
        token,
        params: {
            database
        }
    };

    useEffect(() => { 
        setLoadUtilisateurs(true);
    },[]);

    return(
        <div className="page" id="page">
            <div className="headPage" id="AppHeaderPage">
                <div className="headPageTitle">
                    <h4>
                        <Link to="/motor/parametres/utilisateurs">
                            <span className="link">Utilisateurs</span>
                        </Link>
                    </h4>

                    <Route path="/motor/parametres/utilisateurs" exact>
                        <Link to="/motor/parametres/utilisateurs/create">
                            <button className="btn bg-blue">Créer</button>
                        </Link>
                    </Route>

                    <Route path="/motor/parametres/utilisateurs/create" exact>
                        <button 
                            className="btn bg-blue"
                            onClick={ createUser }>Sauvegarder</button>
                        <Link to="/motor/parametres/utilisateurs">
                            <button className="btn bg-o">Annuler</button>
                        </Link>
                    </Route>


                    <Route path="/motor/parametres/utilisateurs/update/" >
                        <button 
                            className="btn bg-blue"
                            onClick={ updateUser }>Sauvegarder</button>
                        <Link to="/motor/parametres/utilisateurs">
                            <button className="btn bg-o">Annuler</button>
                        </Link>
                    </Route>

                    <Route path="/motor/parametres/utilisateurs/view" exact>
                        <Link to={`/motor/parametres/utilisateurs/update/?q=${id}`}>
                            <button className="btn bg-blue">Modifier</button>
                        </Link>
                        <Link to="/motor/parametres/utilisateurs">
                            <button className="btn bg-o">Annuler</button>
                        </Link>
                    </Route>
                </div>

                {/* Action button  */}
                <Route path="/motor/parametres/utilisateurs/view" exact>
                    <div className="navbar mt-4 mr-3">
                        <div className="dropdown show">
                            <button  className="bg-blue d-flex text-white" id="filters" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2"><FaCogs /></span>
                            <span> Action</span>
                            </button>
                            <div className="dropdown-menu" aria-labelledby="filters">
                                <Link  to={`/motor/parametres/utilisateurs/create/?q=${id}`}className="dropdown-item">Duplicate</Link>
                                <a className="dropdown-item" onClick={deleteUser}>Delete</a>
                                <a className="dropdown-item">Achive</a>
                            </div>
                        </div>
                    </div>
                </Route>

                {/* Search bar */}
                <Route path="/motor/parametres/utilisateurs" exact>
                    {
                        //Verify if data is available
                        utilisateurs != null ? (
                            <Search
                                data={utilisateurs}
                                searching={true}
                                viewType="both"
                                location={location}
                                context={UserContext}
                                filters={[]}
                                updateState={setUtilisateurs}
                                api={apiObject}
                            />
                        ) : null
                    }
                </Route>
            </div>
            {/* End header page */}

            <Route path="/motor/parametres/utilisateurs" exact>
                <Handler data={ utilisateurs} />
            </Route>

            <Route path="/motor/parametres/utilisateurs/view" exact>
                <UserView />
            </Route>
            <Route path="/motor/parametres/utilisateurs/update" >
                <UpdateView id={id}/>
            </Route>

            <Route path="/motor/parametres/utilisateurs/create" exact>
               <Create create={ createUser }/>
            </Route>

        </div>
    );
}

export default Users;