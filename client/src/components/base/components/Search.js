import React,{ useContext, useMemo, useState } from "react";
import Datalist from "./Datalist"

import Filters from "./Search.filters"
import SearchFilter from "./Search.result"
import Displayers from "./Search.displayers";
import { parseUrl } from "query-string";

import { RiCloseFill } from "react-icons/ri";
import { useHistory, useLocation } from "react-router";


 const Search = (props) => {

    const { filters, data, location, context, viewType, searching, updateState, api } = props;
    
    const { pathname, search } = location;
    const { handleSearch } = useContext(context);
    const [ searchValue, setSearchValue ] = useState(null);
    const [display, setDisplay] = useState("none");

    const handleSearch_ = value => {
        setDisplay("block");
        setSearchValue(value);
        if(value === "") { 
            setDisplay("none"); 
            return handleSearch(value);
        }  
    };

    const searchHandlerSelector = (e) => { 
        e.preventDefault();
        const value = e.target.value.trim();
        if(filters.length > 0) { 
            return handleSearch_(value)
        } else { 
            return handleSearch(e);
        }
    };
     
    const searchMemo = useMemo(() => searchValue, [searchValue]);
    const dataMemo = useMemo(() => data, [data]);

    if(searching) return (
        <div className="headPageSearch">
            <form>
                <div className="form">
                    {/* <div className="search">
                        <p>Odoo SA</p>
                        <span><RiCloseFill /></span>
                    </div> */}
                    <input placeholder="Search" onChange={ searchHandlerSelector } data-role="tagsinput"/>
                </div>
                <SearchFilter search={[]}  data={ filters } value={searchMemo} display={display} context={context}/>
            </form>
          
          
            <div className="filter-container">
                <div className="row">
                    <Filters data={filters} location={pathname} search={search} context={context} />
                    
                    <Displayers
                        data={dataMemo}
                        viewType={viewType}
                        location={pathname}
                        search={search}
                        context={context}
                        updateState={updateState}
                        api={api}
                    />
                </div>
            </div>
            
        </div>
    );

    return null;
};

export default Search;

