import React from "react";
import { useState } from "react";

export default function Create_DB(props){


    let isOn = props.state;
 
    //function to handle submition
    const handleCreation = (e) => {
        e.preventDefault()
        console.log(e.target.elements);
    }

  
    function close(){
        //change the modal classList 
        document.getElementById('m_body_master').classList = "modal-body w-40 modal-out"
        setTimeout(function(){
            document.getElementById('modal_master').style.display = 'none'
        },200)
    }


    return(
        <React.Fragment>
        <div className="modal " style={{display:isOn}} id="modal_master">
            <div className="modal-body w-40 modal-in" id='m_body_master'>
                <div className="head">
                    <h4>Set Master Password</h4>
                </div>
                <div className="" id="report_master">
                    <form className="form"  onSubmit={(e) => handleCreation(e)}>

                        <div style={{margin:"6px 0px"}}>
                            <p>The master password is required to create, delete, dump or restore databases.</p>
                        </div>

                        <div className="form-e">
                            <span className="icon">
                                <span className="fa fa-key" id="icon"></span>
                            </span>
                            <input type="password" name="password" placeholder="Master Password" />
                        </div>

                        <button type="submit"  className="btn bg-blue">
                            Save 
                        </button>
                        <button type="button" className="btn bg-second" onClick = {() => close()}>
                            Close
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </React.Fragment>
    );
}