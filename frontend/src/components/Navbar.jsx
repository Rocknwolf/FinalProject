import React, { useState, useContext } from 'react';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import { globalContext } from '../App.js';

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const context = useContext(globalContext);

    const toggle = () => setDropdownOpen(!dropdownOpen);

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

            <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle nav caret>
                    Dropdown
                </DropdownToggle>
            <DropdownMenu>
                <DropdownItem header>Options</DropdownItem>
                <DropdownItem tag={Link} to="/profile">Profil</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
            </Dropdown>
        </Nav>
    )
}

export default Navbar
