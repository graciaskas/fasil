import React, { useEffect, useRef, useState } from 'react';
import { getBas64 } from 'components/base/functions/all';
import { RiCloseFill } from 'react-icons/ri';
import modelDriver from '../models/model.driver';
import modelOwner from '../models/model.owner';

const  Camera = (props) => {

   const { display, isOwner, setDisplay, setFileSelected, fileSelected } = props;

   const video = useRef(null);
   const  canvas = useRef(null);
   const inputFile = useRef(null);

   const [ image, setImage ] = useState(fileSelected);
   const [ displayCanvas, setDisplayCanvas ] = useState(true);
   const [ displayButtons, setDisplayButtons ] = useState(false);

   const clickPhoto = () => { 
      try {
         setDisplayCanvas(true);
         setTimeout(() => { 
            if(canvas) { 
               canvas.current.getContext('2d').drawImage(video.current, 0, 0, canvas.current.width, canvas.current.height);
               let image = canvas.current.toDataURL('image/jpeg');
               setImage(image);
               isOwner ? modelOwner.image = image : modelDriver.image = image;
            }
         },5);
      } catch (error) {
         console.error(error);
      }
   };

   const loadCamera = async () => { 
      try {
         let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
         video.current.srcObject = stream;
      } catch (error) {
         console.error(error);  
      }
   };

   //Set view to user on main page
   const uploadImage = e => { 
      setFileSelected(image);
      setDisplay("none");
   };

   const uploadImageFile = e => { 
      console.log(e.target.files[0]);
   }

   //Click input file hidden to unhidde it
   const uploadImageFromPC = () => { 
      if (inputFile.current) { 
         inputFile.current.focus();
         setTimeout(() => { 
            inputFile.current.click();
         },5);
      }
   };

   //Component mounting Effet
   useEffect(() => { 
      loadCamera();
   },[]);

   //Effet onchange image base64
   useEffect(() =>  { 
      if(image != null ) setDisplayButtons(true);
   },[image])

   return (
      <React.Fragment>
         <div className="modal " style={{ display }} id="modal_create">
           
            <div className="modal-body w-70 modal-in" style={{padding : "15px"}}>
               <div className="modal-header" style={{ height : "20px", padding : "5px !import", clear:"both"}}>
                  <h4 style={{marginTop:"-17px"}}>Application Camera</h4>
                  <span 
                     style={{marginTop:"-17px"}} 
                     className="alert-closer bg-secondary"
                     onClick={ () => setDisplay("none") }>
                     <RiCloseFill />
                  </span>
               </div>
               <div className="image-video">
                  <div className="video_camera">
                     <video ref={ video }  autoPlay ></video>
                     <div className="camera-footer">
                        <button onClick={clickPhoto} className="btn bg-blue mt-2">Capturer</button>
                     </div>
                  </div>
                  <div className="image_camera">
                     { displayCanvas ? <canvas ref={ canvas } className="imageCamera"></canvas> : <img src={image} /> }
                     {
                        displayButtons ? (
                           <div className="camera-footer">
                              <input type={"file"} id='file_' ref={inputFile} onChange={ uploadImageFile } accept="image/png,image/jpeg" />
                              <button onClick={ uploadImage } className="btn bg-blue mt-2">Téleverser la photo</button>
                              <button className="btn bg-o mt-2" onClick={uploadImageFromPC}>Choisir dans ma gallerie</button>
                           </div>
                        ): null
                     }
                  </div>
               </div>
            </div>
         </div>
      </React.Fragment>
   );
};

export default Camera
