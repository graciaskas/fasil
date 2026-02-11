import React, { useContext } from 'react';
import { BrowserRouter as Router ,Switch,  Route} from 'react-router-dom';
// comit git zone url = https://www.zone-telechargement.cloud/?p=manga&id=587-boruto-naruto-next-generations-saison1
import NotFound from "components/404";
//--- App Store Component
import Dashboard from "components/Dashboard";
import Database from "apps/database"
//**---------    Applications
import Settings from "apps/settings/index";
import Resume from "apps/resume/index";
import Motor from 'apps/motor';
import auth from 'base/auth/access.token';

import "./scss/main.scss";

const App = () => { 
    auth();
    return (
        <Router>
            <Switch>
                <Route  exact  path="/" component={Database} />
                <Route  path="/database"  component = {Database} />
                <Route  exact path="/dashboard"  component = {Dashboard} />
                <Route  path="/motor"  component = {Motor} />
                <Route  path="/settings" component = {Settings} />
                <Route  path="/resume"  component = {Resume} />
                <Route  path="*" component = {NotFound} />
            </Switch>
        </Router>
    );
};      

export default App;
