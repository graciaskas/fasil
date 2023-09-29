import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import Provider from "base/CoreContext";
import { RouterProvider } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import { router } from "router";

import "styles/main.min.css";

ReactDOM.render(
   <Provider>
      {/* <App  /> */}
      <RouterProvider router={router} />
   </Provider>,
   document.getElementById("root")
);

serviceWorker.unregister();
