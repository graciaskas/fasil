import React,{ useContext, useState } from 'react';

import auth from 'components/base/auth/access.token';
import { getUserInfo } from 'components/base/functions/all';

export const ContextCore = React.createContext();

function Provider({ children }) {
    auth();
    return (
        <ContextCore.Provider value={ getUserInfo() }>
            { children }
        </ContextCore.Provider>
    )
}

export default Provider
