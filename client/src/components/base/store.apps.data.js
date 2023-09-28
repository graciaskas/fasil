import React from 'react';

/**----- Icons */
import Motor from 'components/base/icons/survey.png';
import Settings from'components/base/icons/settings.png';
import Messages from "components/base/icons/messages.png";
import Resume from "components/base/icons/mail_push.png";

var data =   [
    {
        name:"Messages",
        links : [],
        main:"messages",
        icon:Messages,
        active:true
    },
    { 
        name:'Motor', 
        links:[
            { name: 'dashboard', links : [], groupAccess : ['admin','user','superAdmin']},
            { name: 'identifications', links:[], groupAccess:['admin','user','superAdmin']},
            { name : 'basiques', links : ['provinces','villes','communes','quartiers'], groupAccess:['user','admin','superAdmin']},
            { name: 'cooperatives', links: [], groupAccess:['admin','superAdmin']},
            { name: 'rapports', links: ['identifications','vehicules'],groupAccess:['admin','superAdmin']},
            { name : 'parametres', links : ['utilisateurs','gillets'], groupAccess: ['superAdmin']}],
        icon: Motor,
        main:'dashboard',
        path : '',
        active: true
    },
    {
        name: 'Resume',
        links: [
            { name: 'cvs', links: [], groupAccess: ['admin', 'user', 'superAdmin'] }
        ],
        icon: Resume,
        main:'cvs',
        path : '',
        active: true
    },

   
    {
        name:'Settings',
        links:[ 
            {  name: 'dashboard',links: [], groupAccess : ['admin','superAdmin']},
            {  name: 'applications',links:[], groupAccess : ['superAdmin'] },
            {  name: 'configuration', links: ['company'],groupAccess : ['superAdmin']}
        ],
        main:'dashboard',
        icon: Settings,
        path : '',
        active: true
    }, 
];
export default data;