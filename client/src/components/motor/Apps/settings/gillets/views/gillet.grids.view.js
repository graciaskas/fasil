import React from "react";
import GilletGrid from "./gillet.grid.view.js";


const GilletsGrids = ({ data }) => { 
    if (!data) return;
    return (
        <div className="bodyContainer" id="bodyContainer">
            <div id="action_bar" style={{display:"none"}}></div>
            <div className="main-container bg-gray" id="main_container">
                    <div className="row pr-3">
                        {
                            data.map( (record, i) => {
                                return(
                                    <GilletGrid
                                        key={i}
                                        size={""}
                                        id={record._id}
                                        image={record.image}
                                        active={record.active}
                                        email={record.email}
                                        username={record.username}
                                        type={record.type}
                                        num={record.num}
                                    />
                                )
                            })
                        }
                    </div>
            </div>
        </div>
    );
  
};

export default GilletsGrids;