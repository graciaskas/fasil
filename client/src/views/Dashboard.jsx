import React from "react";
//**=== Components
import Header from "components/Header";

import Store from "base/store.apps";

export default function AppSelector({ match }) {
   return (
      <div className="h-screen bg-slate-100">
         <Header currentLink="" name="main" />
         <div className="container">
            <div className="info">
               <div className="image">
                  <h3>ZeSlap ERP.</h3>
               </div>
            </div>
            <div className="center" id="center">
               <Store />
            </div>
         </div>
      </div>
   );
}
