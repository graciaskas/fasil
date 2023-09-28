import React from "react";
import { useState } from "react";

export default function Create_DB(props){


    let isOn = props.state;
 
    //function to handle submition
    const handleCreation = (e) => {
        e.preventDefault()
        console.log(e.target.elements);
    }

    function fileDownloader(e){
       
        let file = document.getElementById('file')
      
        file.click();

        let file_value = file.baseURI;
        console.log(file_value);
    }


    function close(){
        //change the modal classList 
        document.getElementById('m_body_restore').classList = "modal-body w-40 modal-out"
        setTimeout(function(){
            document.getElementById('modal_restore').style.display = 'none'
        },200)
    }


    return(
        <React.Fragment>
        <div className="modal " style={{display:isOn}} id="modal_restore">
            <div className="modal-body w-40 modal-in" id='m_body_restore'>
                <div className="head">
                    <h4>Restore Database</h4>
                </div>
                <div className="" id="report_restore">
                    <form className="form"  onSubmit={(e) => handleCreation(e)}>

                       <div className="form-e">
                            <span className="icon">
                                <span className="fa fa-files-o" id="icon"></span>
                            </span>
                            <button type="button" onClick = {(e) => fileDownloader(e)}>Choose a file</button>
                            <small>No file Chosen</small>
                            <input type="file" name="db_dump" hidden id='file'/>
                        </div>  

                        <div className="form-e">
                            <span className="icon">
                                <span className="fa fa-bars" id="icon"></span>
                            </span>
                            <input type="text" name="username" placeholder="Database Name" />
                        </div>

                        <div style={{margin:"6px 0px"}}>
                            <p>This database might have been moved or copied.</p>
                            <p>
                                In order to avoid conflicts between databases, Boopy needs to know if this database was moved or copied.
                                If you don't know, answer "This database is a copy".
                            </p>
                        </div>

                        <div className="form-label">
                            <input type="radio" id="copy" name="type" value="copy"/>
                            <label htmlFor="copy">Is a copy</label>
                            
                        </div>
                        <div className="form-label">
                            <input type="radio" id="moved" name="type" value="moved"/>
                            <label htmlFor="moved">It was moved</label>
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
    )
}