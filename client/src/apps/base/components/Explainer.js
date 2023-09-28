import React from "react"

export default function Explainer (props){

    const {message,data} = props;

    if(data.length > 0) return <></>
    //className={this.state.currentLink === menu ? "li_active" : ""}>

    return (
        <div className="helper">
            <span className="fa fa-file"></span>
            <p>{message}</p>
        </div>
    )
   
}

