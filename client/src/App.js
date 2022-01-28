import React,{Component, useRef} from 'react';
import { BrowserRouter as Router ,Switch,  Route} from 'react-router-dom';
import Loading from 'components/base/components/Loading';

// comit git zone url = https://www.zone-telechargement.cloud/?p=manga&id=587-boruto-naruto-next-generations-saison1

import NotFound from "./components/notfound";

//--- App Store Component
import Dashboard from "./components/dashboard";

//--- Database selection componet
import DBManager from "./components/database/Apps/manager";
import Login from "./components/database/Apps/login";
import Database from "./components/database/index";

//-- Context
import Provider from 'components/base/Context';

//**---------    Applications
import Settings from "./components/settings/index";
import Motor from 'components/motor';
import { coreContext } from 'components/base/Context';
import { useContext, useEffect } from 'react/cjs/react.development';

const App  = () => { 

    useEffect(() => { 
       
    },[]);
    return (
        <Provider>
            <Router>
                <Switch>
                    <Route  exact path="/database/login"  component = {Login}/>
                    <Route  exact path="/database/manager"  component = {DBManager}/>
                    <Route  exact path="/"  component = {Database}/>
                    <Route  exact path="/dashboard"  component = {Dashboard}/>
                    <Route  path="/motor"  component = {Motor}/>
                    <Route  path="/settings"  component = {Settings}/>
                    <Route  path="*" component={NotFound} />
                    {/* { loading && <Loading />  } */}
                </Switch>
            </Router>
        </Provider>
    );
};      

export default App;
