import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "components/Header";
import Left from "components/Menu.left";
import Controller from "./controller";
import Provider from "./context/app.context";

const Motor = (props) => {
   return (
      <React.Fragment>
         <Provider>
            <div className="flex-container">
               <Left />
               {/* <Routes>
                  <Route path="/motor/:application" component={Controller} />
               </Routes> */}
            </div>
         </Provider>
      </React.Fragment>
   );
};
export default Motor;
