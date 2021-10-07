import React from 'react';

import Login from './Login.jsx';
import Logout from './Logout.jsx';

import logo from '../images/logo.jpg';

const Header = () => {
    return (
        <div className="mainHeader">
            <img src={logo} alt="" className="mainLogo" />

            <div className="mainTitel">
                <h1 contentEditable="true">Zelluloid Zombies</h1>
                <p contentEditable="true">blablabla guckstu</p>
            </div>

            <div className="dropLogin">
                <Login/>
                {/* <RegistrationForm/> */}
                <Logout/>
            </div>
        </div>
    )
}

export default Header
