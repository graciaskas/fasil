import React, { Component, useState } from "react";
import { Link } from "react-router-dom";

import { modules } from "base/modules";

const LeftMenu = (props) => {
   const [apps, setApps] = useState(
      modules.filter((app) => app.active == true)
   );
   // console.log(this.state.apps[0].icon)
   return (
      <div className="menu-theme">
         <div className="menu-theme-body">
            {apps.map((app, id) => (
               <Link to={`/${app.name}/${app.main}`} key={id}>
                  <div>
                     <img src={app.icon} alt={app.name} />
                  </div>
               </Link>
            ))}
         </div>
      </div>
   );
};

export default LeftMenu;
