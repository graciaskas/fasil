import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Colgroup = ({ colgroup }) => { 
    return(
        <colgroup>
            { colgroup.map((col, i) => (
                    <col key={i} width={`${col}%`} /> ))}
        </colgroup>
    )
};

const SpanCell = ({ value, className }) => { 
    return ( <span 
        className = { className }> { value } 
    </span>);
};
   

const TableCell = ({ tHeads, index, value, className }) => {
    let cellText =  ""
    if(typeof value === "object" && value != null) { 
        cellText = value[0]
    } else {
        cellText = value
    }
    const cellsImageNames = ['Image','image','Avatar','avatar','profile','Profile'];
    
    let class_ = null;
    //check status
    if(cellText == 'draft' || cellText == 'unassigned') class_ = "status bg-info";
    if(cellText == 'valid' || cellText == 'assigned') class_ = "status bg-success";

    if(tHeads[index] == "Etat")  return(
        <td key={index} className={className}>
            <SpanCell value={cellText} className={class_} />
        </td>
    );

    //For identification list
    if(tHeads[index] == "Type"){ 
        if(cellText == "Taxi") return  <td key={index} className={className}>
            <SpanCell value={cellText} className="status bg-secondary" />
        </td>

        if(cellText == "Privé") return  <td key={index} className={className}>
            <SpanCell value={cellText} className="status bg-success" />
        </td>

        if(cellText == "Entreprise") return  <td key={index} className={className}>
            <SpanCell value={cellText} className="status bg-primary" />
        </td>
    }

    if( cellsImageNames.includes(tHeads[index])) return ( 
        <td key={index} className={className}> 
            <img  src={ cellText } alt={ cellText }/>
        </td>
    );
    
    return <td key={index} className={className}> {cellText} </td>;
};

export const Table = (props) =>  {

    const { columns, colgroup, viewOnly, rows, inputable, margin, name, lineRefLink } = props;

    const history = useHistory();
    const { pathname, search } = history.location;

    const [ addLine, setAddLine ] = useState(false);
    const [ Inputable, setInputable ] = useState(inputable);


    const handleRowClick = (row) => {
        if(! row.length && ! typeof(row) == "object") return;

        const lineRefLinkId = row.filter( element => { 
            if( typeof(element) == "object" )  return element;
            return null;
        }); 

        if(lineRefLinkId) {
            const string = lineRefLinkId.toString();
            const stringId = string.slice((
                string.indexOf(",") + 1),
                string.length
            );
            if(viewOnly) return;
            history.push(`${pathname}/view/?q=${stringId}`)
        }
    };



    const classList = margin ? "table" : "table no-margin";


    const addLineFx = (e) => {
        e.preventDefault();
        const tableBody = document.getElementById("tableBody");
    };


    //**-- Set inputs if inputable table */
    return (
        <table className={classList}>
            <Colgroup colgroup={colgroup} />
            <thead>
                <tr>
                    { inputable ? <></> : (<th><input type="checkbox" /></th>) }
                    {
                        //List all columns in th element
                        columns.map((column, i) => {
                            if(i + 1 == columns.length)  return <th key={i} className='text-right'>{column}</th>
                            return  <th key={i}>{column}</th>
                        })
                    }       
                </tr>
            </thead>

            {/** Table Body */}
            <tbody id="tableBody">
                {
                    //loop trought table rows
                    !Inputable ? (
                        rows.map((row, i) => (
                            //Return table row ui element
                            <tr id="row" data-id={""} key={i} onClick={e => handleRowClick(row)}>
                                { inputable ? null : <td data-target ><input type="checkbox" /> </td> }

                                {
                                    //**-- render row table cells
                                    row.map((value, i) => {
                                        if(i + 1 == row.length) return( // if is last td align right
                                            <TableCell key={i} value={value}  index={i} tHeads = {columns} className="text-right"/>)
                                        return (
                                            <TableCell key={i} value={value}  index={i} tHeads = {columns} />
                                        )
                                    })
                                }

                            </tr>)
                        )
                    ) : <></>
                }

                {
                    //Is inputable table
                    inputable ? Inputable ? (
                        <>
                            <tr className="no-margin no-padding">
                                {
                                    columns.map((column, i) => {
                                        let nameNoSpaced = "";
                                        for (let i = 0; i < column.length; i++) {
                                            if (column[i] === " " || column[i] === "") continue;
                                            nameNoSpaced += column[i];
                                        }
                                        return (
                                            <td className="border" key={i}>
                                                <div className="table_input">
                                                    <input name={nameNoSpaced}   id={nameNoSpaced}  placeholder="Ecrivez ici..." />
                                                </div>
                                            </td>
                                        );
                                    })
                                }
                            </tr>
                            <tr>
                                <td>
                                    <button onClick={(e) => addLineFx(e)} type="button"className="btn bg-blue">
                                        Ajouter une ligne
                                    </button>
                                </td>
                            </tr>
                        </>
                    ) : <></> : <></>
                }

            </tbody>
        </table>
    );

}

export default Table;
