import React from 'react';
import { parseUrl } from 'query-string';
import Users from "./Apps/users";
import Company from './Apps/company';

function Controller({ match }) {
    const { url, params } = match;
    const { setting } = params;

    switch (setting) {
        case 'users':
            return <Users />
        default:
            return <Company />
    }
}

export default Controller;
