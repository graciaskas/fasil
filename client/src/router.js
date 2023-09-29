import React from "react";

import { Navigate, createBrowserRouter } from "react-router-dom";

import DefaultLayout from "components/DefaultLayout";
import GuestLayout from "components/GuestLayout";
import NotFound from "components/404";
import Login from "views/Login";
import DatabaseSelect from "views/DBSelect";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <DefaultLayout />,
      children: [
         {
            path: "dashboard",
            element: <Navigate to={"/dashboard"} />,
         },
      ],
   },
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
      ],
   },

   {
      path: "*",
      element: <NotFound />,
   },
]);
