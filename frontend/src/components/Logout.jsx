import React from 'react';
import fetchCors from '../lib/fetchCors.js';

const Logout = () => {
    
    const logoutHandler = async (e) =>
    {
        const error = await fetchCors('/api/auth', 'delete');
        if(error.message) throw Error(error.message);
    }

    return (
        <>
            <button onClick={logoutHandler}>Logout</button>
        </>
    )
}

export default Logout
