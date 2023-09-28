import React, { useState, useContext, useRef } from "react"

const SearchFilter = ({ data, value, display, context }) => {


    const { handleSearch } = useContext(context);
    const [style, setStyle] = useState(display);
    const dropDown = useRef(null)
    /**
     *This function is used to search according to filter selected 
     * @param {*} filter Filter
     * @param {*} value  Search
     * @returns search handler function from context
     */
    const setSearch = ( filter, value ) => { 
        handleSearch(filter, value);
    };

    return(
        <React.Fragment>
            <div className="user-search" style={{display : display }} ref={dropDown}>
                <ul>
                    {
                        data.map( (filter,i) => (
                            <li key={i} onClick={() => {
                                dropDown.current.style.display = "none";
                                setSearch(filter.value, value)
                            }}> 
                                Rechercher {value} dans {filter.name}
                            </li> 
                        ))
                    }
                </ul>
            </div>
        </React.Fragment>
    );
};

export default SearchFilter;