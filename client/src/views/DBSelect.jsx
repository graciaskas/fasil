import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import Message from "components/Message";
import { CoreContext } from "base/CoreContext";
import axiosClient from "axios.client";

export default function DatabaseSelect(props) {
   const { setLoading, message, setMessage, db, setDb } =
      useContext(CoreContext);

   const [data, setData] = useState([]);

   useEffect(function () {
      //if any
      if (db != null && db.name) {
         return <Navigate to={`/db/login/?db=${db.name}&id=${db.id}`} />;
      } else {
         // load dbs
         axiosClient
            .get("/db/list")
            .then(({ data }) => {
               setData(data);

               setLoading(false); //terminate loading effect

               !data.length && <Navigate to={`/db/create}`} />;
            })
            .catch((error) => {
               setMessage({ message: error.message, type: "danger" });
            });
      }
   }, []);

   return (
      <div className="form__flex">
         <form className="form w-auto">
            <div className="form__header">
               <h3>Bases de données</h3>{" "}
            </div>
            <div className="s-container">
               <Message
                  message={message.message}
                  type={message.type}
                  handler={setMessage}
                  absolute={false}
               />
               <div className="">
                  {data.map(function (db, key) {
                     return (
                        <Link
                           key={key}
                           to={`/db/login/?db=${db.name}&id=${key}`}
                           className="flex items-center font-bold hover:bg-slate-100  w-100 p-1 mb-1 cursor-pointer border-b"
                        >
                           <span className="mr-2">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 strokeWidth="1.5"
                                 stroke="currentColor"
                                 class="w-6 h-6"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                                 />
                              </svg>
                           </span>
                           {db.name}
                        </Link>
                     );
                  })}
                  <Link
                     className="text-center underline text-blue-500 block mt-5"
                     to={"/db/manage"}
                  >
                     Gérer les bases de données
                  </Link>
               </div>
            </div>
         </form>
      </div>
   );
}
