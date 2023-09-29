import React, { useContext, useEffect, useState } from "react";
import { parse } from "query-string";
import { useLocation, Link, Navigate } from "react-router-dom";

import Message from "components/Message";
import axiosClient from "axios.client";
import Loading from "components/Loading";
import { CoreContext } from "base/CoreContext";

export default function Login() {
   const {
      db,
      setToken,
      setUser,
      setDb,
      loading,
      setLoading,
      setMessage,
      message,
   } = useContext(CoreContext);

   const [state, setState] = useState({
      username: null,
      password: null,
   });

   const { search } = useLocation();
   const params = parse(search);

   const postLoginRequest = async () => {
      setLoading(true);

      const payload = {
         username: state.username,
         password: state.password,
         database: db,
      };

      axiosClient
         .post("/db/login", payload)
         .then(({ data }) => {
            if (data.token) {
               setToken(data.token);
               setLoading(false); //terminate loading effect
               return <Navigate to={"/dashboard"} />;
            }

            setMessage({ message: data.errors.message, type: "danger" });
         })
         .catch(({ message }) => {
            console.log(message);
            setMessage({
               message,
               type: "danger",
            });
         });
   };

   const requestLogin = (e) => {
      e.preventDefault();
      if (!state.username || !state.password)
         return setMessage({
            message: "Username or password is required.",
            type: "danger",
         });
      //-- POST login request
      postLoginRequest();
   };

   useEffect(() => {
      if (params.id && params.db) {
         const { db, id } = params;
         setDb(db);
         //store db in localStorage
         localStorage.setItem(
            "db",
            JSON.stringify({
               name: db,
               id: id,
            })
         );
      }
   }, [db]);

   return (
      <div className="form__flex">
         <form className="form w-auto" onSubmit={requestLogin}>
            <div className="form__header py-2">
               <h3>Se Connecter</h3>
            </div>

            <Message
               message={message.message}
               type={message.type}
               handler={setMessage}
            />
            <div className="flex items-center overflow-hidden justify-between border border-gray-300 rounded-md mb-3 p-1">
               <span className="icon">
                  <span className="">
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
               </span>
               <input
                  className="text-center rounded-md"
                  disabled
                  defaultValue={db || "Aucune bd"}
                  type="text"
               />
               <Link className=" btn btn-primary" type="button" to={"/db"}>
                  Sélectionner
               </Link>
            </div>

            <div className="form__control">
               <span className="icon">
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
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                     />
                  </svg>
               </span>
               <input
                  type="text"
                  name="username"
                  placeholder="Email or username"
                  onChange={(e) =>
                     setState({ ...state, username: e.target.value })
                  }
               />
            </div>

            <div className="form__control">
               <span className="icon">
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
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                     />
                  </svg>
               </span>
               <input
                  type="password"
                  placeholder="password"
                  onChange={(e) =>
                     setState({ ...state, password: e.target.value })
                  }
               />
            </div>
            <button type="submit" className="btn btn-primary">
               Connexion
            </button>
            {/*
             */}
         </form>
      </div>
   );
}
