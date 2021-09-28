import React, { useContext } from 'react';
import fetchCors from '../lib/fetchCors.js';

import logIOToggler from '../lib/logIOToggler.js';
import { globalContext } from '../App.js';

const Logout = () => {

    const context = useContext(globalContext); 

    const logoutHandler = async (e) =>
    {
        const error = await fetchCors('/api/auth', 'delete');
        if(error.message) throw Error(error.message);     
        context.updateContext('isLogin' ,logIOToggler());
    }

    return (
        <>
            <button className="logoutButton inactive" onClick={logoutHandler}>Logout</button>
        </>
    )
}

export default Logout
