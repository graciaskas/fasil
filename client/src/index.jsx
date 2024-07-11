import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import Provider from "base/CoreContext";
import { RouterProvider } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

//Load router
import { router } from "router";

//Load css
import "styles/main.min.css";

/***Read active system modules */
import { modules } from "base/modules";

/** Load modules routes to main system route */

ReactDOM.render(
   <Provider>
      {/* <App  /> */}
      <RouterProvider router={router} />
   </Provider>,
   document.getElementById("root")
);

serviceWorker.unregister();
