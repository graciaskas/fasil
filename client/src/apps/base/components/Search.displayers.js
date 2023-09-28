import React, { useContext } from "react"
import {Link} from "react-router-dom"

import {  FaAlignJustify, FaTh, FaChevronLeft, FaChevronRight,FaFilter } from "react-icons/fa";
import axios from "axios";
import { CoreContext } from "../Context";

export default function Displayers (props){

    const { data, viewType, api, updateState, context } = props;
    const { setLoading } = useContext(CoreContext);


    
    // Return when data is null value;
    if (!data.pagination) return null 

    let { page, pages } = data.pagination;
    const { url, pathname, token } = api;
    const { database } = api.params; 
    
    const Paginate = async function (event) {
        try {
            setLoading(true);
            let page_ = 1;
            if (event === "next") { // event next page
                page_ = page + 1; 
                if (page_ >= pages) page_ = pages;
            }
            if (event === "previous") { //event previous page
                page_ = page - 1;
                if (page_ < 1) page_ = 1;
            }

            let url_ = `${url}/${pathname}/?database=${database}&page=${page_}`;
            //Request
            const result = await axios.get(url_, {
                headers: { 'Authorization':'Bearer '+token }
            });
            if (result.data.type === "success") { 
                updateState(result.data.result) // Update data
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <React.Fragment>
            <div className="col-5">
                <div className="record_view">
                    <div className="navbar">
                        {
                            //If the pages of pagination > 1 we display the next - previous buttons
                            pages > 1 ? (
                                <React.Fragment>
                                    <button className=" bg-o" onClick={async () => await Paginate("previous")}>
                                        <span> <FaChevronLeft /> </span>
                                    </button>
                                    <button className=" bg-o" onClick={async () => await Paginate("next")}>
                                        <span> <FaChevronRight /> </span>
                                    </button>
                                </React.Fragment>
                            ): null
                        }
                      

                        {
                            //Define view Types selectors
                            viewType === "grid" || viewType === "both" ? (
                                <Link to={"?viewType=grid"} className="link">
                                    <button className=" bg-o">
                                        <span>
                                            <FaTh />
                                        </span>
                                    </button>
                                </Link>
                            ) : null
                        }
                        {
                            viewType === "list" || viewType === "both" ? (
                                <Link 
                                    to={"?viewType=list"} 
                                    className="link">
                                    <button className=" bg-o">
                                        <span>
                                            <FaAlignJustify />
                                        </span>
                                    </button>
                                </Link>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

