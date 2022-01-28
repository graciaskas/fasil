import React, { useState} from "react";
import { Link, Route, useHistory } from "react-router-dom";


import Webcam from "react-webcam";

//**-- Components */
import Loading from "components/base/components/Loading";
import Search from "components/base/components/Search";
import Table from "components/base/components/Table";

import { villes } from "../../../data/villes";
import { VilleContext } from "../../contexts/villes";
//**-- application data */
const Columns = ['No','Nom','Province','Maire','Status'];


const VillesList = ({ columns, data }) => { 

    const rows = data.length ? [...data] : [];
    
    const getRowData = function() { 
        const data = [];

        if(rows.length) { 
            rows.forEach( (record, i) => { 
                const row  = [];
                row.push([i + 1,record.id]);
                row.push(record.nom);
                row.push(record.province);
                row.push(record.maire);
                row.push(record.status);
                data.push(row)
            });
        }

        return data;
    };
    return(
        <div className="bodyContainer" id="bodyContainer">
            <div id="action_bar" style={{display:"none"}}></div>
            <div className="main-container bg-white" id="main_container">
                <Table 
                    columns={Columns}
                    rows={getRowData()}
                    viewOnly={true}
                    inputable={false}
                    colgroup={[]}
                    margin={true}
                />
            </div>
        </div>
    );
};



 const Quartier = (props) => { 

    const [ loading, setLoading ] = useState(false);
    const { location } = useHistory();

   
    return(
        <div className="page" id="page">
            {loading ? <Loading /> : <></>}

            <div className="headPage" id="AppHeaderPage">
                <div className="headPageTitle">
                    <h4>
                        <Link to="/motor/basiques/villes">
                            <span className="link">Villes</span>
                        </Link>
                    </h4>

                    {/* <Route path="/motor/basiques/villes" exact>
                        <Link to="/motor/basiques/villes/create">
                            <button className="btn bg-blue">Créer</button>
                        </Link>
                        <button className="btn bg-o">Importer</button>
                    </Route>

                    <Route path="/motor/basiques/villes/create" exact>
                        <button className="btn bg-blue">Sauvegarder</button>
                        <button className="btn bg-o">Annuler</button>
                    </Route> */}
                    
                </div>

                <Search 
                    data={[]}
                    searching={true}
                    viewType={"list"}
                    location={ location }
                    filters = { []} 
                    context={VilleContext}
                />
            </div>

            <Route path="/motor/basiques/villes" exact>
               <VillesList 
                    columns={Columns} 
                    data={ villes }
                />
            </Route>

            <Route path="/motor/basiques/villes/create" exact>
               {/* <villeList columns={Columns} /> */}
            </Route>

        </div>
    );
}

export default Quartier;