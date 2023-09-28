import React, { useEffect } from "react"
import {Link, useHistory} from "react-router-dom";
import { URI } from "components/motor/api/uri";
import { useContext } from "react/cjs/react.development";
import { AppContext } from "components/motor/context/app.context";

const VehiculeGrids = ({ data, load, state }) => {
    //Destructure App context object
    const { database, token, setLoading, setMessage } = useContext(AppContext);
    const history = useHistory();
    
    /**
     * Get UI according to status
     * @param {*} type status [boolen]
     * @returns 
    */
    const getStolenStatus = type  => { 
        if(type === true ) return "Volé";
        return 'Disponible'
    };

    /**
     * Get UI according to status
     * @param {*} type status [boolean]
     * @returns 
    */
    const getStatusColor = type => { 
        if(type === true ) return 'bg-danger status  text-right';
        return 'bg-warning status  text-right';
    };

    /**
     * This function is used to set a engine has stolen
     * @param {*} engine engine id 
    */
    const setEngineStolen = async (engine) => { 
        setLoading(true)
        try {
            const response = await fetch(`${URI}/engines/${engine}/?update=stolen`,{
                method:"PUT",
                headers : { 
                    "Content-Type": "application/json",
                    "Authorization":"Bearer "+token
                },
                body: JSON.stringify({database, stolen : true })
            });
            const data = await response.json();
            const { message, type } = data;
            setLoading(false);  //Close loader UI
            setMessage({ message, type }) //UI Message
            load(true) //reload data
            history.push("/motor/rapports/vehicules")
        } catch (error) {
            console.error(error);   
        } 
    };


    return (
        <div className="container-grids">
            <div className="row">
                {
                    data.map( (engine,i) => (
                        <div  className="col-lg-3 col-md-6 col-sm-6 col-xs-12 box__link" key={i}>
                            <div className="box__user">
                                <div className="box__image user">
                                    <img src={ engine.image ? engine.image : "/src/image.png"}/>
                                </div>
                                <div className="box__description user">
                                    <h4><strong>{engine.marque}</strong> [{engine.model}] </h4>
                                    <p>Plaque : {engine.plaque}</p>
                                    <p>{engine.typePneu} Pneu(s)</p>
                                    <span className={ getStatusColor(engine.stolen)}>{getStolenStatus(engine.stolen)}</span>

                                    <div className="descripton__dots">
                                        <div className="navbar" style={{  height:0}}>
                                            <div className="dropdown show">
                                                <div className="dots" data-toggle="dropdown" aria-haspopup="true" aria-haspopup="true" id={engine._id}>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                                <div className="dropdown-menu" aria-labelledby={engine._id}>
                                                    <Link 
                                                        to={`/motor/identifications/view/?q=${engine.driver}`} 
                                                        className="dropdown-item">Responsables</Link>
                                                    <Link 
                                                        to={`/motor/rapports/vehicules/view/?q=${engine._id}&action=geolocation`} 
                                                        className="dropdown-item">Geo localisation</Link>
                                                    <li  
                                                        style={{cursor:"pointer"}}  
                                                        className="dropdown-item" onClick={ () => setEngineStolen(engine._id)}>
                                                        Définir comme volé
                                                    </li>
                                                </div>
                                            </div>
                                        </div>  
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default VehiculeGrids