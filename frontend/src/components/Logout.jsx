import React, { useContext } from 'react';
import fetchCors from '../lib/fetchCors.js';

import logIOToggler from '../lib/logIOToggler.js';
import { globalContext, initContextValues } from '../App.js';

const Logout = () => {

    const context = useContext(globalContext); 

    const logoutHandler = async (e) =>
    {
        const res = await fetchCors('/api/auth', 'delete');
        // if(res.message) throw Error(res.message);     
        const isLogin = logIOToggler();
        if(!isLogin) context.updateContext(context, initContextValues);
    }

    return (
        <>
            <button className="logoutBtn logoutButton inactive" onClick={logoutHandler}>Logout</button>
        </>
    )
}

export default Logout
