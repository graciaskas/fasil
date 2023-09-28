import React from "react";
import { Link } from "react-router-dom";

export default function Application({ path, icon, name}) { 
    return(
        <div className="col-4 col-xs-4 col-sm-4 col-md-3 col-lg-2">
            <Link to={path}>
                <div className="item"   >
                    <div className="item-image">
                        <img src={icon} alt="" />
                    </div>
                <p>{name}</p>
                </div>
            </Link>
        </div>
    );
};