import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";

//Load all system modules
import modules from "base/store.apps.data";

import { RiMessage2Fill, RiNotification3Fill } from "react-icons/ri";
import { FaUserCircle, FaFacebookMessenger } from "react-icons/fa";

import Notification from "components/Notification";
import Branding from "components/HeaderBranding";
import Navlink from "components/HeaderNavLink";
import { CoreContext } from "base/CoreContext";

const Header = (props) => {
   const { user } = useContext(CoreContext);

   const logOutUser = (e) => {
      e.preventDefault();
      localStorage.removeItem("fasilUser");
      //redirect to "/"
      return <Navigate to={"/db/login"} />;
   };

   //Current active working module
   let module = modules.filter((app) => app.name === props.module);

   return (
      <>
         <header className="bg-blue-500 flex items-center justify-between text-white p-2">
            <nav className="flex items-center">
               <Branding module={module[0].name} />
               <ul className="navigation flex items-center">
                  {/* 
                    Display all menus of the current module 
                    If the has sub-menus, the menu will have a dropdown menu list with all sub-menu item
                */}
                  {module[0].links.map(function (menu, i) {
                     //Get all sub-menus of current iteration (menu)
                     const subMenus = menu.links ? menu.links : [];
                     const { groupAccess } = menu; //Menu item group accesses
                     const role = user?.role;

                     //verify if role exits
                     //verify if role and groupAccess are same
                     //Then render the menu on UI
                     if (role !== undefined && groupAccess) {
                        if (groupAccess.includes(role)) {
                           return (
                              <li
                                 key={i}
                                 className="navigation__item ml-5 capitalize"
                              >
                                 <Navlink
                                    menu={menu}
                                    subMenus={subMenus}
                                    name={menu.name}
                                    module={module[0].name.toLowerCase()}
                                    id="applink"
                                 />
                              </li>
                           );
                        }
                        return null;
                     }
                  })}
               </ul>
            </nav>

            <ul className="flex items-center">
               <li className="nav-item">
                  <a className="nav-link text-center">
                     <span>
                        <RiMessage2Fill />
                     </span>
                     <i className="bg-success">12</i>
                  </a>
               </li>
               <li className="nav-item">
                  <a className="nav-link text-center">
                     <span>
                        <FaFacebookMessenger />
                     </span>
                     <i className="bg-yellow">12</i>
                  </a>
               </li>

               <li className="nav-item">
                  <a
                     className="nav-link"
                     id="emetter"
                     data-toggle="dropdown"
                     aria-haspopup="true"
                     aria-expanded="false"
                  >
                     <span>
                        <RiNotification3Fill />
                     </span>
                     <i className="bg-info">05</i>
                  </a>
                  <Notification />
               </li>

               <li className="nav-item dropdown">
                  <a
                     id="user"
                     className="nav-link"
                     href="#"
                     style={{
                        color: "#fff",
                        marginLeft: "5px",
                        display: "flex",
                     }}
                     data-toggle="dropdown"
                     aria-haspopup="true"
                     aria-expanded="true"
                  >
                     <span style={{ fontSize: "20px !important" }}>
                        <FaUserCircle />
                     </span>
                     <span
                        style={{
                           fontSize: "14px",
                           marginLeft: "5px",
                           marginTop: "3px",
                        }}
                     >
                        {user && user.name}
                     </span>
                  </a>

                  <div className="dropdown-menu" aria-labelledby="user">
                     <Link
                        to={`/motor/parametres/utilisateurs/view/?q=${
                           user && user._id
                        }&action=view_profile`}
                        className="dropdown-item"
                     >
                        {" "}
                        Profile{" "}
                     </Link>
                     <Link to="./" className="dropdown-item">
                        {" "}
                        Préférences{" "}
                     </Link>
                     <Link
                        to="#"
                        onClick={logOutUser}
                        className="dropdown-item"
                     >
                        Déconnection
                     </Link>
                  </div>
               </li>
            </ul>
         </header>
      </>
   );
};

export default Header;
