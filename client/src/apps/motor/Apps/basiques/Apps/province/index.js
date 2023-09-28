import React, { useContext, useMemo, useState} from "react";
import { Link, Route, useHistory } from "react-router-dom";

//**-- Components */
import Search from "components/base/components/Search";
import Message from "components/base/components/Message";


import { provinces } from "../../../data/provinces";
import { ProvinceContext } from "./contexts/province";

import Create from "./views/province.create.view";
import ProvincesList from "./views/province.list.view";
import ProvinceGrids from "./views/province.grids.view";
import { AppContext } from "components/motor/context/app.context";
import { parseUrl } from "query-string";

//**-- application data */
const Columns = ['No','Nom','Code','Chef Lieu', 'Gouverneur'];


const ViewSelector = ({ data, viewType }) => { 
    if(viewType == "list") return  <ProvincesList columns={Columns} data={ data }/>;
    if(viewType =="grid") return <ProvinceGrids data={data}/>
    return  <ProvinceGrids  data={ data }/>
};

 const Province = (props) => { 


    const { message, setMessage } = useContext(AppContext);
    const { location } = useHistory();
    const { search } = location;
    const { query } = parseUrl(search);
    const { viewType } = query;

    const viewMemo = useMemo( () => viewType, [viewType]);

    return(
        <div className="page" id="page">

            <div className="headPage" id="AppHeaderPage">
                <div className="headPageTitle">
                    <h4>
                        <Link to="/motor/basiques/provinces">
                            <span className="link"> Provinces </span>
                        </Link>
                    </h4>

                    <Route path="/motor/basiques/provinces" exact>
                        <Link to="/motor/basiques/provinces/create">
                            <button className="btn bg-blue">Créer</button>
                        </Link>
                    </Route>

                    <Route path="/motor/basiques/provinces/create" exact>
                        <button className="btn bg-blue">Sauvegarder</button>
                        <Link to="/motor/basiques/provinces/">
                            <button className="btn bg-o">Annuler</button>
                        </Link>
                    </Route>
                    
                </div>

                <Route path="/motor/basiques/provinces" exact>
                    <Search 
                        data={provinces}
                        searching={true}
                        viewType="both"
                        location={ location }
                        filters = { []} 
                        context={ProvinceContext}
                    />
                </Route>
                
            </div>

            <Route path="/motor/basiques/provinces" exact>
                <div className="bodyContainer" id="bodyContainer" >
                    <div id="action_bar" style={{ display: "none" }}></div>
                    <div className="main-container bg-gray" id="main_container" >
                        <Message message={message.message} type={message.type} handler={setMessage}/>
                        <ViewSelector data={provinces} viewType={viewMemo} />
                    </div>
                </div>
            </Route>

            <Route path="/motor/basiques/provinces/create" exact>
                <Create />
            </Route>

        </div>
    );
}

export default Province;