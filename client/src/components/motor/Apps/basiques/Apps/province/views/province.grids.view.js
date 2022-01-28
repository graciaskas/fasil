import React from "react"
import {Link} from "react-router-dom";
import { URI } from "components/base/auth/access.token";
import { useContext } from "react/cjs/react.development";
import { AppContext } from "components/motor/context/app.context";

const ProvinceGrids = ({ data, load }) => {

    /**
     * Get UI according to status
     * @param {*} type status [boolean]
     * @returns 
    */
    const getStatusColor = type => { 
        if(type == true ) return 'bg-danger status  text-right';
        return 'bg-warning status  text-right';
    };


    return (
        <div className="container-grids">
            <div className="row">
                {
                    data.map( (province,i) => (
                        <div  className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 col-12 box__link" key={i} >
                            <div className="box__user">
                                <div className="box__image user">
                                    <img src={ province.image ? province.image : "/src/image.png"}/>
                                </div>
                                <div className="box__description user">
                                    <h4><strong>{province.nom}</strong> [{province.code}] </h4>
                                    <p>ChefLieu : {province.cheflieu}</p>
                                    <p>{province.governor}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default ProvinceGrids;