import React from "react";
import { Link } from "react-router-dom";

const Navlink = (props) => {
   const { subMenus, name, module, state, i, menu } = props;

   if (subMenus.length === 0) {
      //if menu has not submenus
      return (
         <Link to={`/${module}/${name}`} key={i} className="navigation__link">
            {name}
         </Link>
      );
   }

   return (
      // Display menu submenus
      <>
         <Link
            className="navigation__link flex items-center"
            to="#"
            id={menu.name}
            data-dropdown-toggle="dropdown"
         >
            <span className="">{menu.name}</span>{" "}
            <svg
               class="w-2 h-2 ml-2"
               aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 10 6"
            >
               <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
               />
            </svg>
         </Link>

         <div
            id="dropdown"
            class="overflow-hidden z-10 hidden bg-white divide-y divide-gray-100 rounded-md shadow w-44 dark:bg-gray-700"
         >
            <ul
               class="text-gray-700 overflow-hidden p-2"
               aria-labelledby={menu.name}
            >
               {subMenus.map((subMenu, i) => (
                  <li key={i} className="">
                     <Link
                        className="p-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 block"
                        key={i}
                        to={`/${module}/${name}/${subMenu}`}
                     >
                        {subMenu}
                     </Link>
                  </li>
               ))}
            </ul>
         </div>
      </>
   );
};

export default Navlink;
