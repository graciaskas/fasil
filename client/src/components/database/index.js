import React from 'react';
import { Route } from 'react-router-dom';
import Manager from './Apps/manager';
import Select from "./Apps/Select";
import Login from './Apps/login';
import Create from './modals/create';


export default function Init(props) {
    return (
        <React.Fragment>
            <Route path={"/database/manager"} exact component={Manager} />
            <Route path={"/database/login"} exact component={Login} />
            <Route path={"/database/create"} exact component={Create} />
            <Route path={"/"} exact component={Select }/>
        </React.Fragment>
    )
};
