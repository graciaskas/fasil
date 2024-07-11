import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";

//Load all system modules
import { modules } from "base/modules";

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
   let module = modules.filter(
      (app) => app.name.toLowerCase() === props.module
   );

   return (
      <>
         <header className="bg-blue-500 flex items-center justify-between text-white p-2">
            <nav className="flex items-center">
               <Branding module={module[0]?.name || props.module} />
               {props.module !== "main" && (
                  <ul className="navigation flex items-center">
                     {/* 
                    Display all menus of the current module 
                    If the has sub-menus, the menu will have a dropdown menu list with all sub-menu item
                  */}
                     {module[0] &&
                        module[0].links.map(function (menu, i) {
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
               )}
            </nav>

            <div className="flex items-center">
               <div className="header__icons flex items-center gap-[2rem]  mr-7">
                  <div
                     type="button"
                     class="relative inline-flex items-center  text-sm font-medium text-center text-white   "
                  >
                     <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 16"
                     >
                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                     </svg>

                     <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-800 border-2 border-white rounded-full -top-3 -right-4 dark:border-gray-900">
                        08
                     </div>
                  </div>

                  {/* Notification icon */}

                  <div class="relative inline-flex items-center  text-sm font-medium text-center text-white ">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                     >
                        <path
                           stroke-linecap="round"
                           d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                        />
                     </svg>

                     <span class="sr-only">Notifications</span>
                     <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3 -right-4 dark:border-gray-900">
                        20
                     </div>
                  </div>

                  <div
                     class="relative inline-flex items-center text-sm
                     font-medium text-center text-white "
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                     >
                        <path
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                        />
                     </svg>
                     <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3 -right-4 dark:border-gray-900">
                        20
                     </div>
                  </div>
               </div>

               <div className="" data-dropdown-toggle={`header__user`}>
                  <div className="flex items-center cursor-pointer bg-blue-700 rounded-md p-2 px-4">
                     <span>
                        <FaUserCircle />
                     </span>
                     <span>Gracias Kasongo</span>
                  </div>

                  <div
                     className="overflow-hidden z-10 hidden bg-white rounded-md p-2 text-black shadow-md"
                     id="header__user"
                  >
                     <li>
                        <Link
                           to={`/motor/parametres/utilisateurs/view/?q=${
                              user && user._id
                           }&action=view_profile`}
                           className="px-2 p-1 hover:bg-slate-100 rounded-md block"
                        >
                           Profile
                        </Link>
                     </li>

                     <li>
                        <Link
                           to="./"
                           className="px-2 p-1 hover:bg-slate-100 rounded-md block"
                        >
                           Préférences
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="#"
                           onClick={logOutUser}
                           className="px-2 p-1 hover:bg-slate-100 rounded-md block"
                        >
                           Déconnection
                        </Link>
                     </li>
                  </div>
               </div>
            </div>
         </header>
      </>
   );
};

export default Header;
