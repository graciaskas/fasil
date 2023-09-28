import React from "react";
//**-- Componets */
import Table from "components/base/components/Table";
import Message from "components/base/components/Message";
import { useContext } from "react/cjs/react.development";
import { AppContext } from "components/motor/context/app.context";

//**-- Data */
const DefaultColumns  = ["No",'Nom','Province','Président','Email','Ville','Contact','Motards'];

const CooperativesList = ({ data }) => { 

    const rows = data.length ? [...data] : [];
    const getRowData = function() { 
        const data = [];
        if(rows.length) { 
            rows.forEach( (record, i) => { 
                const row  = [];
                row.push([i + 1, record._id]);
                row.push(record.name);
                row.push(record.address.province);
                row.push(record.president);
                row.push(record.email);
                row.push(record.address.ville);
                row.push(record.contact);
                row.push(0);
                data.push(row)
            });
        }
        return data;
    };


   const rowsDataElem = getRowData();
    console.log(rowsDataElem);
    return(
        <div className="bodyContainer" id="bodyContainer">
            <div id="action_bar" style={{display:"none"}}></div>
            <div className="main_container_white" id="main_container">
                <Table 
                    columns={DefaultColumns}
                    rows={rowsDataElem}
                    inputable={false}
                    viewOnly={true}
                    colgroup={[]}
                    margin={true}
                />
            </div>
        </div>
        
    )
}

export default CooperativesList