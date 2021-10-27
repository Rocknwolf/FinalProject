import React from 'react';

import Login from './Login.jsx';
import Logout from './Logout.jsx';

import logo from '../images/logo.jpg';

const Header = () => {
    return (
        <div className="mainHeader">
            <img src={logo} alt="" className="mainLogo" />

            <div className="mainTitel">
                <h1 contentEditable="true" suppressContentEditableWarning={true}>Movie Friends Club</h1>
                <p contentEditable="true" suppressContentEditableWarning={true}>The popcorn discussion zone</p>
            </div>

            <div className="dropLogin">
                <Login/>
                <Logout/>
            </div>
        </div>
    )
}

export default Header
