import React, { useState, useContext } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import { globalContext } from '../App.js';

function Navbar() {
    const context = useContext(globalContext);

    return (
        <Nav tabs>
            <NavItem className="navigation">
                <NavLink tag={Link} to="/" className="navFont">Main</NavLink>
            </NavItem>
            {
                !context.isLogin ? (
                    <NavItem>
                        <NavLink tag={Link} to="/register" className="navFont">Registrieren</NavLink>
                    </NavItem>
                ): null
            }
            <NavItem>
            <NavLink tag={Link} to="/chat" className="navFont">Chat</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/forum" className="navFont">Forum / Tauschbörse</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/movies">Movies</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/profile">Profil</NavLink>
            </NavItem>
        </Nav>
    )
}

export default Navbar
