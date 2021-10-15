import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import fetchCors from '../lib/fetchCors.js';
import logIOToggler from '../lib/logIOToggler.js';
import { globalContext, initContextValues } from '../App.js';

const Logout = () => {

    const context = useContext(globalContext); 
    const history = useHistory();

    const logoutHandler = async (e) =>
    {
        await fetchCors('/api/auth', 'delete');

        const isLogin = logIOToggler();
        if(!isLogin) context.updateContext(context, initContextValues);

        history.push('/');
    }

    return (
        <>
            <button className="logoutBtn logoutButton inactive" onClick={logoutHandler}>Logout</button>
        </>
    )
}

export default Logout
