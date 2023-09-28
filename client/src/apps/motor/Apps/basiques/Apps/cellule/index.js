import React, { useState} from "react";
import { Link, Route, useHistory } from "react-router-dom";

//**-- Components */
import Loading from "components/base/components/Loading";
import Search from "components/base/components/Search";
import Table from "components/base/components/Table";

import { quartiers } from "../../../data/quartiers";
//**-- application data */
const Columns = ['No','Nom','Code','Chef Lieu','Status'];


const QuartiersList = ({ columns, data }) => { 

    const rows = data.length ? [...data] : [];
    
    const getRowData = function() { 
        const data = [];

        if(rows.length) { 
            rows.forEach( (record, i) => { 
                const row  = [];
                row.push([i + 1,record.id]);
                row.push(record.nom);
                row.push(record.code);
                row.push(record.cheflieu);
                row.push(record.status);
                data.push(row)
            });
        }

        return data;
    };
    return(
        <div className="bodyContainer" id="bodyContainer">
            <div id="action_bar" style={{display:"none"}}></div>
            <div className="main_container_white" id="main_container">
                <Table 
                    columns={Columns}
                    rows={getRowData()}
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
                        <Link to="/motor/basiques/quartiers">
                            <span className="link">Quartiers</span>
                        </Link>
                    </h4>

                    <Route path="/motor/basiques/quartiers" exact>
                        <Link to="/motor/basiques/quartiers/create">
                            <button className="btn bg-blue">Créer</button>
                        </Link>
                        <button className="btn bg-o">Importer</button>
                    </Route>

                    <Route path="/motor/basiques/quartiers/create" exact>
                        <button className="btn bg-blue">Sauvegarder</button>
                        <button className="btn bg-o">Annuler</button>
                    </Route>
                    
                </div>

                <Search 
                    data={[]}
                    searching={true}
                    location={ location }
                    filters = { ['population']} 
                />
            </div>

            <Route path="/motor/basiques/quartiers" exact>
               <quartiersList columns={Columns} data={ quartiers }/>
            </Route>

            <Route path="/motor/basiques/quartiers/create" exact>
               {/* <quartiersList columns={Columns} /> */}
            </Route>

        </div>
    );
}

export default Quartier;