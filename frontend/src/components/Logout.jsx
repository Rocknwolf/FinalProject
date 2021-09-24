import React from 'react';
import fetchCors from '../lib/fetchCors.js';

import logIOToggler from '../lib/logIOToggler.js';

const Logout = () => {

    const logoutHandler = async (e) =>
    {
        const error = await fetchCors('/api/auth', 'delete');
        if(error.message) throw Error(error.message);     
        logIOToggler();
    }

    return (
        <>
            <button className="logoutButton inactive" onClick={logoutHandler}>Logout</button>
        </>
    )
}

export default Logout
