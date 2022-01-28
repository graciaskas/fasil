import React from "react"
import {Link} from "react-router-dom"

import { 
    FaAlignJustify, 
    FaTh, FaChevronLeft, 
    FaChevronRight,
    FaFilter
} from "react-icons/fa";

import { RiSearch2Fill } from "react-icons/ri"

export default function displayers (props){

    const  { data, location, search, viewType } = props
    let limit = data.length;
    let start = 1;

    return (
        <React.Fragment>
            <div className="col-5">
                <div className="record_view">
                    <div className="navbar">
                        <button className=" bg-o">
                            <span>
                                <FaChevronLeft />
                            </span>
                        </button>
                        <button className=" bg-o">
                            <span>
                                <FaChevronRight />
                            </span>
                        </button>

                        {
                            //Define view Types selectors
                            viewType == "grid" || viewType == "both" ? (
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
                            viewType == "list" || viewType == "both" ? (
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

