import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function VehiculeGeo(){
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div className="bodyContainer" id="bodyContainer" >
      <div id="action_bar" style={{ display: "none" }}></div>
      <div className="main-container bg-sheet"id="main_container" >
        <form>
           <div id="loaded" className="pageSingle" >
              <div style={{width:"100%", height:"80vh"}}>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDLlbisna-f8_dWOBGb2o2MLrkcUIhr4-g" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                  >
                    <AnyReactComponent
                      lat={59.955413}
                      lng={30.337844}
                      text="My Marker"
                    />
                  </GoogleMapReact>
                </div>
            </div>
        </form>
      </div>
    </div>
  );
}