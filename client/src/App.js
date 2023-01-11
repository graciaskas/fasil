import React, { useContext } from 'react';
import { BrowserRouter as Router ,Switch,  Route} from 'react-router-dom';
// comit git zone url = https://www.zone-telechargement.cloud/?p=manga&id=587-boruto-naruto-next-generations-saison1
import NotFound from "./components/notfound";
//--- App Store Component
import Dashboard from "./components/dashboard";
import Database from "components/database"
//**---------    Applications
import Settings from "./components/settings/index";
import Resume from "./components/resume/index";
import Motor from 'components/motor';
import auth from 'components/base/auth/access.token';

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
