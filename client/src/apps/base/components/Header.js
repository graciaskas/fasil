import React,{ useContext, useEffect, useRef, useState } from "react"
import { Link, useHistory} from 'react-router-dom';

import store from "../store.apps.data";
import { userInfos } from "../auth/access.token";

import { RiMessage2Fill, RiNotification3Fill } from "react-icons/ri";
import {  FaUserCircle, FaFacebookMessenger} from "react-icons/fa";

import Notification from "./Header/Notification";
import Branding from "./Header/Branding";
import Navlink from "./Header/NavLink";


const Header  =  props => {


    const [ apps, setApps] = useState(store);
    const [ userData, setUserData ] = useState([]);
    const history = useHistory();

    const AuthUserData = async () => { 
        try {
            const { user } = await userInfos();
            setUserData({...user});
        } catch (error) { console.error(error); }
    }


    const logOutUser = (e) => { 
        e.preventDefault();
        localStorage.removeItem("userConnectionInfo");
        //redirect to "/"
        history.push("/");
    };
    
     
    let app =  props.name !== undefined ? props.name : "";
    let links = apps.filter( (application ) => application.name === app);
    let AppLinks = links.length  === 0 ?   [] : links[0].links;
    let isMain = app === "main" ? true : false ;

    useEffect(() => { 
        AuthUserData();
    },  [  ]);

    return(
        <>
            <div className="header navbar navbar-expand-md"  id="AppHeader"  
                style = { isMain === true ? { backgroundColor : "transparent" } : { } }>

                <Branding app = { app } />

                <button  className="navbar-toggler"  data-toggle="collapse"  data-target="#navbar-content">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbar-content">
                    <ul className="navbar-nav">
                        {   
                            AppLinks.map( (menu,i) => {
                                const subMenus = menu.links ? menu.links : [];
                                const { groupAccess } = menu; //Menu item group accesses
                                const { role } = userData && userData;
                               
                                app = app.toLowerCase();
                                if(role != undefined && groupAccess) { //verify if role and groupAccess

                                    let inGroup = () => { //check if user is in group role function 
                                        const count = groupAccess.filter( role_ => role_ == role);
                                        if(count.length == 0) return false;
                                        return true;
                                    };

                                    if(inGroup()){ //if user in group role 
                                        return(
                                            <li key={i} className="nav-item">
                                                <Navlink menu={menu} subMenus={subMenus}  name={menu.name} app={app}  id="applink" key={i} state={""}   />  
                                            </li>
                                        );
                                    }
                                    return null
                                }
                               
                            })
                        }
                    </ul>
               
                    <div className="ml-auto icons">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link text-center">
                                    <span><RiMessage2Fill /></span>
                                    <i className="bg-success">12</i>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-center">
                                    <span><FaFacebookMessenger /></span>
                                    <i className="bg-yellow">12</i>
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" id="emetter"  data-toggle="dropdown"    aria-haspopup="true"   aria-expanded="false">
                                    <span><RiNotification3Fill /></span>
                                    <i className="bg-info">05</i>
                                </a>
                                <Notification />
                            </li>

                            <li className="nav-item dropdown">
                                <a  id="user" className="nav-link"
                                    href="#" style={{color:"#fff",marginLeft:"5px", display:"flex"}}
                                    data-toggle="dropdown" aria-haspopup="true"  aria-expanded="true" >
                                    <span style={{fontSize: "20px !important"}}>
                                        <FaUserCircle />
                                    </span>
                                    <span style={{fontSize:"14px", marginLeft:"5px", marginTop:"3px"}}>{ userData && userData.name }</span>
                                </a>

                           
                                <div className="dropdown-menu" aria-labelledby="user">
                                    <Link to={`/motor/parametres/utilisateurs/view/?q=${userData && userData._id}&action=view_profile`} className="dropdown-item"> Profile </Link>
                                    <Link to="./" className="dropdown-item"> Préférences </Link>
                                    <Link   to="#"  onClick = { logOutUser } className="dropdown-item"> 
                                        Déconnection 
                                    </Link>
                                </div>

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header