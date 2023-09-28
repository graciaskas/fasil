import React from "react";
//**-- Componets */
import Table from "components/base/components/Table";

//**-- Data */
const DefaultColumns  = [
    'No',
    'Marque',
    'Model',
    'Moteur',
    'Chassis',
    'Plaque',
    'Couleur',
    'Etat'
];

const VehiculesList = ({ data }) => { 

    const rows = data.length ? [...data] : [];
    
    const getRowData = function() { 
        const data = [];

        if(rows.length) { 
            rows.forEach( (record, i) => { 
                const row  = [];
                row.push([i + 1,record._id]);
                row.push(record.marque);
                row.push(record.model);
                row.push(record.moteur);
                row.push(record.chassis);
                row.push(record.plaque);
                row.push(record.couleur);
                row.push(record.state);
                data.push(row)
            });
           
        }

        return data;
    };

   const rowsDataElem = getRowData();

    return(
        <Table 
            columns={DefaultColumns}
            rows={rowsDataElem}
            inputable={false}
            colgroup={[]}
            margin={true}
        />
    )
}

export default VehiculesList