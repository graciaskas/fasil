import React from 'react';
//**=== Components 
import Header from './base/components/Header';

import Store from './base/store.apps';

import authenticate from "./base/auth/access.token";

export default  function AppSelector({match}) {
    return (
        <div className="shadow">
            <Header currentLink="" name="main"/>
            <div className="container">
                <div className="info">
                    <div className="image">
                        <h3>ZeSlap ERP.</h3>
                    </div>
                </div>
                <div className="center" id="center">
                    <Store />
                </div>  
            </div>    
        </div>
    )
}
