import React from "react";

import { Navigate, createBrowserRouter } from "react-router-dom";

import DefaultLayout from "components/DefaultLayout";
import GuestLayout from "components/GuestLayout";
import NotFound from "components/404";
import Login from "views/Login";
import DatabaseSelect from "views/DBSelect";
import DatabaseManager from "views/DBManager";
import Dashboard from "views/Dashboard";

import { motorRoutes } from "apps/motor/routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },

      /***--- Motor routes ---***/
      {
        path: "motor",
        children: motorRoutes,
      },
    ],
  },

  /*** Database routes */
  {
    path: "/db",
    element: <GuestLayout />,
    children: [
      {
        path: "",
        element: <DatabaseSelect />,
      },
      {
        path: "login",
        element: <Login />,
      },

      {
        path: "manager",
        element: <DatabaseManager />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
