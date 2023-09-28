import React, { useState, useRef } from "react"
import {Link} from "react-router-dom"

import {  RiSearch2Fill, RiTableFill } from "react-icons/ri";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useContext } from "react/cjs/react.development";


const SearchFilters = ({ data, context }) => {
    
    const { location } = useHistory();
    const { search } = location;
    const { handleGroupBy } = useContext(context);

    return(
        <React.Fragment>
            <div className="col-7">
                <div className="filter">
                    {
                        data.length ? (
                            <div className="navbar">
                                <div className="dropdown show">
                                    <button  className="bg-o d-flex" id="filters" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <span> <RiSearch2Fill />  </span>
                                        <small>Filtres</small>
                                    </button>
                                
                                    <div className="dropdown-menu" aria-labelledby="filters">
                                        {
                                            data.map( (filter ,i) => ( 
                                                <li style={{ cursor: "pointer"}}  className="dropdown-item" key={i}>
                                                    {filter.name}
                                                </li>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="dropdown show">
                                    <button className="bg-o d-flex" id="groupers" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <span><RiTableFill /></span>
                                        <small>Regrouper par</small>
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="groupers">
                                        {
                                            data.map( (filter ,i) => ( 
                                                <li style={{ cursor: "pointer" }} className="dropdown-item" key={i} onClick={(e) => {
                                                    // return handleGroupBy(filter.value);
                                                }}>
                                                    { filter.name }
                                                </li>
                                            ))
                                        }
                                    </div>
                                </div>  
                            </div> ) : null 
                        }
                
                    </div>
                </div>
            </React.Fragment>
        );
    return null;
}

export default SearchFilters